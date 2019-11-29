import React, { useState } from 'react';
import styled from 'styled-components';
import moment, { Moment } from 'moment';

interface Props {
  row: any;
}

const Background: React.FC<Props> = ({ row }) => {
  const [calendarEvent, setCalendarEvent] = useState<{
    holding: boolean;
    released: boolean;
    startIndex: number | null;
    hoverIndex: number | null;
    startDay: Moment | null;
  }>({
    holding: false,
    released: false,
    startIndex: null,
    hoverIndex: null,
    startDay: null
  });
  const [showNoteForm, setShowNoteForm] = useState(false);
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

  const addEvent = (endDay: Moment, endIndex: number) => {
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

  const RowEvents = row.map((day, dayIndex) => {
    return (
      <Event
        key={day.index}
        calendarEvent={
          calendarEvent.holding &&
          calendarEvent.hoverIndex !== null &&
          ((day.index >= calendarEvent.startIndex && day.index <= calendarEvent.hoverIndex) || (day.index <= calendarEvent.startIndex && day.index >= calendarEvent.hoverIndex))
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
        onMouseUp={() => addEvent(day.day, day.index)}
        onMouseEnter={() => {
          if (!calendarEvent.holding) {
            return;
          } else
            setCalendarEvent({
              ...calendarEvent,
              hoverIndex: day.index
            });
        }}></Event>
    );
  });

  return <>{RowEvents}</>;
};

const Event = styled('div')<any>`
  flex: 1 0;
  color: ${props => (props.fillerDay ? '#ccc' : props.today ? 'blue' : 'black')};
  background-color: ${props => props.calendarEvent && 'rgba(0,0,0,0.1)'};
  &:hover {
    cursor: pointer;
  }
  z-index: 2;
`;

export default Background;
