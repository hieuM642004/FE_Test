import axios, { AxiosInstance, AxiosError } from 'axios';
import apiConfig from '../config/api';

interface ApiProductResponse {
  data: {
    data: any[]; 
    totalPages: number;
    currentPage: number;
    totalItems: number;
  };
  statusCode: number;
  message: string;
}
interface ApiSingleProductResponse {
  data: any;
  statusCode: number;
  message: string;
}
interface ApiSingleTopicResponse {
  data: any;
  statusCode: number;
  message: string;
}
interface ApiTopicResponse {
  data: any[];
  statusCode: number;
  message: string;
}
export class ApiProductService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: apiConfig.baseUrl,
      timeout: apiConfig.timeout,
      headers: apiConfig.headers,
    });
  }

  async getProducts(params: { page?: number; limit?: number; searchQuery?: string } = {}): Promise<ApiProductResponse> {
    try {
      const response = await this.axiosInstance.get<ApiProductResponse>('/products', {
        params: {
          page: params.page || 1,
          limit: params.limit || 10,
          search: params.searchQuery || undefined,
        },
      });

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorData = error.response?.data as { statusCode?: number; message?: string };
        throw new Error(errorData?.message || 'Failed to fetch products');
      }
      throw new Error('An error occurred while fetching products');
    }
  }
  async getProductBySlug(slug: string): Promise<ApiSingleProductResponse> {
    try {
      const response = await this.axiosInstance.get<ApiSingleProductResponse>(`/products/${slug}`);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorData = error.response?.data as { statusCode?: number; message?: string };
        throw new Error(errorData?.message || 'Failed to fetch product');
      }
      throw new Error('An error occurred while fetching product');
    }
  }
  async getTopics(): Promise<ApiTopicResponse> {
    try {
      const response = await this.axiosInstance.get<ApiTopicResponse>('/topics');
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorData = error.response?.data as { statusCode?: number; message?: string };
        throw new Error(errorData?.message || 'Failed to fetch topics');
      }
      throw new Error('An error occurred while fetching topics');
    }
  }
  async getTopicBySlug(slug: string): Promise<ApiSingleTopicResponse> {
    try {
      const response = await this.axiosInstance.get<ApiSingleTopicResponse>(`/topics/${slug}`);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorData = error.response?.data as { statusCode?: number; message?: string };
        throw new Error(errorData?.message || 'Failed to fetch topic');
      }
      throw new Error('An error occurred while fetching topic');
    }
  }
}

export const apiProductService = new ApiProductService();