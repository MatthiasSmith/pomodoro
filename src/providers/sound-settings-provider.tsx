import React, { createContext, useState } from 'react';
import { SoundSettingsType } from '../types/sound-settings';

interface SoundSettingsContextType {
  soundSettings: SoundSettingsType;
  setSoundSettings: (value: SoundSettingsType) => void;
}

export const SoundSettingsContext = createContext<SoundSettingsContextType>({
  soundSettings: {
    volume: null,
    soundEnabled: false,
  },
  setSoundSettings: () => {},
});

const SoundSettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [soundSettings, setSoundSettings] = useState<SoundSettingsType>({
    volume: 0.85,
    soundEnabled: true,
  });
  const setNewSoundSettings = (value: SoundSettingsType) =>
    setSoundSettings(value);

  return (
    <SoundSettingsContext.Provider
      value={{
        soundSettings: {
          ...soundSettings,
        },
        setSoundSettings: setNewSoundSettings,
      }}
    >
      {children}
    </SoundSettingsContext.Provider>
  );
};

export default SoundSettingsProvider;
