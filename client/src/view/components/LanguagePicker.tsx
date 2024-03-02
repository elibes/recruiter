import * as React from 'react';
import i18next from 'i18next';
import {supportedLngs} from '../../util/i18n';

/* *
 * React component for rendering the language picker. Is a drop-down meny used by
 * the header to let the user change the language of the website.
 *
 * @return A JSX component that renders the language picker.
 * */
const LanguagePicker: React.FC = () => {
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
    <div>
      <select value={currentLanguage} onChange={changeLanguage}>
        {Object.entries(supportedLngs).map(([code, name]) => (
          <option value={code} key={code}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguagePicker;
