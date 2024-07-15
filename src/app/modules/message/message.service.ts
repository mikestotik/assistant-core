import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { FindManyOptions, FindOneOptions, QueryFailedError, Repository } from 'typeorm';
import { MessageEntity } from '../../entities/message.entity';
import { LLMStreamEventType } from '../../enums/llm.enum';
import { MessageType } from '../../enums/message.enum';
import { WebSocketEvent } from '../../enums/ws.enum';
import { WebsocketGateway } from '../../websocket/websocket.gateway';
import { AiService } from '../ai/ai.service';
import {
  ChatAssistantMessageChunkDTO,
  ChatAssistantMessageEndDTO,
  ChatAssistantMessageStartDTO,
  CreateMessageDTO,
  MessageDTO,
  UpdateMessageDTO
} from './message.dto';
import { HumanMessage, AIMessage } from "@langchain/core/messages"

@Injectable()
export class MessageService {

  constructor(
    @InjectRepository(MessageEntity)
    private readonly repository: Repository<MessageEntity>,
    private readonly aiService: AiService,
    private readonly websocket: WebsocketGateway) {
  }


  async create(dto: CreateMessageDTO, ownerId: number) {
    try {
      const message = await this.repository.save({
        ...dto, owner: { id: ownerId }
      });
      if (message.type === MessageType.USER) {
        this.onUserMessageCreated(message).finally();
      }
      return message;
    } catch (e) {
      const error = e as QueryFailedError;
      throw new InternalServerErrorException(error.message);
    }
  }


  async findAll(assistantId: string, ownerId: number) {
    const options: FindManyOptions<MessageEntity> = {
      where: {
        owner: { id: ownerId },
        assistant: { id: assistantId }
      }
    };
    try {
      await this.aiService.initAgentForAssistant(assistantId);
      return await this.repository.find(options);
    } catch (e) {
      const error = e as QueryFailedError;
      throw new InternalServerErrorException(error.message);
    }
  }


  findOne(id: number, ownerId: number) {
    const options: FindOneOptions<MessageEntity> = {
      where: { id, owner: { id: ownerId } }
    };
    try {
      return this.repository.findOne(options);
    } catch (e) {
      const error = e as QueryFailedError;
      throw new InternalServerErrorException(error.message);
    }
  }


  async update(id: number, dto: UpdateMessageDTO, ownerId: number) {
    const exists = await this.repository.exists({
      where: { id, owner: { id: ownerId } }
    });
    if (!exists) {
      throw new BadRequestException(`Entity with ID: ${ id } does not exist or you are not its owner`);
    }
    try {
      return this.repository.update(id, dto)
        .then(() => this.findOne(id, ownerId));
    } catch (e) {
      const error = e as QueryFailedError;
      throw new InternalServerErrorException(error.message);
    }
  }


  async remove(id: number, ownerId: number) {
    try {
      await this.repository.delete({ id, owner: { id: ownerId } });
    } catch (e) {
      const error = e as QueryFailedError;
      throw new InternalServerErrorException(error.message);
    }
  }


  private async onUserMessageCreated(userMessage: MessageEntity) {
    const executor = this.aiService.getExecutor(userMessage.assistant.id);
    if (!executor) return;

    let history = await this.findAll(userMessage.assistant.id, userMessage.owner.id);
    history = history.filter(i => i.id === userMessage.id);

    const eventStream = executor.streamEvents({
      input: userMessage.text,
      chat_history: history.map(msg => {
        if (msg.type === MessageType.USER) {
          return new HumanMessage(msg.text)
        } else {
          return new AIMessage(msg.text)
        }
      })
    }, {
      version: 'v1',
      configurable: {
        sessionId: userMessage.assistant.id
      }
    });

    let assistantMessage: MessageEntity;

    for await (const event of eventStream) {
      if (event.event === LLMStreamEventType.on_llm_start) {
        assistantMessage = await this.create({
          type: MessageType.ASSISTANT,
          assistant: userMessage.assistant,
          text: '',
          meta: {
            runId: event.run_id
          }
        }, userMessage.owner.id);

        this.websocket.emit<ChatAssistantMessageStartDTO>(userMessage.owner.id, WebSocketEvent.AssistantChatMessageStart, {
          assistantId: userMessage.assistant.id,
          message: plainToInstance(MessageDTO, assistantMessage)
        });
      }

      if (event.event === LLMStreamEventType.on_llm_stream) {
        this.websocket.emit<ChatAssistantMessageChunkDTO>(userMessage.owner.id, WebSocketEvent.AssistantChatMessageChunk, {
          assistantId: userMessage.assistant.id,
          event
        });
      }

      if (event.event === LLMStreamEventType.on_llm_end) {
        const finalAssistantMessage = event.data.output.generations[0];
        const chunk = finalAssistantMessage[0];

        await this.update(assistantMessage!.id, {
          text: chunk.text
        }, userMessage.owner.id);

        this.websocket.emit<ChatAssistantMessageEndDTO>(userMessage.owner.id, WebSocketEvent.AssistantChatMessageEnd, {
          assistantId: userMessage.assistant.id,
          event
        });
      }
    }
  }
}
