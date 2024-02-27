import {NextFunction, Request, Response} from 'express';
import {validationResult} from 'express-validator';
import {
  CustomValidationError,
  MissingHeaderError,
} from '../utilities/custom_errors';
import {Validators} from '../utilities/validators';

/**
 * @fileoverview This file constructs various express validator schemas to be used by different apis.
 * It also contains helper functions to handle validation in the api layer.
 */

/**
 * This middleware is intended to be used before the routes to validate headers. The reason for this
 * is that if a request without content-length header reaches a post route then an empty response is immediately sent
 * and the connection closed by express, preventing our standardized error response to be sent.
 * @param req the express request
 * @param res the express response
 * @param next the next middleware.
 */
export function headerPreValidatorMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const errorList: string[] = [];
  if (req.method === 'POST') {
    if (!req.headers['content-length']) {
      errorList.push('The content length header is required for this request');
    }
    if (
      !req.headers['content-type'] ||
      req.headers['content-type'] !== 'application/json'
    ) {
      errorList.push(
        'The content type header is required to be application/json for this request'
      );
    }
  } else if (req.method === 'GET') {
  }
  if (errorList.length !== 0) {
    throw new MissingHeaderError(errorList.join(', '));
  }
  next();
  return;
}

/**
 * This function retrieves any errors that the express validator middleware has found, formats this and throws an error
 * for handling.
 * @param req the express request
 */
export function handleExpressValidatorErrors(req: Request) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new CustomValidationError(
      errors
        .array()
        .map(err => {
          if (err.type === 'field') {
            return err.path + ' ' + err.msg;
          } else {
            return err.msg;
          }
        })
        .join('::')
    );
  }
}

/**
 * This is a schema that does some sanitization and validation on all fields (nested too) of the response body.
 * If it does not pass this initial check then it quits immediately.
 */
const baseValidationSchema: any = {
  in: ['body'],
  defaultValidator: {
    custom: Validators.defaultValidator,
    bail: true,
    errorMessage: 'Must not be empty or must be shorter than 255 characters',
  },
  defaultSanitizer: {
    customSanitizer: Validators.defaultSanitizer,
  },
};

const nameSchema: any = {
  preNameValidator: {
    custom: Validators.namePreValidator,
    errorMessage: 'can only contain letters',
  },
  nameSanitizer: {
    customSanitizer: Validators.nameSanitizer,
    optional: true,
  },
};

/**
 * This schema is for validating all the form data associated with a user registration.
 */
export const userRegistrationValidationSchema: any = {
  email: {
    ...baseValidationSchema,
    emailValidator: {
      custom: Validators.emailValidator,
      errorMessage: 'Must be a valid email',
    },
  },
  personalNumber: {
    ...baseValidationSchema,
    personalNumberValidator: {
      custom: Validators.personalNumberValidator,
      errorMessage: 'Must be a valid personal number',
    },
  },
  firstName: {
    ...baseValidationSchema,
    ...nameSchema,
  },
  lastName: {
    ...baseValidationSchema,
    ...nameSchema,
  },
  password: {
    ...baseValidationSchema,
    passwordValidator: {
      custom: Validators.passwordValidator,
      errorMessage:
        'Must be stronger: 8 or more characters and at least one each of number and symbol and capital letter',
    },
  },
  userName: {
    ...baseValidationSchema,
    userNameValidator: {
      custom: Validators.userNameValidator,
      errorMessage: 'Must be shorter than 30 characters',
    },
  },
};

/**
 * This schema is for validating all the form data associated with a job application submission request.
 */
export const applicationValidationSchema: any = {
  recruiterAuth: {
    jsonWebTokenValidator: {
      custom: Validators.jsonWebTokenValidator,
      bail: true,
      errorMessage: 'must be a valid JWT string',
    },
  },
  competencies: {
    competenciesValidator: {
      custom: Validators.competenceListValidator,
      bail: true,
    },
  },
  availabilities: {
    availabilitiesValidator: {
      custom: Validators.availabilityListValidator,
      bail: true,
    },
  },
};

/**
 * This schema is for validating a login request.
 */
export const userLoginValidator: any = {
  userName: {
    ...baseValidationSchema,
  },
  password: {
    ...baseValidationSchema,
  },
};
