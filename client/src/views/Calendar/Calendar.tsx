import React, { useState } from 'react';
import moment, { Moment } from 'moment';
import styled from 'styled-components';
import Icon from '../../components/Icon/Icon';
import Weekdays from './Weekdays';
import Days from './Days';

interface Daysss
  extends Array<{
    day: Moment;
    index: number;
    filler?: boolean;
    today?: boolean;
  }> {}

const Calendar: React.FC = () => {
  const [date, setDate] = useState<Moment>(moment());
  const firstDayOfMonth = +moment(date)
    .startOf('month')
    .format('d');
  const daysInMonth = +moment(date).daysInMonth();
  const days: Daysss = [];
  const rows: Array<Daysss> = [];
  let cells: Daysss = [];

  const isToday = () => {
    if (!moment(date).isSame(moment(), 'day')) {
      return;
    }
    return +moment(date).format('D');
  };

  const nextMonth = () => {
    setDate(moment(date).add(1, 'month'));
  };

  const previousMonth = () => {
    setDate(moment(date).subtract(1, 'month'));
  };

  // Adds before month start filler dates
  for (let day = firstDayOfMonth - 1, index = 0; day >= 0; day--, index++) {
    days.push({
      day: moment(date).date(-day),
      index: index,
      filler: true
    });
  }

  // Adds actual days
  for (let index = 1; index <= daysInMonth; index++) {
    if (isToday() === index) {
      days.push({
        day: moment(date).date(index),
        today: true,
        index: index + firstDayOfMonth - 1
      });
    } else
      days.push({
        day: moment(date).date(index),
        index: index + firstDayOfMonth - 1
      });
  }

  // Adds after month ends filler dates
  const daysLength = days.length;
  for (let index = 0; index < 42 - daysLength; index++) {
    days.push({
      day: moment(date).date(index + daysInMonth + 1),
      index: index + daysLength,
      filler: true
    });
  }

  // Constructs table layout by calculating adding rows and cells
  days.forEach((row, i) => {
    if (i % 7 !== 0) {
      cells.push(row);
    } else {
      if (i > 1) {
        rows.push(cells);
      }
      cells = [];
      cells.push(row);
    }
    if (i === days.length - 1) {
      rows.push(cells);
    }
  });

  return (
    <Container>
      <Month>
        <Icon name="left" onClick={previousMonth} />
        <h4 style={{ margin: '0 auto' }}>{moment(date).format('MMMM YYYY')}</h4>
        <Icon name="right" onClick={nextMonth} />
      </Month>
      <Dayss>
        <Weekdays />
        <Days month={date} />
      </Dayss>
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  width: 100%;
  box-shadow: ${props => props.theme.shadows['1dp']};
  display: flex;
  flex-direction: column;
  flex: 0 1;
  background-color: ${props => props.theme.white};
`;

const Month = styled.div`
  height: 60px;
  color: ${props => props.theme.white};
  background-color: ${props => props.theme.primary};
  vertical-align: middle;
  font-size: 1.6rem;
  display: flex;
  align-items: center;
  padding: 0 20px;
`;

const Dayss = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0;
  z-index: 1;
`;

export default Calendar;
