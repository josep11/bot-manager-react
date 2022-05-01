import { DateTime } from 'luxon';

import { dateToRelativeDate } from "./utils";

test('dateToRelativeDate', () => {
    let dtStr = "2022-04-29T08:44:43";
    let dt = DateTime.now()

    let r
    r = dateToRelativeDate(dtStr)
    expect(r).not.toBeFalsy();

    r = dateToRelativeDate(dt)
    expect(r).not.toBeFalsy();
    expect(r).toBe("avui");
});