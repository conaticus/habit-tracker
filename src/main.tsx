import React from "react";
import ReactDOM from "react-dom/client";
import Questions from "./pages/Questions.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
      <Questions />
  </React.StrictMode>,
);
