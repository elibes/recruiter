import '../styles/Header.css';
import * as React from 'react';

const Header = () => {
  return (
    <header>
      <span>Ammusement Park Recruitment System</span>
      <div className="language-dropdown">
        <select>
          <option>🇬🇧English</option>
          <option>🇸🇪Svenska</option>
        </select>
      </div>
    </header>
  );
};

export default Header;
