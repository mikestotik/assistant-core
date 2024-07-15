import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { JwtModule } from '@nestjs/jwt';
import { ScheduleModule } from '@nestjs/schedule';
import { DatabaseModule } from '../database/database.module';
import { ConfigModule } from './config/config.module';
import { AccountModule } from './core/account/account.module';
import { AuthModule } from './core/auth/auth.module';
import { ConfirmModule } from './core/confirm/confirm.module';
import { GoogleModule } from './core/google/google.module';
import { HealthModule } from './core/health/health.module';
import { MailerModule } from './core/mailer/mailer.module';
import { RoleModule } from './core/role/role.module';
import { SettingsModule } from './core/settings/settings.module';
import { UserModule } from './core/user/user.module';
import { AiModule } from './modules/ai/ai.module';
import { AssistantModule } from './modules/assistant/assistant.module';
import { MessageModule } from './modules/message/message.module';
import { WebsocketModule } from './websocket/websocket.module';


@Module({
  imports: [
    JwtModule.register({
      global: true
    }),
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot({
      wildcard: true,
      delimiter: '.'
    }),
    ConfigModule,
    DatabaseModule,

    // Core
    AccountModule,
    AuthModule,
    ConfirmModule,
    MailerModule,
    GoogleModule,
    HealthModule,
    RoleModule,
    SettingsModule,
    UserModule,

    // Main
    AssistantModule,
    MessageModule,
    AiModule,
    WebsocketModule
  ],
  controllers: []
})
export class AppModule {}
