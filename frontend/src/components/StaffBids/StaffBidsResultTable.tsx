import React, { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import authHeader from "../../services/auth-header";
import axios from "axios";
import TanstackTable from "../TanstackTable";

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
];

function retrieveStaffBidsResult() {
  return useQuery({
    queryKey: ["retrieveStaffBidsResult"],
    queryFn: async () => {
      const { data } = await axios.get(
        "http://localhost:3000/staffbids/result",
        {
          headers: authHeader(),
        }
      );
      return data;
    },
  });
}

export default function StaffBidsResultTable() {
  const { isSuccess, data, isError, isLoading } = retrieveStaffBidsResult();

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error</div>}
      {isSuccess && <TanstackTable {...{ data, columns }} />}
    </>
  );
}
