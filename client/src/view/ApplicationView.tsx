import './styles/ApplicationView.css';

import {useTranslation} from 'react-i18next';
import ApplicationForm from './components/ApplicationForm';

/**
 * This component organizes what other components should be displayed in the job application view.
 * @component
 */
const ApplicationView = () => {
  const {t, i18n} = useTranslation();

  return (
    <>
      <h1>{t('applicant.application-page')}</h1>
      <ApplicationForm></ApplicationForm>
    </>
  );
};

export default ApplicationView;
