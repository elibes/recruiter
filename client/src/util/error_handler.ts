import i18next from 'i18next';
import {setBackendError} from '../viewmodel/userSlice';
import {setErrorList} from '../viewmodel/applicationSlice';

/**
 * Enumeration of custom error codes used to handle specific error scenarios.
 */
const ERROR_CODES = {
  CONFLICT_ERROR: 'CONFLICT_ERROR',
  CUSTOM_VALIDATION_ERROR: 'CUSTOM_VALIDATION_ERROR',
  JWT_ERROR: 'JWT_ERROR',
  TOKEN_EXPIRED_ERROR: 'TOKEN_EXPIRED_ERROR',
  CONNECTION_REFUSED_ERROR: 'CONNECTION_REFUSED_ERROR',
  DEFAULT_ERROR: 'DEFAULT_ERROR',
  ROUTE_VALIDATION_ERROR: 'ROUTE_VALIDATION_ERROR',
  MISSING_HEADER_ERROR: 'MISSING_HEADER_ERROR',
  INVALID_LOGIN_ERROR: 'INVALID_LOGIN_ERROR',
  FORBIDDEN_ERROR: 'FORBIDDEN_ERROR',
};

/**
 * Defines the structure for the arguments passed to the error handler function.
 *
 * @typedef {Object} ErrorHandlerArguments
 * @property {Response} response - The response object from a fetch request, containing the error details.
 * @property {Function} [dispatch] - Optional Redux dispatch function to send actions based on the error.
 */
interface ErrorHandlerArguments {
  response: Response;
  dispatch?: any;
}

/**
 * Handles errors based on the HTTP status code and custom error codes defined in `ERROR_CODES`.
 * It processes the response to extract error details and takes appropriate actions like logging,
 * displaying alerts, or dispatching error messages to the Redux store.
 *
 * @param {ErrorHandlerArguments} args - The arguments containing the response and optional dispatch function.
 */
export function handleError({response, dispatch}: ErrorHandlerArguments) {
  response.json().then(error => {
    const errorData = error.error;
    const errorMsg =
      errorData.message || i18next.t('error-handler.unknown-error');
    switch (response.status) {
      case 400:
        if (errorData.code === ERROR_CODES.CUSTOM_VALIDATION_ERROR) {
          const formattedMessage = generateErrorMessage(errorMsg);
          console.log(formattedMessage);
          dispatch(setBackendError(formattedMessage));
          dispatch(setErrorList(formattedMessage));
        }
        if (errorData.code === ERROR_CODES.MISSING_HEADER_ERROR) {
          console.error(i18next.t('error-handler.missing-header'), errorMsg);
          alert(i18next.t('error-handler.request-missing-header'));
        }
        break;
      case 401:
        if (errorData.code === ERROR_CODES.INVALID_LOGIN_ERROR) {
          console.error(errorMsg);
          alert(i18next.t('error-handler.login-nonexistent-account'));
        }
        if (errorData.code === ERROR_CODES.JWT_ERROR) {
          console.error(i18next.t('error-handler.unauthorized'), errorMsg);
          alert(i18next.t('error-handler.not-authorized'));
        }
        if (errorData.code === ERROR_CODES.TOKEN_EXPIRED_ERROR) {
          console.error(i18next.t('error-handler.unauthorized'), errorMsg);
          alert(i18next.t('error-handler.authorization-cookie-expired'));
        }
        break;
      case 403:
        if (errorData.code === ERROR_CODES.FORBIDDEN_ERROR) {
          console.error('Forbidden: ', errorMsg);
          alert('You are not authorized to perform this action');
        }
        break;
      case 404:
        if (errorData.code === ERROR_CODES.ROUTE_VALIDATION_ERROR) {
          console.log(i18next.t('error-handler.route-missing'), errorMsg);
          alert(i18next.t('error-handler.nonexistent-root'));
        }
        break;
      case 409:
        if (errorData.code === ERROR_CODES.CONFLICT_ERROR) {
          console.error(i18next.t('error-handler.conflict'), errorMsg);
          alert(i18next.t('error-handler.conflict-detected'));
        }
        break;
      case 500:
        if (errorData.code === ERROR_CODES.DEFAULT_ERROR) {
          console.error(i18next.t('error-handler.server-error'), errorMsg);
          alert(i18next.t('error-handler.internal-error'));
        }
        break;
      case 503:
        if (error.code === ERROR_CODES.CONNECTION_REFUSED_ERROR) {
          console.error(
            i18next.t('error-handler.server-unavailable'),
            errorMsg
          );
          alert(i18next.t('error-handler.service-is-unavailable'));
        }
        break;
      default:
        console.error(i18next.t('error-handler.server-error'), errorMsg);
        alert(i18next.t('error-handler.internal-error'));
        break;
    }
  });
}

/**
 * This function parses a validation error string from the back end, putting it in a list.
 * @param validationErrors the string of validation errors
 */
const generateErrorMessage = (validationErrors: string) => {
  console.log(validationErrors);
  const toSet: string[] = [];
  const errorStrings = validationErrors.split('::');
  for (const errorString of errorStrings) {
    const [errorFieldName, ...messageParts] = errorString.split(' ');
    const message = messageParts.join(' ');
    toSet.push(errorFieldName + ': ' + message);
  }
  return toSet;
};

/**
 * This function takes a list of errors and retrieves the one matching a string, for placement within a view.
 * @param field the string to match for placement
 * @param errors the list of errors
 */
export const errorPlacer = (field: string, errors: string[]) => {
  for (const errorString of errors) {
    const errorParts = errorString.split(':');
    if (field === errorParts[0]) {
      console.log(errorParts[1]);
      return errorParts[1];
    }
  }
  return undefined;
};
