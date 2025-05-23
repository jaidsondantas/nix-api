import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupportUserModule } from './modules/support-user/support-user.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { MessagingModule } from './modules/messaging/messaging.module';
import { CacheModule } from '@nestjs/common/cache';
import * as redisStore from 'cache-manager-redis-store';
import { TenantModule } from './modules/tenant/tenant.module';
import { ChurchModule } from './modules/church/church.module';
import { UserModule } from './modules/user/user.module';
import { MemberModule } from './modules/member/member.module';
import { DepartmentModule } from './modules/department/department.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      ttl: 0,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    AuthModule,
    SupportUserModule,
    MessagingModule,
    TenantModule,
    ChurchModule,
    UserModule,
    MemberModule,
    DepartmentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
