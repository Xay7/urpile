import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

const Weekdays: React.FC = () => {
  return (
    <DaysHeader>
      {moment.weekdays().map(el => {
        return <Header key={el}>{el}</Header>;
      })}
    </DaysHeader>
  );
};

const DaysHeader = styled.div`
  height: 45px;
  display: flex;
`;

const Header = styled.div`
  color: ${props => props.theme.white};
  background-color: ${props => props.theme.primary};
  font-size: 1.6rem;
  display: flex;
  flex: 1 0;
  align-items: center;
  justify-content: center;
`;

export default Weekdays;
