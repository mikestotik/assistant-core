import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import {
  AppConfig,
  AuthConfig,
  ClientConfig,
  CryptoConfig, DatabaseConfigOptions,
  GitHubConfig,
  GoogleConfig,
  LangChainConfig,
  MailConfig,
  MongoConfig,
  OpenAiConfig,
  PushConfig,
  ServerConfig,
  TelegramConfig
} from './config.interface';


@Injectable()
export class ConfigService {

  public readonly app: AppConfig;
  public readonly server: ServerConfig;
  public readonly database: DatabaseConfigOptions;
  public readonly mongo: MongoConfig;
  public readonly auth: AuthConfig;
  public readonly crypto: CryptoConfig;
  public readonly mail: MailConfig;
  public readonly push: PushConfig;

  public readonly google: GoogleConfig;
  public readonly langchain: LangChainConfig;
  public readonly openai: OpenAiConfig;
  public readonly telegram: TelegramConfig;
  public readonly github: GitHubConfig;
  public readonly client: ClientConfig;


  constructor(config: NestConfigService) {

    this.app = config.get('app') as AppConfig;
    this.server = config.get('server') as ServerConfig;
    this.database = config.get('database') as DatabaseConfigOptions;
    this.mongo = config.get('mongo') as MongoConfig;
    this.auth = config.get('auth') as AuthConfig;
    this.crypto = config.get('crypto') as CryptoConfig;
    this.mail = config.get('mail') as MailConfig;
    this.push = config.get('push') as PushConfig;

    this.langchain = config.get('langchain') as LangChainConfig;
    this.openai = config.get('openai') as OpenAiConfig;
    this.google = config.get('google') as GoogleConfig;
    this.telegram = config.get('telegram') as TelegramConfig;
    this.github = config.get('github') as GitHubConfig;
    this.client = config.get('client') as ClientConfig;
  }
}
