'use client';

import * as React from 'react';
import { Typography, TypographyProps } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { SxProps } from '@mui/system';


interface CustomTypographyProps extends TypographyProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'caption' | 'overline';
  color?: string;
  fontSize?: string | number;
  fontWeight?: number | string;
  align?: 'left' | 'center' | 'right' | 'justify' | 'inherit';
  sx?: SxProps;
}

export default function CustomTypography({
  children,
  variant = 'body1', 
  color = 'text.primary', 
  fontSize, 
  fontWeight, 
  align = 'inherit', 
  sx,
  ...props
}: CustomTypographyProps) {
  const theme = useTheme();

  return (
    <Typography
      variant={variant}
      color={color}
      fontSize={fontSize}
      fontWeight={fontWeight}
      align={align}
      sx={{
        fontFamily: theme.typography.fontFamily,
        ...sx, 
      }}
      {...props}
    >
      {children}
    </Typography>
  );
}