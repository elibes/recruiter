export async function submitApplicationToBackEnd(payload: any) {
  const url = 'http://localhost:3001/application/'; // API endpoint
  try {
    console.log('im sending');
    const response = await fetch(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error ${response.status}: ${errorText}`);
    }
    const body = await response.json();
    return body.data[0];
  } catch (error) {
    console.error('Fetch operation failed:', error);
    throw new Error('get all competencies failed');
  }
}
