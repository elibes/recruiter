import React from 'react';

interface Props {
  onClick: () => void;
  text: string;
}

const Button: React.FC<Props> = ({onClick, text}) => {
  return <button onClick={onClick}>{text}</button>;
};

export default Button;
