import * as styles from './button.css';

type Props = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'transparent';
};

export function Button(props: Props) {
  return (
    <button
      className={styles.buttonVariants[props.variant ?? 'primary']}
      {...props}
    />
  );
}