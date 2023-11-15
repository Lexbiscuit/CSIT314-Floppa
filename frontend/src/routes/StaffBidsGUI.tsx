import React from "react";
import Appshell from "../components/Appshell";
import { Container } from "@mantine/core";
import AuthService from "../services/auth.service";
import { Tabs } from "@mantine/core";
import StaffBidsTable from "../components/StaffBids/StaffBidsTable";
import CreateBidForm from "../components/StaffBids/CreateBidForm";

export default function StaffBidsGUI() {
  if (AuthService.getCurrentUser()) {
    return (
      <Appshell>
        <Container size="xl" my="1rem">
          <Tabs defaultValue="create" keepMounted={false}>
            <Tabs.List>
              <Tabs.Tab value="create">Create bid</Tabs.Tab>
              <Tabs.Tab value="view">View bid</Tabs.Tab>
              <Tabs.Tab value="result">Bid Result </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="create">
              <h1> Create bid</h1>
              <CreateBidForm />
            </Tabs.Panel>

            <Tabs.Panel value="view">
              {/* view, update, and delete */}
              <h1>View bid</h1>
              <StaffBidsTable />
            </Tabs.Panel>

            <Tabs.Panel value="result">
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
