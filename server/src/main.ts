import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger';
import * as passport from 'passport';
import { WsAdapter } from '@nestjs/platform-ws';

const session = require('express-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  app.use(
    session({
      secret: 'secret',
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.useWebSocketAdapter(new WsAdapter(app));
  app.use(passport.initialize());
  app.use(passport.session());

  app.setGlobalPrefix('api');
  setupSwagger(app);
  await app.listen(4000);
}
bootstrap();
