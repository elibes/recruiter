import {legacy_createStore as createStore} from 'redux';
import {rootReducer} from './AppState';

/**
 * Initializes and configures the Redux store.
 * This function creates a Redux store using the `rootReducer` which combines all reducers for the application.
 * The store is the central location for all the application's state.
 *
 * @function configureStore
 * @returns {Store} The configured Redux store with the application's root reducer.
 */
const configureStore = () => {
  return createStore(rootReducer, {});
};
export default configureStore;
