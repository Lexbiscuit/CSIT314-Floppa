import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import authHeader from "../../services/auth-header";
import UpdateAccountForm from "./UpdateAccountForm";
import axios from "axios";
import { SuspendAccountForm } from "./SuspendAccountForm";
import TanstackTable from "../TanstackTable";
import { TextInput, Button, Box, Container, Select } from "@mantine/core";
import { useForm } from "@mantine/form";

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
    cell: (info: Info) => (Number(info.getValue()) == 1 ? "Yes" : "No"),
    footer: (props: any) => props.column.id,
  },
  {
    id: "edit",
    cell: (info: Info) => <Options row={info.row.original} />,
  },
];

function searchAccounts(accountFilter: any) {
  return useQuery({
    queryKey: ["searchAccounts", accountFilter],
    queryFn: async () => {
      const { data } = await axios.post(
        "http://localhost:3000/accounts/search",
        accountFilter,
        {
          headers: authHeader(),
        },
      );

      if (data.length > 0) {
        const transformData = data.map((account: any) => {
          account.accountId = account.accountId.toString();
          account.suspended = account.suspended == 0 ? "No" : "Yes";
          return account;
        });
        return transformData;
      } else {
        return data;
      }
    },
    enabled: false,
  });
}

export default function SearchAccountForm() {
  const [accountFilter, setAccountFilter] = useState<any>({});

  const form = useForm({
    initialValues: {
      name: "",
      profileId: 0,
      email: "",
      roleId: 0,
    },

    transformValues: (values) => ({
      name: values.name == "" ? undefined : values.name,
      profileId:
        Number(values.profileId) == 0 ? undefined : Number(values.profileId),
      email: values.email == "" ? undefined : values.email,
      roleId: Number(values.roleId) == 4 ? Number(values.roleId) : undefined,
    }),
  });

  const { isSuccess, data, isError, isLoading, refetch } =
    searchAccounts(accountFilter);

  return (
    <>
      <Container mb="2rem">
        <Box
          component="form"
          onSubmit={form.onSubmit((values) => {
            setAccountFilter(values);
            refetch();
          })}
        >
          <TextInput
            label="Name"
            placeholder="Angsty Floppa"
            size="md"
            {...form.getInputProps("name")}
            my="1rem"
          />

          <Select
            label="Profile"
            placeholder="Pick profile"
            data={[
              { value: "1", label: "System Administrator" },
              { value: "2", label: "Cafe Owner" },
              { value: "3", label: "Cafe Manager" },
              { value: "4", label: "Cafe Staff" },
            ]}
            {...form.getInputProps("profileId")}
            my="1rem"
          />

          <TextInput
            label="Email address"
            placeholder="grumpy@floppa.com"
            size="md"
            {...form.getInputProps("email")}
            my="1rem"
          />

          {Number(form.values.profileId) == 4 && (
            <Select
              label="Role"
              placeholder="Pick role"
              data={[
                { value: "1", label: "Barista" },
                { value: "2", label: "Cashier" },
                { value: "3", label: "Chef" },
                { value: "4", label: "Waiter" },
              ]}
              {...form.getInputProps("roleId")}
              my="1rem"
            />
          )}

          <Button type="submit" my="1rem" w="100%">
            Search Account
          </Button>
        </Box>
      </Container>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Something went wrong ...</div>}
      {isSuccess && <TanstackTable {...{ data, columns }} />}
    </>
  );
}
