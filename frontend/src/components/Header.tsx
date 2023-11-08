import React from "react";
import { Container, Group, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useLocation } from "react-router-dom";
import AuthService from "../services/auth.service";

import classes from "../styles/Header.module.css";
import FloppaLogo from "../assets/FloppaLogo.png";

const allLinks = [
  { link: "/dashboard", label: "Dashboard" },
  { link: "/accounts", label: "Accounts", profiles: [1] },
  { link: "/profiles", label: "Profiles", profiles: [1] },
  { link: "/workslots", label: "Work Slots", profiles: [2] },
  { link: "/managerbids", label: "Manager Bids", profiles: [3] },
  { link: "/staffbids", label: "Staff Bids", profiles: [4] },
];

const currentUser = AuthService.getCurrentUser();
const links = allLinks.filter((link) => {
  if (link.profiles) {
    return link.profiles.includes(currentUser.profileId);
  } else {
    return true;
  }
});

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

  const logout = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    AuthService.logout();
    alert("You have been logged out.");
    window.location.replace("/logout");
  };

  const LogoutBtn = () => (
    <a
      href={"/logout"}
      className={classes.link}
      onClick={(event) => logout(event)}
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
          <LogoutBtn />
        </Group>

        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      </Container>
    </header>
  );
}
