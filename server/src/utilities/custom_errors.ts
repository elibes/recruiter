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
export class ValidationSanitizationError extends Error {
  static message: string;
  constructor(message: string) {
    super(message);
    this.name = 'ValidationSanitizationError';
  }
}

export class UserNotFoundError extends Error {
  static message: string;
  constructor(message: string) {
    super(message);
    this.name = 'UserNotFoundError';
  }
}

export class LoginPasswordNotMatchError extends Error {
  static message: string;
  constructor(message: string) {
    super(message);
    this.name = 'LoginPasswordNotMatchError';
  }
}

