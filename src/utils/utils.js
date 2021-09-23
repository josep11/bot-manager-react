import moment from 'moment';

export function dateToRelativeDate(date) {
    const DB_DATEFORMAT = 'YYYY-MM-DD';
    const myMoment = moment(date, DB_DATEFORMAT);
    return myMoment.fromNow();
}