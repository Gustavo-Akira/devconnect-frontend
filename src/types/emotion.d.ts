import '@emotion/react';
import { ThemeType } from '../app/theme';

declare module '@emotion/react' {
  export interface Theme extends ThemeType {}
}
