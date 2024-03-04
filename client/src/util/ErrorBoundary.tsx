import * as React from 'react';
import './ErrorBoundary.css';
import i18next from 'i18next';

/**
 * Type definition for the properties of the ErrorBoundary component.
 * @typedef {Object} ErrorBoundaryProps
 * @property {React.ReactNode[]} children - The child components to be rendered inside the ErrorBoundary.
 */
interface ErrorBoundaryProps {
  children: React.ReactNode[];
}

/**
 * Type definition for the state of the ErrorBoundary component.
 * @typedef {Object} ErrorBoundaryState
 * @property {boolean} hasError - Indicates if an error has been caught.
 * @property {Error|null} error - The error that was caught, if any.
 * @property {object} info - Additional information about the error, such as the component stack.
 */
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  info: object;
}

/**
 * ErrorBoundary is a React component that catches JavaScript errors anywhere in its child component tree,
 * logs those errors, and displays a fallback UI instead of the component tree that crashed.
 * @extends React.Component<ErrorBoundaryProps, ErrorBoundaryState>
 */
class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  /**
   * Initializes the ErrorBoundary component with default state.
   * @param {ErrorBoundaryProps} props - The props passed to the ErrorBoundary component.
   */
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: new Error(),
      info: {componentStack: ''},
    };
  }

  /**
   * Updates the state so the next render will show the fallback UI.
   * @static
   * @param {Error} error - The error that was thrown.
   * @returns {ErrorBoundaryState} The updated state.
   */
  static getDerivedStateFromError = (error: Error) => {
    return {hasError: true};
  };

  /**
   * This lifecycle method is invoked after an error has been thrown by a descendant component.
   * It receives the error that was thrown as a parameter and should be used to log error details.
   * @param {Error|null} error - The error that was caught.
   * @param {object} info - An object with a `componentStack` key containing information about which component threw the error.
   */
  componentDidCatch(error: Error | null, info: object) {
    console.log('error', error);
    this.setState({hasError: true, error, info});
  }

  /**
   * Renders the ErrorBoundary component. Displays a fallback UI if an error has been caught; otherwise, renders the children.
   * @returns {React.ReactNode} The component UI.
   */
  render() {
    if (this.state.hasError) {
      let message;
      switch (i18next.language) {
        case 'sv':
          message =
            'Hoppsan! Något gick fel. Ladda om skärmen eller se konsolen\n ' +
            'för tekniska detaljer.';
          break;
        case 'en':
          message =
            'Oops! Something went wrong. Please reload your screen or see the\n' +
            'console for technical details.';
          break;
        default:
          message =
            'Oops! Something went wrong. Please reload your screen or see the\n' +
            'console for technical details.';
      }
      return (
        <div className="error-container">
          <h2 style={{padding: '2em'}}>{message}</h2>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
