import React from "react";
import styled from "styled-components";
import logo from "../../assets/logo.svg";

const Navbar: React.FC = () => {
  return (
    <StyledNavbar>
      <List>
        <Logo src={logo} />
        <Item>All</Item>
        <Item>Top</Item>
        <Item>Best</Item>
      </List>
      <List>
        <Item>Register</Item>
        <Item>Login</Item>
      </List>
    </StyledNavbar>
  );
};

const StyledNavbar = styled.nav`
  height: 54px;
  background-color: yellow;
  padding: 0 160px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.img`
  height: 30px;
  padding: 1rem;
`;

const List = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  list-style-type: none;
  margin: 0;
`;

const Item = styled.li`
  padding: 1rem;
  &:hover {
    cursor: pointer;
  }
`;

export default Navbar;
