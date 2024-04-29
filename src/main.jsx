import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AlgoContextProvider } from "./sortingAlgo/Algorithms";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AlgoContextProvider>
      <App />
    </AlgoContextProvider>
  </React.StrictMode>
);
