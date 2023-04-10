// Purpose of this file: Shared functions to use across certain components
import dayjs from 'dayjs';

// receives a month (number between 0-11)
/* dayjs is an instance of the dayjs object that has a bunch of information. Passing in no value will give you the present moment, just like the date object. We're assigning the current month as the default value.  */
export function getMonth(month = dayjs().month()) {
    const year = dayjs().year();
    /* We want to determine what day of the week is the first day of the month
    day() returns a number (0 = Sunday) to (6 = Saturday) */
    const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day()
    let currentMonthCount = 0 - firstDayOfTheMonth;

    /* Google Calendar has 5 rows in every month. 
    Every row gets filled with an empty array.
    For each array item, we're going to return another array. */
    const daysMatrix = new Array(5).fill([]).map(() => {
        return new Array(7).fill(null).map(() => {
            currentMonthCount++;
            return dayjs(new Date(year, month, currentMonthCount))
        })
    })
    return daysMatrix;
    /* Returns a 2D array. [Row 0-4][Column 0-6]
    [ [ [],[],[],[],[],[],[] ], [ [],[],[],[],[],[],[] ], [ [],[],[],[],[],[],[] ], [ [],[],[],[],[],[],[] ], [ [],[],[],[],[],[],[] ] ] */
}
