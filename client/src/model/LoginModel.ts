interface LoginResponse {
  token: string;
  role: 'Recruiter' | 'Applicant';
}

interface LoginError {
  message: string;
}

export async function login(
  username: string,
  password: string
): Promise<LoginResponse | LoginError> {
  try {
    const response = await fetch('/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username, password}),
    });

    if (response.ok) {
      const data: LoginResponse = await response.json();
      return data;
    } else {
      const errorData: LoginError = await response.json();
      return errorData;
    }
  } catch (error) {
    return {message: 'Network error, please try again later.'};
  }
}
