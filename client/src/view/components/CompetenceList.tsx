import {FC, useEffect} from 'react';
import CompetenceItem from './CompetenceItem';
import {getCompetencies} from '../../viewmodel/ApplicationViewModel';
import {AppDispatch, RootState} from '../../viewmodel/reduxStore';
import {useSelector, useDispatch} from 'react-redux';

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
