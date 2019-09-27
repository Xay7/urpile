import React from "react";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Landing: React.FC = () => {
  return (
    <StyledLanding>
      <Link to="/login" style={{ textDecoration: "none" }}>
        <Button>Login</Button>
      </Link>
      <Link to="/register" style={{ textDecoration: "none" }}>
        <Button>Register</Button>
      </Link>
    </StyledLanding>
  );
};

const StyledLanding = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export default Landing;
