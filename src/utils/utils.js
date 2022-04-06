import { DateTime } from 'luxon';

export function dateToRelativeDate(date) {
    if (!date) { return null }
    const myMoment = DateTime.fromISO(date);
    return myMoment.setLocale('ca').toRelativeCalendar()
}

export function isDev() {
    return !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
}