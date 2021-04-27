import React, { useEffect, useRef } from 'react';
import useCallOnNextRender from 'react-use-call-onnext-render';
import { boxStyle } from '../App';

const Box = () => {
  const renderCount = useRef(0);
  const callOnNextRender = useCallOnNextRender();
  useEffect(() => {
    console.log('component did mount, renderCount:', renderCount.current);
    callOnNextRender(() => {
      console.log('fire!, renderCount:', renderCount.current);
    });
  }, []);

  useEffect(() => {
    console.log(`the ${renderCount.current} render has ended`);
    renderCount.current += 1;
  });

  return <div style={boxStyle}>see console</div>;
};

export default Box;
