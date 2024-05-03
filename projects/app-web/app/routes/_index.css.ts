import { style } from '@vanilla-extract/css';

export const container = style({
  margin: '0 auto',
  maxWidth: '1140px',
  padding: '0 24px',
  textAlign: 'center',
});

export const heroSection = style({
  alignItems: 'center',
  display: 'flex',
  flexFlow: 'column',
  justifyContent: 'center',
  paddingBottom: '32px',
  paddingTop: '32px',
});

export const brand = style({
  marginBottom: '32px',
});

export const heroDescriptionContainer = style({
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
});

export const heroDescriptionIcon = style({
  height: '192px',
  marginBottom: '32px',
  marginLeft: '-16px',
  width: '192px',
});

export const heroDescription = style({
  color: '#76a5ce',
  fontFamily: 'Karla, sans-serif',
  fontSize: '36px',
  fontWeight: 600,
});

export const authSection = style({
  alignItems: 'center',
  display: 'flex',
  flexFlow: 'column',
  justifyContent: 'center',
  paddingBottom: '32px',
  paddingTop: '32px',
});

export const signUpButton = style({
  marginBottom: '16px',
});

export const logInButton = style({
  marginBottom: '16px',
});

export const existingAccountText = style({
  color: '#ddefff',
  fontFamily: 'Karla, sans-serif',
  fontSize: '16px',
  fontWeight: 400,
  marginBottom: '16px',
});
