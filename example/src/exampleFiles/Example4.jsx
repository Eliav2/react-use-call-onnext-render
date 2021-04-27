import React, { useEffect, useReducer, useRef } from 'react';
import useCallOnNextRender from 'react-use-call-onnext-render';
import Draggable from 'react-draggable';

const canvasStyle = {
  position: 'relative',
  height: '20vh',
  background: 'white',
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'center',
};

const boxStyle = {
  position: 'relative',
  border: '1px #999 solid',
  borderRadius: '10px',
  textAlign: 'center',
  width: '100px',
  height: '30px',
  color: 'black',
};

const DraggableBox = () => {
  const [, rerender] = useReducer((x) => x + 1, 0);
  const boxRef = useRef();
  const nextRender = useCallOnNextRender();
  useEffect(() => {
    // rerender();
    window.addEventListener('resize', () => nextRender(() => console.log('res2!'))); //will fire on next render
    window.addEventListener('resize', () => console.log('res1!')); //will fire on current render
  }, []);

  return (
    <Draggable onStart={rerender} onDrag={rerender} ref={boxRef}>
      <div style={boxStyle}>box</div>
    </Draggable>
  );
};

const Example = () => {
  return (
    <React.Fragment>
      <h3>
        <u>Simple Example:</u>
      </h3>
      <p>you can listen to event and schedule renders. resize the window and see console</p>
      <div style={canvasStyle} id="canvas">
        <DraggableBox />
      </div>
    </React.Fragment>
  );
};

export default Example;
