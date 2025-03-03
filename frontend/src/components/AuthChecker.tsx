'use client';

import { useAuthCheck } from '@/hooks/authCheck';

export default function AuthChecker() {
  useAuthCheck(); 
  return null; 
}