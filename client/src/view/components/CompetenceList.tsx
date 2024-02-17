import {FC, useEffect} from 'react';
import CompetenceItem from './CompetenceItem';
import {getCompetencies} from '../../viewmodel/applicationSlice';
import {useSelector, useDispatch} from 'react-redux';
import {AppDispatch, RootState} from '../../store';

interface CompetenceItemProps {
  itemId: number;
  competenceName: string;
}

interface CompetenceListProps {
  items: CompetenceItemProps[];
}
const CompetenceList: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getCompetencies());
  }, [dispatch]);

  const competencies = useSelector(
    (state: RootState) => state.application.competencies
  );

  return (
    <div>
      {competencies.map(competence => (
        <CompetenceItem
          key={competence.competenceId}
          {...competence}
        ></CompetenceItem>
      ))}
    </div>
  );
};

export default CompetenceList;
