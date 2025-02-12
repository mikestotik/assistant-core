export interface AppConfig {
  name: string;
  description: string;
  version: string;
}


export interface ServerSslConfig {
  ca: string;
  key: string;
  cert: string;
}


export interface ServerApiConfig {
  globalPrefix: string;
  version: string;
}


export interface ServerCorsConfig {
  origin: string[];
}


export interface ServerUploadsConfig {
  maxSize: string;
}


export interface ServerConfig {
  host: string;
  port: number;
  ssl: ServerSslConfig;
  api: ServerApiConfig;
  cors: ServerCorsConfig;
  uploads: ServerUploadsConfig;
}


export interface MongoConfig {
  protocol: string;
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
}


export interface LangChainConfig {
  apiKey: string;
}


export interface OpenAiConfig {
  apiKey: string;
}


export interface AuthTokenConfig {
  secret: string;
  ttl: string;
}


export interface AuthJwtConfig {
  access: AuthTokenConfig;
  refresh: AuthTokenConfig;
}


export interface AuthConfig {
  jwt: AuthJwtConfig;
}


export interface CryptoConfig {
  saltOrRounds: number;
  secret: string;
}


export interface MailAuthConfig {
  type: 'LOGIN';
  user: string;
  pass: string;
}


export interface MailConfig {
  host: string;
  port: number;
  secure: boolean;
  debug: boolean;
  logger: boolean;
  auth: MailAuthConfig;
}


export interface PushVapidConfig {
  subject: string;
  public: string;
  private: string;
}


export interface PushConfig {
  vapid: PushVapidConfig;
}


export interface GoogleConfig {
  clientId: string;
  clientSecret: string;
  redirectUrl: string;
  callbackUrl: string;
  apiUrl: string;
  apiKey: string;
  scope: string[];
  accessToken: string;
  refreshToken: string;
}


export interface TelegramConfig {
  token: string;
}


export interface GitHubConfig {
  token: string;
}


export interface ClientConfig {
  web: {
    url: string;
    confirmation: string;
    updatePassword: string;
    ssoRedirectRoute: string;
  };
}


export interface DatabaseConfigOptions {
  type: 'postgres' | 'mysql';
  url: string;
  name: string;
  host: string;
  port: number;
  username: string;
  password: string;
  dropSchema: boolean;
  logging: boolean;
  synchronize: boolean;
  maxConnections: number;
  ssl: {
    enabled: boolean;
    rejectUnauthorized: boolean;
    ca: string;
    key: string;
    cert: string;
    url: string;
  };
}