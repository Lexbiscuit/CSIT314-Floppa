import React, { useState, useEffect } from "react";
import Appshell from "../components/Appshell";
import CreateProfileForm from "../components/Profiles/CreateProfileForm";
import UpdateProfileForm from "../components/Profiles/UpdateProfileForm";
import TanstackTable from "../components/TanstackTable";

import { Modal, Button, Group, Text, Container } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

const DeleteProfileButton = (props: { data: any }) => {
  const [opened, { close, open }] = useDisclosure(false);
  const { profileId: profileId } = props.data;

  return (
    <>
      <Modal opened={opened} onClose={close} size="auto" title="Delete Profile">
        <Text>Are you sure you want to delete this profile?</Text>

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
              async function deleteProfile() {
                await fetch("http://localhost:3000/profile/delete", {
                  method: "DELETE",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ profileId: Number(profileId) }),
                })
                  .then((res) => res.json())
                  .then((res) => {
                    alert(res.message);
                    location.reload();
                  })
                  .catch(() => alert("Internal System Error."));
              }

              deleteProfile();
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
      <UpdateProfileForm data={row} />
      <DeleteProfileButton data={row} />
    </div>
  );
};

interface Info {
  getValue: any;
  row: any;
}

const columns = [
  {
    accessorKey: "profileId",
    header: "Profile ID",
    cell: (info: Info) => String(info.getValue()),
    footer: (props: any) => props.column.id,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: (info: Info) => info.getValue(),
    footer: (props: any) => props.column.id,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: (info: Info) => info.getValue(),
    footer: (props: any) => props.column.id,
  },
  {
    id: "menu",
    cell: (info: Info) => <Options row={info.row.original} />,
  },
];

export default function Profile() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchProfile() {
      await fetch("http://localhost:3000/profile/retrieve")
        .then((res) => res.json())
        .then((res) => setData(res))
        .catch((err) => console.error(err));
    }

    fetchProfile();
  }, []);

  return (
    <Appshell>
      <h1>Accounts</h1>
      <CreateProfileForm />
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
