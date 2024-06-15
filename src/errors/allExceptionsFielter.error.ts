import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from "@nestjs/common";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    private readonly logger = new Logger(AllExceptionsFilter.name);

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