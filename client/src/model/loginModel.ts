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

export {loginModel};
