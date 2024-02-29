import * as React from 'react';
import {Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {RootState} from '../store';

/**
 * ProtectedRoute component that renders the given component if the user is authenticated,
 * otherwise redirects the user to the login page.
 *
 * @param {Object} props - The component props.
 * @param {React.ComponentType<any>} props.component - The component to be rendered if the user is authenticated.
 * @param {Object} [rest] - Any additional props that should be passed to the component being rendered.
 * @returns {React.ReactElement} The rendered component if authenticated, or a redirection to the login page.
 */
const ProtectedRoute = ({component: Component, ...rest}) => {
  const {isLoggedIn} = useSelector((state: RootState) => state.user);

  return isLoggedIn ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
