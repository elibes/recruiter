import * as React from 'react';
import './App.css';
import AppRouter from './routes/AppRouter';

/**
 * App component is the root component of the application.
 * It renders the AppRouter component, which handles routing and rendering different views based on the path.
 *
 * @component
 * @returns {JSX.Element} The rendered App component.
 */
function App() {
  return (
    <div className="App">
      <AppRouter />
    </div>
  );
}

export default App;
