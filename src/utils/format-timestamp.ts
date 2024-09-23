const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

type DateTimeFull = {
  second: string;
  minute: string;
  hour: string;
  day: number;
  month: string;
  year: number;
};

const formatUnixTimestamp = (unix_timestamp: number): DateTimeFull => {
  const date = new Date(unix_timestamp * 1000);

  const second =
    date.getSeconds().toString().split("").length > 1
      ? date.getSeconds().toString()
      : "0" + date.getSeconds();

  const minute =
    date.getMinutes().toString().split("").length > 1
      ? date.getMinutes().toString()
      : "0" + date.getMinutes();

  const hour =
    date.getHours().toString().split("").length > 1
      ? date.getHours().toString()
      : "0" + date.getHours();

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return { second, minute, hour, day, month, year };
};

export const formatUnixDate = (
  unix_timestamp: number | null | undefined,
): string => {
  const { day, month } = formatUnixTimestamp(unix_timestamp ?? 0);
  return `${day} ${month}`;
};

export const formatUnixDateTime = (
  unix_timestamp: number | null | undefined,
): string => {
  const { minute, hour, day, month, year } = formatUnixTimestamp(
    unix_timestamp ?? 0,
  );
  return `${day} ${month} ${year}, ${hour}:${minute}`;
};

export const formatToMinutesAndSeconds = (totalSeconds: number): string => {
  const minutes = Math.floor(totalSeconds / 60);
  const restSeconds = Math.floor(totalSeconds % 60);
  const seconds =
    restSeconds >= 10 ? restSeconds.toString() : "0" + restSeconds.toString();
  return `${minutes}:${seconds}`;
};

export const formatExpiryDate = (timestamp: number) => {
  const now = new Date();
  const expiryDate = new Date(timestamp * 1000);
  const hours = Math.round(
    (expiryDate.getTime() - now.getTime()) / 1000 / 60 / 60,
  );

  return hours < 0 ? 0 : hours.toString() + "h";
};
