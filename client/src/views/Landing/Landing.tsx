import React from "react";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";

const Landing: React.FC = () => {
  return (
    <div>
      <Link to="/login" style={{ textDecoration: "none" }}>
        <Button>Login</Button>
      </Link>
      <Link to="/register" style={{ textDecoration: "none" }}>
        <Button>Register</Button>
      </Link>
    </div>
  );
};

export default Landing;
