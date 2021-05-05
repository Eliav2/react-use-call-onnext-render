export const measureFunc = (callbackFunc: Function, name = '') => {
  const t = performance.now();

  const returnVal = callbackFunc();
  console.log('time ', name, ':', performance.now() - t);
  return returnVal;
};
