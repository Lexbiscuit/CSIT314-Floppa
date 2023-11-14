import React, { useState, useEffect } from "react";
import Appshell from "../components/Appshell";
import { Container } from "@mantine/core";
import AuthService from "../services/auth.service";
import { Tabs } from "@mantine/core";
import StaffBidsTable from "../components/StaffBids/StaffBidsTable";

export default function StaffBidsGUI() {
  if (AuthService.getCurrentUser()) {
    return (
      <Appshell>
        <Container size="md" my="1rem">
          <Tabs defaultValue="create">
            <Tabs.List>
              <Tabs.Tab value="create">Create bid</Tabs.Tab>
              <Tabs.Tab value="search">View bid</Tabs.Tab>
              <Tabs.Tab value="Result">Bid Result </Tabs.Tab>

            </Tabs.List>

            <Tabs.Panel value="create">
              <h1> Create bid</h1>
            </Tabs.Panel>

            <Tabs.Panel value="search">
              <h1>View bid</h1>
              <StaffBidsTable />
            </Tabs.Panel>

            <Tabs.Panel value="">
              <h1>Bid Result</h1>
            </Tabs.Panel>
          </Tabs>
        </Container>
      </Appshell>
    );
  } else {
    window.location.replace("/");
  }
}
