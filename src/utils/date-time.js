export const convertToHours = (timeInSeconds) => {
  return new Date(timeInSeconds * 1000).toISOString().substr(11, 8);
};
