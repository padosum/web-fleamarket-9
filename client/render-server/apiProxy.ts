import proxy from 'express-http-proxy';
import { BASE_URL } from './constant';

export const apiProxy = proxy(BASE_URL, {
  proxyReqPathResolver: (req) => '/api' + req.path,
});
