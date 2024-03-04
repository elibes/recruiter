import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';

import {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {useSelector, useDispatch} from 'react-redux';
import {DateRange} from 'react-date-range';
import {addYears, format} from 'date-fns';
import {enUS, sv} from 'date-fns/locale';
import CompetenceList from './CompetenceList';

import {
  applicationValidator,
  createNewAvailability,
  cancelApplication,
  setDates,
  submitApplication,
  AvailabilityState,
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

  const {t, i18n} = useTranslation();

  /**
   * This const converts the availability state to the Date format that DateRange uses.
   */
  const selectionList = ranges.map(range => {
    return {
      startDate: new Date(range.startDate),
      endDate: new Date(range.endDate),
      key: range.key,
    };
  });

  /**
   * This function handles the event when a user selects a data range in the DateRange. It will
   * convert the dates to string and then attempt to update corresponding state using dispatch.
   * @param range the date range from the picker,
   */
  const handleDateRangeSet = (range: any) => {
    const rangeKey = Object.keys(range)[0];
    const dateFormat = 'yyyy-MM-dd';
    const startDateString = format(range[rangeKey].startDate, dateFormat);
    const endDateString = format(range[rangeKey].endDate, dateFormat);

    const formattedRange: AvailabilityState = {
      startDate: startDateString,
      endDate: endDateString,
      key: rangeKey,
    };
    dispatch(setDates(formattedRange));
  };

  /**
   * This function handles the event when a user wants to add another availability range in the DateRange.
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

  /**
   * This function returns the date-fns locale corresponding to the language chosen
   * by the user, or enUS if language is unsupported by date-fns.
   * */
  const getLocale = () => {
    switch (i18n.resolvedLanguage) {
      case 'sv':
        return sv;
      case 'sv-SE':
        return sv;
      case 'en':
        return enUS;
      case 'en-US':
        return enUS;
      default:
        return enUS;
    }
  };

  return (
    <div>
      <CompetenceList></CompetenceList>
      <h3>{t('applicant.availabilities')}</h3>
      <div>
        <button onClick={handleNewAvailabilityButton}>
          {t('applicant.add-availability')}
        </button>
      </div>
      <DateRange
        locale={getLocale()}
        ranges={selectionList}
        minDate={new Date()}
        maxDate={addYears(new Date(), 1)}
        onChange={handleDateRangeSet}
      ></DateRange>
      <div>
        <button onClick={handleSubmitApplicationButton}>
          {t('applicant.submit-application')}
        </button>
        <button onClick={handleCancelApplicationButton}>
          {t('applicant.cancel-application')}
        </button>
      </div>
      {errors.length > 0 ? errors.map(error => <div>{error}</div>) : ''}
      {resultMsg ? <div>{t('server-messages.' + resultMsg)}</div> : ''}
    </div>
  );
};

export default ApplicationForm;
