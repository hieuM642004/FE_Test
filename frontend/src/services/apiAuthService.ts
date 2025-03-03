import axios, { AxiosInstance, AxiosError } from 'axios';
import apiConfig from '../config/api';
import { LoginRequest, LoginResponse } from '@/types/auth.types';

export class ApiAuthService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: apiConfig.baseUrl,
      timeout: apiConfig.timeout,
      headers: apiConfig.headers,
    });

  }

  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await this.axiosInstance.post<LoginResponse>('/auth/login', credentials);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorData = error.response?.data as { statusCode?: number; message?: string };
        if (errorData?.statusCode === 401) {
          throw new Error(errorData.message || 'Invalid email or password');
        }
      }
      throw new Error('An error occurred during login');
    }
  }
}

export const apiAuthService = new ApiAuthService();