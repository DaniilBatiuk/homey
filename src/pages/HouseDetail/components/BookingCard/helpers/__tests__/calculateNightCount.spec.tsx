import dayjs from "dayjs";

import "@testing-library/jest-dom";

import { calculateNightCount } from "../calculateNightCount";

describe("calculateNightCount tests", () => {
  test("test with arg: null, null", () => {
    expect(calculateNightCount(null, null)).toEqual(0);
  });
  test("test with arg: undefined, undefined", () => {
    expect(calculateNightCount(undefined, undefined)).toEqual(0);
  });
  test('test with arg: dayjs("2024-04-23 12:00:00"), dayjs("2024-04-24 12:00:00")', () => {
    expect(calculateNightCount(dayjs("2024-04-23 12:00:00"), dayjs("2024-04-24 12:00:00"))).toEqual(
      1,
    );
  });
  test('test with arg: dayjs("2024-04-24 12:00:00"), dayjs("2025-04-24 12:00:00")', () => {
    expect(calculateNightCount(dayjs("2024-04-24 12:00:00"), dayjs("2025-04-24 12:00:00"))).toEqual(
      365,
    );
  });
});
