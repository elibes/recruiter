import * as React from 'react';
import {Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {RootState} from '../store';

/**
 * `ProtectedRoute` is a higher-order component that wraps around protected components
 * in the application to enforce authentication and role-based access control.
 *
 * It redirects users based on their authentication status and role. If the user is not
 * logged in, they are redirected to the login page. If the user is logged in but does
 * not have the required role, they are redirected to the not found page. If the user
 * meets the authentication and role requirements, they are granted access to the component.
 *
 * @param {React.ComponentType<any>} component - The component to render if the user passes the authentication and role check.
 * @param {string} role - The role required to access the component.
 * @param {Object} rest - Additional props to pass to the component if rendered.
 *
 * @returns {React.ReactElement} - A `<Navigate>` component redirecting to either the login or registration page, or the protected component if access conditions are met.
 */
const ProtectedRoute = ({component: Component, role, ...rest}) => {
  const {isLoggedIn, userRole} = useSelector((state: RootState) => state.user);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  if (isLoggedIn && userRole === role) {
    return <Component {...rest} />;
  }

  return <Navigate to="*" />;
};

export default ProtectedRoute;
