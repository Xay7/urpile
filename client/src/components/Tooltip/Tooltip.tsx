import React from "react";
import styled from "styled-components";

interface Props {
  position: string;
  text: string;
}

const Tooltip: React.FC<Props> = props => {
  return (
    <>
      <StyledTooltip position={props.position} text={props.text}>
        {props.children}
      </StyledTooltip>
    </>
  );
};

const StyledTooltip = styled("div")<any>`
  width: max-content;
  height: max-content;
  background-color: transparent;
  position: relative;
  z-index: 9344399;

  &:before {
    display: none;
    background: #333;
    background: rgba(0, 0, 0, 0.8);
    border-radius: 5px;
    bottom: 30px;
    transform: translate(-50%, -50%);
    left: ${props => (props.position === "left" ? "-100%" : props.position === "right" ? "200%" : "50%")};
    top: ${props =>
      props.position === "left" || props.position === "right" ? "50%" : props.position === "top" ? "-50%" : "130%"};
    color: #fff;
    content: "${props => props.text}";
    padding: 5px 15px;
    position: absolute;
    width: max-content;
    height: max-content;
    z-index: 9344399;
  }

  &:hover {
    &:before {
      display: block;
    }
  }
`;

export default Tooltip;
