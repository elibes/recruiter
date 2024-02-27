import * as React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
const RegistrationView = React.lazy(() => import('../view/RegistrationView'));
const LoginView = React.lazy(() => import('../view/LoginView'));
const RecruiterView = React.lazy(() => import('../view/RecruiterView'));
const NotFoundView = React.lazy(() => import('../view/NotFoundView'));
const ApplicationView = React.lazy(() => import('../view/ApplicationView'));
const Header = React.lazy(() => import('../view/components/Header'));

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
      <React.Suspense fallback={<div />}>
        <Header />
      </React.Suspense>
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
        <Route
          path="/recruiter"
          element={
            <React.Suspense fallback={<div>Loading...</div>}>
              <RecruiterView />
            </React.Suspense>
          }
        />
        <Route
          path="/application"
          element={
            <React.Suspense fallback={<div>Loading...</div>}>
              <ApplicationView />
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
