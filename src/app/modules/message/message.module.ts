import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '../../config/config.module';
import { MessageEntity } from '../../entities/message.entity';
import { WebsocketModule } from '../../websocket/websocket.module';
import { AiModule } from '../ai/ai.module';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([ MessageEntity ]),
    ConfigModule,
    AiModule,
    WebsocketModule
  ],
  controllers: [
    MessageController
  ],
  providers: [
    MessageService
  ],
  exports: [
    TypeOrmModule,
    ConfigModule,
    WebsocketModule
  ]
})
export class MessageModule {}
