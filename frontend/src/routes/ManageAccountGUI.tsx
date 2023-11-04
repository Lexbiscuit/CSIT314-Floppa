import React, { useState, useEffect } from "react";
import Appshell from "../components/Appshell";
import { Container } from "@mantine/core";
import AuthService from "../services/auth.service";
import { Tabs } from "@mantine/core";
import CreateAccountForm from "../components/Accounts/CreateAccountForm";
import AccountsTable from "../components/Accounts/AccountsTable";
import SearchAccountForm from "../components/Accounts/SearchAccountForm";

export default function ManageAccountGUI() {
  if (!AuthService.getCurrentUser()) {
    return (
      <Appshell>
        <Container size="md" my="1rem">
          <Tabs>
            <Tabs.List>
              <Tabs.Tab value="create">Create User Account</Tabs.Tab>
              <Tabs.Tab value="tableView">User Account Table</Tabs.Tab>
              <Tabs.Tab value="search">Search User Account</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="create">
              <h1>Create Account</h1>
              <CreateAccountForm />
            </Tabs.Panel>

            <Tabs.Panel value="tableView">
              <h1>Accounts Table</h1>
              <AccountsTable />
            </Tabs.Panel>

            <Tabs.Panel value="search">
              <h1>Search Accounts</h1>
              <SearchAccountForm />
            </Tabs.Panel>
          </Tabs>
        </Container>
      </Appshell>
    );
  }
}
