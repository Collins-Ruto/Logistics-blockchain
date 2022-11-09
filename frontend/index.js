import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { initContract } from "./near/utils";
import { BrowserRouter } from "react-router-dom";

const container = document.querySelector("#root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript

window.nearInitPromise = initContract()
  .then(() => {
    <App />;
    root.render(
      <BrowserRouter>
        <App tab="home" />
      </BrowserRouter>
    );
  })
  .catch(console.error);
