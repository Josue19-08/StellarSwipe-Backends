import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { Request, Response } from "express";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();
    const startTime = Date.now();

    const { method, url } = request;

    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - startTime;
        const statusCode = response.statusCode;

        this.logger.debug(`[${method}] ${url} - ${statusCode} - ${duration}ms`);
      }),
    );
  }
}
