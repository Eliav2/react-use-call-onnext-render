import React from 'react';

import examples from './exampleFiles';

import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

const titleStyle = {
  fontSize: '40px',
  margin: '20px 0 0 20px',
};

const canvasStyle = {
  position: 'relative',
  height: '20vh',
  background: 'white',
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'center',
};

export const boxStyle = {
  position: 'relative',
  border: '1px #999 solid',
  borderRadius: '10px',
  textAlign: 'center',
  width: '100px',
  height: '30px',
  color: 'black',
};

const ExamplePage = () => {
  return (
    <div>
      <header style={titleStyle}>react-use-call-onnext-render</header>
      <hr />
      <p style={{ textAlign: 'center' }}>
        schedule a callback for later renders!
        <br />
        <br />
        <a href="https://github.com/Eliav2/react-use-call-onnext-render" target="_blank" rel="noopener noreferrer">
          View on Github
        </a>
        <br />
        <a href="https://www.npmjs.com/package/react-use-call-onnext-render" target="_blank" rel="noopener noreferrer">
          View on npm
        </a>
        <br />
        <a href="https://eliav2.github.io/react-use-call-onnext-render/" target="_blank" rel="noopener noreferrer">
          Home page
        </a>
        <br />
        <br />
        Just great react.
        <br />
      </p>
      <Router>
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}>
            <Link to="/">
              <button>home</button>
            </Link>
            {Object.keys(examples).map((exampleName) => (
              <Link to={'/' + exampleName} key={exampleName}>
                <button>{exampleName}</button>
              </Link>
            ))}
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <br />
          These example means nothing if you don't look in the code,
          <br />
          fork this sandbox and play with the examples below
          <br />
        </div>
        <Switch>
          <Route exact path="/">
            <div style={{ textAlign: 'center' }}>
              <h2>choose any example</h2>
              <h5>
                see each example file at <code>/src/examplesFiles</code>{' '}
              </h5>
            </div>
          </Route>
          {Object.keys(examples).map((exampleName) => {
            const Component = examples[exampleName].component;
            return (
              <Route path={'/' + exampleName} key={exampleName}>
                {/*<Component />*/}
                <React.Fragment>
                  <h3>
                    <u>{exampleName}:</u>
                  </h3>
                  <p>{examples[exampleName].description}</p>
                  <div style={canvasStyle} id="canvas">
                    <Component />
                  </div>
                </React.Fragment>
              </Route>
            );
          })}
        </Switch>
      </Router>
    </div>
  );
};

export default ExamplePage;
