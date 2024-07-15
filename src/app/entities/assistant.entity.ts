import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ModelOptions } from '../modules/ai/ai.interface';
import { UserEntity } from './user.entity';


@Entity('assistant')
export class AssistantEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column({ nullable: true })
  desc?: string;

  @Column({ nullable: true })
  logo?: string;

  @Column({ type: 'json', nullable: true })
  model?: ModelOptions;

  @CreateDateColumn({ type: 'timestamptz' })
  created?: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated?: Date;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  owner!: UserEntity;
}
