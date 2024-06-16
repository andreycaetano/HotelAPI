import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { ValidationError } from "class-validator";
import { timestamp } from "rxjs";

@Catch(HttpException)
export class ValidationExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        const statusCode = exception.getStatus();
        const exceptionResponse = exception.getResponse();

        let errorResponse;

        if (Array.isArray(exceptionResponse['message']) && exceptionResponse['message'][0] instanceof ValidationError) {
            const validationErrors = exceptionResponse['message'] as ValidationError[];
            const messages = validationErrors.map(err => Object.values(err.constraints).join(', ')).join(', ');

            errorResponse = {
                statusCode,
                timestamp: new Date().toISOString(),
                path: request.url,
                error: messages
            };
        } else {
            errorResponse = {
                statusCode,
                timestamp: new Date().toISOString(),
                path: request.url,
                error: exceptionResponse
            };
        };
        response.status(statusCode).json(errorResponse)
    };
};