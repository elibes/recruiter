export class ConflictError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}
export class ValidationSanitizationError extends Error {
  static message: string;
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}
