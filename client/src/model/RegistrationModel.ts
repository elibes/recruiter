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
 * @returns {Promise<any>} - The response from the registration process, which can be a success message or an error message.
 * @throws {Error} Throws an error if the registration process fails or if the fetch operation encounters an error.
 */
async function registrationModel(
  firstName: string,
  lastName: string,
  userName: string,
  password: string,
  personalNumber: string,
  email: string
): Promise<any> {
  const host: string = process.env.REACT_APP_SERVER_HOST || 'http://localhost';
  const port: string = process.env.REACT_APP_SERVER_PORT || '3001';
  const url: string = '' + host + ':' + port + '/user/register'; // API endpoint
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
    /*
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error ${response.status}: ${errorText}`);
    }

 */
    return await response.json();
  } catch (error) {
    console.error('Fetch operation failed:', error);
    throw new Error('Registration failed');
  }
}

export {registrationModel};
