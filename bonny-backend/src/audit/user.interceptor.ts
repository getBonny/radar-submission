import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class UserInterceptor implements NestInterceptor {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const user = request.user; // Hier wird der Benutzer aus dem Request-Objekt extrahiert

    const queryRunner = this.dataSource.createQueryRunner();
    queryRunner.data = {
      ...queryRunner.data,
      user,
    };

    return next.handle().pipe(
      tap(() => {
        queryRunner.release();
      }),
    );
  }
}
