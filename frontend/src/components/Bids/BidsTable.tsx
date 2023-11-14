import React from "react";
import ReactTable from "../ReactTable";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function BidsTable() {
  const { data, status, isFetching } = useQuery({
    queryKey: ["retrievemngrbids"],
    queryFn: async () => {
      const { data } = await axios.get(
        "http://localhost:3000/mngrbids/retrieve"
      );
      return data;
    },
  });

  const columns = [
    {
      label: "ID",
      renderCell: (item) => item.workslotId,
      sort: { sortKey: "WORKSLOTID" },
      resize: true,
    },
    {
      label: "Week",
      renderCell: (item) => item.weekNumber,
      sort: { sortKey: "WEEKNUMBER" },
      resize: true,
    },
    {
      label: "Start Date",
      renderCell: (item) => new Date(item.startTime).toLocaleString(),
      sort: { sortKey: "STARTTIME" },
      resize: true,
    },
    {
      label: "End Date",
      renderCell: (item) => new Date(item.endTime).toLocaleString(),
      sort: { sortKey: "ENDTIME" },
      resize: true,
    },
    {
      label: "Cashiers",
      renderCell: (item) => item.cashiers,
      sort: { sortKey: "CASHIERS" },
      resize: true,
    },
    {
      label: "Chefs",
      renderCell: (item) => item.chefs,
      sort: { sortKey: "CHEFS" },
      resize: true,
    },
    {
      label: "Waiters",
      renderCell: (item) => item.waiters,
      sort: { sortKey: "WAITERS" },
      resize: true,
    },
  ];

  if (isFetching) {
    return <div>Loading...</div>;
  }
  if (status === "error") {
    return <div>Error fetching data</div>;
  }
  if (status === "success") {
    return <ReactTable columns={columns} data={data} />;
  }
}
