/**
 * This function calls the back-end server with a request to submit a job application form.
 * @param payload the job application form data
 */
export async function submitApplicationToBackEnd(payload: any) {
  const host: string =
    process.env.REACT_APP_SERVER_URL || 'http://localhost:3001';
  const url: string = '' + host + '/application/'; // API endpoint
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
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
    throw new Error('get all competencies failed');
  }
}
