import { DateTime } from 'luxon';

export function dateToRelativeDate(date) {
    const myMoment = DateTime.fromISO(date);
    return myMoment.setLocale('ca').toRelativeCalendar()
}