import React, { useState, useEffect } from "react";
import Appshell from "../components/Appshell";
import CreateWorkslotForm from "../components/Workslots/CreateWorkslotForm";
import UpdateWorkslotForm from "../components/Workslots/UpdateWorkslotForm";
import TanstackTable from "../components/TanstackTable";
import axios from "axios";
import authHeader from "../services/auth-header";

import { Modal, Button, Group, Text, Container } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

const DeleteWorkslotButton = (props: { data: any }) => {
  const [opened, { close, open }] = useDisclosure(false);
  const { workslotId: workslotId } = props.data;

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        size="auto"
        title="Delete Workslot"
      >
        <Text>Are you sure you want to delete this work slot?</Text>

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
              async function deleteWorkslot() {
                await axios
                  .post(
                    "http://localhost:3000/workslots/delete",
                    {
                      workslotId: Number(workslotId),
                    },
                    {
                      headers: authHeader(),
                    }
                  )
                  .catch(() => alert("Internal System Error."));
              }

              deleteWorkslot();
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
      <UpdateWorkslotForm data={row} />
      <DeleteWorkslotButton data={row} />
    </div>
  );
};

interface Info {
  getValue: any;
  row: any;
}

const columns = [
  {
    accessorKey: "workslotId",
    header: "Work Slot ID",
    cell: (info: Info) => String(info.getValue()),
    footer: (props: any) => props.column.id,
  },
  {
    accessorKey: "date",
    header: "date of work slot",
    cell: (info: Info) => new Date(info.getValue()).toLocaleDateString("en-SG"),
    footer: (props: any) => props.column.id,
  },
  {
    accessorKey: "baristas_required",
    header: "barista",
    cell: (info: Info) => info.getValue(),
    footer: (props: any) => props.column.id,
  },
  {
    accessorKey: "chefs_required",
    header: "chef",
    cell: (info: Info) => info.getValue(),
    footer: (props: any) => props.column.id,
  },
  {
    accessorKey: "cashiers_required",
    header: "cashier",
    cell: (info: Info) => info.getValue(),
    footer: (props: any) => props.column.id,
  },
  {
    accessorKey: "waiters_required",
    header: "waiter",
    cell: (info: Info) => info.getValue(),
    footer: (props: any) => props.column.id,
  },
  {
    id: "menu",
    cell: (info: Info) => <Options row={info.row.original} />,
  },
];

export default function Workslots() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchWorkslot() {
      await axios
        .get("http://localhost:3000/workslots/retrieve", {
          headers: authHeader(),
        })
        .then((res) => {
          const transformId = res.data.map((workslot: any) => {
            workslot.workslotId = workslot.workslotId.toString();
            return workslot;
          });

          setData(transformId);
        })
        .catch(() => alert("Internal System Error."));
    }

    fetchWorkslot();
  }, []);

  return (
    <Appshell>
      <h1>Work Slots</h1>
      <CreateWorkslotForm />
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
