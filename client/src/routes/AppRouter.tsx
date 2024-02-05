import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import LoginView from '../view/LoginView';
import RegistrationView from '../view/RegistrationView';

/**
 * AppRouter returns a Router component with three Route components, rendering different views based on the path.
 * @returns A Router component containing three Route components.
 */
const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginView />} />
        <Route path="/register" element={<RegistrationView />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
