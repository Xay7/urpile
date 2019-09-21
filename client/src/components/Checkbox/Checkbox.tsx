import React from "react";
import styled from "styled-components";

interface Props {
  name?: string;
  value?: string;
  isChecked: boolean;
  handleChange: () => void;
}

const Checkbox: React.FC<Props> = props => {
  return (
    <StyledCheckbox>
      <Input type="checkbox" id="checkbox" checked={props.isChecked} onChange={() => props.handleChange()}></Input>
      <Label htmlFor="checkbox">Remember me</Label>
    </StyledCheckbox>
  );
};

const StyledCheckbox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  input[type="checkbox"] + label:after {
    content: none;
  }

  input[type="checkbox"]:checked + label:after {
    content: "";
  }
  margin: 5px;
`;

const Input = styled.input`
  opacity: 0;
  position: absolute;
`;

const Label = styled.label`
  position: relative;
  padding-left: 22px;
  font-size: 1.4rem;
  line-height: 2.1rem;
  transition: 350ms all;
  &:before {
    content: "";
    display: inline-block;
    height: 16px;
    width: 16px;
    border: 1px solid;
    position: absolute;
    left: 0;
    top: 3px;
  }

  &:after {
    content: "";
    display: inline-block;
    height: 6px;
    width: 9px;
    border-left: 2px solid;
    border-bottom: 2px solid;
    position: absolute;
    transform: rotate(-45deg);
    left: 4px;
    top: 6px;
  }
`;

export default Checkbox;
