import { Module } from '@nestjs/common';
import { WebsocketModule } from '../../websocket/websocket.module';
import { AiService } from './ai.service';


@Module({
  imports: [
    WebsocketModule
  ],
  providers: [
    AiService
  ],
  exports: [
    AiService,
    WebsocketModule
  ]
})
export class AiModule {}
