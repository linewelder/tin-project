import { createContext, useEffect, useState } from "react";
import { IntlProvider } from 'react-intl';

import English from '../lang/en.json';
import Polish from '../lang/pl.json';

const languages = {
    "en": English,
    "pl": Polish,
};

export const LanguageContext = createContext();

function getCurrentLanguage() {
    const possible = localStorage.getItem("language") || navigator.locale;
    if (!(possible in languages)) {
        return "en";
    }

    return possible;
}

export function LanguageContextProvider({ children }) {
    const [language, setLanguage] = useState(getCurrentLanguage());

    const getLanguages = () => Object.keys(languages);

    useEffect(() => {
        if (!(language in languages)) {
            setLanguage("en");
            return;
        }

        localStorage.setItem("language", language);
    }, [language]);

    return (
        <IntlProvider locale={language} messages={languages[language]}>
            <LanguageContext.Provider value={{ setLanguage, getLanguages, language }}>
                {children}
            </LanguageContext.Provider>
        </IntlProvider>
    );
}
