import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@maxhub/max-ui/dist/styles.css";
import "./main.css";

import { APIProvider } from "@/shared/providers/api-context";
import { AuthProvider } from "@/shared/providers/auth-context";

import { App } from "./app.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <APIProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </APIProvider>
  </StrictMode>,
);
