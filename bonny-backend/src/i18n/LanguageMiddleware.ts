import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LanguageMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    const acceptLanguage = req.headers['accept-language'] || 'en';

    if (acceptLanguage == 'de') req['language'] = 'de';
    else req['language'] = 'en';
    next();
  }
}
