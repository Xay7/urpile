import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

const Weekdays: React.FC = () => {
  return (
    <DaysHeader>
      {moment.weekdaysShort(true).map(el => {
        return <Header key={el}>{el}</Header>;
      })}
    </DaysHeader>
  );
};

const DaysHeader = styled.div`
  height: 45px;
  display: flex;
  margin: 5px 0;
`;

const Header = styled.div`
  color: ${props => props.theme.primary};
  background-color: ${props => props.theme.white};
  font-size: 1.6rem;
  display: flex;
  flex: 1 0;
  align-items: center;
  justify-content: center;
  font-weight: 700;
`;

export default Weekdays;
