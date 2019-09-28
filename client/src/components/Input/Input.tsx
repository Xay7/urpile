import React from "react";
import styled from "styled-components";

interface Props {
  type: string;
  placeholder?: string;
  autoComplete?: string;
  error?: boolean;
  errorMessage?: string;
}

const Input: React.FC<Props> = props => {
  return (
    <Container>
      <StyledInput
        type={props.type}
        placeholder={props.placeholder}
        autoComplete={props.autoComplete}
        error={props.error}
      />
      {props.errorMessage && <ErrorText>{props.errorMessage}</ErrorText>}
    </Container>
  );
};

const Container = styled.div``;

const StyledInput = styled("input")<any>`
  width: 280px;
  height: 40px;
  outline: none;
  padding: 0 20px;
  margin: 15px 10px 7px 10px;
  border: 1px solid ${props => (props.error ? props.theme.error : "#D0D0D0")};
  border-radius: 5px;
  box-sizing: border-box;

  &:focus {
    border: 2px solid ${props => props.theme.primary};
    padding: 0 19px;
  }

  &::placeholder {
    color: #989898;
  }
`;

const ErrorText = styled.p`
  font-size: 1.2rem;
  align-self: flex-start;
  margin: 0 10px;
  color: red;
`;
export default Input;
