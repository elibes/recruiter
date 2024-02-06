interface RegistrationSuccessResponse {
  message: string; // Success message
}

interface RegistrationErrorResponse {
  error: string; // Error message
}

type RegistrationResponse =
  | RegistrationSuccessResponse
  | RegistrationErrorResponse;
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
