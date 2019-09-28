import React from "react";
import styled from "styled-components";

interface Props {
  idk?: string;
}

const Button: React.FC<Props> = props => {
  return <StyledButton>{props.children}</StyledButton>;
};

const StyledButton = styled.button`
  width: 280px;
  margin: 10px;
  height: 40px;
  border: none;
  background-color: ${props => props.theme.primary};
  color: white;
  font-size: 1.8rem;
  border-radius: 5px;
  transition: all 150ms;

  &:hover {
    cursor: pointer;
    background-color: #0767b2;
  }
`;

export default Button;
