import React, { useState, useEffect } from "react";
import Appshell from "../components/Appshell";
import CreateAccountForm from "../components/CreateAccountForm";
import UpdateAccountForm from "../components/UpdateAccountForm";
import TanstackTable from "../components/TanstackTable";
import { Modal, Button, Group, Text, Container } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

const DeleteAccountButton = (props: { data: any }) => {
  const [opened, { close, open }] = useDisclosure(false);
  const { accountId } = props.data;

  return (
    <>
      <Modal opened={opened} onClose={close} size="auto" title="Delete Account">
        <Text>Are you sure you want to delete this account?</Text>

        <Group
          mt="xl"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button variant="outline" onClick={close}>
            Cancel
          </Button>
          <Button
            variant="filled"
            bg="red"
            onClick={() => {
              async function deleteAccount() {
                await fetch("http://localhost:3000/account/delete", {
                  method: "DELETE",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ accountId: Number(accountId) }),
                })
                  .then((res) => res.json())
                  .then((res) => {
                    alert(res.message);
                  })
                  .catch(() => alert("Internal Server Error."));
              }

              deleteAccount();
              close();
            }}
          >
            Delete
          </Button>
        </Group>
      </Modal>

      <Button bg="red" onClick={open}>
        Delete
      </Button>
    </>
  );
};

const Options = (props: { row: any }) => {
  const { row } = props;

  return (
    <div style={{ display: "flex" }}>
      <UpdateAccountForm data={row} />
      <DeleteAccountButton data={row} />
    </div>
  );
};

interface Info {
  getValue: any;
  row: any;
}

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
    id: "menu",
    cell: (info: Info) => <Options row={info.row.original} />,
  },
];
export default function Accounts() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchAccounts() {
      await fetch("http://localhost:3000/account/retrieve")
        .then((res) => res.json())
        .then((res) => setData(res))
        .catch((err) => console.error(err));
    }

    fetchAccounts();
  }, []);

  return (
    <Appshell>
      <h1>Accounts</h1>
      <CreateAccountForm />
      <Container size="lg" my="1rem">
        {data.length > 0 ? (
          <TanstackTable columns={columns} data={data} />
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h1>Table is empty!</h1>
          </div>
        )}
      </Container>
    </Appshell>
  );
}
