import React from 'react';
import styled from 'styled-components';

const LogoSvg = require('../../public/assets/logo.svg');

const StyledHeader = styled.header`
  text-align: center;
  padding: 2rem 0;

  .logo-image {
    height: 32px;
    width: 153px;
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
