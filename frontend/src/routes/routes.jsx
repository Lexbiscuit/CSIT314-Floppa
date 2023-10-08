import React from "react";
import pathConstants from "./pathConstants";

const HomePage = React.lazy(() => import("./homepage"));
const LoginPage = React.lazy(() => import("./loginpage"));
const LogoutPage = React.lazy(() => import("./logoutpage"));

const routes = [
  { path: pathConstants.HOME, element: <HomePage /> },
  { path: pathConstants.LOGIN, element: <LoginPage /> },
  { path: pathConstants.LOGOUT, element: <LogoutPage /> },
];

export default routes;
