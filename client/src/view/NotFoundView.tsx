import React from 'react';
import {Link} from 'react-router-dom';

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
