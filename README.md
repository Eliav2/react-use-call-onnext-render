# react-use-call-onnext-render

`useCallOnNextRender` - an efficient and smart hook to schedule a callback for a later render.

## installation

with npm `npm react-use-call-onnext-render`.  
or `yarn add react-use-call-onnext-render`.

## Usage

Let's say you want to access a lifecycle variable next render's value, so this is the hook for you!  
An example for such use case can be a callback function to update state based on properties of DOM element that will be
available only on next render(s).

this hook is very useful when accessing DOM elements,especially on mount.

you can also pass dependency list and then the callback function will be called on the n'th change of the values in the
dependency list and not on the n'th render of the component

## Examples

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

note that will not force 5 renders it mount, but will just. fire the callback when the 5th render occurs.

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

Although these examples are simple but very smart things can be done with the hook.

### Demos

code sandbox:

### API

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

See [CHANGELOG.md](https://github.com/Eliav2/react-xarrows/blob/master/CHANGELOG.md) in this repo.
