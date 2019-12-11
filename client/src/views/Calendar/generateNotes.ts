import moment from 'moment';
import { CalendarNote, DayData, DayDataRow } from './types';

let overflowingNotes: Array<any> = [];

// Generate array of notes based on the current row and notes
export const generateNotes = (row: DayDataRow, rowIndex: number, currentWeekNotes: Array<CalendarNote>) => {
  const noteLimit = 3;
  const hiddenNotes = [0, 0, 0, 0, 0, 0, 0];
  const emptyRow = row.map((el: DayData, index: number) => {
    return {
      day: el.day,
      empty: true,
      index: el.index,
      colSpan: 1,
      rowIndex: index
    };
  });

  const filledRow: any = [];
  if (overflowingNotes.length > 0) {
    [...overflowingNotes].forEach(note => {
      if (note.row !== rowIndex) {
        return null;
      }
      if (note.colSpan > 7) {
        overflowingNotes = [
          ...overflowingNotes,
          {
            row: rowIndex + 1,
            beginning: note.beginning,
            ending: note.ending,
            colSpan: note.colSpan - 7,
            id: note.id,
            title: note.title,
            color: note.color
          }
        ];
        note.colSpan = 7;
        note.overflowRight = true;
        note.overflowLeft = true;
      }

      note.overflowLeft = true;

      const overflowedNote = [...emptyRow];
      overflowedNote.splice(0, note.colSpan, note);
      filledRow.push(overflowedNote);
      overflowingNotes = overflowingNotes.slice(1);
    });
  }

  if (filledRow.length === 0) {
    filledRow.push([...emptyRow]);
  }
  currentWeekNotes.forEach(note => {
    const colSpan = Math.abs(moment(note.beginning).diff(moment(note.ending), 'days')) + 1;
    loop0: for (const [filledRowIndex, row] of filledRow.entries()) {
      loop1: for (const [dayIndex, day] of row.entries()) {
        const noteLength = dayIndex + colSpan > 7 ? 7 : dayIndex + colSpan;

        if (day.beginning && note.beginning.isBetween(day.beginning, day.ending, 'days', '[]')) {
          if (filledRow.length - 1 === filledRowIndex) {
            if (filledRow.length >= noteLimit) {
              emptyRow.forEach((el, ind) => {
                if (el.day && moment(note.beginning).isSame(el.day, 'day')) {
                  hiddenNotes[ind]++;
                }
              });
              break;
            }

            filledRow.push([...emptyRow]);
            break;
          }
          break;
        }

        if (day.day && moment(note.beginning).isSame(day.day, 'day')) {
          let noteRowColSpan = colSpan;
          const l = dayIndex + colSpan;
          for (let i = dayIndex, j = l; i < j; i++) {
            if (row[i] !== undefined) {
              if (row[i].beginning) {
                if (filledRow.length - 1 === filledRowIndex) {
                  if (filledRow.length >= noteLimit) {
                    emptyRow.forEach((el, ind) => {
                      if (el.day && moment(note.beginning).isSame(el.day, 'day')) {
                        hiddenNotes[ind]++;
                      }
                    });
                    break loop0;
                  }
                  filledRow.push([...emptyRow]);
                  break loop1;
                }
                break loop1;
              }
            }
          }
          if (colSpan + dayIndex > 7) {
            noteRowColSpan = 7 - day.rowIndex;
            overflowingNotes = [
              ...overflowingNotes,
              {
                row: rowIndex + 1,
                beginning: note.beginning,
                ending: note.ending,
                colSpan: colSpan - noteRowColSpan,
                id: note.id,
                title: note.title,
                color: note.color
              }
            ];
            note.overflowRight = true;
          }

          note.colSpan = noteRowColSpan;
          filledRow[filledRowIndex].splice(dayIndex, noteLength - dayIndex, note);

          break loop0;
        }
      }
    }
  });

  if (rowIndex === 5) {
    overflowingNotes = [];
  }
  return { filledRow, hiddenNotes };
};
