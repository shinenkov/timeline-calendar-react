import dayjs from "dayjs";

export const isSameDate = (date1: string, date2: string) => {
  return (
    dayjs(date1).format("DD-MM-YYYY") === dayjs(date2).format("DD-MM-YYYY")
  );
};
