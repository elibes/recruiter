/**
 * Handles user registration by sending user details to the registration API endpoint.
 *
 * @async
 * @function loginModel
 * @param {string} userName - Chosen username.
 * @param {string} password - Account password.
 * @returns {Promise<any>} - The response from the registration process, which can be a success message or an error message.
 * @throws {Error} Throws an error if the registration process fails or if the fetch operation encounters an error.
 */
async function loginModel(userName: string, password: string): Promise<any> {
  const url = 'http://localhost:3001/user/login'; // API endpoint
  const payload = {
    userName,
    password,
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
    return await response.json();
  } catch (error) {
    console.error('Fetch operation failed:', error);
    throw new Error('Login failed');
  }
}

export {loginModel};
