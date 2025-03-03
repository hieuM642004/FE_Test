export interface LoginResponse {
  accessToken: any;
  refreshToken: any;
  success?: boolean;
  message?: string;
  token?: string;
  error?: string;
  statusCode?: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface User {
  id: string;
  username: string;
  avatar: string;
  email: string;
  role: string;
  slug: string;
  followers: string[];
  iat: number;
  exp: number;
}
