import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@maxhub/max-ui/dist/styles.css";
import "./main.css";
import { App } from "./app.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
