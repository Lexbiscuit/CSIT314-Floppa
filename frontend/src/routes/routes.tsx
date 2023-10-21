import React from "react";
const Login = React.lazy(() => import("./Login"));
const Logout = React.lazy(() => import("./Logout"));
const Dashboard = React.lazy(() => import("./Dashboard"));
const Accounts = React.lazy(() => import("./Accounts"));
const Profiles = React.lazy(() => import("./Profiles"));

const routes = [
  { path: "/", element: <Login /> },
  { path: "/logout", element: <Logout /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/accounts", element: <Accounts /> },
  { path: "/profiles", element: <Profiles /> },
];

export default routes;
