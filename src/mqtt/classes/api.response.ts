import { ApiProperty } from '@nestjs/swagger';
import { HttpStatus, Injectable } from '@nestjs/common';

const DEFAULT_SUCCESS_MESSAGE = 'success';

@Injectable()
export class ApiResponse<T> {
  constructor(data?: T, message?: string, errors?: T, code = HttpStatus.OK) {
    this.code = code;
    this.message = message || DEFAULT_SUCCESS_MESSAGE;
    this.data = data;
    this.errors = errors;
  }

  @ApiProperty()
  public code: number;

  @ApiProperty()
  public message: string;

  @ApiProperty()
  public data: T;

  @ApiProperty()
  public errors: T;
}
