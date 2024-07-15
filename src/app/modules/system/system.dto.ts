import { ArrayNotEmpty, IsArray, IsBoolean, IsString } from "class-validator";


export class ModelRun {
  @IsBoolean()
  runnable: boolean;

  @IsString()
  command: string;

  @IsArray()
  @ArrayNotEmpty()
  parameters: string[];
}


export class ModelResponse {
  message: string;
  run?: ModelRun;
}


export interface CommandResponseMetadata {
  executionTime: number;
  // ...
}


export interface CommandResponse {
  success: boolean;
  output?: string;
  error?: string;
  metadata?: CommandResponseMetadata;
}