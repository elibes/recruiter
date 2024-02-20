import {
  AuthorizationError,
  ConflictError,
  InvalidRouteError,
  MissingHeaderError,
} from './custom_errors';
import {CustomValidationError} from './custom_errors';
import {ResponseHandler} from '../api/response_handler';
import {NextFunction, Request, Response} from 'express';
import {JsonWebTokenError, TokenExpiredError} from 'jsonwebtoken';
import {
  ConnectionError,
  ValidationError,
  BaseError,
  DatabaseError,
} from 'sequelize';
/**
 * This class acts as a centralized error handler for the entire application.
 * It does/shall:
 * Log comprehensive error data,
 * Standardize error responses,
 * Decide what to do with the error: attempting recovery when appropriate/possible or
 * composing informative error messages, masking sensitive or technical information.
 *
 */
class ErrorHandler {
  constructor(private responseHandler: ResponseHandler) {}

  /**
   * This is a middleware to handle errors.
   *
   * It will receive any error thrown on a route automatically
   * in @param err, set the appropriate http status code and then construct an errorMessage,
   * to then be sent to response handler.
   *
   * eslint is disabled to not complain about unused req and next, which are mandatory in an express
   * error handling middleware.
   *
   * @param err the error to be handled
   * @param req the express request
   * @param res the express response
   * @param next the next middleware to be called
   * @todo Add full error logging here later.
   */
  // eslint-disable-next-line
  handleError(err: Error, req: Request, res: Response, next: NextFunction) {
    console.log(err);
    let httpStatusCode;
    const errorMessage: ErrorMessage = {message: 'none'};

    switch (err.constructor) {
      case ConflictError:
        httpStatusCode = 409;
        errorMessage.message = 'There was a data conflict';
        break;

      case CustomValidationError:
        httpStatusCode = 400;
        errorMessage.message = err.message;
        break;

      case JsonWebTokenError:
        httpStatusCode = 401;
        errorMessage.message = 'Unauthorized';
        break;

      case TokenExpiredError:
        httpStatusCode = 401;
        errorMessage.message = 'Unauthorized';
        break;

      case ValidationError:
        httpStatusCode = 500;
        errorMessage.message = 'Data is invalid';
        break;

      case InvalidRouteError:
        httpStatusCode = 404;
        errorMessage.message = 'That route does not exist';
        errorMessage.code = 'INVALID_ROUTE_ERROR';
        break;

      case MissingHeaderError:
        httpStatusCode = 400;
        errorMessage.message = err.message;
        errorMessage.code = 'MISSING_HEADER_ERROR';
        break;

      case AuthorizationError:
        httpStatusCode = 403;
        errorMessage.message = 'You are not authorized to perform this action';
        errorMessage.code = 'FORBIDDEN_ERROR';
        break;

      case ConnectionError:
        httpStatusCode = 503;
        errorMessage.message = 'Service is currently unavailable';
        errorMessage.code = 'INTERNAL_ERROR';
        break;

      case DatabaseError:
        httpStatusCode = 500;
        errorMessage.message = 'There was an error handling your request';
        errorMessage.code = 'INTERNAL_ERROR';
        break;

      case BaseError:
        httpStatusCode = 500;
        errorMessage.message = 'Server error';
        errorMessage.code = 'INTERNAL_ERROR';
        break;

      default:
        console.log(err);
        httpStatusCode = 500;
        errorMessage.message = 'Server error';
        break;
    }
    this.responseHandler.sendHttpResponse(
      res,
      httpStatusCode,
      errorMessage,
      true
    );
    return;
  }
}

/**
 * This interface defines a standard error message to be sent as a response to the client.
 */
export interface ErrorMessage {
  message: string;
  code?: string;
  details?: string;
}

export {ErrorHandler};
