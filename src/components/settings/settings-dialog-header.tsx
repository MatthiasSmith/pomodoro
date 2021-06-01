import React from 'react';
import styled from 'styled-components';

import { TABLET_BP } from '../../constants/breakpoints';
import Button from '../button';

const StyledSettingsDialogHeader = styled.header`
  padding: 1.5rem 1.5rem 1.75rem;

  .settings-heading {
    font-size: 1.5rem;
  }

  .close-btn {
    height: 28px;
    width: 28px;

    &:focus {
      outline: none;
      border-radius: 0.25rem;
      box-shadow: 0rem 0rem 0rem 0.125rem var(--focus-blue);
    }
  }

  @media screen and (min-width: ${TABLET_BP}em) {
    padding: 2.125rem 2.5rem 2rem;

    .settings-heading {
      font-size: 1.75rem;
    }
  }
`;

const SettingsDialogHeader = ({ onClose }: { onClose: () => void }) => {
  return (
    <StyledSettingsDialogHeader className='flex-row space-between'>
      <h2 id='settingsHeading' className='settings-heading'>
        Settings
      </h2>
      <Button
        type='button'
        className='close-btn'
        onClick={onClose}
        aria-label='Close settings dialog'
      >
        <svg
          aria-hidden={true}
          xmlns='http://www.w3.org/2000/svg'
          width='14'
          height='14'
        >
          <path
            fill='#1E213F'
            fillRule='evenodd'
            d='M11.95.636l1.414 1.414L8.414 7l4.95 4.95-1.414 1.414L7 8.414l-4.95 4.95L.636 11.95 5.586 7 .636 2.05 2.05.636 7 5.586l4.95-4.95z'
            opacity='.5'
          />
        </svg>
      </Button>
    </StyledSettingsDialogHeader>
  );
};

export default SettingsDialogHeader;
