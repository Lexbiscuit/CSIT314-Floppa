import React, { useState, useEffect } from "react";
import Appshell from "../components/Appshell";
import { Container } from "@mantine/core";
import AuthService from "../services/auth.service";
import { Tabs } from "@mantine/core";
import CreateWorkslotForm from "../components/Workslots/CreateWorkslotForm";
import WorkslotsTable from "../components/Workslots/WorkslotsTable";
import SearchWorkslotForm from "../components/Workslots/SearchWorkslotForm";

export default function ManageWorkslotGUI() {
  if (AuthService.getCurrentUser()) {
    return (
      <Appshell>
        <Container size="xl" my="1rem">
          <Tabs defaultValue="create">
            <Tabs.List>
              <Tabs.Tab value="create">Create Workslot</Tabs.Tab>
              <Tabs.Tab value="tableView">Workslot Table</Tabs.Tab>
              <Tabs.Tab value="search">Search Workslot</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="create">
              <h1>Create Workslot</h1>
              <CreateWorkslotForm />
            </Tabs.Panel>

            <Tabs.Panel value="tableView">
              <h1>Workslot Table</h1>
              <WorkslotsTable />
            </Tabs.Panel>

            <Tabs.Panel value="search">
              <h1>Search Workslots</h1>
              <SearchWorkslotForm />
            </Tabs.Panel>
          </Tabs>
        </Container>
      </Appshell>
    );
  } else {
    window.location.replace("/");
  }
}
