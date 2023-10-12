import { AppShell } from "@mantine/core";
import PropTypes from "prop-types";
import Header from "./Header";

export default function Appshell({ children }) {
  return (
    <AppShell header={{ height: 60 }} padding="md">
      <Header />

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}

Appshell.propTypes = {
  children: PropTypes.node,
};
