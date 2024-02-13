import React, {FC} from 'react';
interface ListItemProps {
  itemId: number;
  competenceName: string;
}
const CompetenceItem: React.FC<ListItemProps> = ({itemId, competenceName}) => {
  return (
    <div>
      <input type={'checkbox'} id={`itemCheckbox-${itemId}`} />
      <span>{competenceName}</span>
      <input type={'text'} id={`itemInput-${itemId}`} />
    </div>
  );
};

export default CompetenceItem;
