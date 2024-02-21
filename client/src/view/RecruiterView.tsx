import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, AppDispatch} from '../store';
import {
  setIsLoaded,
  setSorting,
  loadApplications,
} from '../viewmodel/applicationListSlice';
import ApplicationList from './components/ApplicationList';
import {useNavigate} from 'react-router-dom';

/**
 * Creates the main view for the recruiter. Has a button that loads all applications from
 * the server. When the applications have been loaded, they will be shown under the button.
 * The applications can be sorted (alphabetic name order, status of the application) with
 * a drop-down menu.
 * @return The main view.
 * */
const RecruiterView = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {isLoaded, sorting} = useSelector(
    (state: RootState) => state.applicationList
  );
  const {userRole} = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (userRole.valueOf() !== 'recruiter') navigate('/login');
  }, [userRole]);
  const getApplications = () => {
    dispatch(loadApplications())
      .then(() => {
        dispatch(setSorting(sorting));
      })
      .then(() => {
        dispatch(setIsLoaded(true));
      });
  };

  return (
    <div>
      <h1>Recruiter Dashboard</h1>
      <button onClick={getApplications}>
        {isLoaded ? 'Re-load applications' : 'Load applications'}
      </button>
      <ApplicationList />
    </div>
  );
};

export default RecruiterView;
