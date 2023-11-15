import React, { useState, useEffect } from "react";
import Appshell from "../components/Appshell";
import CreateProfileForm from "../components/Profiles/CreateProfileForm";
import UpdateProfileForm from "../components/Profiles/UpdateProfileForm";
import ProfilesTable from "../components/Profiles/ProfilesTable";
import SearchProfileForm from "../components/Profiles/SearchProfileForm";
import TanstackTable from "../components/TanstackTable";
import axios from "axios";
import authHeader from "../services/auth-header";
import { Tabs } from "@mantine/core";
import { Container } from "@mantine/core";
import AuthService from "../services/auth.service";

export default function ManageProfileGUI() {
  if (AuthService.getCurrentUser()) {
    return (
      <Appshell>
        <Container size="xl" my="1rem">
          <Tabs defaultValue="create">
            <Tabs.List>
              <Tabs.Tab value="create">Create User Profile</Tabs.Tab>
              <Tabs.Tab value="tableView">User Profile Table</Tabs.Tab>
              <Tabs.Tab value="search">Search User Profile</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="create">
              <h1>Create Profile</h1>
              <CreateProfileForm />
            </Tabs.Panel>

            <Tabs.Panel value="tableView">
              <h1>Profiles Table</h1>
              <ProfilesTable />
            </Tabs.Panel>

            <Tabs.Panel value="search">
              <h1>Search Profiles</h1>
              <SearchProfileForm />
            </Tabs.Panel>
          </Tabs>
        </Container>
      </Appshell>
    );
  } else {
    location.replace("/");
  }
}
