import React, { useState, useEffect } from "react";
import {
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import authHeader from "../../services/auth-header";
import UpdateAccountForm from "./UpdateAccountForm";
import axios from "axios";
import { SuspendAccountForm } from "./SuspendAccountForm";
import TanstackTable from "../TanstackTable";

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
    accessorKey: "profiles.name",
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
    accessorKey: "roles.roleName",
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
    cell: (info: Info) => info.getValue(),
    footer: (props: any) => props.column.id,
  },
  {
    id: "edit",
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
        account.suspended = account.suspended == 0 ? "No" : "Yes";
        return account;
      });
      return transformData;
    },
  });
}

export default function AccountsTable() {
  const { isSuccess, data, isError, isLoading } = retrieveAccounts();

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error</div>}
      {isSuccess && <TanstackTable {...{ data, columns }} />}
    </>
  );
}
