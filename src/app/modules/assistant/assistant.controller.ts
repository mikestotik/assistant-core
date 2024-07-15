import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { AccessTokenGuard } from '../../core/auth/guards/token.guard';
import { TokenPayload } from '../../decor/token.decorator';
import { JwtPayload } from '../../interfaces/jwt.interface';
import { AssistantDTO, CreateAssistantDTO, UpdateAssistantDTO } from './assistant.dto';
import { AssistantService } from './assistant.service';


@UseGuards(AccessTokenGuard)
@Controller('assistant')
export class AssistantController {

  constructor(
    private readonly assistantService: AssistantService) {
  }


  @Post()
  async create(@Body() dto: CreateAssistantDTO, @TokenPayload() payload: JwtPayload) {
    return this.assistantService.create(dto, payload.sub)
      .then(value => plainToInstance(AssistantDTO, value));
  }


  @Get()
  async findAll(@TokenPayload() payload: JwtPayload) {
    return this.assistantService.findAll(payload.sub)
      .then(value => plainToInstance(AssistantDTO, value));
  }


  @Get(':id')
  async findOne(@Param('id') id: string, @TokenPayload() payload: JwtPayload) {
    return this.assistantService.findOne(id, payload.sub)
      .then(value => plainToInstance(AssistantDTO, value));
  }


  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateAssistantDTO, @TokenPayload() payload: JwtPayload) {
    return this.assistantService.update(id, dto, payload.sub)
      .then(value => plainToInstance(AssistantDTO, value));
  }


  @Delete(':id')
  async remove(@Param('id') id: string, @TokenPayload() payload: JwtPayload) {
    return this.assistantService.remove(id, payload.sub);
  }
}
