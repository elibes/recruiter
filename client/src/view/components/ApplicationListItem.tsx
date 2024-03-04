import '../styles/ApplicationList.css';

import * as React from 'react';
import {useTranslation} from 'react-i18next';

/**
 * Creates a div containing an individual application to be shown in the list of all
 * applications. Contains the first and last name of the applicant, and the status
 * of the application.
 * @return the div containing the application.
 * */
const ApplicationListItem = ({firstName, lastName, status}) => {
  const {t, i18n} = useTranslation();

  return (
    <div className="application-list-item">
      <div className="application-list-item-name">
        {firstName} {lastName}
      </div>
      <div className={'application-status-' + status}>
        {t('recruiter.' + status)}
      </div>
    </div>
  );
};

export default ApplicationListItem;
