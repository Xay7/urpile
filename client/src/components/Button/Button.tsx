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
  margin: 5px;
  height: 50px;
  border: none;
  background-color: green;
  color: white;
  text-transform: uppercase;
  font-size: 1.8rem;

  &:hover {
    cursor: pointer;
  }
`;

export default Button;
