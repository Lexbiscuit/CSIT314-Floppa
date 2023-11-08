import React, { useState, useEffect } from "react";
import Appshell from "../components/Appshell";
import { Box, Button, Modal, Select, Tabs, TextInput } from "@mantine/core";
import { Container } from "@mantine/core";
import AuthService from "../services/auth.service";
import authHeader from "../services/auth-header";

import TanstackTable from "../components/TanstackTable";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { IconEdit } from "@tabler/icons-react";
import { isEmail, isNotEmpty, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";

export default function ManageProfileGUI() {
  if (AuthService.getCurrentUser()) {
    return (
      <Appshell>
        <Container size="md" my="1rem">
          <Tabs defaultValue="viewbids">
            <Tabs.List>
              <Tabs.Tab value="viewbids">View Bids</Tabs.Tab>
              <Tabs.Tab value="availws">View Available Workslots</Tabs.Tab>
              <Tabs.Tab value="availstaff">View Available Staff</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="viewbids">
              <h1>View Bids</h1>
              <BidsTable />
            </Tabs.Panel>

            <Tabs.Panel value="availws">
              <h1>View Available Workslots</h1>
              <WorkslotsTable />
            </Tabs.Panel>

            <Tabs.Panel value="availstaff">
              <h1>View Available Staff</h1>
              <StaffTable />
            </Tabs.Panel>
          </Tabs>
        </Container>
      </Appshell>
    );
  }
}

function WorkslotsTable() {
  const retrieveAvailWorkslots = useQuery({
    queryKey: ["retrieveAvailWorkslots"],
    queryFn: async () => {
      const { data } = await axios.get(
        "http://localhost:3000/mngrbids/availws",
        {
          headers: authHeader(),
        }
      );
      return data;
    },
  });

  const { data, status, isFetching } = retrieveAvailWorkslots;

  type Info = {
    getValue: () => string;
    row: any;
  };

  const columns = [
    // accessor keys are bidId, accountId, workslotId, status, reason
    {
      accessorKey: "workslotId",
      header: "Workslot ID",
      cell: (info: Info) => info.getValue(),
      footer: (props: any) => props.column.id,
    },
    {
      accessorKey: "startTime",
      header: "Start Time",
      cell: (info: Info) => new Date(info.getValue()).toLocaleString(),
      footer: (props: any) => props.column.id,
    },
    {
      accessorKey: "endTime",
      header: "End Time",
      cell: (info: Info) => new Date(info.getValue()).toLocaleString(),
      footer: (props: any) => props.column.id,
    },
  ];

  if (status === "error") {
    return <div>An error occured ...</div>;
  }

  if (isFetching) {
    return <div>Fetching data ...</div>;
  }

  if (status === "success") {
    return <TanstackTable columns={columns} data={data} />;
  }
}

function StaffTable() {
  const retrieveAvailStaff = useQuery({
    queryKey: ["retrieveAvailStaff"],
    queryFn: async () => {
      const { data } = await axios.get(
        "http://localhost:3000/mngrbids/availstaff",
        {
          headers: authHeader(),
        }
      );
      return data;
    },
  });

  const { data, status, isFetching } = retrieveAvailStaff;

  type Info = {
    getValue: () => string;
    row: any;
  };

  const columns = [
    // accessor keys are bidId, accountId, workslotId, status, reason
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
  ];

  if (status === "error") {
    return <div>An error occured ...</div>;
  }

  if (isFetching) {
    return <div>Fetching data ...</div>;
  }

  if (status === "success") {
    return <TanstackTable columns={columns} data={data} />;
  }
}

function BidsTable() {
  const retrieveBids = () => {
    return useQuery({
      queryKey: ["retrieveBids"],
      queryFn: async () => {
        const { data } = await axios.get(
          "http://localhost:3000/mngrbids/retrieve",
          {
            headers: authHeader(),
          }
        );
        return data;
      },
    });
  };

  const { data, status, isFetching } = retrieveBids();

  type Info = {
    getValue: () => string;
    row: any;
  };

  function UpdateBidForm(props: { data: any }) {
    const [opened, { open, close }] = useDisclosure(false);
    const bid = props.data;
    const queryClient = useQueryClient();

    const { mutate: updateBid } = useMutation({
      mutationFn: async (bid: any) => {
        return axios.put("http://localhost:3000/mngrbids/update", bid, {
          headers: authHeader(),
        });
      },
      onSuccess: (res) => {
        alert(res.data.message);
        queryClient.invalidateQueries({ queryKey: ["retrieveBids"] });
      },
      onError: (err) => {
        alert(err.response.data.message);
      },
    });

    const form = useForm({
      initialValues: {
        bidId: bid.bidId,
        accountId: bid.accountId,
        workslotId: bid.workslotId,
        status: bid.status,
        reason: bid.reason,
      },

      validate: {
        accountId: isNotEmpty("Account ID cannot be empty."),
        workslotId: isNotEmpty("Workslot ID cannot be empty."),
        status: isNotEmpty("Status cannot be empty."),
        reason: (value) =>
          form.values.status == "rejected" && value.trim() == ""
            ? isNotEmpty("Reason cannot be empty.")
            : null,
      },

      transformValues: (values) => ({
        bidId: Number(values.bidId),
        accountId: Number(values.accountId),
        workslotId: Number(values.workslotId),
        status: values.status,
        reason: values.status == "rejected" ? values.reason : undefined,
      }),
    });

    return (
      <>
        <Modal opened={opened} onClose={close} title="Update Bid" centered>
          <Box
            component="form"
            onSubmit={form.onSubmit((values) => {
              updateBid(values);
            })}
          >
            <TextInput
              label="Bid ID"
              size="md"
              {...form.getInputProps("bidId")}
              my="1rem"
              disabled
            />

            <TextInput
              label="Account ID"
              size="md"
              {...form.getInputProps("accountId")}
              my="1rem"
            />

            <TextInput
              label="Workslot ID"
              size="md"
              {...form.getInputProps("workslotId")}
              my="1rem"
            />

            <Select
              label="Status"
              placeholder="Pick status"
              data={["pending", "accepted", "rejected"]}
              {...form.getInputProps("status")}
              my="1rem"
              disabled
            />

            {form.values.status == "rejected" && (
              <TextInput
                label="Reason"
                size="md"
                {...form.getInputProps("reason")}
                my="1rem"
              />
            )}

            <Button type="submit" my="1rem" w="100%">
              Update
            </Button>
          </Box>
        </Modal>
        <IconEdit onClick={open} style={{ cursor: "pointer" }} />
      </>
    );
  }

  const Options = (props: { row: any }) => {
    const { row } = props;

    return (
      <div style={{ display: "flex" }}>
        <UpdateBidForm data={row.original} />
      </div>
    );
  };

  const columns = [
    // accessor keys are bidId, accountId, workslotId, status, reason
    {
      accessorKey: "bidId",
      header: "Bid ID",
      cell: (info: Info) => info.getValue(),
      footer: (props: any) => props.column.id,
    },
    {
      accessorKey: "accountId",
      header: "Account ID",
      cell: (info: Info) => info.getValue(),
      footer: (props: any) => props.column.id,
    },
    {
      accessorKey: "workslotId",
      header: "Workslot ID",
      cell: (info: Info) => info.getValue(),
      footer: (props: any) => props.column.id,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (info: Info) => info.getValue(),
      footer: (props: any) => props.column.id,
    },
    {
      accessorKey: "reason",
      header: "Reason",
      cell: (info: Info) => info.getValue(),
      footer: (props: any) => props.column.id,
    },
    {
      id: "options",
      cell: (info: Info) => <Options row={info.row} />,
    },
  ];

  if (status === "error") {
    return <div>An error occured ...</div>;
  }

  if (isFetching) {
    return <div>Fetching data ...</div>;
  }

  if (status === "success") {
    return <TanstackTable columns={columns} data={data} />;
  }
}
