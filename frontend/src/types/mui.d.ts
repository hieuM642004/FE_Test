// types/mui.d.ts
import { TypeBackground } from '@mui/material/styles/createPalette';

declare module '@mui/material/styles' {
  interface TypeBackground extends TypeBackground {
    light?: string;
    dark?: string;
    accent?: string;
  }

  interface Palette {
    background: TypeBackground;
  }

  interface PaletteOptions {
    background?: Partial<TypeBackground>;
  }
}