import React, { useState } from "react";
import styled from "styled-components";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Checkbox from "../../components/Checkbox/Checkbox";
import axios from "axios";
import { useHistory, RouteComponentProps, Link } from "react-router-dom";

const Login: React.FC<RouteComponentProps> = props => {
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const history = useHistory();

  const formHandler = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const email = (e.currentTarget[0] as HTMLInputElement).value;
    const password = (e.currentTarget[1] as HTMLInputElement).value;
    const remember = (e.currentTarget[2] as HTMLInputElement).checked;

    try {
      await axios.post("/users/login", { email, password, remember: remember });
      if (remember) {
        localStorage.setItem("remember", "true");
      }
      history.push("/dashboard");
    } catch (error) {}
  };

  return (
    <StyledLogin>
      <Container>
        <Header>Sign in</Header>
        <Form onSubmit={formHandler}>
          <Input type="email" placeholder="Email" autoComplete="on" />
          <Input type="password" placeholder="Password" autoComplete="on" />
          <Checkbox
            checked={checkboxChecked}
            onChange={() => setCheckboxChecked(!checkboxChecked)}
            label={"Remember me"}
          />
          {props.location.state && props.location.state.registered && <div>Success, you can login.</div>}
          <Button>Continue</Button>
        </Form>
      </Container>
      <span style={{ fontSize: "1.3rem", margin: "10px" }}>
        Don&apos;t have an account?&nbsp;
        <Link to="/register" style={{ textDecoration: "none", color: "blue" }}>
          Sign up
        </Link>
      </span>
    </StyledLogin>
  );
};

const StyledLogin = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: white;
  box-shadow: ${props => props.theme.shadows["3dp"]};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 30px 24px 30px;

  label {
    align-self: flex-start;
  }
`;

const Header = styled.h3`
  font-size: 2.4rem;
  margin-bottom: 9px;
`;

export default Login;
