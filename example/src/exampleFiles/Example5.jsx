import React, { useEffect, useRef } from 'react';
import useCallOnNextRender from 'react-use-call-onnext-render';
import { boxStyle } from '../App';

/**
 * expected logs:
 *    update call       {call:0,render:0}
 *    finished mount    {call:1,render:0}
 *    finished render   {call:1,render:0}
 *    update call       {call:1,render:1}
 *    after mount       {call:2,render:1}
 *    after render      {call:2,render:1}
 */

const ScheduledBox1 = () => {
  // helpers
  const render = useRef(0);
  const call = useRef(0);
  const consoleState = () => `{call:${call.current},render:${render.current}}`;
  const log = (...args) => console.log(...args, consoleState());

  // logic
  const nextRender = useCallOnNextRender();
  useEffect(() => {
    nextRender(() => log('after mount'));
    log('finished mount');

    // window.requestAnimationFrame(() => log('end! (no scheduled react updates)'));
  }, []);
  useEffect(() => {
    nextRender(() => log('after render'));
    log('finished render');
    render.current += 1;
  });
  log('update call');
  call.current += 1;
  // nextRender(() => console.log('render'));

  return <div style={boxStyle}>see console</div>;
};

export default ScheduledBox1;
