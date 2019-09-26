import React from "react";
import styled from "styled-components";
import logo from "../../assets/logo.svg";

const Navbar: React.FC = props => {
  return (
    <StyledNavbar>
      <List>
        <Logo src={logo} />
        <Item>Notes</Item>
        <Item>Todo</Item>
        <Item>Calendar</Item>
        <Item>Passwords</Item>
      </List>
    </StyledNavbar>
  );
};

const StyledNavbar = styled.nav`
  position: fixed;
  height: calc(100vh - 100px);
  padding: 50px 0;
  width: 240px;
  background-color: yellow;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.img`
  height: 30px;
  padding: 1rem;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const Item = styled.li`
  padding: 1rem;
  font-size: 1.6rem;
  &:hover {
    cursor: pointer;
  }
`;

export default Navbar;
