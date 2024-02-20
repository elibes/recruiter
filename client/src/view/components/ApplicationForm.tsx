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

/**
 * This component organizes what should be displayed in the job application form.
 * It also handles user events by dispatching actions which will update the state.
 * It will re-render when the states in useSelector change.
 *
 * @component
 */
const ApplicationForm: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const ranges = useSelector(
    (state: RootState) => state.application.availability
  );
  const errors = useSelector((state: RootState) => state.application.errorList);
  const resultMsg = useSelector(
    (state: RootState) => state.application.resultMsg
  );

  /**
   * This const converts the availability state to the Date format that DateRangePicker uses.
   */
  const selectionList = ranges.map(range => {
    return {
      startDate: new Date(range.startDate),
      endDate: new Date(range.endDate),
      key: range.key,
    };
  });

  /**
   * This function handles the event when a user selects a data range in the DateRangePicker. It will
   * convert the dates to string and then attempt to update corresponding state using dispatch.
   * @param range the date range from the picker,
   */
  const handleDateRangeSet = (range: any) => {
    const rangeKey = Object.keys(range)[0];
    const formattedRange = {
      startDate: range[rangeKey].startDate.toISOString(),
      endDate: range[rangeKey].endDate.toISOString(),
      key: rangeKey,
    };
    dispatch(setDates(formattedRange));
  };

  /**
   * This function handles the event when a user wants to add another availability range in the DateRangePicker.
   */
  const handleNewAvailabilityButton = () => {
    dispatch(createNewAvailability());
  };

  /**
   * This function handles the event when a user want to submit the job application. First dispatching an action
   * to set error state and then attempting the submission.
   */
  const handleSubmitApplicationButton = () => {
    dispatch(applicationValidator());
    dispatch(submitApplication());
  };

  /**
   * This function handles the event when a user wants to cancel their application.
   */
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
      {errors.length > 0 ? <span>{errors}</span> : ''}
      <span>{resultMsg}</span>
    </div>
  );
};

export default ApplicationForm;
