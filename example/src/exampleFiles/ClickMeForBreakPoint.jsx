import React, { useEffect, useRef } from 'react';
import { boxStyle } from '../App';

// linked using yarn link 'react-use-call-onnext-render'
import useCallOnNextRender from 'react-use-call-onnext-render';

const Box = () => {
  const renderCount = useRef(0);
  const callOnNextRender = useCallOnNextRender();

  // this is using 
  callOnNextRender(() => console.log('next update call'));

  return <div style={boxStyle}>see console</div>;
};

export default Box;
