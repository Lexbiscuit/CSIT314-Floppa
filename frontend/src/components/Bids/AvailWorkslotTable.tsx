import React from "react";
import authHeader from "../../services/auth-header";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import ReactTable from "../ReactTable";

export function AvailWorkslotTable() {
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
    refetchOnMount: true,
    refetchOnWindowFocus: true,
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

  const { data, status, isFetching } = retrieveAvailWorkslots;

  type Info = {
    getValue: () => string;
    row: any;
  };

  if (status === "error") {
    return <div>An error occured ...</div>;
  }

  if (isFetching) {
    return <div>Fetching data ...</div>;
  }

  if (status === "success") {
    return <ReactTable data={data} columns={columns} />;
  }
}
