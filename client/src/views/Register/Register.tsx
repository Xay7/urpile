import React from "react";
import Input from "../../components/Input/Input";
import styled from "styled-components";
import Button from "../../components/Button/Button";
import axios from "axios";
import { RouteComponentProps } from "react-router";

const Register: React.FC<RouteComponentProps> = props => {
  const formHandler = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const username = (e.currentTarget[0] as HTMLInputElement).value;
    const email = (e.currentTarget[1] as HTMLInputElement).value;
    const password = (e.currentTarget[2] as HTMLInputElement).value;
    try {
      await axios.post("/users/register", { username, email, password });
      props.history.push("/login");
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <StyledRegister>
      <Form onSubmit={formHandler}>
        <Input type="text" placeholder="Username" />
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" autoComplete="off" />
        <Button>Register</Button>
      </Form>
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Info = styled.p`
  font-size: 1.2rem;
`;

export default Register;
