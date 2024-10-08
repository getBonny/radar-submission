// src/auth/interceptors/ownership.interceptor.ts
import {
  CallHandler,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../auth.user';
import { Role } from '../auth.roles';

@Injectable()
export class OwnershipInterceptor implements NestInterceptor {
  constructor(private readonly userIdProperty: string) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { user }: { user: User } = request;

    return next.handle().pipe(
      map((entity) => {
        // Wenn keine Entität zurückgegeben wird, nicht eingreifen
        if (!entity) {
          return entity;
        }

        // Überprüfe die Berechtigung basierend auf der Rolle und der Eigentümer-ID
        const entityUserId = entity[this.userIdProperty];
        if (
          user.role === Role.AppUser &&
          (entityUserId === undefined || entityUserId !== user.id)
        ) {
          throw new ForbiddenException('Access to this entity is not allowed');
        }

        return entity;
      }),
    );
  }
}
