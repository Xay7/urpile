import React from "react";
import styled from "styled-components";

const Dashboard: React.FC = () => {
  return (
    <>
      <Main>im a dashboard</Main>
    </>
  );
};

const Main = styled.main`
  height: calc(100vh - 100px);
  padding: 50px;
`;

export default Dashboard;
