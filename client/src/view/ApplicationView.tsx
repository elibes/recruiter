import ApplicationForm from './components/ApplicationForm';

/**
 * This component organizes what other components should be displayed in the job application view.
 * @component
 */
const ApplicationView = () => {
  return (
    <>
      <h1>Application Page</h1>
      <ApplicationForm></ApplicationForm>
    </>
  );
};

export default ApplicationView;
