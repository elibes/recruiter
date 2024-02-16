import {combineReducers} from 'redux';
import {RegistrationReducer} from './RegistrationReducer';
import {RegistrationState} from './RegistrationReducer';

/**
 * Interface representing the shape of the entire Redux store state.
 * It aggregates the state from different parts of the application.
 *
 * @interface RootState
 * @property {RegistrationState} users - The state slice for user registration, managed by the `RegistrationReducer`.
 */
export interface RootState {
  users: RegistrationState;
}

/**
 * The root reducer of the application, combining all reducers.
 * It uses `combineReducers` from Redux to create a single reducer function from many.
 * Currently, it only combines `RegistrationReducer` for the `users` state slice.
 *
 * @constant {Reducer} rootReducer
 */
export const rootReducer = combineReducers({
  users: RegistrationReducer,
});
