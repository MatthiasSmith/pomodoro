import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import SettingsProvider from './providers/settings-provider';
import SoundSettingsProvider from './providers/sound-settings-provider';

ReactDOM.render(
  <React.StrictMode>
    <SettingsProvider>
      <SoundSettingsProvider>
        <App />
      </SoundSettingsProvider>
    </SettingsProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
