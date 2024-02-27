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
    } else return !!value;
  }

  /**
   * This is a default sanitizer that can be used for most data.
   * If the data is not a string then it will attempt to convert it.
   * It then removes some unnecessary and unwanted characters and returns a string with these removed
   * @param value the data to be validated
   */
  static defaultSanitizer(value: any) {
    if (typeof value !== 'string') {
      value = value.toString();
    }
    value = validator.trim(value);
    value = validator.stripLow(value, false);
    value = validator.unescape(value);
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
   * This sanitizer automatically capitalize the first letter of a name and lower cases the rest.
   * @param s a name.
   */
  static nameSanitizer(s: string) {
    const firstLetter = s.charAt(0).toUpperCase();
    const rest = s.slice(1).toLowerCase();
    return firstLetter + rest;
  }

  /**
   * This is a validator to run initially on a name string in order to be safe in running nameSanitizer if it passes.
   * @param s the name to check.
   */
  static namePreValidator(s: string) {
    return validator.isAlpha(s);
  }

  /**
   * This validator check that a name is fully correct, that it is a string with only letters and the first letter is
   * uppercase and the rest are not.
   * @param s the name string to check.
   */
  static nameValidator(s: string) {
    if (Validators.namePreValidator(s)) {
      if (
        validator.isUppercase(s.charAt(0)) &&
        !validator.isUppercase(s.slice(1))
      ) {
        return true;
      }
    }
    return false;
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

  /**
   * A validator for the various ids, which should be positive integers
   * @param s a string representing the id to be validated
   */
  static idValidator(s: string) {
    return validator.isInt(s, {gt: -1});
  }

  /**
   * Checks that years of experience is a decimal number with max two digits at either side of the decimal marker,
   * which should be a period: '.'
   * @param s a string representation of years of experience.
   */
  static yearsOfExperienceValidator(s: string) {
    if (validator.isDecimal(s, {decimal_digits: '0,2'})) {
      const splitString = s.split('.');
      return (
        splitString.length === 2 &&
        validator.isInt(splitString[0], {gt: -1, lt: 100})
      );
    }
    return false;
  }

  /**
   * Checks that a specific availability period are valid dates in chronological order.
   * @param fromDate the first date as a string.
   * @param toDate the second date as a string.
   */
  static availabilityPeriodValidator(fromDate: string, toDate: string) {
    if (validator.isDate(fromDate) && validator.isDate(toDate)) {
      return validator.isBefore(fromDate, toDate);
    }
    return false;
  }

  /**
   * Checks an availability list, that it is a non-empty array containing objects with the correct shape
   * ,that there are no duplicate periods and that each period is valid.
   * @param availabilities the availability list to be checked.
   */
  static availabilityListValidator(availabilities: any[]) {
    if (!Array.isArray(availabilities)) {
      throw new Error('Must be an array');
    }
    if (availabilities.length === 0) {
      throw new Error('Must contain at least on entry');
    }

    const periods = new Set();
    let i = 0;
    for (const availability of availabilities) {
      if (
        typeof availability !== 'object' ||
        !availability.fromDate ||
        !availability.toDate
      ) {
        throw new Error(
          `item ${i} must be a object including from and to dates`
        );
      }

      if (
        !Validators.availabilityPeriodValidator(
          availability.fromDate,
          availability.toDate
        )
      ) {
        throw new Error(
          `period ${i} must contain valid dates in chronological order`
        );
      }

      const periodKey = `${availability.fromDate}-${availability.toDate}`;
      if (periods.has(periodKey)) {
        throw new Error(`item ${i} must have a unique period`);
      }
      periods.add(periodKey);
      i++;
    }
    return true;
  }

  /**
   * This validator checks that the entire list of competencies is valid by checking that each id is unique,
   * that the objects within are well-formed and that the values within are valid.
   * However, a user may not have any competencies so an empty list is valid.
   * @param competencies the competence list
   * @param inIntegration A boolean to tell the function if the validation is being run from the integration layer.
   */
  static competenceListValidator(competencies: any[], inIntegration = false) {
    if (!Array.isArray(competencies)) {
      throw new Error('must be an array');
    }

    const uniqueCheck = new Set();
    let i = 0;
    for (const item of competencies) {
      if (
        typeof competencies !== 'object' ||
        !item.competenceId ||
        !item.yearsOfExperience
      ) {
        throw new Error(
          `item ${i} must be a object including competence id and years of experience`
        );
      }

      if (inIntegration && !Validators.competencePersonIdValidator(item)) {
        throw new Error(
          `item ${i} must be include a positive integer person id (in integration)`
        );
      }

      if (!Validators.idValidator(item.competenceId)) {
        throw new Error(`item ${i} must have a positive integer competenceId`);
      }
      if (!Validators.yearsOfExperienceValidator(item.yearsOfExperience)) {
        throw new Error(
          `item ${i} must have a positive years of experience with the integer and fraction parts being of max 2 digits each'`
        );
      }
      if (uniqueCheck.has(item.competenceId)) {
        throw new Error(`item ${i} must have a unique competenceId`);
      }
      uniqueCheck.add(item.competenceId);
      i++;
    }
    return true;
  }

  /**
   * This validator checks that object has a valid person id, to be used in the integration layer.
   * @param data a competence object
   */
  static competencePersonIdValidator(data: any) {
    if (typeof data !== 'object' || !data.personId) {
      return false;
    }
    return Validators.idValidator(data.personId);
  }

  /**
   * This method checks that object is superficially like a competenceProfileDTO, used as a pre-check before going
   * further with validations.
   * @param data the object to check.
   */
  static competenceProfileObjValidator(data: any) {
    return !(typeof data !== 'object' || !data.competenceProfiles);
  }
}

export {Validators};
