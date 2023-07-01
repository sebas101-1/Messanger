import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Splash from "./routes/Splash"
import Chat from "./routes/chat.tsx"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Splash />,
  },
  {
    path: "/chat",
    element: <Chat/>
  }
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);