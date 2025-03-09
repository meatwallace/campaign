import { data, Form, redirect } from 'react-router';
import { getFormProps, getInputProps, useForm } from '@conform-to/react';
import { getZodConstraint, parseWithZod } from '@conform-to/zod';
import { HoneypotInputs } from 'remix-utils/honeypot/react';
import { z } from 'zod';
import { Field } from '~/components/field';
import { FormErrorList } from '~/components/form-error-list.tsx';
import { RouteErrorBoundary } from '~/components/route-error-boundary.tsx';
import { StatusButton } from '~/components/status-button.tsx';
import { graphql } from '~/gql';
import { VerificationType } from '~/gql/graphql.ts';
import { useIsFormPending } from '~/hooks/use-is-form-pending.ts';
import { SESSION_KEY_VERIFY_TRANSACTION_ID } from '~/session/consts.ts';
import { verifySessionStorage } from '~/session/verify-session-storage.server.ts';
import { Routes } from '~/types.ts';
import { checkHoneypot } from '~/utils/check-honeypot.server.ts';
import { createGQLClient } from '~/utils/create-gql-client.server.ts';
import { getDomainURL } from '~/utils/get-domain-url.ts';
import { isMutationError } from '~/utils/is-mutation-error.ts';
import { requireAnonymous } from '~/utils/require-anonymous.server.ts';
import { UserEmailSchema } from '~/validation/user-email-schema.ts';
import { QueryParam } from '../verify-otp/types.ts';
import { type Route } from './+types/route.ts';

const startEmailSignupMutation = graphql(/* GraphQL */ `
  mutation StartEmailSignup($input: StartEmailSignupInput!) {
    startEmailSignup(input: $input) {
      ... on TwoFactorRequiredPayload {
        transactionID
      }

      ... on MutationErrorPayload {
        error {
          title
          message
        }
      }
    }
  }
`);

const SignupFormSchema = z.object({
  email: UserEmailSchema,
});

export async function loader({ request }: Route.LoaderArgs) {
  await requireAnonymous(request);

  return null;
}

export async function action({ request }: Route.ActionArgs) {
  await requireAnonymous(request);

  const client = createGQLClient();

  const formData = await request.formData();

  await checkHoneypot(formData);

  const submission = parseWithZod(formData, { schema: SignupFormSchema });

  if (submission.status !== 'success') {
    const result = submission.reply();
    const status = submission.status === 'error' ? 400 : 200;

    return data({ result }, { status });
  }

  try {
    const { startEmailSignup } = await client.request(
      startEmailSignupMutation,
      {
        input: {
          email: submission.value.email,
        },
      },
    );

    if (isMutationError(startEmailSignup)) {
      const result = submission.reply({
        formErrors: [startEmailSignup.error.message],
      });

      return data({ result }, { status: 500 });
    }

    const verifySession = await verifySessionStorage.getSession(
      request.headers.get('cookie'),
    );

    verifySession.set(
      SESSION_KEY_VERIFY_TRANSACTION_ID,
      startEmailSignup.transactionID,
    );

    const verifyURL = new URL(`${getDomainURL(request)}${Routes.VerifyOTP}`);

    verifyURL.searchParams.set(QueryParam.Type, VerificationType.Onboarding);
    verifyURL.searchParams.set(QueryParam.Target, submission.value.email);

    return redirect(verifyURL.toString(), {
      headers: {
        'Set-Cookie': await verifySessionStorage.commitSession(verifySession),
      },
    });
  } catch (error) {
    // TODO(#16): capture error
    console.error('error', error);
  }

  const result = submission.reply({
    formErrors: ['Something went wrong'],
  });

  return data({ result }, { status: 500 });
}

export const meta: Route.MetaFunction = () => {
  return [{ title: 'Signup' }];
};

export function Signup({ actionData }: Route.ComponentProps) {
  const isFormPending = useIsFormPending();

  const [form, fields] = useForm({
    constraint: getZodConstraint(SignupFormSchema),
    id: 'signup-form',
    lastResult: actionData?.result,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: SignupFormSchema });
    },
    shouldRevalidate: 'onBlur',
  });

  const submitButtonStatus = isFormPending
    ? StatusButton.Status.Pending
    : StatusButton.Status.Idle;

  return (
    <main>
      <Form method="POST" {...getFormProps(form)}>
        <HoneypotInputs />
        <Field
          errors={fields.email.errors ?? []}
          inputProps={{
            ...getInputProps(fields.email, { type: 'email' }),
            autoComplete: 'email',
            autoFocus: true,
          }}
          labelProps={{ children: 'Email', htmlFor: fields.email.id }}
        />
        <FormErrorList errors={form.errors ?? []} id={form.errorId} />
        <StatusButton
          disabled={isFormPending}
          status={submitButtonStatus}
          type="submit"
        >
          Signup
        </StatusButton>
      </Form>
    </main>
  );
}

export function ErrorBoundary() {
  return <RouteErrorBoundary />;
}

export default Signup;
