import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import SettingsProvider from './providers/settings-provider';

ReactDOM.render(
  <React.StrictMode>
    <SettingsProvider>
      <App />
    </SettingsProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
