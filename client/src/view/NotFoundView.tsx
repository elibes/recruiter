import React from 'react';
import {Link} from 'react-router-dom';

/**
 * Renders a 404 - Not Found view with a message and a link to the login page.
 * @returns {JSX.Element} A 404 - Not Found view with a message and a link to the login page.
 */
const NotFoundView = () => {
  return (
    <div style={{textAlign: 'center', marginTop: '50px'}}>
      <h1>404 - Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/login">Go to Login</Link>
    </div>
  );
};

export default NotFoundView;
