import { useEffect, useReducer, useRef } from 'react';

type renderQueue = { [renderCount: number]: { callback: Function; forceRender: boolean }[] };

// A custom hook that can be used to schedule a callback function on later render, optionally forced!
export const useCallOnNextRender = (deps?, effectHook = useEffect as (...args: any) => void) => {
  //for force update logic
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  //for next renders logic
  const renderCount = useRef(0);
  const callCount = useRef(0);
  const scheduleCalls = useRef<renderQueue>({});
  const renderMarked = useRef<{ marked: boolean; callCount?: number }>({ marked: false });
  callCount.current += 1;

  // this function is used by the user to schedule callbacks for later renders
  const scheduler = useRef((callback, renderDelay = 1, forceRender = true) => {
    // this is necessary to handle forced renders that these not trigger useEffect hook
    // and in the same time prevent infinite re-calls loop
    if (
      // prevent infinite re-calls loop
      !renderMarked.current.marked ||
      // but allow cases when the same scheduler is called with different callbacks on the same render
      (renderMarked.current.marked && (renderMarked.current?.callCount ?? 0) == callCount.current)
    ) {
      renderMarked.current.callCount = callCount.current;
      const next = renderCount.current + renderDelay;
      if (!(next in scheduleCalls.current)) scheduleCalls.current[next] = [];
      // schedule the func to be rendered in the 'next' nth render
      scheduleCalls.current[next].push({ callback: callback, forceRender });
      if (forceRender) forceUpdate();
      renderMarked.current.marked = true;
    } else {
      renderMarked.current.marked = false;
    }
  });

  effectHook(() => {
    //update render count
    renderCount.current += 1;

    // force the next rerender if any forced call is scheduled
    for (const [renderDelay, scheduledCalls] of Object.entries(scheduleCalls.current)) {
      // if one of the scheduled calls are forced then force re-render to the wanted renderDelay
      let breakFlag = false;
      for (const call of scheduledCalls) {
        if (call.forceRender && (Number(renderDelay) > renderCount.current ?? true)) {
          forceUpdate();
          breakFlag = true;
          break;
        }
      }
      if (breakFlag) break;
    }
    // call any functions scheduled for the current render
    if (renderCount.current in scheduleCalls.current) {
      const currentCalls = scheduleCalls.current[renderCount.current];
      currentCalls.forEach((call) => call.callback());
      delete scheduleCalls[renderCount.current];
    }
  }, deps);

  effectHook(() => {
    // this is required for the case you call this hook on mount
    // and your component renders only once after mount,
    // this is necessary to catch forced scheduled renders on mount.
    // or for the case the first call doesn't trigger useEffect.
    forceUpdate();
  }, []);

  return scheduler.current;
};

export default useCallOnNextRender;

// will run 'func' on the callCount nth call of the callFunc.current function
export const useCallOnNextIteration = () => {
  const _callCount = useRef(0);
  const callIn = useRef({});
  const callFunc = useRef((func, callCount = 1) => {
    const next = _callCount.current + callCount;
    if (!(next in callIn.current)) callIn.current[next] = [];
    // schedule the func to be called in the 'next' nth call
    callIn.current[next].unshift(func);
    // call any functions scheduled for now
    if (_callCount.current in callIn.current) {
      callIn.current[_callCount.current].forEach((func) => func());
      delete callIn[_callCount.current];
    }
    _callCount.current += 1;
  });
  return callFunc.current;
};
//// example usage
// const callOnNextIteration = useCallOnNextIteration();
// for (let i = 0; i < 10; i++) {
//   console.log('i=', i);
//   callOnNextIteration(() => console.log('callOnNextIteration call', i), 5);
// }
