import React, {FC} from 'react';
import CompetenceItem from './CompetenceItem';

interface CompetenceItemProps {
  itemId: number;
  competenceName: string;
}

interface CompetenceListProps {
  items: CompetenceItemProps[];
}
const CompetenceList: React.FC<CompetenceListProps> = ({items}) => {
  console.log(items);
  return (
    <div>
      {items.map(item => (
        <CompetenceItem key={item.itemId} {...item}></CompetenceItem>
      ))}
    </div>
  );
};

export default CompetenceList;
