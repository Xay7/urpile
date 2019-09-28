import React, { useState } from "react";
import styled from "styled-components";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Checkbox from "../../components/Checkbox/Checkbox";
import axios from "axios";
import { useHistory, RouteComponentProps, Link } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

const Login: React.FC<RouteComponentProps> = props => {
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [error, setError] = useState("");
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
    } catch (error) {
      let errorMessage = "Something went wrong";
      if (error.response.data) {
        errorMessage = error.response.data;
      }
      setError(errorMessage);
    }
  };

  return (
    <StyledLogin>
      <Container>
        <Header>Sign in</Header>
        {error && <ErrorMessage message={error} />}
        <Form onSubmit={formHandler}>
          <Input type="email" placeholder="Email" autoComplete="on" error={error} />
          <Input type="password" placeholder="Password" autoComplete="on" error={error} />
          <Checkbox
            checked={checkboxChecked}
            onChange={() => setCheckboxChecked(!checkboxChecked)}
            label={"Remember me"}
          />
          <Button>Continue</Button>
          {props.location.state && props.location.state.registered && (
            <RegisterSuccessMessage>Registration complete, you can now login</RegisterSuccessMessage>
          )}
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
  height: 100%;
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
  padding: 0 30px 24px 30px;
  width: 280px;
  box-shadow: ${props => props.theme.shadows["3dp"]};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  label {
    align-self: flex-start;
  }
`;

const Header = styled.h3`
  font-size: 2.4rem;
  margin-bottom: 9px;
`;

const RegisterSuccessMessage = styled.span`
  font-size: 1.3rem;
  color: ${props => props.theme.success};
  margin-top: 5px;
`;

export default Login;
