import i18next from 'i18next';

/**
 * This function calls the back-end server with a request to get all competencies (names + id).
 * @async
 */
export async function getAllCompetencies() {
  const languageCode = i18next.resolvedLanguage || 'en';
  const host: string =
    process.env.REACT_APP_SERVER_URL || 'http://localhost:3001';
  const url: string = '' + host + '/competence/all'; // API endpoint
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept-Language': languageCode,
      },
    });

    const result = await response.json();
    //do error handling here.
    return result;
  } catch (error) {
    console.error('Fetch operation failed:', error);
    throw new Error('get all competencies failed');
  }
}
