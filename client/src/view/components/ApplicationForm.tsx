import React, {FC} from 'react';
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
  const ranges = useSelector(
    (state: RootState) => state.application.availability
  );

  const selectionList = ranges.map(range => {
    return {
      startDate: new Date(range.startDate),
      endDate: new Date(range.endDate),
    };
  });

  const dispatch = useDispatch();
  return (
    <div>
      <button onClick={() => dispatch(createNewAvailability())}>test</button>
      <CompetenceList items={testList.items}></CompetenceList>
      <DateRangePicker
        ranges={selectionList}
        minDate={new Date()}
        maxDate={addYears(new Date(), 1)}
        onChange={ranges => {
          const rangeKey = Object.keys(ranges)[0];
          const formattedRange = {
            startDate: ranges[rangeKey].startDate.toISOString(),
            endDate: ranges[rangeKey].endDate.toISOString(),
            key: rangeKey,
          };
          dispatch(setDates(formattedRange));
        }}
      />
      <button type={'submit'}>Submit Application</button>
      <button>Cancel Application</button>
    </div>
  );
};

export default ApplicationForm;
