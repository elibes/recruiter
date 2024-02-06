/**
 * Interface representing the result of a password validation test.
 * @interface
 */
export interface PasswordTestResult {
  message: string;
  isValid: boolean;
}

/**
 * Validates a password based on specified strength criteria.
 *
 * The function checks if the password meets the minimum length requirement and
 * contains at least one uppercase letter, one lowercase letter, one digit, and one special character.
 *
 * @param {string} password - The password to be validated.
 * @returns {PasswordTestResult} The result of the password validation, including a message and a validity flag.
 */
export const isPasswordValid = (password: string): PasswordTestResult => {
  const passwordTestResult: PasswordTestResult = {
    message: '',
    isValid: true,
  };

  if (password.length < 8) {
    passwordTestResult.message = 'Password must be at least 8 characters';
    passwordTestResult.isValid = false;
    return passwordTestResult;
  }

  const strongPassword = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
  );
  if (!strongPassword.test(password)) {
    passwordTestResult.message =
      'Password must contain at least 1 special character, 1 cap letter, and 1 number';
    passwordTestResult.isValid = false;
  }

  return passwordTestResult;
};
