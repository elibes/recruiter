/**
 * Function used for loading all user applications from the server.
 * @return The json-object from the server-response.
 * @async
 * @todo Make an actual call to the server, instead of returning hardcoded data -- the commented-out code should work, but the server does not currently have this functionality yet.
 * */
async function applicationListModel() {
  const host: string = process.env.REACT_APP_SERVER_HOST || 'localhost';
  const port: string = process.env.REACT_APP_SERVER_PORT || '3001';
  const url: string = 'http://' + host + ':' + port + '/applications/getAll';
  try {
    /*
    const response = await fetch(url, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    });
    return await response.json();
     */
    return {
      applications: [
        {id: 1, firstName: 'John', lastName: 'Doe', status: 'accepted'},
        {id: 2, firstName: 'Jane', lastName: 'Smith', status: 'rejected'},
        {id: 3, firstName: 'Michael', lastName: 'Johnson', status: 'unhandled'},
      ],
      success: true,
    };
  } catch (error) {
    console.error('Fetch operation failed:', error);
    throw new Error('Failed to load applications');
  }
}

export default applicationListModel;
