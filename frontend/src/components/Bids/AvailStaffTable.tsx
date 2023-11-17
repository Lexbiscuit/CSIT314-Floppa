import React from "react";
import authHeader from "../../services/auth-header";
import TanstackTable from "../TanstackTable";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export function AvailStaffTable() {
  function retrieveAvailStaff() {
    return useQuery({
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
  }

  const { data, status, isFetching } = retrieveAvailStaff();

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
      accessorKey: "role",
      header: "Role",
      cell: (info: Info) => info.getValue(),
      footer: (props: any) => props.column.id,
    },
    {
      accessorKey: "_count.bids",
      header: "No. of Bids",
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
