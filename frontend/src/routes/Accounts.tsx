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
    id: "menu",
    cell: (info: Info) => <Options row={info.row.original} />,
  },
];

const retrieveAccounts = async () => {
  const { data } = await axios.get("http://localhost:3000/accounts/retrieve", {
    headers: authHeader(),
  });
  const transformData = data.map((account: any) => {
    account.accountId = account.accountId.toString();
    return account;
  });

  return transformData;
};

function useAccounts() {
  return useQuery({
    queryKey: ["retrieveAccounts"],
    queryFn: () => retrieveAccounts(),
  });
}

export default function Accounts() {
  const { status, data, error, isFetching } = useAccounts();

  if (AuthService.getCurrentUser()) {
    return (
      <Appshell>
        <Container size="lg" my="1rem">
          <h1>Accounts</h1>
          <CreateAccountForm />
          {isFetching && <h1>Loading...</h1>}
          {error && <h1>An error occured</h1>}
          {data && <TanstackTable columns={columns} data={data} />}
        </Container>
      </Appshell>
    );
  }
}
