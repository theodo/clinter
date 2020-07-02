export const pipe = <R>(fn1: (a: R) => R, ...fns: Array<(a: R) => R>): ((a: R) => R) =>
  fns.reduce((prevFn, nextFn) => (value) => nextFn(prevFn(value)), fn1);

export const identity = <T>(arg: T): T => arg;

export const mergeArrays = <T, U>(array1: Array<T>, array2: Array<U>): Array<T | U> => {
  const jointArray = [...array1, ...array2].reverse();

  const uniqueArray = jointArray.filter((item, index) => jointArray.indexOf(item) === index);
  return uniqueArray.reverse();
};
