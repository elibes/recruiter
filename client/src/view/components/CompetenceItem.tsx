import * as React from 'react';
import {useDispatch} from 'react-redux';
import {
  setCompetence,
  setCompetenceYears,
} from '../../viewmodel/ApplicationViewModel';

interface ListItemProps {
  competenceId: number;
  competenceName: string;
}
const CompetenceItem: React.FC<ListItemProps> = ({
  competenceId,
  competenceName,
}) => {
  const dispatch = useDispatch();
  return (
    <div>
      <input
        type={'checkbox'}
        id={`itemCheckbox-${competenceId}`}
        onClick={() => dispatch(setCompetence({competenceId}))}
      />
      <span>{competenceName}</span>
      <span>{'   Years of experience: '}</span>
      <input
        type={'text'}
        id={`itemInput-${competenceId}`}
        onBlur={e =>
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
