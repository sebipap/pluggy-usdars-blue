export const arrSum = (arr: number[]) =>
  arr.reduce((last: number, current: number) => last + current);

export const arrAverage = (arr: number[]) => {
  const numbersArray = arr.filter((val) => val);
  return arrSum(numbersArray) / numbersArray.length;
};
export const percentageDiff = (first: number, second: number) =>
  ((first - second) / second) * 100;
