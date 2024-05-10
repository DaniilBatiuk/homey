import { Dayjs } from "dayjs";

export const transformDate = (date: Dayjs | null, card?: boolean): string | null => {
  if (!date) return null;
  const newDate = date.toDate();
  const year = newDate.getFullYear();
  let month = (newDate.getMonth() + 1).toString();
  let day = newDate.getDate().toString();

  month = +month < 10 ? "0" + month : month;
  day = +day < 10 ? "0" + day : day;

  if (year < 2000 && card) return "Date is incorrect";

  return `${year}-${month}-${day}`;
};
