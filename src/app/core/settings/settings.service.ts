import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import * as webpush from 'web-push';
import { ConfigService } from '../../config/config.service';
import { SettingsEntity } from '../../entities/settings.entity';
import { CreateSettingsDTO, UpdateSettingDTO } from './settings.dto';


@Injectable()
export class SettingsService {


  constructor(
    @InjectRepository(SettingsEntity)
    private readonly settingsRepository: Repository<SettingsEntity>,
    private readonly config: ConfigService) {

    webpush.setVapidDetails(
      this.config.push.vapid.subject,
      this.config.push.vapid.public,
      this.config.push.vapid.private
    );
  }


  public findById(id: number): Promise<SettingsEntity | null> {
    return this.settingsRepository.findOneBy({ id });
  }


  public async findByUserId(ownerId: number): Promise<SettingsEntity | null> {
    const entity = await this.settingsRepository.findOneBy({ owner: { id: ownerId } });
    if (!entity) {
      return this.create({}, ownerId);
    } else {
      return entity;
    }
  }


  public async findByPatreonIntegrationMemberEmail(email: string) {
    const emailToFind = { data: { email } };

    return await this.settingsRepository
      .createQueryBuilder('settings')
      .leftJoinAndSelect('settings.owner', 'owner')
      .where('settings.integrations @> :integration', { integration: JSON.stringify([ emailToFind ]) })
      .getOne();
  }


  public create(dto: CreateSettingsDTO, ownerId: number): Promise<SettingsEntity> {
    return this.settingsRepository.save(
      plainToInstance(SettingsEntity, { ...dto, owner: { id: ownerId } })
    );
  }


  public async updateByOwner(ownerId: number, dto: UpdateSettingDTO) {
    const settings = await this.findByUserId(ownerId);

    if (!settings) {
      throw new NotFoundException('No settings for this user');
    }
    return this.settingsRepository.update(settings.id, dto)
      .then(() => this.findById(settings.id));
  }
}
