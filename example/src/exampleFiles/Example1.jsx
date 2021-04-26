import React, {useEffect, useReducer} from "react";
import {useCallOnNextRender} from "react-use-call-onnext-render"
import Draggable from "react-draggable";

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
    width: "100px",
    height: "30px",
    color: "black",
};

const DraggableBox = () => {
    const callOnNextRender = useCallOnNextRender()
    useEffect(() => {
        console.log("component did mount")
        callOnNextRender(() => {
            console.log("25 renders after mount")
        }, 25)
    }, [])

    useEffect(() => {
        console.log("component has rendered")
    })


    const [, rerender] = useReducer((x) => x + 1, 0);
    return <Draggable onStart={rerender} onDrag={rerender}>
        <div style={boxStyle}>
            click me
        </div>
    </Draggable>
}


const SimpleExample = () => {
    return (
        <React.Fragment>
            <h3>
                <u>Simple Example:</u>
            </h3>
            <p>
                open console. drag the box around and see log on the 25'th render.
            </p>
            <div style={canvasStyle} id="canvas">
                <DraggableBox/>
            </div>
        </React.Fragment>
    );
};

export default SimpleExample;
