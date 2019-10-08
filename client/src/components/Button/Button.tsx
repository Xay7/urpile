import React from "react";
import styled from "styled-components";

interface Props {
  style?: object;
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<Props> = ({ style, onClick, children, disabled }) => {
  return (
    <StyledButton style={style} onClick={onClick} disabled={disabled}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  width: calc(100% - 20px);
  margin: 10px;
  height: 40px;
  border: none;
  background-color: ${props => (props.disabled ? "#bbb" : props.theme.primary)};
  color: ${props => props.theme.white};
  font-size: 1.8rem;
  border-radius: 5px;
  transition: all 150ms;
  outline: none;

  &:hover {
    cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
    background-color: ${props => (props.disabled ? "#aaa" : "#0767b2")};
  }
  &:active {
    background-color: #044c85;
  }
`;

export default Button;
