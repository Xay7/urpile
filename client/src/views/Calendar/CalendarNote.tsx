import React from 'react';
import styled from 'styled-components';

interface Props {
  starting?: boolean;
  ending?: boolean;
  rowEnd?: boolean;
  overflow?: boolean;
}

const CalendarNote: React.FC<Props> = ({ starting, ending, rowEnd, children, overflow }) => {
  return (
    <StyledCalendarNote starting={starting} ending={ending} rowEnd={rowEnd} overflow={overflow ? 1 : 0}>
      {children}
    </StyledCalendarNote>
  );
};

const StyledCalendarNote = styled('div')<any>`
  width: auto;
  padding: 3px 10px;
  height: 20px;
  margin-left: ${props => props.starting && '10px'};
  display: flex;
  align-items: center;
  font-size: 14px;
  color: white;
  background-color: ${props => props.theme.primary};
  position: relative;
  transition: 100ms all;
  z-index: 3;
  box-sizing: border-box;
  &:hover {
    cursor: pointer;
    background-color: #0767b2;
  }
`;

export default CalendarNote;
