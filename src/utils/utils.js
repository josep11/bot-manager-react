import { DateTime } from 'luxon';

/**
 * 
 * @param {DateTime} date 
 * @returns {string} relative date expressed like "ahir"
 */
export function dateToRelativeDate(date) {
    if (!date) { return null }
    if (!(date instanceof DateTime)) {
        throw new Error("parameter is not of DateTime type");
    }
    if (!date.isValid) {
        throw new Error(`date "${date}" is not a valid DateTime`);
    }
    return date.setLocale('ca').toRelativeCalendar()
}

export function parseDateTime(date) {
    if (typeof date !== "string") {
        throw Error('Input parameter date is not string');
    }
    return DateTime.fromISO(date);
}

export function isDev() {
    return !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
}