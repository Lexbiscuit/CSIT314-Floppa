import React from "react";
const Login = React.lazy(() => import("./Login"));
const Logout = React.lazy(() => import("./Logout"));
const Dashboard = React.lazy(() => import("./Dashboard"));

const routes = [
  { path: "/", element: <Login /> },
  { path: "/logout", element: <Logout /> },
  { path: "/dashboard", element: <Dashboard /> },
];

export default routes;
