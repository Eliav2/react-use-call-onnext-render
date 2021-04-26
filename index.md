# react-use-call-onnext-render

[![npm version](https://badge.fury.io/js/react-use-call-onnext-render.svg)](https://github.com/Eliav2/react-use-call-onnext-render)
[![downloads](https://img.shields.io/npm/dw/react-use-call-onnext-render)](https://www.npmjs.com/package/react-use-call-onnext-render)
[![issues](https://img.shields.io/github/issues/Eliav2/react-use-call-onnext-render)](https://github.com/Eliav2/react-use-call-onnext-render/issues)
[![licence](https://img.shields.io/npm/l/react-use-call-onnext-render)](https://github.com/Eliav2/react-use-call-onnext-render/blob/master/LICENSE)

an efficient and smart hook to schedule a callback for a later render.

## installation

with npm `npm react-use-call-onnext-render`.  
or `yarn add react-use-call-onnext-render`.

## Usage

Let's say you want to access a lifecycle variable next render's value, so this is the hook for you!  
An example for such use case can be a callback function to update state based on properties of DOM element that will be
available only on next render(s).

this hook is very useful when accessing DOM elements,especially on mount.

you can also pass dependency array and then the callback function will be called on the n'th change of the values in the
dependency array and not on the n'th render of the component

## Examples

**call on next render**:

the most simple use case it to fire a callback on next render:

```js
const YourComponent = () => {
    const callOnNextRender = useCallOnNextRender()
    useEffect(() => {
        console.log("your component did a mount")
        callOnNextRender(() => {
            console.log("1 render after mount")
        })
    }, [])
    return <>...</>
}
```

**schedule a callback**:

schedule a callback that will fire when the 5th render occurs:

```js
const YourComponent = () => {
    const callOnNextRender = useCallOnNextRender()
    useEffect(() => {
        console.log("your component did a mount")
        callOnNextRender(() => {
            console.log("5 renders after mount")
        }, 5)
    }, [])
    return <>...</>
}
```

note that this will not force at least 5 renders, it will just fire the callback when the 5th render occurs.

**schedule a callback and force re-renders**:

if you wish to force re-renders until the 5th render, pass true to the third argument of `callOnNextRender`:

```js
const YourComponent = () => {
    const callOnNextRender = useCallOnNextRender()
    useEffect(() => {
        console.log("your component did a mount")
        callOnNextRender(() => {
            console.log("5 renders after mount")
        }, 5, true)
    }, [])
    return <>...</>
}
```

this will force 5 rerender and only then will execute the callback function!

**dependency array**:

let's say we want to get dimensions of a removable DOM element,lets say `div` that is controlled by `showBox` state
variable. for that we can use `getBoundingClientRect()`. however, we want to call this function only after the element
mounted into the dom, so will schedule this call one render after the variable responsible for showing this element in
the dom has changed,and this variable is `showBox`, so he will be dependency of `useCallOnNextRender`:

```js
const YourComponent = () => {
    const [showBox, setShowBox] = useState(false)
    const divRef = useRef()
    const callOnNextShowBoxChange = useCallOnNextRender([showBox])
    return (
        <>
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
        </>
    );
};
```

see the 3'th example in the code sandbox.

Although these examples are simple, you can go smart with this hook.

### Demos

code sandbox: <https://codesandbox.io/s/github/Eliav2/react-use-call-onnext-render/tree/main/example>

## API

[comment]: <> (//@formatter:off)
```typescript
// type
export type useCallOnNextRenderType = (deps?: any) => (func: any, renderDelay?: number, forceRender?: boolean) => void;

// usage example(inside a component!):
const callOnNextRender = useCallOnNextRender(deps ? : Array);
callOnNextRender(callback:Function, renderDelay ? : number = 1, forceRender ? : boolean = false);
```
[comment]: <> (//@formatter:on)

note that `renderDelay` is relative to the current render and not an absolute value!

## Notes

- calling `callOnNextRender` with `renderDelay` of 0 is not supported. this is just equivalent running any function
  immediately in the scope you called `callOnNextRender`.
- default value for `renderDelay` is 1 which means the callback function will be called in the next render.
- using this hook will render your component twice in mount(if not already rendered twice)

## useCallOnNextIteration

this repo also includes `useCallOnNextIteration` - like a managed queue for of calls. similar to `useCallOnNextRender`
but is not bounded component lifecycle. for example can be run in a for loop.

```jsx
// example usage
const callOnNextIteration = useCallOnNextIteration();
for (let i = 0; i < 10; i++) {
    console.log('i=', i);
    callOnNextIteration(() => console.log('callOnNextIteration call', i), 5);
}
//this will console.log
// i= 0
// i= 1
// i= 2
// i= 3
// i= 4
// i= 5
// callOnNextIteration call 0
// i= 6
// callOnNextIteration call 1
// i= 7
// callOnNextIteration call 2
// i= 8
// callOnNextIteration call 3
// i= 9
// and so on...
```

## Versions

See [CHANGELOG.md](CHANGELOG.md) in this repo.
