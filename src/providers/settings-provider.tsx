import React, { createContext, useState } from 'react';

import { SettingsType } from '../types/settings';

interface SettingsContextType {
  settings: SettingsType;
  setSettings: (value: SettingsType) => void;
}

export const SettingsContext = createContext<SettingsContextType>({
  settings: {
    pomodoro: null,
    shortBreak: null,
    longBreak: null,
    font: null,
    color: null,
  },
  setSettings: () => {},
});

const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [settings, setSettings] = useState<SettingsType>({
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
    font: 'sans',
    color: 'red-orange',
  });
  const setNewSettings = (value: SettingsType) => setSettings(value);

  return (
    <SettingsContext.Provider
      value={{
        settings: { ...settings },
        setSettings: setNewSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
