import path from 'path';
import Express from 'express';
import { apiProxy } from './apiProxy';
import { router } from './prefetch';

const app = Express();

app.use(
  Express.static(path.join(process.cwd(), 'build'), {
    setHeaders(res, path, stat) {
      res.setHeader(
        'Cache-Control',
        'private, max-age=31536000, must-revalidate',
      );
    },
  }),
);

/** API 호출은 $root/server(nestjs)에서 처리. */
app.use('/api', apiProxy);

/** 이외 요청은 렌더링 처리. */
app.use(router);

app.listen(3000, () => {
  console.log('start on 3000');
});
