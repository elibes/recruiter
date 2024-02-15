import React, {FC, useReducer} from 'react';
import CompetenceList from './CompetenceList';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
import {DateRangePicker} from 'react-date-range';
import {addYears} from 'date-fns';
import {useSelector, useDispatch} from 'react-redux';
import {AppDispatch, RootState} from '../../viewmodel/reduxStore';
import {
  createNewAvailability,
  setDates,
} from '../../viewmodel/ApplicationViewModel';

const testList = {
  items: [
    {itemId: 1, competenceName: 'climbing'},
    {itemId: 2, competenceName: 'falling'},
  ],
};
const ApplicationForm: FC = () => {
  const range = useSelector(
    (state: RootState) => state.application.availability
  );
  const selection1 = {
    startDate: new Date(range[0].fromDate),
    endDate: new Date(range[0].toDate),
    key: 'selection1',
  };
  const dispatch = useDispatch();
  return (
    <div>
      <button onClick={() => dispatch(createNewAvailability())}>test</button>
      <CompetenceList items={testList.items}></CompetenceList>
      <DateRangePicker
        ranges={[selection1]}
        minDate={new Date()}
        maxDate={addYears(new Date(), 1)}
        onChange={ranges => dispatch(setDates(ranges))}
      />
      <button type={'submit'}>Submit Application</button>
      <button>Cancel Application</button>
    </div>
  );
};

export default ApplicationForm;
