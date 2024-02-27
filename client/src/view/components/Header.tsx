import '../styles/Header.css';
import * as React from 'react';
import i18next from 'i18next';

const Header: React.FC = () => {
  const [currentLanguage, setCurrentLanguage] = React.useState<string>(
    i18next.resolvedLanguage
  );

  React.useEffect(() => {
    const languageChanged = (newLanguage: string) => {
      setCurrentLanguage(newLanguage);
    };
    i18next.on('languageChanged', languageChanged);
    return () => {
      i18next.off('languageChanged', languageChanged);
    };
  }, []);

  const changeLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = event.target.value;
    i18next.changeLanguage(newLanguage).then(() => {
      setCurrentLanguage(i18next.resolvedLanguage);
    });
  };

  return (
    <header>
      <span>Amusement Park Recruitment System</span>
      <div className="language-dropdown">
        <select value={currentLanguage} onChange={changeLanguage}>
          <option key="en" value="en">
            🇬🇧 English
          </option>
          <option key="sv" value="sv">
            🇸🇪 Svenska
          </option>
        </select>
      </div>
    </header>
  );
};

export default Header;
