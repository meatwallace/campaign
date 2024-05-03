import { style } from '@vanilla-extract/css';

export const container = style({
  alignItems: 'center',
  display: 'flex',
  height: '48px',
  justifyContent: 'space-between',
  padding: '4px 16px',
});

export const userName = style({
  color: '#ddefff',
  fontFamily: 'Karla, sans-serif',
  fontSize: '16px',
  marginLeft: 'auto',
  marginRight: '32px',
});
