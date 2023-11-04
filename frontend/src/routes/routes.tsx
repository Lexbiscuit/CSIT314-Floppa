import React from "react";
const Login = React.lazy(() => import("./Login"));
const Logout = React.lazy(() => import("./Logout"));
const Dashboard = React.lazy(() => import("./Dashboard"));
const ManageAccountGUI = React.lazy(() => import("./ManageAccountGUI"));
const ManageProfileGUI = React.lazy(() => import("./ManageProfileGUI"));
const Workslots = React.lazy(() => import("./Workslots"));

const routes = [
  { path: "/", element: <Login /> },
  { path: "/logout", element: <Logout /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/accounts", element: <ManageAccountGUI /> },
  { path: "/profiles", element: <ManageProfileGUI /> },
  { path: "/workslots", element: <Workslots /> },
];

export default routes;
