import React, { ReactElement } from "react";
import styled from "styled-components";

interface Props {
  message: string | { [s: string]: string } | Array<string>;
}

const ErrorMessage: React.FC<Props> = props => {
  return (
    <StyledErrorMessage>
      <List>
        {typeof props.message === "string" && <Message>{props.message}</Message>}
        {typeof props.message === "object" &&
          Object.values(props.message as object).map((message): ReactElement | null => {
            if (message) {
              return <Message key={message}>{message}</Message>;
            } else return null;
          })}
        {props.message instanceof Array &&
          props.message.map((message): ReactElement | null => {
            if (message) {
              return <Message key={message}>{message}</Message>;
            } else return null;
          })}
      </List>
    </StyledErrorMessage>
  );
};

const StyledErrorMessage = styled.div`
  background-color: #ffbaba;
  color: ${props => props.theme.error};
  width: 100%;
  height: max-content;
  display: flex;
  align-items: center;
  border-radius: 5px;
  box-sizing: border-box;
  margin: 5px 0;
  padding: 5px 20px;
`;

const Message = styled.li`
  font-size: 1.2rem;
  margin: 0;
  padding: 3px 5px 3px 0px;
  font-weight: 700;
`;

const List = styled.ul`
  padding: 0;
  list-style: none;
`;

export default ErrorMessage;
