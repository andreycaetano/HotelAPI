import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class ErrorMiddleware implements NestMiddleware {
    private readonly logger = new Logger(ErrorMiddleware.name);

    use(req: Request, res: Response, next: NextFunction) {
        res.on('finish', () => {
            if (res.statusCode >= 400) {
                this.logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
            };
        });
        next();
    };
};