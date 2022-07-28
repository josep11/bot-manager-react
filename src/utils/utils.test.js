import { DateTime } from 'luxon';

import { dateToRelativeDate, parseDateTime } from "./utils";



test('parseDateTime', () => {
    let dtStr = "2022-04-29T08:44:43";
    const r = parseDateTime(dtStr);
    expect(r).not.toBeFalsy();
    expect(r).toBeInstanceOf(DateTime);
});

test('dateToRelativeDate', () => {
    let dt = DateTime.now()

    const r = dateToRelativeDate(dt)
    expect(r).not.toBeFalsy();
    expect(r).toBe("avui");
});