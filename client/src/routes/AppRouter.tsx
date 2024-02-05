import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
const LoginView = React.lazy(() => import('../view/LoginView'));
const RegistrationView = React.lazy(() => import('../view/RegistrationView'));
const NotFoundView = React.lazy(() => import('../view/NotFoundView'));
/**
 * AppRouter returns a Router component with three Route components, rendering different views based on the path.
 * @returns A Router component containing three Route components.
 */
const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <React.Suspense fallback={<div>Loading...</div>}>
              <LoginView />
            </React.Suspense>
          }
        />
        <Route
          path="/register"
          element={
            <React.Suspense fallback={<div>Loading...</div>}>
              <RegistrationView />
            </React.Suspense>
          }
        />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path={'*'}
          element={
            <React.Suspense fallback={<div>Loading...</div>}>
              <NotFoundView />
            </React.Suspense>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
