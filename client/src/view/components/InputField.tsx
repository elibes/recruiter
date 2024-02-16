import * as React from 'react';

/**
 * Props for InputField component.
 *
 * @interface
 * @property {string} label - The label for the input field.
 * @property {string} type - The type of the input, e.g., 'text', 'password'.
 * @property {string} value - The current value of the input field.
 * @property {Function} onChange - Callback function to handle changes to the input field.
 * @property {string} className - CSS class for custom styling.
 */
interface Props {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className: string;
}

/**
 * A reusable input field component.
 *
 * @component
 * @param {Props} props - The props for the component.
 * @returns {React.ReactElement} A div containing a label and an input element.
 */
const InputField: React.FC<Props> = ({
  label,
  type,
  value,
  onChange,
  className,
}) => {
  return (
    <div className={className}>
      <label>{label}</label>
      <input type={type} value={value} onChange={onChange} required />
    </div>
  );
};

export default InputField;
