import {FC} from 'react';
import CompetenceList from './CompetenceList';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
import {DateRangePicker} from 'react-date-range';
import {addYears} from 'date-fns';
import {useSelector, useDispatch} from 'react-redux';

import {
  applicationValidator,
  createNewAvailability,
  setDates,
  submitApplication,
} from '../../viewmodel/applicationSlice';
import {AppDispatch, RootState} from '../../store';

const ApplicationForm: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const ranges = useSelector(
    (state: RootState) => state.application.availability
  );

  const errors = useSelector((state: RootState) => state.application.errorList);
  const resultMsg = useSelector(
    (state: RootState) => state.application.resultMsg
  );

  const selectionList = ranges.map(range => {
    return {
      startDate: new Date(range.startDate),
      endDate: new Date(range.endDate),
    };
  });

  return (
    <div>
      <CompetenceList></CompetenceList>
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
      <button onClick={() => dispatch(createNewAvailability())}>+</button>
      <button
        onClick={() => {
          dispatch(applicationValidator());
          dispatch(submitApplication());
        }}
      >
        Submit Application
      </button>
      <button>Cancel Application</button>
      {errors ? <span>{errors}</span> : ''}
      <span>{resultMsg}</span>
    </div>
  );
};

export default ApplicationForm;
