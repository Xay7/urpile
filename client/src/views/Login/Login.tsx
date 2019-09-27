import React, { useState } from "react";
import styled from "styled-components";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Checkbox from "../../components/Checkbox/Checkbox";
import axios from "axios";
import { RouteComponentProps } from "react-router-dom";

const Login: React.FC<RouteComponentProps> = props => {
  const [checkboxChecked, setCheckboxChecked] = useState(false);

  const formHandler = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const email = (e.currentTarget[0] as HTMLInputElement).value;
    const password = (e.currentTarget[1] as HTMLInputElement).value;

    try {
      await axios.post("/users/login", { email, password, remember: checkboxChecked });
      props.history.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StyledLogin>
      <Container>
        <Header>Login</Header>
        <Form onSubmit={formHandler}>
          <Input type="email" placeholder="Email" autoComplete="on" />
          <Input type="password" placeholder="Password" autoComplete="on" />
          <Checkbox isChecked={checkboxChecked} handleChange={() => setCheckboxChecked(!checkboxChecked)} />
          <Button>Login</Button>
        </Form>
      </Container>
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
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  div {
    align-self: flex-start;
  }
`;

const Header = styled.h3`
  font-size: 2.4rem;
`;

export default Login;
