import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Inject, Logger } from "@nestjs/common";
import { CustomLoggerService } from "../logger/logger.service";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    constructor(@Inject(CustomLoggerService) private readonly logger: CustomLoggerService) {}

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        const status = 
            exception instanceof HttpException
                ?   exception.getStatus()
                :   HttpStatus.INTERNAL_SERVER_ERROR;

        const errorResponse = {
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: (exception instanceof HttpException) ? exception.message : 'Internal server error'
        };

        this.logger.error(`HTTP Status: ${status} Error Message: ${JSON.stringify(errorResponse)}`, exception instanceof Error ? exception.stack : '');

        response.status(status).json(errorResponse);
    };
};