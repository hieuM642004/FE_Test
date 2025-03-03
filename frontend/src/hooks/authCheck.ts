'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '@/store/authSlice';
import {jwtDecode} from 'jwt-decode';
import { User } from '@/types/auth.types';
import { getCookies } from 'cookies-next';

export function useAuthCheck() {
  const dispatch = useDispatch();

  useEffect(() => {
    const cookies = getCookies() as { [key: string]: string }; // Ép kiểu cho client-side
    const accessToken = cookies.accessToken as string | undefined;
    const refreshToken = cookies.refreshToken as string | undefined;

    if (accessToken && refreshToken) {
      try {
        const decodedUser = jwtDecode<User>(accessToken);
        dispatch(loginSuccess({ accessToken, refreshToken, user: decodedUser }));
      } catch (error) {
        console.error('Invalid token:', error);
      }
    }
  }, [dispatch]);
}