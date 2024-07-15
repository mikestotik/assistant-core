import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '../../config/config.module';
import { AssistantEntity } from '../../entities/assistant.entity';
import { WebsocketModule } from '../../websocket/websocket.module';
import { AssistantController } from './assistant.controller';
import { AssistantService } from './assistant.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([ AssistantEntity ]),
    ConfigModule,
    WebsocketModule
  ],
  controllers: [
    AssistantController
  ],
  providers: [
    AssistantService
  ],
  exports: [
    TypeOrmModule,
    WebsocketModule,
    ConfigModule
  ]
})
export class AssistantModule {}
