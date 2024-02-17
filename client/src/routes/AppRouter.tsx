import * as React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
const RegistrationView = React.lazy(() => import('../view/RegistrationView'));
const LoginView = React.lazy(() => import('../view/LoginView'));
const NotFoundView = React.lazy(() => import('../view/NotFoundView'));

/**
 * AppRouter component handles routing and rendering different views based on the path.
 * It uses the `react-router-dom` package to define routes and render components based on the URL path.
 *
 * @component
 * @returns {JSX.Element} The rendered AppRouter component.
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
