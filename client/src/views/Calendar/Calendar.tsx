import React, { useState, useEffect, useRef } from 'react';
import moment, { Moment } from 'moment';
import styled from 'styled-components';
import Icon from '../../components/Icon/Icon';
import Weekdays from './Weekdays';
import Days from './Days';
import { DayDataRow } from './types';

const Calendar: React.FC = () => {
  const [date, setDate] = useState<Moment>(moment());
  const [width, setWidth] = useState(null);
  const ref = useRef(null);
  const firstDayOfMonth = date.startOf('month').isoWeekday() - 2;
  const daysInMonth = +moment(date).daysInMonth();
  const days: DayDataRow = [];
  const rows: Array<DayDataRow> = [];
  let cells: DayDataRow = [];
  const isToday = day => {
    if (!moment(day).isSame(moment(), 'day')) {
      return;
    }
    return +moment(day).format('D');
  };

  useEffect(() => {
    setWidth(ref.current.offsetHeight);
  }, []);

  for (let day = firstDayOfMonth, index = 0; day >= 0; day--, index++) {
    days.push({
      day: moment(date).date(-day),
      index: index,
      filler: true
    });
  }

  // Adds actual days
  for (let index = 1; index <= daysInMonth; index++) {
    if (isToday(moment(date).date(index)) === index) {
      days.push({
        day: moment(date).date(index),
        today: true,
        index: index + firstDayOfMonth
      });
    } else
      days.push({
        day: moment(date).date(index),
        index: index + firstDayOfMonth
      });
  }

  // Adds after month ends filler dates
  const daysLength = days.length;
  const totalDays = days.length >= 36 ? 42 : 35;
  for (let index = 0; index < totalDays - daysLength; index++) {
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

  const nextMonth = () => {
    setDate(moment(date).add(1, 'month'));
  };

  const previousMonth = () => {
    setDate(moment(date).subtract(1, 'month'));
  };
  return (
    <Container ref={ref} width={width}>
      <Month>
        <Icon name="left" onClick={previousMonth} />
        <h4 style={{ margin: '0 auto' }}>{moment(date).format('MMMM YYYY')}</h4>
        <Icon name="right" onClick={nextMonth} />
      </Month>
      <DaysContainer>
        <Weekdays />
        <Days month={date} rows={rows} />
      </DaysContainer>
    </Container>
  );
};

const Container = styled('div')<any>`
  height: 100%;
  width: ${props => props.width + 'px'};
  box-shadow: ${props => props.theme.shadows['1dp']};
  display: flex;
  flex-direction: column;
  flex: 0 1;
  background-color: ${props => props.theme.white};
  border-radius: 5px;
`;

const Month = styled.div`
  height: 70px;
  color: ${props => props.theme.white};
  background-color: ${props => props.theme.primary};
  vertical-align: middle;
  font-size: 2.5rem;
  display: flex;
  align-items: center;
  font-weight: bold;
  padding: 0 20px;
  border-radius: 5px 5px 0 0;
  text-transform: capitalize;
`;

const DaysContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0;
  z-index: 1;
`;

export default Calendar;
