// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";

import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";
import routes from "./routes/routes";
import Layout from "./components/Layout";
import { CookiesProvider } from "react-cookie";

import "./index.css";

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: routes,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MantineProvider>
      <CookiesProvider defaultSetOptions={{ path: "/" }}>
        <RouterProvider router={router} />
      </CookiesProvider>
    </MantineProvider>
  </React.StrictMode>,
);
