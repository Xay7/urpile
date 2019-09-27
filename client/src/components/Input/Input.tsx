import React from "react";
import styled from "styled-components";

interface Props {
  type: string;
  placeholder?: string;
  autoComplete?: string;
}

const Input: React.FC<Props> = props => {
  return <StyledInput type={props.type} placeholder={props.placeholder} autoComplete={props.autoComplete} />;
};

const StyledInput = styled.input`
  width: 240px;
  height: 50px;
  outline: none;
  padding: 0 20px;
  margin: 5px;
  border: none;
  background-color: #edf2f7;
`;
export default Input;
