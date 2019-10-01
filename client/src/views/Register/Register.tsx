import React, { useState } from "react";
import Input from "../../components/Input/Input";
import styled from "styled-components";
import Button from "../../components/Button/Button";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

const Register: React.FC = props => {
  const history = useHistory();
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    server: ""
  });
  const [isFormValid, setIsFormValid] = useState(true);

  const formHandler = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const username = (e.currentTarget[0] as HTMLInputElement).value;
    const email = (e.currentTarget[1] as HTMLInputElement).value;
    const password = (e.currentTarget[2] as HTMLInputElement).value;
    const confirmPassword = (e.currentTarget[3] as HTMLInputElement).value;

    const isValid = validate(username, email, password, confirmPassword);
    if (!isValid) {
      setIsFormValid(false);
      return;
    } else setIsFormValid(true);

    try {
      await axios.post("/users/register", { username, email, password, confirmPassword });
      history.push({
        pathname: "login",
        state: { registered: true }
      });
    } catch (error) {
      let errorMessage = "Something went wrong";
      if (error.response.data) {
        errorMessage = error.response.data;
      }
      setErrors({ ...error, serverError: errorMessage });
    }
  };

  const validate = (username: string, email: string, password: string, confirmPassword: string) => {
    const _errors = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      server: ""
    };

    let isValid = true;
    const isEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );

    if (username.length < 3) {
      isValid = false;
      _errors.username = "Username must be atleast 3 characters long";
    }
    if (!isEmail) {
      isValid = false;
      _errors.email = "Email must be valid";
    }
    if (password.length < 6) {
      isValid = false;
      _errors.password = "Password must be atleast 6 characters long";
    }
    if (confirmPassword !== password || confirmPassword.length === 0) {
      isValid = false;
      _errors.confirmPassword = "Passwords must match";
    }
    setErrors(_errors);
    return isValid;
  };

  return (
    <StyledRegister>
      <Container>
        <Header>Create account</Header>
        {!isFormValid && <ErrorMessage message={errors} />}
        <Form onSubmit={formHandler}>
          <Input type="text" placeholder="Username" error={errors.username} />
          <Input type="email" placeholder="Email" error={errors.email} autoComplete="new-password" />
          <Input type="password" placeholder="Password" error={errors.password} autoComplete="new-password" />
          <Input
            type="password"
            placeholder="Confirm password"
            error={errors.confirmPassword}
            autoComplete="new-password"
          />
          <Button>Continue</Button>
        </Form>
      </Container>
      <span style={{ fontSize: "1.3rem", margin: "10px" }}>
        Arleady registered?&nbsp;
        <Link to="/login" style={{ textDecoration: "none", color: "#0984e3" }}>
          Sign in
        </Link>
      </span>
    </StyledRegister>
  );
};

const StyledRegister = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: ${props => props.theme.white};
  width: 280px;
  padding: 0 30px 24px 30px;
  box-shadow: ${props => props.theme.shadows["3dp"]};
  border-radius: 5px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.white};
  width: 100%;
  button {
    margin-top: 24px;
  }
`;

const Header = styled.h3`
  font-size: 2.4rem;
  margin-bottom: 9px;
  color: ${props => props.theme.black};
`;

export default Register;
