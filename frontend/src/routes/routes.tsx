import React from "react";
import AuthService from "../services/auth.service";
const LoginGUI = React.lazy(() => import("./LoginGUI"));
const LogoutGUI = React.lazy(() => import("./LogoutGUI"));
const Dashboard = React.lazy(() => import("./Dashboard"));
const ManageAccountGUI = React.lazy(() => import("./ManageAccountGUI"));
const ManageProfileGUI = React.lazy(() => import("./ManageProfileGUI"));
const ManageWorkslotGUI = React.lazy(() => import("./ManageWorkslotGUI"));
const ManagerBidsGUI = React.lazy(() => import("./ManagerBidsGUI"));
const StaffBidsGUI = React.lazy(() => import("./StaffBidsGUI"));

const currentUser = AuthService.getCurrentUser();

const allRoutes = [
  { path: "/", element: <LoginGUI /> },
  { path: "/logout", element: <LogoutGUI /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/accounts", element: <ManageAccountGUI />, profiles: [1] },
  { path: "/profiles", element: <ManageProfileGUI />, profiles: [1] },
  { path: "/workslots", element: <ManageWorkslotGUI />, profiles: [2] },
  { path: "/managerbids", element: <ManagerBidsGUI />, profiles: [3] },
  { path: "/staffbids", element: <StaffBidsGUI />, profiles: [4] },
];

let routes = [];

if (!currentUser) {
  routes = [
    { path: "/", element: <LoginGUI /> },
    { path: "/logout", element: <LogoutGUI /> },
  ];
} else {
  routes = allRoutes.filter((route) => {
    if (route.profiles) {
      return route.profiles.includes(currentUser.profileId);
    } else {
      return true;
    }
  });
}

export default routes;
