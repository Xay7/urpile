/* eslint-disable no-loop-func */
import React, { useState } from 'react';
import moment, { Moment } from 'moment';
import styled from 'styled-components';
import CalendarNote from './CalendarNote';
import Icon from '../../components/Icon/Icon';

interface Days
  extends Array<{
    day: Moment;
    index: number;
    filler?: boolean;
    today?: boolean;
  }> {}

const Calendar: React.FC = () => {
  const [date, setDate] = useState<Moment>(moment());
  const [calendarEvent, setCalendarEvent] = useState<{
    holding: boolean;
    released: boolean;
    startIndex: number | null;
    hoverIndex: number | null;
    startDay: number | null;
  }>({
    holding: false,
    released: false,
    startIndex: null,
    hoverIndex: null,
    startDay: null
  });
  const [calendarNotes, setCalendarNotes] = useState<Array<{ start: Moment; end: Moment; title: string; colSpan?: number }>>([
    {
      start: moment().subtract('5', 'day'),
      end: moment().add('1', 'day'),
      title: '1'
    },
    {
      start: moment().add('2', 'day'),
      end: moment().add('3', 'day'),
      title: '2'
    },
    {
      start: moment().add('2', 'day'),
      end: moment().add('3', 'day'),
      title: '3'
    }
  ]);
  const firstDayOfMonth = +moment(date)
    .startOf('month')
    .format('d');
  const daysInMonth = +moment(date).daysInMonth();
  const days: Days = [];
  const rows: Array<Days> = [];
  let cells: Days = [];
  let tableOverflow: Array<any> = [];

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

  const addEvent = (endDay: number, endIndex: number) => {
    let start = moment(calendarEvent.startDay);
    let end = moment(endDay);

    if (start.isAfter(end)) {
      [start, end] = [end, start];
    }
    setCalendarNotes([
      ...calendarNotes,
      {
        start: moment(start),
        end: moment(end),
        title: 'no idea cunt XD'
      }
    ]);
    setCalendarEvent({
      ...calendarEvent,
      holding: false,
      startIndex: null,
      hoverIndex: null
    });
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
  // Construct days with notes and handles day overflow
  const constructedDays = rows.map((row, rowIndex) => {
    const empty = row.map(el => {
      return {
        day: el.day,
        empty: true,
        index: el.index,
        colSpan: 1
      };
    });
    const currentWeekNotes = calendarNotes.filter(el => {
      return moment(el.start).isBetween(moment(row[0].day), moment(row[6].day), 'days', '[]');
    });
    const rowsWithNotes: any = [];
    if (tableOverflow.length > 0) {
      [...tableOverflow].forEach(note => {
        if (note.row !== rowIndex) {
          return null;
        }
        if (note.colSpan > 7) {
          tableOverflow = [
            ...tableOverflow,
            {
              row: rowIndex + 1,
              start: note.start,
              end: note.end,
              colSpan: note.colSpan - 7
            }
          ];
          note.colSpan = 7;
        }
        const test = [...empty];
        test.splice(0, note.colSpan, note);
        rowsWithNotes.push(test);
        tableOverflow = tableOverflow.slice(1);
      });
    }
    if (rowsWithNotes.length === 0) {
      rowsWithNotes.push([...empty]);
    }
    currentWeekNotes.forEach((note, noteIndex) => {
      const colSpan = Math.abs(moment(note.start).diff(moment(note.end), 'days')) + 1;
      loop: for (const [rowInd, row] of rowsWithNotes.entries()) {
        loop1: for (const [dayIndex, day] of row.entries()) {
          const noteLength = dayIndex + colSpan > 7 ? 7 : dayIndex + colSpan;
          console.log(note);
          if (day.start && note.start.isBetween(day.start, day.end, 'days', '[]')) {
            if (rowsWithNotes.length - 1 === rowInd) {
              rowsWithNotes.push([...empty]);
              break;
            }
            break;
          }
          if (note.start.isSame(day.day, 'day')) {
            let noteRowColSpan = colSpan;
            for (let i = dayIndex, j = noteLength; i <= j; i++, j -= day.colSpan) {
              if (row[i].start) {
                if (rowsWithNotes.length - 1 === rowInd) {
                  rowsWithNotes.push([...empty]);
                  break loop1;
                }
                break loop1;
              }
            }

            if (colSpan + dayIndex > 7) {
              noteRowColSpan = 7 - dayIndex;
              tableOverflow = [
                ...tableOverflow,
                {
                  row: rowIndex + 1,
                  start: note.start,
                  end: note.end,
                  colSpan: colSpan - noteRowColSpan
                }
              ];
            }
            note.colSpan = noteRowColSpan;

            rowsWithNotes[rowInd].splice(dayIndex, noteLength - dayIndex, note);

            break loop;
          }
        }
      }
    });

    return (
      <Row key={rowIndex}>
        <RowBackgrounds>
          {row.map((obj: any, rowIndex: any) => {
            return (
              <RowBackground
                key={obj.index}
                calendarEvent={
                  calendarEvent.holding &&
                  calendarEvent.hoverIndex !== null &&
                  ((obj.index >= calendarEvent.startIndex && obj.index <= calendarEvent.hoverIndex) ||
                    (obj.index <= calendarEvent.startIndex && obj.index >= calendarEvent.hoverIndex))
                }
                onMouseDown={() => {
                  setCalendarEvent({
                    ...calendarEvent,
                    holding: true,
                    startIndex: obj.index,
                    startDay: obj.day,
                    hoverIndex: obj.index
                  });
                }}
                onMouseUp={() => addEvent(obj.day, obj.index)}
                onMouseEnter={() => {
                  if (!calendarEvent.holding) {
                    return;
                  } else
                    setCalendarEvent({
                      ...calendarEvent,
                      hoverIndex: obj.index
                    });
                }}></RowBackground>
            );
          })}
        </RowBackgrounds>
        <RowDays>
          <Table>
            <thead>
              <tr>
                {row.map((obj: any, rowIndex: any) => {
                  return (
                    <Day key={rowIndex} today={obj.today} fillerDay={obj.filler}>
                      {moment(obj.day).format('D')}
                    </Day>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              <React.Fragment key={rowIndex}>
                {rowsWithNotes.map((el, ind) => {
                  return (
                    <tr key={ind}>
                      {[...el].map((ell, ind) => {
                        return (
                          <td key={ind} colSpan={ell.colSpan} style={{ verticalAlign: 'top' }}>
                            {!ell.empty && <CalendarNote>{ell.title && ell.title}</CalendarNote>}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </React.Fragment>
            </tbody>
          </Table>
        </RowDays>
      </Row>
    );
  });

  return (
    <Container>
      <Month>
        <Icon name="left" onClick={previousMonth} />
        <h4 style={{ margin: '0 auto' }}>{moment(date).format('MMMM YYYY')}</h4>
        <Icon name="right" onClick={nextMonth} />
      </Month>

      <Days>
        <DaysHeader>
          {moment.weekdays().map(el => {
            return <Header key={el}>{el}</Header>;
          })}
        </DaysHeader>
        {constructedDays}
      </Days>
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

const Table = styled.table`
  width: 100%;
  height: calc(100% - 70px);
  table-layout: fixed;
`;

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

const Day = styled('td')<any>`
  color: ${props => (props.fillerDay ? '#ccc' : props.today ? 'blue' : 'black')};
  font-size: 1.6rem;
  vertical-align: middle;
  z-index: 1111;
  padding-left: 10px;
  padding-top: 10px;
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

const Days = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0;
  z-index: 1;
`;

const Row = styled.div`
  display: flex;
  flex: 1 0;
  flex-direction: column;
  position: relative;
`;

const RowBackground = styled('div')<any>`
  flex: 1 0;
  color: ${props => (props.fillerDay ? '#ccc' : props.today ? 'blue' : 'black')};
  background-color: ${props => props.calendarEvent && 'rgba(0,0,0,0.1)'};
  &:hover {
    cursor: pointer;
  }
  z-index: 2;
`;

const RowBackgrounds = styled.div`
  display: flex;
  flex: 1 0;
  flex-direction: row;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const RowDays = styled.div``;

const Filler = styled.td`
  z-index: 1;
`;

export default Calendar;
