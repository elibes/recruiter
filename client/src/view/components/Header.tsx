import '../styles/Header.css';
import * as React from 'react';
import i18next from 'i18next';

const Header = () => {
  const changeLanguage = event => {
    const newLanguage = event.target.value;
    i18next.changeLanguage(newLanguage).then(() => {
      console.log('changed the language');
      console.log(i18next.resolvedLanguage);
    });
  };
  return (
    <header>
      <span>Amusement Park Recruitment System</span>
      <div className="language-dropdown">
        <select onChange={changeLanguage}>
          {i18next.languages.map(lang => (
            <option>{lang}</option>
          ))}
        </select>
      </div>
    </header>
  );
};

export default Header;
