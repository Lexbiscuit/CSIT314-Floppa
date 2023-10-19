import { AppShell } from "@mantine/core";
import PropTypes from "prop-types";
import React from "react";
import Header from "./Header";

export default function Appshell(props: { children: React.ReactNode }) {
  return (
    <AppShell padding="md">
      <Header />

      <AppShell.Main>{props.children}</AppShell.Main>
    </AppShell>
  );
}

Appshell.propTypes = {
  children: PropTypes.node,
};
