'use client';

import * as React from 'react';
import { Button, ButtonProps } from '@mui/material';
import { useTheme, SxProps, Theme } from '@mui/material/styles';
import Link from 'next/link';

interface PrimaryButtonProps extends Omit<ButtonProps, 'component' | 'variant'> {
  href?: string;
  hoverColor?: string;
  customVariant?: 'primary' | 'secondary';
  loading?: boolean; 
}

export default function PrimaryButton({
  children,
  href,
  hoverColor = 'secondary.main',
  customVariant = 'primary',
  loading = false, 
  sx,
  ...props
}: PrimaryButtonProps) {
  const theme = useTheme();

  const buttonProps = href
    ? { component: Link, href }
    : { component: 'button' };

  const getButtonStyle = (): SxProps<Theme> => {
    if (customVariant === 'secondary') {
      return {
        bgcolor: theme.palette.text.secondary,
        color: '#ffffff',
        borderRadius: 2,
        padding: '12px 24px',
        '&:hover': {
          bgcolor: theme.palette.text.secondary,
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          color: '#ffffff',
        },
        textTransform: 'none',
        '&:disabled': {
          color: theme.palette.text.secondary,
          cursor: 'not-allowed',
        },
      };
    }
    return {
      color: theme.palette.text.primary,
      '&:hover': {
        color: hoverColor,
      },
      textTransform: 'none',
      '&:disabled': {
        color: theme.palette.text.secondary,
        cursor: 'not-allowed',
      },
    };
  };

  return (
    <Button
      {...buttonProps}
      sx={[getButtonStyle(), ...(Array.isArray(sx) ? sx : [sx])]}
      disabled={props.disabled || loading} 
      {...props}
    >
      {loading ? 'Loading...' : children}
    </Button>
  );
}