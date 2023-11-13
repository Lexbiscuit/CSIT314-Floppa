import React from "react";
import TanstackTableExpanding from "../TanstackTableExpanding";
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

  if (isFetching) {
    return <div>Loading...</div>;
  }
  if (status === "error") {
    return <div>Error fetching data</div>;
  }
  if (status === "success" && data != 0) {
    return <TanstackTableExpanding columns={columns} data={data} />;
  }
  if (status === "success" && data == 0) {
    return <div>There are no bids to display.</div>;
  }
}
