import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { stellarConfig } from "./config/stellar.config";
import { databaseConfig, redisConfig } from "./config/database.config";
import { appConfig } from "./config/app.config";
import { StellarConfigService } from "./config/stellar.service";

@Module({
  imports: [
    // Configuration Module - loads environment variables
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, stellarConfig, databaseConfig, redisConfig],
      envFilePath: ".env",
      cache: true,
    }),
    // Database Module
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres" as const,
        host: configService.get("database.host"),
        port: configService.get("database.port"),
        username: configService.get("database.username"),
        password: configService.get("database.password"),
        database: configService.get("database.database"),
        synchronize: configService.get("database.synchronize"),
        logging: configService.get("database.logging"),
        entities: ["dist/**/*.entity{.ts,.js}"],
        migrations: ["dist/migrations/*{.ts,.js}"],
        subscribers: ["dist/subscribers/*{.ts,.js}"],
        ssl: configService.get("database.ssl"),
      }),
    }),
  ],
  providers: [StellarConfigService],
  exports: [StellarConfigService],
})
export class AppModule {}
