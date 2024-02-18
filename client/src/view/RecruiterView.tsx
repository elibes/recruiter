import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, AppDispatch} from '../store';
import {
  setIsLoaded,
  setSorting,
  loadApplications,
} from '../viewmodel/applicationListSlice';
import ApplicationListItem from './components/ApplicationListItem';

/**
 * Creates the main view for the recruiter. Has a button that loads all applications from
 * the server. When the applications have been loaded, they will be shown under the button.
 * The applications can be sorted (alphabetic name order, status of the application) with
 * a drop-down menu.
 * @return The main view.
 * */
const RecruiterView = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {isLoaded, sorting, applications} = useSelector(
    (state: RootState) => state.applicationList
  );

  const getApplications = () => {
    dispatch(loadApplications())
      .then(() => {
        dispatch(setSorting(sorting));
      })
      .then(() => {
        dispatch(setIsLoaded(true));
      });
  };

  const changeSorting = event => {
    const newSorting = event.target.value;
    dispatch(setSorting(newSorting));
  };

  return (
    <div>
      <h1>Recruiter Dashboard</h1>
      <button onClick={getApplications}>
        {isLoaded ? 'Re-load applications' : 'Load applications'}
      </button>
      <div>
        {isLoaded ? (
          <div>
            <select className="sort" value={sorting} onChange={changeSorting}>
              <option value="a-z">Alphabetic</option>
              <option value="status">Status</option>
            </select>
          </div>
        ) : (
          <></>
        )}
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
