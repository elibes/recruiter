import * as React from 'react';
import {useDispatch} from 'react-redux';
import {
  setCompetence,
  setCompetenceYears,
} from '../../viewmodel/applicationSlice';
import {validateYearsOfExperience} from '../../util/validation';
import {useState} from 'react';

interface ListItemProps {
  competenceId: number;
  competenceName: string;
  hasCompetence: boolean;
  yearsOfExperience: number;
}
const CompetenceItem: React.FC<ListItemProps> = ({
  competenceId,
  competenceName,
  hasCompetence,
  yearsOfExperience,
}) => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');

  const handleCompetenceChecked = () => {
    dispatch(setCompetence({competenceId}));
  };

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
