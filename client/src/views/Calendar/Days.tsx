import React, { useState, ReactChild } from 'react';
import styled from 'styled-components';
import moment, { Moment } from 'moment';
import { generateNotes } from './generateNotes';
import CalendarNote from './CalendarNote';
import { DayData, DayDataRow, CalendarEvent, CalendarNotes } from './types';
import Tooltip from '../../components/Tooltip/Tooltip';
import ConditionalWrap from '../../helpers/ConditionalWrap';

interface Props {
  month: Moment;
  rows: any;
}

const Days: React.FC<Props> = ({ month, rows }) => {
  const [calendarEvent, setCalendarEvent] = useState<CalendarEvent>({
    holding: false,
    released: false,
    startIndex: null,
    hoverIndex: null,
    startDay: null,
    endDay: null
  });
  const [calendarNotes, setCalendarNotes] = useState<Array<CalendarNotes>>([
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
  const [popup, setPopup] = useState({ show: false, x: 0, y: 0 });

  const addEvent = (e: React.MouseEvent, endDay: Moment) => {
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
      hoverIndex: null,
      endDay: endDay,
      released: true
    });
    setPopup({
      show: true,
      x: e.clientX,
      y: e.clientY
    });
  };

  const constructedDays = rows.map((row: DayDataRow, rowIndex: number) => {
    const currentWeekNotes = calendarNotes.filter(el => {
      return moment(el.start).isBetween(moment(row[0].day), moment(row[6].day), 'days', '[]');
    });

    const notes = generateNotes(row, rowIndex, currentWeekNotes);
    return (
      <Row key={rowIndex}>
        <RowBackgrounds>
          {row.map((day: DayData) => {
            return (
              <ConditionalWrap
                key={day.index}
                condition={day.index === 41}
                wrap={(children: ReactChild) => <Tooltip position="right">{children}</Tooltip>}>
                <RowBackground
                  calendarEvent={
                    calendarEvent.holding &&
                    calendarEvent.hoverIndex !== null &&
                    ((day.index >= calendarEvent.startIndex && day.index <= calendarEvent.hoverIndex) ||
                      (day.index <= calendarEvent.startIndex && day.index >= calendarEvent.hoverIndex))
                  }
                  onMouseDown={() => {
                    setCalendarEvent({
                      ...calendarEvent,
                      holding: true,
                      startIndex: day.index,
                      startDay: day.day,
                      hoverIndex: day.index
                    });
                  }}
                  onMouseUp={(e: React.MouseEvent) => addEvent(e, day.day)}
                  onMouseEnter={() => {
                    if (!calendarEvent.holding) {
                      return;
                    } else
                      setCalendarEvent({
                        ...calendarEvent,
                        hoverIndex: day.index
                      });
                  }}></RowBackground>
              </ConditionalWrap>
            );
          })}
        </RowBackgrounds>
        <RowDays>
          <Table>
            <thead>
              <tr>
                {row.map((obj: DayData, rowIndex: number) => {
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
                  notes.map((el, ind: number) => {
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
