import React, { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import authHeader from "../../services/auth-header";
import axios from "axios";
import TanstackTable from "../TanstackTable";
import { IconEdit, IconCircleMinus } from "@tabler/icons-react";
import { Modal, TextInput, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

const Options = (props: { row: any }) => {
  const { row } = props;

  return (
    <div style={{ display: "flex" }}>
      <UpdateBidForm bidId={row.bidId} />
      <DeleteBidBtn bidId={row.bidId} />
    </div>
  );
};

type Info = {
  getValue: () => string;
  row: any;
};

const columns = [
  {
    accessorKey: "workslots.workslotId",
    header: "Workslot ID",
    cell: (info: Info) => info.getValue(),
    footer: (props: any) => props.column.id,
  },
  {
    accessorKey: "workslots.startTime",
    header: "Start Time",
    cell: (info: Info) => new Date(info.getValue()).toLocaleString(),
    footer: (props: any) => props.column.id,
  },
  {
    accessorKey: "workslots.endTime",
    header: "End Time",
    cell: (info: Info) => new Date(info.getValue()).toLocaleString(),
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
    cell: (info: Info) => <div>{info.getValue()}</div>,
    footer: (props: any) => props.column.id,
  },
  {
    id: "edit",
    cell: ({ row }) => <Options row={row.original} />,
  },
];

function retrieveStaffBids() {
  return useQuery({
    queryKey: ["retrieveStaffBids"],
    queryFn: async () => {
      const { data } = await axios.get(
        "http://localhost:3000/staffbids/retrieve",
        {
          headers: authHeader(),
        }
      );
      return data;
    },
  });
}

function UpdateBidForm({ bidId }) {
  const [opened, { open, close }] = useDisclosure(false);
  const [newWorkslotId, setNewWorkslotId] = useState(0);

  const queryClient = useQueryClient();
  const { mutate: updateBid } = useMutation({
    mutationFn: async ({ workslotId }) => {
      return axios.put(
        "http://localhost:3000/staffbids/update",
        {
          bidId: bidId,
          newWorkslotId: newWorkslotId,
        },
        {
          headers: authHeader(),
        }
      );
    },
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({
        queryKey: ["retrieveStaffBids"],
      });
      alert(data.message);
    },
    onError: ({ response }) => {
      alert(response.data.message);
    },
  });
  return (
    <>
      <Modal opened={opened} onClose={close} size="lg" title="Update Bid">
        <TextInput
          value={newWorkslotId}
          label="New Workslot ID"
          onChange={(e) => setNewWorkslotId(Number(e.target.value))}
          my={"1rem"}
        />
        <Button
          variant="filled"
          onClick={() => {
            updateBid(newWorkslotId);
            close();
          }}
        >
          Update
        </Button>
      </Modal>
      <IconEdit onClick={open} />
    </>
  );
}

function DeleteBidBtn({ bidId }) {
  const queryClient = useQueryClient();
  const { mutate: deleteBid } = useMutation({
    mutationFn: async (bidId) => {
      return axios.delete("http://localhost:3000/staffbids/delete", {
        headers: authHeader(),
        data: { bidId },
      });
    },
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ["retrieveStaffBids"] });
      alert(data.message);
    },
    onError: ({ response }) => {
      alert(response.data.message);
    },
  });
  return <IconCircleMinus onClick={() => deleteBid(bidId)} />;
}

export default function StaffBidsTable() {
  const { isSuccess, data, isError, isLoading } = retrieveStaffBids();

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error</div>}
      {isSuccess && <TanstackTable {...{ data, columns }} />}
    </>
  );
}
