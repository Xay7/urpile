import React from 'react';
import styled from 'styled-components';

interface Props {
  starting?: boolean;
  ending?: boolean;
  rowEnd?: boolean;
  overflow?: boolean;
  title?: string;
}

const CalendarNote: React.FC<Props> = ({ starting, ending, rowEnd, children, overflow, title }) => {
  React.useEffect(() => {
    const noteContainers = document.getElementsByClassName(title) as HTMLCollectionOf<HTMLElement>;
    const collectionLength = noteContainers.length;
    function changeColor(color) {
      for (let i = 0; i < collectionLength; i++) {
        noteContainers[i].style.backgroundColor = color;
      }
    }
    for (let i = 0; i < collectionLength; i++) {
      noteContainers[i].onmouseover = function() {
        changeColor('red');
      };
      noteContainers[i].onmouseout = function() {
        changeColor('#0984e3');
      };
    }
  });

  return (
    <StyledCalendarNote starting={starting} ending={ending} rowEnd={rowEnd} overflow={overflow ? 1 : 0} className={title}>
      {children}
    </StyledCalendarNote>
  );
};

const StyledCalendarNote = styled('div')<any>`
  width: auto;
  padding: 3px 10px;
  height: 20px;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 3px;
  display: flex;
  align-items: center;
  font-size: 14px;
  color: white;
  background-color: ${props => props.theme.primary};
  position: relative;
  transition: 150ms all;
  z-index: 3;
  box-sizing: border-box;
  &:hover {
    cursor: pointer;
  }
`;

export default CalendarNote;
