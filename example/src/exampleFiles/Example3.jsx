import React, {useRef, useState} from "react";
import useCallOnNextRender from "react-use-call-onnext-render";

const canvasStyle = {
    position: "relative",
    height: "20vh",
    background: "white",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
};

const boxStyle = {
    position: "relative",
    border: "1px #999 solid",
    borderRadius: "10px",
    textAlign: "center",
    width: "120px",
    height: "30px",
    color: "black",
};


const Example = () => {
    const [showBox, setShowBox] = useState(false)
    const divRef = useRef()
    const callOnNextShowBoxChange = useCallOnNextRender([showBox])
    return (
        <React.Fragment>
            <h3>
                <u>Simple Example:</u>
            </h3>
            <p>
                click on the box
            </p>
            <div style={canvasStyle} id="canvas">
                <button style={boxStyle} onClick={() => {
                    setShowBox(!showBox)
                    // console.log(divRef.current.getBoundingClientRect()) - wrong value!
                    callOnNextShowBoxChange(() => console.log(divRef.current.getBoundingClientRect())) //right value
                }}>toggle show box
                </button>
                <div style={{border: "black solid 1px"}} ref={divRef}>
                    {showBox ? <div style={boxStyle}>box2</div> : null}
                </div>
            </div>
        </React.Fragment>
    );
};

export default Example;
