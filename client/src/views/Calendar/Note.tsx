import React from "react";
import styled from "styled-components";

interface Props {
  starting?: boolean;
  ending?: boolean;
  rowEnd?: boolean;
  overflowLeft?: boolean;
  overflowRight?: boolean;
  id?: number;
  color: string;
}

function shadeColor(color: string, percent: number) {
  let R = parseInt(color.substring(1, 3), 16);
  let G = parseInt(color.substring(3, 5), 16);
  let B = parseInt(color.substring(5, 7), 16);
  R = Math.floor((R * (100 + percent)) / 100);
  G = Math.floor((G * (100 + percent)) / 100);
  B = Math.floor((B * (100 + percent)) / 100);

  R = R < 255 ? R : 255;
  G = G < 255 ? G : 255;
  B = B < 255 ? B : 255;

  const RR = R.toString(16).length === 1 ? "0" + R.toString(16) : R.toString(16);
  const GG = G.toString(16).length === 1 ? "0" + G.toString(16) : G.toString(16);
  const BB = B.toString(16).length === 1 ? "0" + B.toString(16) : B.toString(16);

  return "#" + RR + GG + BB;
}

const Note: React.FC<Props> = ({ starting, ending, rowEnd, children, overflowLeft, overflowRight, id, color }) => {
  React.useEffect(() => {
    const noteContainers = document.getElementsByClassName(id.toString()) as HTMLCollectionOf<HTMLElement>;
    const collectionLength = noteContainers.length;
    function changeColor(color: string) {
      for (let i = 0; i < collectionLength; i++) {
        noteContainers[i].style.backgroundColor = color;
      }
    }
    for (let i = 0; i < collectionLength; i++) {
      noteContainers[i].onmouseover = function() {
        changeColor(shadeColor(color, -20));
      };
      noteContainers[i].onmouseout = function() {
        changeColor(color);
      };
    }
  });

  return (
    <StyledCalendarNote
      starting={starting}
      ending={ending}
      rowEnd={rowEnd}
      overflowLeft={overflowLeft}
      overflowRight={overflowRight}
      className={id}
      color={color}>
      <Span>{children}</Span>
    </StyledCalendarNote>
  );
};

const StyledCalendarNote = styled("div")<any>`
  position: relative;
  width: inherit;
  padding: 3px 10px;
  height: 20px;
  margin: 3px 10px 0 10px;
  margin-right: ${props => props.overflowRight && 0};
  margin-left: ${props => props.overflowLeft && 0};
  border-radius: ${props => (props.overflowRight ? "25px 0 0 25px" : props.overflowLeft ? "0 25px 25px 0" : "25px")};
  border-radius: ${props => props.overflowRight && props.overflowLeft && "0px"};
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  color: white;
  background-color: ${props => props.color};
  transition: 100ms all;
  z-index: 3;
  box-sizing: border-box;

  &:hover {
    cursor: pointer;
  }
`;

const Span = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export default Note;
