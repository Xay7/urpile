import React, { useState } from "react";
import moment, { Moment } from "moment";
import styled from "styled-components";
import Icon from "../../components/Icon/Icon";

const Calendar: React.FC = () => {
  const [date, setDate] = useState<Moment>(moment());
  const days: any[] = [];
  const rows: any[] = [];
  let cells: any[] = [];

  const firstDayOfMonth = () => {
    const firstDay = moment(date)
      .startOf("month")
      .format("d");
    return +firstDay;
  };

  const daysInMonth = () => {
    const days = moment(date).daysInMonth();
    return +days;
  };

  const currentDay = () => {
    if (!moment(date).isSame(moment(), "day")) {
      return;
    }
    return +moment(date).format("D");
  };

  const nextMonth = () => {
    setDate(moment(date).add(1, "month"));
  };

  const previousMonth = () => {
    setDate(moment(date).subtract(1, "month"));
  };

  // Get blank and existing days for current month
  for (let index = 0; index < firstDayOfMonth(); index++) {
    const fillerDay = moment(date)
      .date(-(firstDayOfMonth() - index))
      .format("D");
    days.push(
      <Day fillerDate key={index}>
        {fillerDay}
      </Day>
    );
  }

  for (let index = 1; index <= daysInMonth(); index++) {
    if (currentDay() === index) {
      days.push(
        <Day key={index + 30} today>
          {index}
        </Day>
      );
    } else days.push(<Day key={index + 30}>{index}</Day>);
  }

  const daysLength = days.length;
  for (let index = 0; index < 42 - daysLength; index++) {
    const fillerDay = moment(date)
      .date(index + 1)
      .format("D");
    days.push(
      <Day fillerDate key={index}>
        {fillerDay}
      </Day>
    );
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

  const constructedDays = rows.map((el, i) => {
    return <Row key={i}>{el}</Row>;
  });

  return (
    <Container>
      <Month>
        <Icon name="left" onClick={previousMonth} />
        <h4 style={{ margin: "0 auto" }}>{moment(date).format("MMMM YYYY")}</h4>
        <Icon name="right" onClick={nextMonth} />
      </Month>
      <Table>
        <Thead>
          <Row>
            {moment.weekdays().map(el => {
              return <Th key={el}>{el}</Th>;
            })}
          </Row>
        </Thead>
        <Tbody>{constructedDays}</Tbody>
      </Table>
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  width: 100%;
  box-shadow: ${props => props.theme.shadows["1dp"]};
`;

const Table = styled.table`
  background-color: ${props => props.theme.white};
  width: 100%;
  height: calc(100% - 70px);
  table-layout: fixed;
`;

const Thead = styled.thead``;

const Th = styled.th`
  height: 60px;
  color: ${props => props.theme.white};
  background-color: ${props => props.theme.primary};
  vertical-align: middle;
  font-size: 1.6rem;
`;

const Tbody = styled.tbody``;

const Day = styled("td")<any>`
  color: ${props => (props.fillerDate ? "red" : props.today ? "blue" : "black")};
  font-size: 1.6rem;
  vertical-align: middle;
  text-align: center;
`;

const Row = styled.tr``;

const Month = styled.div`
  height: 70px;
  color: ${props => props.theme.white};
  background-color: ${props => props.theme.primary};
  vertical-align: middle;
  font-size: 1.6rem;
  display: flex;
  align-items: center;
  padding: 0 20px;
`;

export default Calendar;
