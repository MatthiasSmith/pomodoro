import React from 'react';
import styled from 'styled-components';

interface ButtonType extends React.ComponentPropsWithoutRef<'button'> {}

const StyledButton = styled.button`
  appearance: none;
  background: none;
  border: none;
  cursor: pointer;
`;

const Button = (props: ButtonType) => {
  const { type, children, ...otherProps } = props;
  return (
    <StyledButton type={type || 'button'} {...otherProps}>
      {children}
    </StyledButton>
  );
};

export default Button;
