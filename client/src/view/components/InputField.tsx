import React from 'react';

interface Props {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Renders an input field with a label, type, value, and onChange event handler.
 * @param {string} label - The label text for the input field.
 * @returns {JSX.Element} A labeled input field with specified attributes.
 */
const InputField: React.FC<Props> = ({label, type, value, onChange}) => {
  return (
    <div>
      <label>
        {label}:
        <input type={type} value={value} onChange={onChange} required />
      </label>
    </div>
  );
};

export default InputField;