import validator from 'validator';
import Decimal from 'decimal.js';
import {addDays, differenceInDays, isFuture} from 'date-fns';

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
   * A validator for various ids, which should be positive integers
   * @param id the id to be validated.
   */
  static idValidator(id: any) {
    if (typeof id === 'number' && Number.isInteger(id) && id > 0) {
      return true;
    } else if (typeof id === 'string') {
      return validator.isInt(id, {gt: -1});
    } else {
      return false;
    }
  }

  /**
   * Checks that years of experience is a decimal number with max two digits at either side of the decimal marker,
   * which should be a period: '.'
   * @param yoe representation of years of experience.
   */
  static yearsOfExperienceValidator(yoe: any) {
    if (
      typeof yoe === 'object' &&
      yoe instanceof Decimal &&
      yoe.decimalPlaces() <= 2 &&
      yoe.d[0] > -1 &&
      yoe.d[0] < 100
    ) {
      return true;
    }
    if (typeof yoe === 'string') {
      if (validator.isInt(yoe, {gt: -1, lt: 100})) {
        return true;
      }
      if (validator.isDecimal(yoe, {decimal_digits: '0,2'})) {
        const splitString = yoe.split('.');
        return (
          splitString.length === 2 &&
          validator.isInt(splitString[0], {gt: -1, lt: 100})
        );
      }
    }

    return false;
  }

  /**
   * Checks that a specific availability period are valid dates from now into the future, in chronological order
   * with at least a full day difference as dates or strings.
   * @param fromDate the first date
   * @param toDate the second date
   */
  static availabilityPeriodValidator(fromDate: any, toDate: any) {
    if (
      typeof fromDate === 'object' &&
      fromDate instanceof Date &&
      typeof toDate === 'object' &&
      toDate instanceof Date
    ) {
      return (
        fromDate < toDate &&
        differenceInDays(fromDate, toDate) &&
        isFuture(addDays(fromDate, 1))
      );
    } else if (typeof fromDate === 'string' && typeof toDate === 'string') {
      return (
        validator.isDate(fromDate) &&
        validator.isDate(toDate) &&
        validator.isBefore(fromDate, toDate) &&
        isFuture(addDays(new Date(fromDate), 1))
      );
    }
    return false;
  }

  /**
   * Checks an availability list. That it is a non-empty array containing objects with the correct shape
   * ,that there are no duplicate periods and that each period is valid.
   * However, it is not checked if there are overlapping periods as this is a non-vital and expensive check.
   * @param availabilities the availability list to be checked.
   * @param req the express request, unused parameter only used to allow the third parameter to work correctly in express-validator
   * @param inIntegration a boolean stating if the request is coming from the integration layer, in order to run some
   * extra tests.
   */
  static availabilityListValidator(
    availabilities: any[],
    req: any,
    inIntegration?: boolean
  ) {
    if (!Array.isArray(availabilities)) {
      throw new Error('Must be an array');
    }
    if (availabilities.length === 0) {
      throw new Error('Must contain at least one entry');
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

      if (inIntegration && !Validators.objectPersonIdValidator(availability)) {
        throw new Error(
          `item ${i} must be a object including a positive integer person id (in integration)`
        );
      }

      if (
        !Validators.availabilityPeriodValidator(
          availability.fromDate,
          availability.toDate
        )
      ) {
        throw new Error(
          `period ${i} must contain valid non-past and chronological dates`
        );
      }

      const periodKey = `${availability.fromDate}-${availability.toDate}`;
      if (periods.has(periodKey)) {
        throw new Error(
          `item ${i} must have a unique period, with different start date`
        );
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
   * @param req the express request, unused parameter only used to allow the third parameter to work correctly in express-validator
   * @param inIntegration a boolean stating if the request is coming from the integration layer, in order to run some
   * extra tests.
   */
  static competenceListValidator(
    competencies: any[],
    req: any,
    inIntegration?: boolean
  ) {
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

      if (inIntegration && !Validators.objectPersonIdValidator(item)) {
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
  static objectPersonIdValidator(data: any) {
    if (typeof data !== 'object' || !data.personId) {
      return false;
    }
    return Validators.idValidator(data.personId);
  }

  /**
   * This method checks that object is superficially like a competenceProfilesDTO, used as a pre-check before going
   * further with validations.
   * @param data the object to check.
   */
  static competenceProfilesObjValidator(data: any) {
    return !(typeof data !== 'object' || !data.competenceProfiles);
  }

  /**
   * This method checks that object is superficially like a availabilitiesDTO, used as a pre-check before going
   * further with validations.
   * @param data the object to check.
   */
  static availabilitiesObjValidator(data: any) {
    return !(typeof data !== 'object' || !data.availabilities);
  }
}

export {Validators};
