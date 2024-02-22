import '../styles/ApplicationList.css';

import * as React from 'react';

/**
 * Creates an individual application to be shown in the list of all applications. Contains
 * the first and last name of the applicant, and the status of the application.
 * @return the application.
 * */
const ApplicationListItem = ({firstName, lastName, status}) => {
  return (
    <div className="application-list-item">
      <div className="application-list-item-name">
        {firstName} {lastName}
      </div>
      <div className={'application-status-' + status}>{status}</div>
    </div>
  );
};

export default ApplicationListItem;
