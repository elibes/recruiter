export async function getAllCompetencies() {
  const url = 'http://localhost:3001/competence/all'; // API endpoint
  try {
    const response = await fetch(url, {
      method: 'GET',
    });
    /*
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error ${response.status}: ${errorText}`);
    }
    */
    const body = await response.json();
    return body.data[0];
  } catch (error) {
    console.error('Fetch operation failed:', error);
    throw new Error('get all competencies failed');
  }
}
