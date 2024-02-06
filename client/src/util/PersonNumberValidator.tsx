/**
 * Interface representing the result of a person number validation test.
 * @interface
 */
export interface PersonNumberTestResult {
  message: string;
  isValid: boolean;
}

/**
 * Validates a Swedish personal identity number (personnummer) based on a specific regex pattern.
 *
 * The function checks if the person number meets the pattern of YYYYMMDD-XXXX where
 * YYYY is the year, MM is the month, DD is the day, and XXXX is a four-digit control number.
 *
 * @param {string} pnr - The person number to be validated.
 * @returns {PersonNumberTestResult} The result of the person number validation, including a message and a validity flag.
 */
export const isPersonNumberValid = (pnr: string): PersonNumberTestResult => {
  const personNumberTestResult: PersonNumberTestResult = {
    message: '',
    isValid: true,
  };

  const personNumberPattern =
    /^\d{4}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])-\d{4}$/;

  if (!personNumberPattern.test(pnr)) {
    personNumberTestResult.message =
      'Person number must be in the format YYYYMMDD-XXXX';
    personNumberTestResult.isValid = false;
  }

  return personNumberTestResult;
};
