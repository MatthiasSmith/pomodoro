import React from 'react';
import styled from 'styled-components';

import { TABLET_BP, DESKTOP_BP } from '../constants/breakpoints';

const LogoSvg = require('../../public/images/logo.svg');

const StyledHeader = styled.header`
  text-align: center;
  padding: 2rem 0;

  .logo-image {
    height: 32px;
    width: 153px;
  }

  @media screen and (min-width: ${TABLET_BP}em) {
    padding: 5rem 0 2.625rem;
  }

  @media screen and (min-width: ${DESKTOP_BP}em) {
    padding: 3rem 0 2.625rem;
  }
`;

const Header = () => {
  return (
    <StyledHeader>
      <h1 className='sr-only'>Pomodoro</h1>
      <img className='logo-image' src={LogoSvg} alt='' />
    </StyledHeader>
  );
};

export default Header;
