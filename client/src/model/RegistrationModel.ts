/**
 * Represents a successful registration response.
 * @interface
 */
interface RegistrationSuccessResponse {
  message: string; // Success message
}

/**
 * Represents an error response during registration.
 * @interface
 */
interface RegistrationErrorResponse {
  error: string; // Error message
}

/**
 * Union type for registration response which can be either success or error response.
 * @typedef {RegistrationSuccessResponse | RegistrationErrorResponse} RegistrationResponse
 */
type RegistrationResponse =
  | RegistrationSuccessResponse
  | RegistrationErrorResponse;

/**
 * Handles user registration by sending user details to the registration API endpoint.
 *
 * @async
 * @function registrationModel
 * @param {string} firstName - User's first name.
 * @param {string} lastName - User's last name.
 * @param {string} userName - Chosen username.
 * @param {string} password - Account password.
 * @param {string} personalNumber - User's personal identification number.
 * @param {string} email - User's email address.
 * @returns {Promise<RegistrationResponse>} - The response from the registration process, which can be a success message or an error message.
 * @throws {Error} Throws an error if the registration process fails or if the fetch operation encounters an error.
 */
async function registrationModel(
  firstName: string,
  lastName: string,
  userName: string,
  password: string,
  personalNumber: string,
  email: string
): Promise<RegistrationResponse> {
  const url = 'http://localhost:3001/user/register'; // API endpoint
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
      const errorText = await response.text();
      throw new Error(`HTTP error ${response.status}: ${errorText}`);
    }

    const data: RegistrationResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch operation failed:', error);
    throw new Error('Registration failed');
  }
}

export {registrationModel};
