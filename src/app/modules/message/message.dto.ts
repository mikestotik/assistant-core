import { StreamEvent } from '@langchain/core/tracers/log_stream';
import { PartialType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import { DBEntityDTO } from '../../../database/database.dto';
import { MessageType } from '../../enums/message.enum';
import { MessageMeta } from './message.interface';


export class CreateMessageDTO {
  text: string;
  type?: MessageType;
  meta?: MessageMeta;

  @Transform(({ value }) => ({ id: value }))
  assistant: { id: string };
}


export class UpdateMessageDTO extends PartialType(CreateMessageDTO) {}


export class MessageDTO {
  id: string;
  text: string;
  type: MessageType;
  created: Date;
  updated: Date;

  @Transform(({ value }) => value ? value.id : null)
  assistant: DBEntityDTO;
}


export interface ChatAssistantMessageChunkDTO {
  assistantId: string;
  event: StreamEvent;
}


export interface ChatAssistantMessageStartDTO {
  assistantId: string;
  message: MessageDTO;
}


export interface ChatAssistantMessageEndDTO {
  assistantId: string;
  event?: StreamEvent;
}
