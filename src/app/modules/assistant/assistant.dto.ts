import { PartialType } from '@nestjs/mapped-types';
import { ModelOptions } from '../ai/ai.interface';


export class CreateAssistantDTO {
  title!: string;
  desc?: string;
  logo?: string;
  model?: ModelOptions;
}


export class UpdateAssistantDTO extends PartialType(CreateAssistantDTO) {}


export class AssistantDTO {
  id: string;
  title!: string;
  desc?: string;
  logo?: string;
  created!: Date;
  updated!: Date;
}
