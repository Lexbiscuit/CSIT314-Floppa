import React, { useState, useEffect } from "react";
import Appshell from "../components/Appshell";
import CreateProfileForm from "../components/Profiles/CreateProfileForm";
import UpdateProfileForm from "../components/Profiles/UpdateProfileForm";
import ProfilesTable from "../components/Profiles/ProfilesTable";
import SearchProfileForm from "../components/Profiles/SearchProfileForm";
import TanstackTable from "../components/TanstackTable";
import axios from "axios";
import authHeader from "../services/auth-header";
<<<<<<< Updated upstream
=======
import { Tabs } from "@mantine/core";
import { Container } from "@mantine/core";
>>>>>>> Stashed changes
import AuthService from "../services/auth.service";


export default function ManageProfileGUI() {
<<<<<<< Updated upstream
  if (AuthService.getCurrentUser()) {
    const { status, data, error, isFetching } = useProfiles();

    return (
      <Appshell>
        <Container size="lg" my="1rem">
          <h1>Profiles</h1>
          <CreateProfileForm />
          {isFetching && <h1>Loading...</h1>}
          {error && <h1>An error occured</h1>}
          {data && <TanstackTable columns={columns} data={data} />}
        </Container>
      </Appshell>
    );
  } else {
    window.location.replace("/");
=======
  if (!AuthService.getCurrentUser()) {
    return (
      <Appshell>
        <Container size="md" my="1rem">
          <Tabs>
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
>>>>>>> Stashed changes
  }
}

