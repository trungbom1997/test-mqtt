import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { classToPlain } from 'class-transformer';
import { ApiResponse } from './classes/api.response';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<unknown>,
  ): Observable<unknown> {
    return next.handle().pipe(
      map((data: ApiResponse<unknown>) => {
        // set http status for response
        if (data?.code) {
          context.switchToHttp().getResponse().status(data?.code);
        }
        return classToPlain(data);
      }),
    );
  }
}
