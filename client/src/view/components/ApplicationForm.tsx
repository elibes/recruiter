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
  cancelApplication,
  setDates,
  submitApplication,
} from '../../viewmodel/applicationSlice';
import {AppDispatch, RootState} from '../../store';
import * as React from 'react';

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

  const handleDateRangeSet = (ranges: any) => {
    const rangeKey = Object.keys(ranges)[0];
    const formattedRange = {
      startDate: ranges[rangeKey].startDate.toISOString(),
      endDate: ranges[rangeKey].endDate.toISOString(),
      key: rangeKey,
    };
    dispatch(setDates(formattedRange));
  };

  const handleNewAvailabilityButton = () => {
    dispatch(createNewAvailability());
  };

  const handleSubmitApplicationButton = () => {
    dispatch(applicationValidator());
    dispatch(submitApplication());
  };

  const handleCancelApplicationButton = () => {
    dispatch(cancelApplication());
  };

  return (
    <div>
      <CompetenceList></CompetenceList>
      <h3>Availabilities</h3>
      <DateRangePicker
        ranges={selectionList}
        minDate={new Date()}
        maxDate={addYears(new Date(), 1)}
        onChange={handleDateRangeSet}
      ></DateRangePicker>
      <button onClick={handleNewAvailabilityButton}>
        Add another availability
      </button>
      <div>
        <button onClick={handleSubmitApplicationButton}>
          Submit Application
        </button>
        <button onClick={handleCancelApplicationButton}>
          Cancel Application
        </button>
      </div>
      {errors ? <span>{errors}</span> : ''}
      <span>{resultMsg}</span>
    </div>
  );
};

export default ApplicationForm;
