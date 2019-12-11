import React from 'react';
import styled from 'styled-components';

interface Props {}

const DayInformation: React.FC<Props> = () => {
  return <Container></Container>;
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.white};
  margin-left: 20px;
  border-radius: 5px;
  box-shadow: ${props => props.theme.shadows['1dp']};
`;

export default DayInformation;
