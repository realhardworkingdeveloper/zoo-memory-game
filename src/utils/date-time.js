import axios from "axios";

export const convertToHours = (timeInSeconds) => {
  return new Date(timeInSeconds * 1000).toISOString().substr(11, 8);
};

export const getWorldTime = async () => {
  const { REACT_APP_WORLD_TIME_API_URL } = process.env;

  const currentTimeData = await axios.get(`${REACT_APP_WORLD_TIME_API_URL}`);
  const currentTime = currentTimeData.data.datetime;
  const secondTypeCurrentTime = Math.round(
    new Date(currentTime).getTime() / 1000
  );

  return secondTypeCurrentTime;
};

export const convertToddmmyyyy = (date) => {
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = date.getFullYear();

  const formattedDate = mm + "/" + dd + "/" + yyyy;
  return formattedDate;
};

export const convertTohhmm = (date) => {
  new Date(date).toISOString().substr(11, 5);
};

export const getAsDateTimeLocal = (date) => {
  // const isoStr = date.toISOString();
  // return isoStr.split(":").slice(0, -1).join(":");

  // const localeStr = date.toLocaleString();
  // const [dateStr, timeStr] = localeStr.split(", ");

  // return (
  //   dateStr.split("/").join("-") +
  //   "T" +
  //   timeStr.split(":").slice(0, -1).join(":")
  // );

  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = date.getFullYear();
  const hh = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");

  return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
};

export const getDaysHrsMnsSecs = (n) => {
  n = parseInt(n);

  var day = parseInt(n / (24 * 3600));

  n = n % (24 * 3600);
  var hour = parseInt(n / 3600);

  n %= 3600;
  var minutes = parseInt(n / 60);

  n %= 60;
  var seconds = parseInt(n);

  return `${day}:${hour}:${minutes}:${seconds}`;
};
