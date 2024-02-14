import validator from 'validator';
import {CustomValidationError} from './custom_errors';

/**
 * This class stores validation functions to be used across the application.
 */
class Validators {
  static defaultValidator(s: string) {
    return !validator.isEmpty(s) && validator.isLength(s, {max: 255});
  }

  static passwordValidator(s: string) {
    return validator.isLength(s, {min: 8});
  }

  static userNameValidator(s: string) {
    return true;
  }

  static emailValidator(s: string) {
    return validator.isEmail(s);
  }

  static defaultSanitizer(s: string) {
    s = validator.trim(s);
    s = validator.escape(s);
    s = validator.stripLow(s);
    return s;
  }
}

export {Validators};
