import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  setCompetence,
  setCompetenceYears,
} from '../../viewmodel/applicationSlice';
import {RootState} from '../../store';

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

  return (
    <div>
      <input
        type={'checkbox'}
        id={`itemCheckbox-${competenceId}`}
        checked={hasCompetence}
        onClick={() => dispatch(setCompetence({competenceId}))}
      />
      <span>{competenceName}</span>
      <span>{'   Years of experience: '}</span>
      <input
        type={'text'}
        id={`itemInput-${competenceId}`}
        value={yearsOfExperience}
        onChange={e =>
          dispatch(
            setCompetenceYears({
              competenceId: competenceId,
              years: e.target.value,
            })
          )
        }
      />
    </div>
  );
};

export default CompetenceItem;
