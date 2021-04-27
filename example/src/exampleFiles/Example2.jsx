import React, { useEffect, useReducer } from 'react';
import { useCallOnNextRender } from 'react-use-call-onnext-render';
import Draggable from 'react-draggable';
import { boxStyle } from '../App';

const DraggableBox = () => {
  const callOnNextRender = useCallOnNextRender();
  useEffect(() => {
    console.log('component did mount');
    callOnNextRender(
      () => {
        console.log('!!!!!!!!!!!!!! 20 renders after mount !!!!!!!!!!!!!!');
      },
      20,
      false
    );
  }, []);

  useEffect(() => {
    console.log('component has rendered');
  });

  const [, rerender] = useReducer((x) => x + 1, 0);
  return (
    <Draggable onStart={rerender} onDrag={rerender}>
      <div style={boxStyle}>box</div>
    </Draggable>
  );
};

export default DraggableBox;
