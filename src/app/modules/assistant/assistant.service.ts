import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, QueryFailedError, Repository } from 'typeorm';
import { AssistantEntity } from '../../entities/assistant.entity';
import { CreateAssistantDTO, UpdateAssistantDTO } from './assistant.dto';


@Injectable()
export class AssistantService {


  constructor(
    @InjectRepository(AssistantEntity)
    private readonly repository: Repository<AssistantEntity>) {
  }


  create(dto: CreateAssistantDTO, ownerId: number) {
    try {
      return this.repository.save({ ...dto, owner: { id: ownerId } });
    } catch (e) {
      const error = e as QueryFailedError;
      throw new InternalServerErrorException(error.message);
    }
  }


  async findAll(ownerId: number) {
    const options: FindManyOptions<AssistantEntity> = {
      where: { owner: { id: ownerId } }
    };
    try {
      return await this.repository.find(options);
    } catch (e) {
      const error = e as QueryFailedError;
      throw new InternalServerErrorException(error.message);
    }
  }


  findOne(id: string, ownerId: number) {
    const options: FindOneOptions<AssistantEntity> = {
      where: { id, owner: { id: ownerId } }
    };
    try {
      return this.repository.findOne(options);
    } catch (e) {
      const error = e as QueryFailedError;
      throw new InternalServerErrorException(error.message);
    }
  }


  async update(id: string, dto: UpdateAssistantDTO, ownerId: number) {
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


  async remove(id: string, ownerId: number) {
    try {
      await this.repository.delete({ id, owner: { id: ownerId } });
    } catch (e) {
      const error = e as QueryFailedError;
      throw new InternalServerErrorException(error.message);
    }
  }
}
