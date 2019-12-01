import moment from 'moment';

let overflowingNotes: Array<any> = [];

// Generate array of notes based on the current row and notes
export const generateNotes = (row, rowIndex, currentWeekNotes) => {
  const emptyRow = row.map((el, index) => {
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
            start: note.start,
            end: note.end,
            colSpan: note.colSpan - 7,
            title: note.title
          }
        ];
        note.colSpan = 7;
      }

      const overflowedNote = [...emptyRow];
      overflowedNote.splice(0, note.colSpan, note);
      filledRow.push(overflowedNote);
      overflowingNotes = overflowingNotes.slice(1);
    });
  }

  if (filledRow.length === 0) {
    filledRow.push([...emptyRow]);
  }

  currentWeekNotes.forEach((note, noteIndex) => {
    const colSpan = Math.abs(moment(note.start).diff(moment(note.end), 'days')) + 1;
    loop0: for (const [filledRowIndex, row] of filledRow.entries()) {
      loop1: for (const [dayIndex, day] of row.entries()) {
        const noteLength = dayIndex + colSpan > 7 ? 7 : dayIndex + colSpan;
        if (day.start && note.start.isBetween(day.start, day.end, 'days', '[]')) {
          if (filledRow.length - 1 === filledRowIndex) {
            filledRow.push([...emptyRow]);
            break;
          }
          break;
        }
        if (day.day && note.start.isSame(day.day, 'day')) {
          let noteRowColSpan = colSpan;

          let length = noteLength;
          for (let i = 0; i < dayIndex; i++) {
            length -= row[i].colSpan;
          }
          // , j -= day.colSpan
          for (let i = dayIndex, j = dayIndex + length; i < j; i++) {
            if (row[i].start) {
              if (filledRow.length - 1 === filledRowIndex) {
                filledRow.push([...emptyRow]);
                break loop1;
              }
              break loop1;
            }
          }
          if (colSpan + dayIndex > 7) {
            noteRowColSpan = 7 - day.rowIndex;
            overflowingNotes = [
              ...overflowingNotes,
              {
                row: rowIndex + 1,
                start: note.start,
                end: note.end,
                colSpan: colSpan - noteRowColSpan,
                title: note.title
              }
            ];
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
  return filledRow;
};
