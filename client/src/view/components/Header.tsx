import '../styles/Header.css';
import * as React from 'react';
import LanguagePicker from './LanguagePicker';

/**
 * React component for the header visible at the top of the display. Has the name of
 * the website, and a language picker.
 *
 * @return A JSX element that renders the header.
 * */
const Header: React.FC = () => {
  return (
    <header>
      <span>Amusement Park Recruitment System</span>
      <span className="language-dropdown">
        <LanguagePicker />
      </span>
    </header>
  );
};

export default Header;
