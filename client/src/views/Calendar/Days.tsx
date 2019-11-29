import React, { useState } from 'react';
import styled from 'styled-components';
import moment, { Moment } from 'moment';
import { generateNotes } from './generateNotes';
import CalendarNote from './CalendarNote';

interface Days
  extends Array<{
    day: Moment;
    index: number;
    filler?: boolean;
    today?: boolean;
  }> {}

interface Props {
  month: Moment;
}

const Days: React.FC<Props> = ({ month }) => {
  const today = month;
  const firstDayOfMonth = +moment(today)
    .startOf('month')
    .format('d');
  const daysInMonth = +moment(today).daysInMonth();
  const days: Days = [];
  const rows: Array<Days> = [];
  let cells: Days = [];
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
      start: moment().add('5', 'day'),
      end: moment().add('6', 'day'),
      title: 'a'
    },
    {
      start: moment().add('4', 'day'),
      end: moment().add('5', 'day'),
      title: 'b'
    }
  ]);
  const [showNoteForm, setShowNoteForm] = useState(false);

  const addEvent = (endDay: number, endIndex: number) => {
    setShowNoteForm(!showNoteForm);
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
        title: 'asd'
      }
    ]);
    setCalendarEvent({
      ...calendarEvent,
      holding: false,
      startIndex: null,
      hoverIndex: null
    });
  };

  const isToday = () => {
    if (!moment(today).isSame(moment(), 'day')) {
      return;
    }
    return +moment(today).format('D');
  };

  for (let day = firstDayOfMonth - 1, index = 0; day >= 0; day--, index++) {
    days.push({
      day: moment(today).date(-day),
      index: index,
      filler: true
    });
  }

  // Adds actual days
  for (let index = 1; index <= daysInMonth; index++) {
    if (isToday() === index) {
      days.push({
        day: moment(today).date(index),
        today: true,
        index: index + firstDayOfMonth - 1
      });
    } else
      days.push({
        day: moment(today).date(index),
        index: index + firstDayOfMonth - 1
      });
  }

  // Adds after month ends filler dates
  const daysLength = days.length;
  for (let index = 0; index < 42 - daysLength; index++) {
    days.push({
      day: moment(today).date(index + daysInMonth + 1),
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
  const constructedDays = rows.map((row, rowIndex) => {
    const currentWeekNotes = calendarNotes.filter(el => {
      return moment(el.start).isBetween(moment(row[0].day), moment(row[6].day), 'days', '[]');
    });

    const notes = generateNotes(row, rowIndex, currentWeekNotes);
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
                {notes &&
                  notes.map((el, ind) => {
                    return (
                      <tr key={ind}>
                        {[...el].map((ell, ind) => {
                          return (
                            <td key={ind} colSpan={ell.colSpan} style={{ verticalAlign: 'top' }}>
                              {!ell.empty && <CalendarNote title={ell.title}>{ell.title && ell.title}</CalendarNote>}
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

  return <>{constructedDays}</>;
};

const Table = styled.table`
  width: 100%;
  height: calc(100% - 70px);
  table-layout: fixed;
`;

const Day = styled('td')<any>`
  color: ${props => (props.fillerDay ? '#ccc' : props.today ? 'blue' : 'black')};
  font-size: 1.6rem;
  vertical-align: middle;
  z-index: 1111;
  padding-left: 10px;
  padding-top: 10px;
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

export default Days;
