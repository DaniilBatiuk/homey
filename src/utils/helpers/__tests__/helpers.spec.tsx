import dayjs from "dayjs";

import "@testing-library/jest-dom";

import { transformDate } from "../transformDate";

describe("transformDate tests", () => {
  test("test with arg: null", () => {
    expect(transformDate(null)).toBeNull();
  });
  test(`test with arg: dayjs("2024-04-23 12:00:00")`, () => {
    expect(transformDate(dayjs("2024-04-23 12:00:00"))).toBe("2024-04-23");
  });

  test(`test with arg: dayjs().year(1999), true`, () => {
    expect(transformDate(dayjs().year(1999), true)).toBe("Date is incorrect");
  });
  test(`test with arg: dayjs("1999-04-23 12:00:00")`, () => {
    expect(transformDate(dayjs("1999-04-23 12:00:00"))).toBe("1999-04-23");
  });
  test(`test with arg: dayjs("3000-04-23 12:00:00")`, () => {
    expect(transformDate(dayjs("3000-04-23 12:00:00"))).toBe("3000-04-23");
  });
  test(`test with arg: dayjs("1999-04-23 12:00:00"), false`, () => {
    expect(transformDate(dayjs("1999-04-23 12:00:00"), false)).toBe("1999-04-23");
  });
  test(`test with arg: dayjs("3000-04-23 12:00:00"), false`, () => {
    expect(transformDate(dayjs("3000-04-23 12:00:00"), false)).toBe("3000-04-23");
  });
});
