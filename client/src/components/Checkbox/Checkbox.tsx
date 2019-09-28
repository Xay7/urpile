import React from "react";
import styled from "styled-components";

interface Props {
  checked: boolean;
  onChange: () => void;
  label: string;
}

const Checkbox: React.FC<Props> = props => {
  return (
    <Label>
      <HiddenCheckbox type="checkbox" onChange={props.onChange} />
      <StyledCheckbox checked={props.checked}>
        <Icon viewBox="0 0 24 24">
          <polyline points="20 6 9 17 4 12" />
        </Icon>
      </StyledCheckbox>
      <Span style={{ fontSize: "1.3rem", marginLeft: "8px" }}>{props.label}</Span>
    </Label>
  );
};

const HiddenCheckbox = styled("input")<any>`
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`;

const StyledCheckbox = styled("div")<any>`
  display: inline-block;
  width: 16px;
  height: 16px;
  background: ${(props: any) => (props.checked ? props.theme.primary : "white")};
  border: 1px solid ${(props: any) => (props.checked ? props.theme.primary : "#d0d0d0")};
  border-radius: 3px;
  transition: all 150ms;

  ${Icon} {
    visibility: ${(props: any) => (props.checked ? "visible" : "hidden")};
  }

  &:hover {
    cursor: pointer;
  }
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  margin: 10px 0;
  width: 100%;
`;

const Span = styled.span`
  color: ${props => props.theme.black};
  &:hover {
    cursor: pointer;
  }
`;

export default Checkbox;
