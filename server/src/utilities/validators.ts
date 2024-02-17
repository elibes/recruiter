import validator from 'validator';

/**
 * This class stores validation functions to be used across the application.
 */
class Validators {
  static defaultValidator(s: string) {
    return !validator.isEmpty(s) && validator.isLength(s, {max: 255});
  }
  static defaultSanitizer(s: string) {
    s = validator.trim(s);
    s = validator.escape(s);
    s = validator.stripLow(s);
    return s;
  }

  static passwordValidator(s: string) {
    return validator.isStrongPassword(s, {
      minLength: 8,
      minLowercase: 0,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    });
  }

  static userNameValidator(s: string) {
    return validator.isAlphanumeric(s) && validator.isLength(s, {max: 30});
  }

  static nameValidator(s: string) {
    return true;
  }

  static emailValidator(s: string) {
    return validator.isEmail(s);
  }

  static personalNumberValidator(s: string) {
    const pattern = /^\d{8}-\d{4}$/;
    if (validator.matches(s, pattern)) {
      const date =
        s.substring(0, 4) + '-' + s.substring(4, 6) + '-' + s.substring(6, 8);
      return validator.isDate(date);
    }
    return false;
  }
}

export {Validators};
