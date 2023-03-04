import counterReducer from "./reducer";
import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";

const store = createStore(counterReducer);

const App = () => {
  return (
    <>
      <div className="buttons">
        <button onClick={() => store.dispatch({ type: "GOOD" })}>Good</button>
        <button onClick={() => store.dispatch({ type: "BAD" })}>Bad</button>
        <button onClick={() => store.dispatch({ type: "OK" })}>Ok</button>
        <button onClick={() => store.dispatch({ type: "RESET" })}>Reset Statistics</button>
      </div>
      <div className="display">
        <p>Good: {store.getState().good}</p>
        <p>Ok: {store.getState().ok}</p>
        <p>Bad: {store.getState().bad}</p>
      </div>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

const renderApp = () => {
    root.render(<App />)
  }
  renderApp()
  store.subscribe(renderApp)