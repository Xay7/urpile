import React, { useState, ReactChild, useEffect } from 'react';
import styled from 'styled-components';
import moment, { Moment } from 'moment';
import { generateNotes } from './generateNotes';
import Note from './Note';
import { DayData, DayDataRow, CalendarEvent, CalendarNote } from './types';
import Tooltip from '../../components/Tooltip/Tooltip';
import ConditionalWrap from '../../helpers/ConditionalWrap';
import NoteForm from './NoteForm';
import axios from 'axios';

interface Props {
  month: Moment;
  rows: Array<DayDataRow>;
}

const Days: React.FC<Props> = ({ rows }) => {
  const [calendarEvent, setCalendarEvent] = useState<CalendarEvent>({
    holding: false,
    released: false,
    startIndex: null,
    hoverIndex: null,
    beginning: null,
    ending: null
  });
  const [calendarNotes, setCalendarNotes] = useState<Array<CalendarNote>>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      const uuid = localStorage.getItem('uid');

      try {
        const res: any = await axios.get(`/users/${uuid}/calendarnotes`);
        res.data.forEach((el: CalendarNote) => {
          el.beginning = moment(el.beginning);
          el.ending = moment(el.ending);
        });
        setCalendarNotes(res.data);
      } catch (error) {
        console.log('Failed to get notes');
      }
    };
    fetchNotes();
  }, []);

  const showNoteForm = (ending: Moment) => {
    let [start, end] = [calendarEvent.beginning, ending];
    if (calendarEvent.beginning.isAfter(ending)) {
      [start, end] = [end, start];
    }
    setCalendarEvent({
      ...calendarEvent,
      holding: false,
      startIndex: null,
      hoverIndex: null,
      ending: end,
      beginning: start,
      released: true
    });

    setShowForm(true);
  };

  const addEvent = (notes: Array<CalendarNote>) => {
    setCalendarNotes(notes);
  };

  const hideForm = () => {
    setShowForm(false);
  };

  const constructedDays = rows.map((row: DayDataRow, rowIndex: number) => {
    const currentWeekNotes = calendarNotes.filter((el: CalendarNote) => {
      return moment(el.beginning).isBetween(moment(row[0].day), moment(row[6].day), 'days', '[]');
    });
    const notes = generateNotes(row, rowIndex, currentWeekNotes);

    return (
      <Container key={rowIndex}>
        <RowBackgrounds>
          {row.map((day: DayData) => {
            return (
              <ConditionalWrap
                key={day.index}
                condition={moment(day.day).isSame(calendarEvent.ending) && !calendarEvent.holding && showForm}
                wrap={(children: ReactChild) => (
                  <Tooltip
                    position="right"
                    component={
                      <NoteForm
                        hide={hideForm}
                        beginning={calendarEvent.beginning.toString()}
                        ending={calendarEvent.ending.toString()}
                        success={data => addEvent(data)}
                      />
                    }>
                    {children}
                  </Tooltip>
                )}>
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
                      beginning: day.day,
                      hoverIndex: day.index
                    });
                  }}
                  onMouseUp={(e: React.MouseEvent) => showNoteForm(day.day)}
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
                    <Day key={rowIndex} fillerDay={obj.filler}>
                      <DaySpan
                        today={obj.today}
                        digitNumber={Math.max(Math.floor(Math.log10(Math.abs(+moment(obj.day).format('D')))), 0) + 1}>
                        {moment(obj.day).format('D')}{' '}
                      </DaySpan>
                    </Day>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              <React.Fragment key={rowIndex}>
                {notes.filledRow &&
                  notes.filledRow.map((el: Array<CalendarNote>, ind: number) => {
                    return (
                      <tr key={ind}>
                        {[...el].map((note: CalendarNote, ind: number) => {
                          return (
                            <td key={ind} colSpan={note.colSpan} style={{ verticalAlign: 'top' }}>
                              {!note.empty && (
                                <Note
                                  id={note.id}
                                  overflowRight={note.overflowRight ? note.overflowRight : false}
                                  overflowLeft={note.overflowLeft ? note.overflowLeft : false}
                                  color={note.color}>
                                  {note.title && note.title}
                                </Note>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                <tr>
                  {notes.hiddenNotes.map((el: number, index: number) => {
                    return (
                      <td colSpan={1} key={index}>
                        {el > 0 && (
                          <HiddenNotes>
                            +{el} {el === 1 ? 'note' : 'notes'}
                          </HiddenNotes>
                        )}
                      </td>
                    );
                  })}
                </tr>
              </React.Fragment>
            </tbody>
          </Table>
        </RowDays>
      </Container>
    );
  });

  return (
    <>
      <DaysContainer>{constructedDays}</DaysContainer>
    </>
  );
};

const DaysContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0;
  overflow: hidden;
`;

const Container = styled.div`
  display: flex;
  flex: 1 0;
  flex-direction: column;
  position: relative;
  transition: 0.5s all;
`;

const Table = styled.table`
  width: 100%;
  height: calc(100% - 70px);
  table-layout: fixed;
`;

const Day = styled('td')<any>`
  color: ${props => (props.fillerDay ? '#ccc' : props.today ? 'blue' : 'black')};
  font-size: 1.6rem;
  vertical-align: middle;
  z-index: 50;
`;

const DaySpan = styled('div')<any>`
  background-color: ${props => (props.today ? 'hsla(360, 100%, 49%, 0.18)' : 'transparent')};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3px;
  height: 25px;
  width: 25px;
  font-weight: 700;
  border-radius: 25px;
  margin: 0 auto;
  margin-top: 5px;
  margin-bottom: 2px;
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

const HiddenNotes = styled.div`
  text-align: center;
  margin: 3px 0;
  color: ${props => props.theme.primary};
`;

export default Days;
