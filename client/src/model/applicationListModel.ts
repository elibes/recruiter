/**
 * Function used for loading all user applications from the server.
 * @return The json-object from the server-response.
 * @async
 * */
async function applicationListModel() {
  const host: string = process.env.REACT_APP_SERVER_HOST || 'http://localhost';
  const port: string = process.env.REACT_APP_SERVER_PORT || '3001';
  const url: string = '' + host + ':' + port + '/user/all';
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
    });
    return await response.json();
  } catch (error) {
    console.error('Fetch operation failed:', error);
    throw new Error('Failed to load applications');
  }
}
export default applicationListModel;
