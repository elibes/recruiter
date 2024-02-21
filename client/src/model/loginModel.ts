async function loginModel(userName: string, password: string): Promise<any> {
  const host: string = process.env.REACT_APP_SERVER_HOST || 'http://localhost';
  const port: string = process.env.REACT_APP_SERVER_PORT || '3001';
  const url: string = '' + host + ':' + port + '/user/login'; // API endpoint
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
    /*
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error ${response.status}: ${errorText}`);
    }

 */
    return await response.json();
  } catch (error) {
    console.error('Fetch operation failed:', error);
    throw new Error('Login failed');
  }
}

export {loginModel};
