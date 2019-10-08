import React, { useRef } from "react";
import styled from "styled-components";
import { ReactComponent as Copy } from "../../assets/svg/copy.svg";
import Icon from "../../components/Icon/Icon";

interface Props {
  type: string;
  placeholder?: string;
  autoComplete?: string;
  error?: string | boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  border?: boolean;
  disabled?: boolean;
  copyValue?: boolean;
}

const Input: React.FC<Props> = props => {
  const inputRef = useRef(null);
  const copyToClickboard = () => {
    navigator.clipboard.writeText(props.value ? props.value : "");
  };
  return (
    <Container>
      <StyledInput
        type={props.type}
        placeholder={props.placeholder}
        autoComplete={props.autoComplete}
        error={props.error}
        onChange={props.onChange}
        value={props.value}
        border={props.border}
        disabled={props.disabled}
        ref={inputRef}
      />
      {props.copyValue && <Icon name="copy" onClick={copyToClickboard} size="20px" />}
    </Container>
  );
};

Input.defaultProps = {
  border: true
};

const Container = styled.div`
  width: 100%;
  margin: 15px 10px 15px 10px;
  display: flex;
  align-items: center;
  position: relative;
`;

const CopyIcon = styled(Copy)`
  position: relative;
  right: 10px;
  fill: #d0d0d0;
  transition: all 150ms;
  border-radius: 50%;
  padding: 10px;
  &:hover {
    cursor: pointer;
    fill: ${props => props.theme.primary};
    background-color: #eee;
  }
`;

const StyledInput = styled("input")<any>`
  width: 100%;
  height: 40px;
  outline: none;
  padding: 0 20px;
  border: 1px solid ${props => (props.border ? (props.error ? props.theme.error : "#D0D0D0") : "transparent")};
  border-radius: 5px;
  box-sizing: border-box;
  background-color: ${props => props.theme.white};

  &:focus {
    border: 2px solid ${props => props.theme.primary};
    padding: 0 19px;

    & + ${CopyIcon} {
      fill: ${props => props.theme.primary};
    }
  }

  &::placeholder {
    color: ${props => (props.error ? props.theme.error : "#989898")};
  }
`;

export default Input;
