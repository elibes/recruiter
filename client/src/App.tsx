import React from 'react';
import './App.css';
import AppRouter from './routes/AppRouter';
import {Provider} from 'react-redux';

import {store} from './viewmodel/reduxStore';

/**
 * App component is the root component of the application.
 * It renders the AppRouter component, which handles routing and rendering different views based on the path.
 *
 * @component
 * @returns {JSX.Element} The rendered App component.
 */
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AppRouter />
      </div>
    </Provider>
  );
}

/*
 * */

export default App;
