export const pipe = <R>(fn1: (a: R) => R, ...fns: Array<(a: R) => R>): ((a: R) => R) =>
  fns.reduce((prevFn, nextFn) => (value) => nextFn(prevFn(value)), fn1);

export const identity = <T>(arg: T): T => arg;

export const mergeArrays = <T, U>(array1: Array<T>, array2: Array<U>): Array<T | U> => {
  const jointArray = [...array1, ...array2].reverse();

  const uniqueArray = jointArray.filter((item, index) => jointArray.indexOf(item) === index);
  return uniqueArray.reverse();
};

export const assertUnreachable = (reason: string): never => {
  throw new Error(`Unreachable code path: ${reason}`);
};

export const areArraysEqual = <T>(array1: T[], array2: T[]): boolean => {
  if (array1.length !== array2.length) {
    return false;
  }

  const length = array1.length;

  for (let index = 0; index < length; index++) {
    if (array1[index] !== array2[index]) {
      return false;
    }
  }
  return true;
};
