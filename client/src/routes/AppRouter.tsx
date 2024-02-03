import React from 'react';
import { BrowserRouter as Router, Route, Navigate } from 'react-router-dom';
import LoginView from './views/LoginView';
import RegistrationView from './view/RegistrationView';


const AppRouter = () => {
  return (
    <Router>
      <Route path="/login" element={<LoginView />} />
      <Route path="/register" element={<RegistrationView />} />
      <Route path="/" element={<Navigate to="/login" />} />
    </Router>
  );
}

export default AppRouter;
