import {handleError} from '../util/error_handler';

/**
 * Registers a new user by sending their information to the registration API endpoint.
 *
 * @param {string} firstName - The first name of the user.
 * @param {string} lastName - The last name of the user.
 * @param {string} userName - The desired username for the new account.
 * @param {string} password - The password for the new account.
 * @param {string} personalNumber - A unique identifier for the user (e.g., social security number).
 * @param {string} email - The email address of the user.
 * @param {Function} dispatch - A Redux dispatch function used for state management and error handling.
 * @returns {Promise<any>} - A promise that resolves with the response from the registration API if the registration
 * is successful, or rejects with an error if the registration fails.
 * @async
 */
async function registrationModel(
  firstName: string,
  lastName: string,
  userName: string,
  password: string,
  personalNumber: string,
  email: string,
  dispatch: any
): Promise<any> {
  const host: string =
    process.env.REACT_APP_SERVER_URL || 'http://localhost:3001';
  const url: string = '' + host + '/user/register'; // API endpoint
  const payload = {
    firstName,
    lastName,
    userName,
    password,
    personalNumber,
    email,
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      handleError({response, dispatch});
    } else {
      return await response.json();
    }
  } catch (error) {
    console.error('Fetch operation failed:', error);
    throw new Error('Registration failed');
  }
}

export {registrationModel};
