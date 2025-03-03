// src/config/api.ts
import env from "./env";

const buildBaseUrl = (): string => {
  const protocol = env.NEXT_PUBLIC_API_PROTOCOL || "http"; 
  const host = env.NEXT_PUBLIC_API_HOST || "localhost"; 
  const port = env.NEXT_PUBLIC_API_PORT ? `:${env.NEXT_PUBLIC_API_PORT}` : ""; 

  return `${protocol}://${host}${port}`;
};

const apiConfig = {
  baseUrl: buildBaseUrl(), 
  timeout: Number(env.NEXT_PUBLIC_API_TIMEOUT) || 10000, 
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  retry: {
    attempts: Number(env.NEXT_PUBLIC_API_RETRY_ATTEMPTS) || 3, 
    delay: Number(env.NEXT_PUBLIC_API_RETRY_DELAY) || 1000, 
  },
};

export default apiConfig;
