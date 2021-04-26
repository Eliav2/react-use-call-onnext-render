import React, {useEffect, useReducer, useRef} from 'react';

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
        _callCount.current += 1 ;
    });
    return callFunc.current;
};
//// example usage
// const callOnNextIteration = useCallOnNextIteration();
// for (let i = 0; i < 10; i++) {
//   console.log('i=', i);
//   callOnNextIteration(() => console.log('callOnNextIteration call', i), 5);
// }


type renderQueue = { [renderDelay: number]: { callback: Function; forceRender: boolean }[] };

// will run 'func' on the renderDelay nth render of the renderFunc.current function
export const useCallOnNextRender = (deps?) => {
    //for force update logic
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    //for next renders logic
    const _renderDelay = useRef(0);
    const renderIn = useRef<renderQueue>({});
    const renderFunc = useRef((func, renderDelay = 1, forceRender = false) => {
        const next = _renderDelay.current + renderDelay;
        if (!(next in renderIn.current)) renderIn.current[next] = [];
        // schedule the func to be rendered in the 'next' nth render
        renderIn.current[next].unshift({callback: func, forceRender});
    });

    const renderIfForceIsScheduled = () => {
        for (const [renderDelay, scheduledCalls] of Object.entries(renderIn.current)) {
            // if one of the scheduled calls are forced then force re-render to the wanted renderDelay
            let breakFlag = false;
            for (const call of scheduledCalls) {
                if (call.forceRender && (Number(renderDelay) > _renderDelay.current ?? true)) {
                    forceUpdate();
                    breakFlag = true;
                    break;
                }
            }
            if (breakFlag) break;
        }
    }

    useEffect(() => {
        //update render count
        _renderDelay.current += 1;

        // force update if requested
        renderIfForceIsScheduled()
        // call any functions scheduled for this render
        if (_renderDelay.current in renderIn.current) {
            const currentCalls = renderIn.current[_renderDelay.current];
            currentCalls.forEach((call) => call.callback());
            delete renderIn[_renderDelay.current];
        }

    }, deps);

    useEffect(() => {
        // this is required for the case you call this hook on mount
        // and your component renders only once after mount.
        // this is necessary to catch forced scheduled renders on mount.
        forceUpdate();
    }, [])

    return renderFunc.current;
};

export default useCallOnNextRender;
