## v0.5.0
- now dependency array is not supported. in case you to fire callback one render after a certain change call the 
  scheduler func in a useEffect with a dependency of the variable holding the inspected change.

## v0.4.0
- added option to use other hook then useEffect(like useLayoutEffect) as the effect hook. 

## v0.3.0
- default behavior is now force renders.  

## v0.2.0:

- now `callOnNextRender` always force first next update, and cases where useEffect did not fire on first call handled.

## v0.1.0:

- two hooks published: `useCallOnNextRender` and `useCallOnNextIteration`.
- v0.1.1-2 - updated docs, and push to npm.
