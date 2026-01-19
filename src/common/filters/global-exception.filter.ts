import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from "@nestjs/common";
import { Request, Response } from "express";

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = "Internal server error";
    let details: any = {};

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === "object") {
        message = (exceptionResponse as any).message || exception.message;
        details = exceptionResponse;
      } else {
        message = exceptionResponse;
      }
    } else if (exception instanceof Error) {
      message = exception.message;
      details = { name: exception.name, stack: exception.stack };
    }

    this.logger.error(`[${request.method}] ${request.url}`, exception);

    response.status(status).json({
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
      ...(process.env.NODE_ENV === "development" && { details }),
    });
  }
}
