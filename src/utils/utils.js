import { DateTime } from 'luxon';

export function dateToRelativeDate(date) {
    const DATEFORMAT = 'yyyy-MM-dd';
    const myMoment = DateTime.fromFormat(date, DATEFORMAT);
    return myMoment.setLocale('ca').toRelativeCalendar()
}