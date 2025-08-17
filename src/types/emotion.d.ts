import '@emotion/react';
import { ThemeType } from '../app/theme';

declare module '@emotion/react' {
  /* eslint-disable @typescript-eslint/no-empty-object-type */
  export interface Theme extends ThemeType {}
}
