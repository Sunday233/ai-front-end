import axios, {
  type AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
  type Method,
} from "axios";

export interface ApiEnvelope<T> {
  code: number;
  msg: string;
  data: T;
}

const isApiEnvelope = <T>(payload: unknown): payload is ApiEnvelope<T> => {
  return (
    typeof payload === "object" &&
    payload !== null &&
    "code" in payload &&
    "msg" in payload &&
    "data" in payload
  );
};

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "/backend",
  timeout: 15000,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

const unwrapResponse = <T>(response: AxiosResponse<ApiEnvelope<T> | T>): T => {
  const payload = response.data;

  if (isApiEnvelope<T>(payload)) {
    if (payload.code !== 0) {
      throw new Error(payload.msg);
    }

    return payload.data;
  }

  return payload;
};

const request = async <T>(
  method: Method,
  url: string,
  config?: AxiosRequestConfig,
) => {
  try {
    const response = await axiosInstance.request<ApiEnvelope<T> | T>({
      ...config,
      method,
      url,
    });

    return unwrapResponse<T>(response);
  } catch (error) {
    return Promise.reject(error as AxiosError);
  }
};

export const httpClient = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    request<T>("GET", url, config),
  post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    request<T>("POST", url, { ...config, data }),
  put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    request<T>("PUT", url, { ...config, data }),
  patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    request<T>("PATCH", url, { ...config, data }),
  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    request<T>("DELETE", url, config),
};
