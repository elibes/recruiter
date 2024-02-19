import * as React from 'react';
import {useDispatch} from 'react-redux';
import {
  setCompetence,
  setCompetenceYears,
} from '../../viewmodel/applicationSlice';
import {validateYearsOfExperience} from '../../util/validation';
import {useState} from 'react';

/**
 * This interface defines the shape of the competence data props, passed down by the higher level component.
 */
interface ListItemProps {
  competenceId: number;
  competenceName: string;
  hasCompetence: boolean;
  yearsOfExperience: number;
}

/**
 * This component is responsible for rendering a single competence input, allowing the user to specify
 * if they have the competence or not and the years of experience if they do.
 * @param competenceId the id of the competence
 * @param competenceName the name of the competence
 * @param hasCompetence a boolean value representing if the user has the competence or not
 * @param yearsOfExperience a number representing the years of experience a user has with the competence.
 * @component
 */
const CompetenceItem: React.FC<ListItemProps> = ({
  competenceId,
  competenceName,
  hasCompetence,
  yearsOfExperience,
}) => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');

  /**
   * This function handles the event when a user specifies that they have the competence.
   */
  const handleCompetenceChecked = () => {
    dispatch(setCompetence({competenceId}));
  };

  /**
   * This function handles when a user finishes writing their competence years. It does basic validation of the input
   * and then dispatches an action to update the state if it is ok.
   * @param e the event from the input.
   */
  const handleYearsOfExperienceBlur = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (validateYearsOfExperience(e.target.value)) {
      dispatch(
        setCompetenceYears({
          competenceId: competenceId,
          years: e.target.value,
        })
      );
    }
  };

  /**
   * This function handles each change of the years of experience input. It will update the local state,
   * corresponding to the value of the input field if the change would leave the input in a valid format.
   * @param e the change event, emitted on each change in input (each key press).
   */
  const handleYearsOfExperienceChanged = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.value === '' || validateYearsOfExperience(e.target.value)) {
      setInputValue(e.target.value);
    }
  };

  return (
    <div>
      <label>
        {competenceName}
        <input
          type={'checkbox'}
          id={`CompetenceCheckbox-${competenceId}`}
          checked={hasCompetence}
          onChange={handleCompetenceChecked}
        />
        <span>{'   Years of experience: '}</span>
        <input
          type={'text'}
          id={`CompetenceInput-${competenceId}`}
          value={yearsOfExperience ? yearsOfExperience : inputValue}
          onChange={handleYearsOfExperienceChanged}
          onBlur={handleYearsOfExperienceBlur}
          disabled={!hasCompetence}
        />
      </label>
    </div>
  );
};

export default CompetenceItem;
