import React, { useEffect, useReducer, useRef } from 'react';
import useCallOnNextRender from 'react-use-call-onnext-render';
import Draggable from 'react-draggable';
import { boxStyle } from '../App';

const DraggableBox = () => {
  const [, rerender] = useReducer((x) => x + 1, 0);
  const boxRef = useRef();
  const nextRender = useCallOnNextRender();
  useEffect(() => {
    // rerender();
    console.log('you can listen to event and schedule renders. resize the window and see console');
    window.addEventListener('resize', () => nextRender(() => console.log('res2!'))); //will fire on next render
    window.addEventListener('resize', () => console.log('res1!')); //will fire on current render
  }, []);

  return (
    <Draggable onStart={rerender} onDrag={rerender} ref={boxRef}>
      <div style={boxStyle}>box</div>
    </Draggable>
  );
};

export default DraggableBox;
