export const roundNum = (num) => {
  let result;
  if (num < 1) result = 1;
  else result = Math.round(num);
  return result;
};
