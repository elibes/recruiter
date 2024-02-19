/**
 * This function calls the back-end server with a request to get all competencies (names + id).
 */
export async function getAllCompetencies() {
  const url = 'http://localhost:3001/competence/all'; // API endpoint
  try {
    const response = await fetch(url, {
      method: 'GET',
    });
    const result = await response.json();
    //do error handling here.
    return result;
  } catch (error) {
    console.error('Fetch operation failed:', error);
    throw new Error('get all competencies failed');
  }
}
