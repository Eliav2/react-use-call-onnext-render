import React, { useEffect, useRef, useState } from 'react';
import useCallOnNextRender from 'react-use-call-onnext-render';
import { boxStyle } from '../App';

const Example = () => {
  const [showBox, setShowBox] = useState(false);
  const boxRef = useRef();
  const callOnNextShowBoxChange = useCallOnNextRender();

  return (
    <React.Fragment>
      <button
        style={boxStyle}
        onClick={() => {
          setShowBox(!showBox);
          // console.log(boxRef.current.getBoundingClientRect()); //- wrong value!
          callOnNextShowBoxChange(() => console.log(boxRef?.current.getBoundingClientRect())); //right value
        }}>
        toggle show box
      </button>
      <div style={{ border: 'black solid 1px' }}>
        {showBox ? (
          <div ref={boxRef} style={boxStyle}>
            box2
          </div>
        ) : null}
      </div>
    </React.Fragment>
  );
};

export default Example;
