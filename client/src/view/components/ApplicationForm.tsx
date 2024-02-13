import React, {FC, useReducer} from 'react';
import CompetenceList from './CompetenceList';

const testList = {
  items: [
    {itemId: 1, competenceName: 'climbing'},
    {itemId: 2, competenceName: 'falling'},
  ],
};
const ApplicationForm: FC = () => {
  return (
    <div>
      <CompetenceList items={testList.items}></CompetenceList>
    </div>
  );
};

export default ApplicationForm;
