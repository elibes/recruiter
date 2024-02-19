import {Request} from 'express';
import {validationResult} from 'express-validator';
import {CustomValidationError} from '../utilities/custom_errors';
import {Validators} from '../utilities/validators';

/**
 * @fileoverview This file constructs various express validator schemas to be used by different apis.
 * It also contains helper functions to handle validation in the api layer.
 */

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
 */
const baseValidationSchema: any = {
  '**': {
    in: ['body'],
    defaultSanitizer: {
      customSanitizer: Validators.defaultSanitizer,
    },
    defaultValidator: {
      custom: Validators.defaultValidator,
      errorMessage: 'Must not be empty or shorter than 255 characters',
    },
  },
};

/**
 * This schema encapsulate shared validation on userName and password for both login and registration of a user.
 */
const userNamePasswordValidationSchema: any = {
  userName: {
    userNameValidator: {
      custom: Validators.userNameValidator,
      errorMessage: 'Must be shorter than 30 characters',
    },
  },
  password: {
    passwordValidator: {
      custom: Validators.passwordValidator,
      errorMessage:
        'Must be stronger: 8 or more characters and at least one each of number and symbol and capital letter',
    },
  },
};

/**
 * This schema is for validating all the form data associated with a user registration.
 */
export const userRegistrationValidationSchema: any = {
  ...baseValidationSchema,
  ...userNamePasswordValidationSchema,
  email: {
    emailValidator: {
      custom: Validators.emailValidator,
      errorMessage: 'Must be a valid email',
    },
  },
  personalNumber: {
    personalNumberValidator: {
      custom: Validators.personalNumberValidator,
      errorMessage: 'Must be a valid personal number',
    },
  },
  firstName: {
    firstNameValidator: {
      custom: Validators.nameValidator,
      errorMessage: 'is invalid',
    },
  },
  lastName: {
    lastNameValidator: {
      custom: Validators.nameValidator,
      errorMessage: 'is invalid',
    },
  },
};

/**
 * This schema is for validating all the form data associated with a job application submission request.
 */
export const applicationValidationSchema: any = {
  ...baseValidationSchema,
  recruiterAuth: {
    jsonWebTokenValidator: {
      custom: Validators.jsonWebTokenValidator,
      errorMessage: 'must be a valid JWT string',
    },
  },
};

/**
 * This schema is for validating a login request.
 */
export const userLoginValidator: any = {
  ...baseValidationSchema,
  ...userNamePasswordValidationSchema,
};
