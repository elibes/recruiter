async function registrationModel(
  firstName: string,
  lastName: string,
  email: string,
  pnr: string,
  username: string,
  password: string
): Promise<any> {
  try {
    const response = await fetch('', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        pnr,
        username,
        password,
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('There was a problem with the fetch operation: ', error);
    throw error;
  }
}

export {registrationModel};
