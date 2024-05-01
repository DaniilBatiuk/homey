import { Dayjs } from "dayjs";

export const calculateNightCount = (
  start: Dayjs | null | undefined,
  end: Dayjs | null | undefined,
) => {
  if (!start || !end) {
    return 0;
  }
  const differenceInDays = end.diff(start, "day");
  return differenceInDays;
};
