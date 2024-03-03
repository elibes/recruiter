/**
 * @fileoverview This file defines some custom errors that can be thrown by the application.
 */

/**
 * This error shall be thrown when there is some data conflict that has occurred.
 */
export class ConflictError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ConflictError';
  }
}

/**
 * This error shall be thrown when a sanitization rule or validation check fails.
 */
export class CustomValidationError extends Error {
  static message: string;
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

/**
 * Represents an error when a requested user is not found in the database.
 * This error is thrown during operations where user existence is mandatory,
 * such as authentication or user data retrieval.
 *
 * @extends Error
 */
export class UserNotFoundError extends Error {
  static message: string;
  constructor(message: string) {
    super(message);
    this.name = 'UserNotFoundError';
  }
}

/**
 * Represents an error when a user's provided login password does not match the stored password.
 * This error is thrown during login operations when the authentication process fails due to incorrect credentials.
 *
 * @extends Error
 */
export class LoginPasswordNotMatchError extends Error {
  static message: string;
  constructor(message: string) {
    super(message);
    this.name = 'LoginPasswordNotMatchError';
  }
}

/**
 * This error shall be thrown when an operation would violate an authorization rule
 * (like, a user trying to do recruiter operations)
 */
export class AuthorizationError extends Error {
  static message: string;
  constructor(message: string) {
    super(message);
    this.name = 'AuthorizationError';
  }
}

/**
 * This error shall be thrown when a request does not match a valid route.
 */
export class InvalidRouteError extends Error {
  static message: string;
  constructor(message: string) {
    super(message);
    this.name = 'InvalidRouteError';
  }
}

/**
 * This error shall be thrown when a request does not match a valid route.
 */
export class MissingHeaderError extends Error {
  static message: string;
  constructor(message: string) {
    super(message);
    this.name = 'MissingHeaderError';
  }
}

