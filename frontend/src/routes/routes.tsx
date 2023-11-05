import React from "react";
const LoginGUI = React.lazy(() => import("./LoginGUI"));
const LogoutGUI = React.lazy(() => import("./LogoutGUI"));
const Dashboard = React.lazy(() => import("./Dashboard"));
const ManageAccountGUI = React.lazy(() => import("./ManageAccountGUI"));
const ManageProfileGUI = React.lazy(() => import("./ManageProfileGUI"));
const ManageWorkslotGUI = React.lazy(() => import("./ManageWorkslotGUI"));

const routes = [
  { path: "/", element: <LoginGUI /> },
  { path: "/logout", element: <LogoutGUI /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/accounts", element: <ManageAccountGUI /> },
  { path: "/profiles", element: <ManageProfileGUI /> },
  { path: "/workslots", element: <ManageWorkslotGUI /> },
];

export default routes;
