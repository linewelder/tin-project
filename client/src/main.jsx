import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { IntlProvider } from 'react-intl';

import English from '../lang/en.json';
import { ApiContextProvider } from './apiContext.jsx';

const locale = navigator.language;

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <IntlProvider locale={locale} messages={English}>
            <ApiContextProvider>
                <App />
            </ApiContextProvider>
        </IntlProvider>
    </React.StrictMode>
);
