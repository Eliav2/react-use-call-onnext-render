import { useEffect, useReducer, useRef } from 'react';


// A custom hook that can be used to schedule a callback function on later render, optionally forced!
export const useCallOnNextRender = () => {

  const breakPointTestMeOnVsCode = 100; //works 
  const breakPointTestMeOnWebStorm = 100; //does Not work! 

  return ()=>{}
};

export default useCallOnNextRender
