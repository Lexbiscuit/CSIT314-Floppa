import React, { useState, useEffect } from "react";
import {
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import authHeader from "../../services/auth-header";
import axios from "axios";
import CreateBidBtn from "./CreateBidForm";
import TanstackTable from "../TanstackTable";

const Options = (props: { row: any }) => {
  const { row } = props;

  return (
    <div style={{ display: "flex" }}>
      <button>Update</button>
      <button>Delete</button>
    </div>
  );
};

type Info = {
  getValue: () => string;
  row: any;
};

const columns = [
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
    cell: (info: Info) => <Options row={info.row.original} />,
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
