import React, { useRef } from "react";
import styled from "styled-components";
import useClickOutside from "../../helpers/useClickOutside";

interface Props {
  pos: { x: number; y: number };
  outsideClick: Function;
  items: Array<{ name: string; handler: any }>;
}

const Dropdown: React.FC<Props> = ({ pos, outsideClick, items }) => {
  const ref = useRef(null);

  useClickOutside(ref, () => {
    outsideClick();
  });
  // Fixed x and y position based on the element clicked pos ????
  return (
    <>
      {
        <StyledDropdown position={{ x: pos.x - 100, y: pos.y }} ref={ref}>
          {items.map(el => {
            return (
              <Item key={el.name} onClick={el.handler}>
                {el.name}
              </Item>
            );
          })}
        </StyledDropdown>
      }
    </>
  );
};

const StyledDropdown = styled("div")<any>`
  position: fixed;
  background-color: ${props => props.theme.white};
  box-shadow: ${props => props.theme.shadows["1dp"]};
  left: ${props => props.position.x + "px"};
  top: ${props => props.position.y + "px"};
  z-index: 9999;
  width: 100px;
`;

const Item = styled.button`
  width: 100%;
  background-color: #eee;
  border: none;
  padding: 10px;
  outline: none;
  &:hover {
    background-color: #ddd;
    cursor: pointer;
  }
  &:active {
    background-color: #ccc;
  }
`;

export default Dropdown;
