'use client';

import * as React from 'react';
import {
  Box,
  TextField,
  Typography,
  Container,
  Alert,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { z } from 'zod';
import PrimaryButton from '@/components/ui/PrimaryButton/PrimaryButton';
import { apiAuthService } from '@/services/apiAuthService';
import { useDispatch } from 'react-redux';
import { loginSuccess, loginFailure } from '@/store/authSlice';
import { useRouter } from 'next/navigation';
import {jwtDecode} from 'jwt-decode';
import { User } from '@/types/auth.types';
import { setCookie } from 'cookies-next'; 

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(1, 'Password is required').min(6, 'Password must be at least 6 characters'),
});

type FormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const router = useRouter();
  const [formData, setFormData] = React.useState<FormData>({
    email: '',
    password: '',
  });
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      loginSchema.parse(formData);
      const response = await apiAuthService.login(formData);
      if (response.accessToken && response.refreshToken) {
        const decodedUser = jwtDecode<User>(response.accessToken);

        setCookie('accessToken', response.accessToken, {
          expires: new Date(Date.now() + 1 * 60 * 60 * 1000), 
          path: '/',
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
        });
        setCookie('refreshToken', response.refreshToken, {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), 
          path: '/',
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
        });

        dispatch(loginSuccess({ ...response, user: decodedUser })); 
        setError(null);
        router.push('/'); 
      } else {
        dispatch(loginFailure('Login failed'));
        setError('Login failed');
      }
    } catch (err) {
      dispatch(loginFailure('Email or password is incorrect'));
      setError('Email or password is incorrect');
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = !formData.email || !formData.password;

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          my: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          bgcolor: 'background.paper',
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" sx={{ mb: 3 }}>
          Login
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formData.email}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <PrimaryButton
            type="submit"
            hoverColor="text.secondary"
            customVariant="primary"
            fullWidth
            loading={loading}
            disabled={isFormValid}
            sx={{ mt: 2, py: 1.5, bgcolor: 'primary.main', color: 'text.secondary' }}
          >
            Sign In
          </PrimaryButton>
        </Box>
      </Box>
    </Container>
  );
}