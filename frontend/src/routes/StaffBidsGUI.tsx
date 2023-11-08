import React, { useState, useEffect } from "react";
import Appshell from "../components/Appshell";
import { Container } from "@mantine/core";
import AuthService from "../services/auth.service";
import { Tabs } from "@mantine/core";

export default function StaffBidsGUI() {
  if (AuthService.getCurrentUser()) {
    return (
      <Appshell>
        <Container size="md" my="1rem">
          <Tabs defaultValue="availws">
            <Tabs.List>
              <Tabs.Tab value="availws">Available Workslots</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="availws">
              <h1>Available Workslots</h1>
            </Tabs.Panel>
          </Tabs>
        </Container>
      </Appshell>
    );
  } else {
    window.location.replace("/");
  }
}
