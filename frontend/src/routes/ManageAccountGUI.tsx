import React, { useState, useEffect } from "react";
import Appshell from "../components/Appshell";
import CreateAccountForm from "../components/Accounts/CreateAccountForm";
import UpdateAccountForm from "../components/Accounts/UpdateAccountForm";
import TanstackTable from "../components/TanstackTable";
import { Container } from "@mantine/core";
import axios from "axios";
import AuthService from "../services/auth.service";
import authHeader from "../services/auth-header";
import { SuspendAccountForm } from "../components/Accounts/SuspendAccountForm";
import {
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Tabs } from "@mantine/core";

const Options = (props: { row: any }) => {
  const { row } = props;

  return (
    <div style={{ display: "flex" }}>
      <UpdateAccountForm data={row} />
      <SuspendAccountForm data={row} />
    </div>
  );
};

type Info = {
  getValue: () => string;
  row: any;
};

const columns = [
  {
    accessorKey: "accountId",
    header: "Account ID",
    cell: (info: Info) => info.getValue(),
    footer: (props: any) => props.column.id,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: (info: Info) => info.getValue(),
    footer: (props: any) => props.column.id,
  },
  {
    accessorKey: "profile",
    header: "Profile",
    cell: (info: Info) => info.getValue(),
    footer: (props: any) => props.column.id,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: (info: Info) => info.getValue(),
    footer: (props: any) => props.column.id,
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: (info: Info) => info.getValue(),
    footer: (props: any) => props.column.id,
  },
  {
    accessorKey: "dob",
    header: "Date of Birth",
    cell: (info: Info) => new Date(info.getValue()).toDateString(),
    footer: (props: any) => props.column.id,
  },
  {
    accessorKey: "suspended",
    header: "Suspended",
    cell: (info: Info) => (Number(info.getValue()) == 1 ? "Yes" : "No"),
    footer: (props: any) => props.column.id,
  },
  {
    id: "menu",
    cell: (info: Info) => <Options row={info.row.original} />,
  },
];

function retrieveAccounts() {
  return useQuery({
    queryKey: ["retrieveAccounts"],
    queryFn: async () => {
      const { data } = await axios.get(
        "http://localhost:3000/accounts/retrieve",
        {
          headers: authHeader(),
        }
      );
      const transformData = data.map((account: any) => {
        account.accountId = account.accountId.toString();
        return account;
      });
      return transformData;
    },
  });
}

export default function ManageAccountGUI() {
  const { isSuccess, data, isError, isLoading } = retrieveAccounts();

  if (AuthService.getCurrentUser()) {
    return (
      <Appshell>
        <Container size="md" my="1rem">
          <Tabs defaultValue="create">
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
              {isLoading && <h1>Loading...</h1>}
              {isError && <h1>An error occured</h1>}
              {isSuccess && data && (
                <TanstackTable columns={columns} data={data} />
              )}
            </Tabs.Panel>
          </Tabs>
        </Container>
      </Appshell>
    );
  }
}
