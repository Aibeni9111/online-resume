// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ErrorBoundary } from "./ErrorBoundary";
import { applyInitialTheme } from "./theme";
import { BrowserRouter } from "react-router-dom";
applyInitialTheme();
// @ts-ignore
import "@fontsource-variable/inter";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ErrorBoundary>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ErrorBoundary>
    </React.StrictMode>
);
