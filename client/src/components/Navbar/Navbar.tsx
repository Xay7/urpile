import React from "react";
import styled from "styled-components";

const Navbar: React.FC = () => {
  return (
    <StyledNavbar>
      <Logo />
    </StyledNavbar>
  );
};

const StyledNavbar = styled.nav`
  width: 100%;
  height: 64px;
  background-color: blue;
`;

const Logo = styled.img`
  height: 60px;
  width: auto;
`;

export default Navbar;
