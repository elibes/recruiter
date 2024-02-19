import validator from 'validator';

/**
 * This class stores validation functions to be used across the application.
 */
class Validators {
  /**
   * This is a default validator that can be used for most string data,
   * it checks that the data is not empty and that it is not too long.
   * @param value the data to be validated
   */
  static defaultValidator(value: any) {
    if (typeof value === 'string') {
      return !validator.isEmpty(value) && validator.isLength(value, {max: 255});
    } else {
      return true;
    }
  }

  /**
   * This is a default sanitizer that can be used for most string data,
   * it removes some unnecessary and unwanted characters and returns a string with these removed
   * @param value the data to be validated
   */
  static defaultSanitizer(value: any) {
    if (typeof value === 'string') {
      value = validator.trim(value);
      value = validator.stripLow(value);
      value = validator.escape(value);
    }
    return value;
  }

  /**
   * This is a validator used for plain text passwords. It checks that the password is strong enough.
   * @param s the plain text password string to check.
   */
  static passwordValidator(s: string) {
    return validator.isStrongPassword(s, {
      minLength: 8,
      minLowercase: 0,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    });
  }

  /**
   * This is the validator for usernames, it checks that it is alphanumeric and not too long.
   * @param s the username string to check.
   */
  static userNameValidator(s: string) {
    return validator.isAlphanumeric(s) && validator.isLength(s, {max: 30});
  }

  /**
   * This is a name validator, it does nothing currently.
   * @param s the name to check.
   */
  static nameValidator(s: string) {
    return true;
  }

  /**
   * This validator checks that a JWT exist and that the string conforms to the JWT format, to be used in the api layer
   * with request that requires a JWT.
   * (but does not check validity of contents it)
   * @param s the JWT string.
   */
  static jsonWebTokenValidator(s: string) {
    return !validator.isEmpty(s) && validator.isJWT(s);
  }

  /**
   * This validator checks that an email string is of valid format.
   * @param s the email check
   */
  static emailValidator(s: string) {
    return validator.isEmail(s);
  }

  /**
   * This validator check that a swedish personal number string is of approximately valid format.
   * The regex check that it is on the form 8 number, then an - , and then four number.
   * Then the first eight digits are checked to verify that they represent a valid date.
   * @param s
   */
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
