import React from 'react';

interface Props {
  onClick: () => void;
  text: string;
}

/**
 * Renders a button with specified text and onClick event handler.
 * @param {string} text - The text to display on the button.
 * @returns {JSX.Element} A button with specified text and onClick event handler.
 */
const Button: React.FC<Props> = React.memo(({onClick, text}) => {
  return <button onClick={onClick}>{text}</button>;
});

export default Button;
