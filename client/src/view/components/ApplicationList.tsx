import '../styles/ApplicationList.css';

import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, AppDispatch} from '../../store';
import {setSorting} from '../../viewmodel/applicationListSlice';
import ApplicationListItem from './ApplicationListItem';

const ApplicationList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {isLoaded, sorting, applications} = useSelector(
    (state: RootState) => state.applicationList
  );
  const changeSorting = event => {
    const newSorting = event.target.value;
    dispatch(setSorting(newSorting));
  };
  return (
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
  );
};

export default ApplicationList;
