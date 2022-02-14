export const arrSum = (arr: number[]) =>
  arr.reduce((last: number, current: number) => last + current) || 0;

export const arrAverage = (arr: number[]) => {
  const numbersArray = arr.filter((val) => val);
  return arrSum(numbersArray) / numbersArray.length || 0;
};
export const percentageDiff = (first: number, second: number) =>
  ((first - second) / second) * 100;
