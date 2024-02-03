import {ConflictError} from '../utilities/custom_errors';
import * as express from 'express';

class ErrorHandler {
  constructor(private responseHandler: any) {}

  asyncErrorWrapper(fn: any) {
    return async (req: any, res: any, next: any) => {
      try {
        await fn(req, res, next);
      } catch (err) {
        next(err);
      }
    };
  }

  handleError(err: any, req: any, res: any, next: any) {
    //this should be called last by next
    let httpStatusCode;
    let message;
    if (err instanceof ConflictError) {
      httpStatusCode = 409; //Conflict
      message = 'That user already exists';
    } else {
      httpStatusCode = 500; //Internal server error
    }
    this.responseHandler.sendHttpResponse(res, httpStatusCode, message, true);
    return;
  }
}

export {ErrorHandler};
