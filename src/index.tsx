// Импорты
import React from "react";
import { createRoot } from "react-dom/client";

// Features
import reportWebVitals from "./features/default/reportWebVitals";

// App
import { App } from "./pages/app/App";

// Container app
const container = document.getElementById("root") as HTMLElement;
// Creating root
const root = createRoot(container);

// Render app
root.render(
    // Strict mode
    <React.StrictMode>
        {/* App page component */}
        <App />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
