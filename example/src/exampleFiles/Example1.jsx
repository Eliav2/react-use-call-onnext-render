import React, {useEffect, useReducer, useRef} from "react";
import useCallOnNextRender from "react-use-call-onnext-render"
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
    const renderCount = useRef(0)
    const callOnNextRender = useCallOnNextRender()
    useEffect(() => {
        console.log("component did mount")
        callOnNextRender(() => {
            console.log("this is the 25th render after mount")
        }, 25)
    }, [])

    useEffect(() => {
        console.log(`the ${renderCount.current} render has ended`)
        renderCount.current += 1
    })


    const [, rerender] = useReducer((x) => x + 1, 0);
    return <Draggable onStart={rerender} onDrag={rerender}>
        <div style={boxStyle}>
            click me
        </div>
    </Draggable>
}


const Example = () => {
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

export default Example;
