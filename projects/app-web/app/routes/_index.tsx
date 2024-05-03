import { MetaFunction } from '@remix-run/node';
import { Form } from '@remix-run/react';
import { Brand, Button } from '../components';
import * as styles from './_index.css.ts';

export const meta: MetaFunction = () => [
  {
    title: '',
    description: '',
  },
];

export function Index() {
  return (
    <>
      <main className={styles.container}>
        <section className={styles.heroSection}>
          <Brand size="large" className={styles.brand} />
          <img
            alt="Book icon"
            className={styles.heroDescriptionIcon}
            src="/assets/images/icon-book.png"
          />
          <p className={styles.heroDescription}>
            Create immersive worlds and run your tabletop campaigns with ease.
          </p>
        </section>
      </main>
      <section className={styles.authSection}>
        <Form action="/auth/auth0?screen_hint=signup" method="post">
          <Button className={styles.signUpButton}>Sign up</Button>
        </Form>
        <span className={styles.existingAccountText}>
          Already have an account?
        </span>
        <Form action="/auth/auth0" method="post">
          <Button color="transparent" className={styles.logInButton}>
            Log in
          </Button>
        </Form>
      </section>
    </>
  );
}

export default Index;
