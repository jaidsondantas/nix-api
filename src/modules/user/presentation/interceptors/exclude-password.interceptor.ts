import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ExcludePasswordInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (Array.isArray(data)) {
          return data.map((item) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { passwordHash, ...rest } = item;
            return rest;
          });
        }
        if (data && typeof data === 'object') {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { passwordHash, ...rest } = data;
          return rest;
        }
        return data;
      }),
    );
  }
}
