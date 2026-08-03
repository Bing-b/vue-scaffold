import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ElMessage } from 'element-plus';
import { ResultEnum } from '@/enums/https';
import useUserStore from '@/store/modules/user';

type ResponseData<T = any> = {
  code: number;
  message?: string;
  data: T;
};

interface BinaryRequestConfig extends AxiosRequestConfig {
  responseType: 'blob';
}

class HttpResponseError extends Error {
  public response: AxiosResponse<ResponseData>;

  constructor(response: AxiosResponse<ResponseData>, message?: string) {
    super(message);
    this.response = response;
  }
}

export const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 60000,
  headers: { 'Content-Type': 'application/json' },
});

service.interceptors.request.use(
  (config) => {
    const { token } = useUserStore();
    if (token) {
      const $token = token.startsWith('Bearer') ? token : `Bearer ${token}`;
      config.headers.Authorization = $token;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

function requestService(config: BinaryRequestConfig): Promise<Blob>;
function requestService<T>(config: AxiosRequestConfig): Promise<T>;
function requestService<T>(config: AxiosRequestConfig): Promise<T | Blob> {
  return service
    .request<ResponseData<T> | Blob>(config)
    .then((resData): T | Blob => {
      const { data } = resData;

      if (config.responseType === 'blob' && data instanceof Blob) {
        return data;
      }

      if ((data as ResponseData<T>)?.code !== ResultEnum.SUCCESS) {
        return Promise.reject(new HttpResponseError(resData as any)) as any;
      }
      return (data as ResponseData<T>).data;
    })
    .catch((e: AxiosError) => {
      const { response } = e;
      if (!response) {
        return Promise.reject(e);
      }
      const { message, code } = response!.data as any;

      if (code === ResultEnum.UNCERTIFIED) {
        const { token } = useUserStore();
        if (token) {
          ElMessage.error({
            message: '登录已过期，请重新登录',
            grouping: true,
          });
        }
        useUserStore().clear();
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
      } else if (message) {
        ElMessage.error({
          grouping: true,
          message,
        });
      }

      return Promise.reject(e);
    });
}

export default requestService;
