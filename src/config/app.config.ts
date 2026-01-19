import { registerAs } from "@nestjs/config";

export const appConfig = registerAs("app", () => ({
  nodeEnv: process.env.NODE_ENV || "development",
  port: parseInt(process.env.PORT || "3000", 10),
  host: process.env.HOST || "0.0.0.0",
  apiPrefix: process.env.API_PREFIX || "/api",
  apiVersion: process.env.API_VERSION || "v1",
  cors: {
    origin: process.env.CORS_ORIGIN?.split(",") || ["http://localhost:3000"],
    credentials: process.env.CORS_CREDENTIALS !== "false",
  },
  logger: {
    level: process.env.LOG_LEVEL || "debug",
    transport:
      process.env.NODE_ENV === "production"
        ? undefined
        : {
            target: "pino-pretty",
            options: {
              colorize: true,
              singleLine: false,
              translateTime: "SYS:standard",
              ignore: "pid,hostname",
            },
          },
  },
}));
