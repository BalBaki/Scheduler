import { Status } from '@/enums';

export type ResultWithError<K extends string> = (K extends ''
    ? {}
    : {
          [key in K]: boolean;
      }) & {
    error?: string;
};

export type BaseError = string;
export type Result<Ok, Err> =
    | {
          status: Status.Ok;
          data: Ok;
      }
    | {
          status: Status.Err;
          err: Err;
      };
export type AsyncResult<Ok, Err> = Promise<Result<Ok, Err>>;
