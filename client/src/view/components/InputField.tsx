import React from 'react';

interface Props {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<Props> = ({label,type,value,onChange})=>{
  return (
    <div>
      <label>
        {label}:
        <input type={type} value={value} onChange={onChange} required/>
      </label>
    </div>
  );
};

export default InputField;
