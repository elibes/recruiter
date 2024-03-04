import {FC, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {useSelector, useDispatch} from 'react-redux';
import {AppDispatch, RootState} from '../../store';
import CompetenceItem from './CompetenceItem';
import {getCompetencies} from '../../viewmodel/applicationSlice';

/**
 * This component is responsible for displaying a list of competencies.
 * It retrieves the competence names from the back-end on mount (which sets the corresponding application state)
 * Then it will pass each entry of this state into the competenceItem component for rendering.
 * @component
 */
const CompetenceList: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getCompetencies());
  }, [dispatch]);

  const competencies = useSelector(
    (state: RootState) => state.application.competencies
  );

  const {t, i18n} = useTranslation();

  return (
    <div>
      <h3>{t('applicant.competencies')}</h3>
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
