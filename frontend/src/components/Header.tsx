import React from "react";
import { Container, Group, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useLocation } from "react-router-dom";

import classes from "../styles/Header.module.css";
import FloppaLogo from "../assets/FloppaLogo.png";

const links = [
  { link: "/dashboard", label: "Dashboard" },
  { link: "/accounts", label: "Accounts" },
  { link: "/profiles", label: "Profiles" },
  { link: "/workslots", label: "Work Slots" },
  // { link: "/community", label: "Community" },
];

export default function Header() {
  const [opened, { toggle }] = useDisclosure(false);
  const { pathname } = useLocation();
  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      data-active={pathname === link.link || undefined}
    >
      {link.label}
    </a>
  ));

  const LogoutButton = () => (
    <a
      href={"/logout"}
      className={classes.link}
      onClick={(event) => {
        event.preventDefault();

        window.location.replace("/logout");
      }}
    >
      Logout
    </a>
  );

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={FloppaLogo}
            alt="Team Floppa Logo"
            style={{ height: "2.5rem" }}
          />
          <h3>Team Floppa</h3>
        </div>
        <Group gap={5} visibleFrom="xs">
          {items}
          <LogoutButton />
        </Group>

        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      </Container>
    </header>
  );
}
