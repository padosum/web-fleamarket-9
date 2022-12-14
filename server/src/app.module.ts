import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { ItemModule } from './item/item.module';
import { LocationModule } from './location/location.module';
import { ChatModule } from './chat/chat.module';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';
import { ImageModule } from './image/image.module';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'production'
          ? '.production.env'
          : '.development.env',
    }),
    UsersModule,
    AuthModule,
    CategoryModule,
    ItemModule,
    LocationModule,
    ChatModule,
    DbModule,
    ImageModule,
  ],
  controllers: [],
  providers: [AppService, ChatGateway],
})
export class AppModule {}
