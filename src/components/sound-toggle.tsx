import React, { useContext } from 'react';
import styled from 'styled-components';
import useSound from 'use-sound';

import Button from './button';
import { SoundSettingsContext } from '../providers/sound-settings-provider';
import { DESKTOP_BP, TABLET_BP } from '../constants/breakpoints';

const volumeOn = require('../../public/assets/volume-on.svg');
const volumeOff = require('../../public/assets/volume-off.svg');
const soundOnSFX = require('../../public/sounds/sound-on.mp3');
const soundOffSFX = require('../../public/sounds/sound-off.mp3');

const StyledSoundToggle = styled(Button)`
  position: absolute;
  right: 1.5rem;
  top: 2.25rem;
  height: 1.55rem;
  width: 1.55rem;

  &:focus {
    outline: none;
  }

  &:focus-visible {
    border-radius: 0.25rem;
    box-shadow: 0rem 0rem 0rem 0.125rem var(--darker-blue),
      0rem 0rem 0rem 0.25rem rgba(255, 255, 255, 0.38);
  }

  .icon {
    height: 1.55rem;
    width: 1.55rem;
  }

  @media screen and (min-width: ${TABLET_BP}em) {
    right: 3rem;
    top: 5.25rem;
  }

  @media screen and (min-width: ${DESKTOP_BP}em) {
    right: 5rem;
    top: 3.25rem;
  }
`;

const SoundToggle = () => {
  const { soundSettings, setSoundSettings } = useContext(SoundSettingsContext);
  const [playSoundOn] = useSound(soundOnSFX, {
    volume: soundSettings.volume,
  });
  const [playSoundOff] = useSound(soundOffSFX, {
    volume: soundSettings.volume,
  });

  const handleClick = () => {
    soundSettings.soundEnabled ? playSoundOff() : playSoundOn();
    setSoundSettings({
      ...soundSettings,
      soundEnabled: !soundSettings.soundEnabled,
    });
  };

  return (
    <>
      <StyledSoundToggle
        id='sound-toggle'
        role='switch'
        aria-checked={soundSettings.soundEnabled}
        onClick={handleClick}
      >
        {soundSettings.soundEnabled ? (
          <img className='icon' src={volumeOn} alt='' />
        ) : (
          <img className='icon' src={volumeOff} alt='' />
        )}
      </StyledSoundToggle>
      <label htmlFor='sound-toggle' className='sr-only'>
        {soundSettings.soundEnabled ? 'Turn sound off' : 'Turn sound on'}
      </label>
    </>
  );
};

export default SoundToggle;
