import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { AccessTokenGuard } from '../../core/auth/guards/token.guard';
import { TokenPayload } from '../../decor/token.decorator';
import { JwtPayload } from '../../interfaces/jwt.interface';
import { CreateMessageDTO, MessageDTO, UpdateMessageDTO } from './message.dto';
import { MessageService } from './message.service';


@UseGuards(AccessTokenGuard)
@Controller('message')
export class MessageController {

  constructor(
    private readonly messageService: MessageService) {
  }


  @Post()
  async create(@Body() dto: CreateMessageDTO, @TokenPayload() payload: JwtPayload) {
    return this.messageService.create(dto, payload.sub)
      .then(value => plainToInstance(MessageDTO, value));
  }


  @Get()
  async findAll(@Query('assistantId') assistantId: string, @TokenPayload() payload: JwtPayload) {
    return this.messageService.findAll(assistantId, payload.sub)
      .then(value => plainToInstance(MessageDTO, value));
  }


  @Get(':id')
  async findOne(@Param('id') id: string, @TokenPayload() payload: JwtPayload) {
    return this.messageService.findOne(+id, payload.sub)
      .then(value => plainToInstance(MessageDTO, value));
  }


  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateMessageDTO, @TokenPayload() payload: JwtPayload) {
    return this.messageService.update(+id, dto, payload.sub)
      .then(value => plainToInstance(MessageDTO, value));
  }


  @Delete(':id')
  async remove(@Param('id') id: string, @TokenPayload() payload: JwtPayload) {
    return this.messageService.remove(+id, payload.sub);
  }
}
