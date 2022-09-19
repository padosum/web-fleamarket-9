import Axios, { AxiosRequestConfig } from 'axios';

const axios = Axios.create();

export const http = {
  get: function get<Response = unknown>(url: string) {
    return axios.get<Response>(url).then((res) => res.data);
  },
  post: function post<Request = any, Response = unknown>(
    url: string,
    data?: Request,
    configure?: AxiosRequestConfig,
  ) {
    return axios.post<Response>(url, data, configure).then((res) => res.data);
  },
  put: function put<Request = any, Response = unknown>(
    url: string,
    data?: Request,
  ) {
    return axios.put<Response>(url, data).then((res) => res.data);
  },
  patch: function patch<Request = any, Response = unknown>(
    url: string,
    data?: Request,
  ) {
    return axios.patch<Response>(url, data).then((res) => res.data);
  },
  delete: function _delete<Response = unknown>(url: string) {
    return axios.delete<Response>(url).then((res) => res.data);
  },
};
