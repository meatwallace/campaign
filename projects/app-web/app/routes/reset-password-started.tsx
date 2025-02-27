import { type Route } from './+types/reset-password-started.ts';
import { requireAnonymous } from '~/utils/require-anonymous.server.ts';
import { Card } from '~/components/card.tsx';
import { Link } from '~/components/link.tsx';
import { Routes } from '~/types.ts';
import { RouteErrorBoundary } from '~/components/route-error-boundary.tsx';

export async function loader({ request }: Route.LoaderArgs) {
  await requireAnonymous(request);

  const url = new URL(request.url);
  const email = url.searchParams.get('email');

  return { email };
}

export default function ResetPasswordStarted() {
  return (
    <Card>
      <Card.Header>
        <Card.Title>Check Your Email</Card.Title>
      </Card.Header>

      <Card.Body>
        <p className="mb-4">
          If an account exists with that email address, we&apos;ve sent you
          instructions on how to reset your password.
        </p>

        <p className="mb-4">
          The email contains a verification code that you&apos;ll need to enter
          to continue with the password reset process.
        </p>

        <p className="text-sm text-muted-foreground">
          Can&apos;t find the email? Check your spam folder or{' '}
          <Link to={Routes.ForgotPassword}>try requesting another one</Link>.
        </p>
      </Card.Body>
    </Card>
  );
}

export function ErrorBoundary() {
  return <RouteErrorBoundary />;
}
