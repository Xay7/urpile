import { Moment } from 'moment';

export interface DayData {
  day: Moment;
  index: number;
  filler?: boolean;
  today?: boolean;
}

export interface DayDataRow extends Array<DayData> {}

export interface CalendarEvent {
  holding: boolean;
  released: boolean;
  startIndex: number | null;
  hoverIndex: number | null;
  beginning: Moment | null;
  ending: Moment | null;
}

export interface CalendarNote {
  beginning: Moment;
  ending: Moment;
  title: string;
  colSpan?: number;
  id: number;
  overflowRight: boolean;
  overflowLeft: boolean;
  color: string;
  empty?: boolean;
}
