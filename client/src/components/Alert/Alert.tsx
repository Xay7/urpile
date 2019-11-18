import React from "react";
import styled from "styled-components";

interface Props {
  message: string;
}

const Alert: React.FC<Props> = ({ children, message }) => {
  return <StyledAlert>{message}</StyledAlert>;
};

const StyledAlert = styled.div`
  position: fixed;
  width: 150px;
  height: max-content;
  border-radius: 5px;
  padding: 20px;
  background-color: ${props => props.theme.success};
  font-size: 14px;
  color: white;
  display: flex;
  flex-direction: column;
  box-shadow: ${props => props.theme.shadows["2dp"]};
  bottom: 20px;
  right: 20px;
`;

export default Alert;
