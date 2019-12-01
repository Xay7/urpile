import { Moment } from 'moment';

export interface DayData {
  day: Moment;
  index: number;
  filler?: boolean;
  today?: boolean;
}

export interface DayDataRow extends Array<DayData> {}

export interface Props {
  month: Moment;
  rows: any;
}

export interface CalendarEvent {
  holding: boolean;
  released: boolean;
  startIndex: number | null;
  hoverIndex: number | null;
  startDay: Moment | null;
  endDay: Moment | null;
}

export interface CalendarNotes {
  start: Moment;
  end: Moment;
  title: string;
  colSpan?: number;
}
