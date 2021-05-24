import React from 'react';
import styled from 'styled-components';

interface ButtonType extends React.ComponentPropsWithRef<'button'> {}

const StyledButton = styled.button`
  appearance: none;
  background: none;
  border: none;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
`;

const Button = React.forwardRef<Ref, ButtonType>((props, ref) => {
  const { type, children, ...otherProps } = props;
  return (
    <StyledButton ref={ref} type={type || 'button'} {...otherProps}>
      {children}
    </StyledButton>
  );
});

export type Ref = HTMLButtonElement;
export default Button;
