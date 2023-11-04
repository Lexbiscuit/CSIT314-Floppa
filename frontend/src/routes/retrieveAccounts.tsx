import React from "react";
import UpdateAccountForm from "../components/Accounts/UpdateAccountForm";
import axios from "axios";
import authHeader from "../services/auth-header";
import { SuspendAccountForm } from "../components/Accounts/SuspendAccountForm";
import { useQuery } from "@tanstack/react-query";

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
export const columns = [
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
export function retrieveAccounts() {
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
