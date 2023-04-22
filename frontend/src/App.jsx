import React, { useState } from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Champions from "./routes/champions";
import Root from "./routes/root";
import Rules from "./routes/rules";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Champions></Champions>,
      },
      {
        path: "/rules",
        element: <Rules></Rules>,
      },
    ],
  },
]);

function App() {
  const [count, setCount] = useState(0);

  return (
    <React.StrictMode>
      <RouterProvider router={router}></RouterProvider>
    </React.StrictMode>
  );
}

export default App;
