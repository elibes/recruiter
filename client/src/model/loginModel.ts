import {handleError} from '../util/error_handler';

async function loginModel(
  userName: string,
  password: string,
  dispatch: any
): Promise<any> {
  const host: string =
    process.env.REACT_APP_SERVER_URL || 'http://localhost:3001';
  const url: string = '' + host + '/user/login'; // API endpoint
  const payload = {
    userName,
    password,
  };

  try {
    const headers: Headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload),
      credentials: 'include',
    });
    if (!response.ok) {
      handleError({response, dispatch});
    } else {
      return await response.json();
    }
  } catch (error) {
    console.error('Fetch operation failed:', error);
    throw new Error('Login failed');
  }
}

export {loginModel};
