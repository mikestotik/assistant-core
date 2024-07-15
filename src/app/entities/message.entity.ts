import { Column, Entity, ManyToOne } from 'typeorm';
import { DBEntity } from '../../database/database.dto';
import { MessageType } from '../enums/message.enum';
import { MessageMeta } from '../modules/message/message.interface';
import { AssistantEntity } from './assistant.entity';
import { UserEntity } from './user.entity';


@Entity('messages')
export class MessageEntity extends DBEntity {
  @Column({ type: 'text' })
  text!: string;

  @Column({ type: 'enum', enum: MessageType, default: MessageType.USER })
  type!: MessageType;

  @Column({ type: 'json', nullable: true })
  meta?: MessageMeta;

  @ManyToOne(() => AssistantEntity, { onDelete: 'CASCADE' })
  assistant!: AssistantEntity;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  owner!: UserEntity;
}
