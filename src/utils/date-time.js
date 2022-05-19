import axios from 'axios';

export const convertToHours = (timeInSeconds) => {
  return new Date(timeInSeconds * 1000).toISOString().substr(11, 8);
};

export const getWorldTime = async () => {
  const { REACT_APP_WORLD_TIME_API_URL } = process.env;

  const currentTimeData = await axios.get(`${REACT_APP_WORLD_TIME_API_URL}`);
  const currentTime = currentTimeData.data.datetime;
  const secondTypeCurrentTime = Math.round(new Date(currentTime).getTime() / 1000);

  return secondTypeCurrentTime;
}
