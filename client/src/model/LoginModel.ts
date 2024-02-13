import axios from 'axios';

interface LoginResponse {
  success: boolean;
  token?: string;
  error?: string;
}

export const login = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await axios.post('/api/user/login', {username, password});
    return {success: true, token: response.data.token};
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.error || 'An error occurred during login.',
    };
  }
};
