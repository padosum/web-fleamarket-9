import { AxiosRequestConfig } from 'axios';
import { instance } from './instance';

const request = async (option: AxiosRequestConfig) => {
  const {
    method = 'GET',
    url,
    params,
    headers = { 'Content-Type': 'application/json' },
    data,
  } = option;

  const config = {
    url,
    method,
    params,
    headers,
    data,
  };

  return instance(config);
};

const get = async <T>(option: AxiosRequestConfig): Promise<T> => {
  const response = await request({ ...option });
  return response.data;
};

const post = async <T>(option: AxiosRequestConfig): Promise<T> => {
  const response = await request({ method: 'POST', ...option });
  return response.data;
};

const put = async <T>(option: AxiosRequestConfig): Promise<T> => {
  const response = await request({ method: 'PUT', ...option });
  return response.data;
};

const patch = async <T>(option: AxiosRequestConfig): Promise<T> => {
  const response = await request({ method: 'PATCH', ...option });
  return response.data;
};

const deleteReqeust = async <T>(option: AxiosRequestConfig): Promise<T> => {
  const response = await request({ method: 'DELETE', ...option });
  return response.data;
};

const Api = {
  get,
  post,
  put,
  patch,
  delete: deleteReqeust,
};

export default Api;
