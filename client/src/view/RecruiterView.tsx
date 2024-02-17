import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, AppDispatch} from '../store';
import {setIsLoaded, loadApplications} from '../viewmodel/applicationListSlice';
import ApplicationListItem from './components/ApplicationListItem';

/**
 * Creates the main view for the recruiter. Has a button that loads all applications from
 * the server. When the applications have been loaded, they will be shown under the button.
 * The applications can be sorted (alphabetic name order, status of the application) with
 * a drop-down menu.
 * @todo Implement sorting of the applications.
 * @return The main view.
 * */
const RecruiterView = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {isLoaded, applications} = useSelector(
    (state: RootState) => state.applicationList
  );

  const getApplications = () => {
    dispatch(setIsLoaded(true));
    dispatch(loadApplications());
  };

  return (
    <div>
      <h1>Recruiter main page</h1>
      <button onClick={getApplications}>
        {isLoaded ? 'Re-load applications' : 'Load applications'}
      </button>
      <div>
        {isLoaded ? (
          applications.map(application => (
            <ApplicationListItem
              key={application.id}
              firstName={application.firstName}
              lastName={application.lastName}
              status={application.status}
            />
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default RecruiterView;
