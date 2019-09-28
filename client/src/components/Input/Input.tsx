import React from "react";
import styled from "styled-components";

interface Props {
  type: string;
  placeholder?: string;
  autoComplete?: string;
  error?: string;
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
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  margin: 15px 10px 7px 10px;
`;

const StyledInput = styled("input")<any>`
  width: 100%;
  height: 40px;
  outline: none;
  padding: 0 20px;
  border: 1px solid ${props => (props.error ? props.theme.error : "#D0D0D0")};
  border-radius: 5px;
  box-sizing: border-box;

  &:focus {
    border: 2px solid ${props => props.theme.primary};
    padding: 0 19px;
  }

  &::placeholder {
    color: ${props => (props.error ? props.theme.error : "#989898")};
  }
`;

export default Input;
