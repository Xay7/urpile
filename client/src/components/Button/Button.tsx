import React from 'react';
import styled from 'styled-components';

interface Props {
  style?: object;
  onClick?: () => void;
  disabled?: boolean;
  size?: 'lg' | 'sm';
}

const Button: React.FC<Props> = ({ style, onClick, children, disabled, size }) => {
  let [width, height, fontSize, padding] = ['calc(100% - 20px)', '38px', '1.8rem', '8px 16px'];

  if (size === 'sm') {
    width = '80px';
    fontSize = '1.4rem';
    padding = '4px 8px';
  } else if (size === 'lg') {
    width = '120px';
    height = '45px';
  }

  return (
    <StyledButton style={style} onClick={onClick} disabled={disabled} width={width} height={height} fontSize={fontSize} padding={padding}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled('button')<any>`
  width: ${props => props.width};
  margin: 10px;
  height: ${props => props.height};
  border: none;
  padding: ${props => props.padding};
  background-color: ${props => (props.disabled ? '#bbb' : props.theme.primary)};
  color: ${props => props.theme.white};
  font-size: ${props => props.fontSize};
  border-radius: 5px;
  transition: all 150ms;
  outline: none;
  box-sizing: border-box;
  &:hover {
    cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
    background-color: ${props => (props.disabled ? '#aaa' : '#0767b2')};
  }
  &:active {
    background-color: #044c85;
  }
`;

export default Button;
