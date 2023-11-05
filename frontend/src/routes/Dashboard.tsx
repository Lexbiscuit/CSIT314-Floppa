import Appshell from "../components/Appshell";
import AuthService from "../services/auth.service";
import CreateUserAccountForm from "../components/CreateUserAccountForm";
import { Stack, Grid } from "@mantine/core";
import React from "react";

export default function Dashboard() {
  if (AuthService.getCurrentUser()) {
    return (
      <Appshell>
        <h1>Dashboard</h1>
      </Appshell>
    );
  } else {
    window.location.replace("/");
  }
}
