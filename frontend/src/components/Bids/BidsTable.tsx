import React from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { CompactTable } from "@table-library/react-table-library/compact";
import { SimpleGrid, Button } from "@mantine/core";
import { useSort } from "@table-library/react-table-library/sort";

export default function BidsTable() {
  const [ids, setIds] = React.useState([]);

  const { data, status, isFetching } = useQuery({
    queryKey: ["retrievemngrbids"],
    queryFn: async () => {
      const { data } = await axios.get(
        "http://localhost:3000/mngrbids/retrieve"
      );
      return data;
    },
  });

  const queryClient = useQueryClient();
  const { mutate: approveBid } = useMutation({
    mutationFn: async (bidId) => {
      return axios.put("http://localhost:3000/mngrbids/approve", {
        bidId: Number(bidId),
      });
    },
    onSuccess: (data) => {
      alert(data.data.message);
      queryClient.invalidateQueries({ queryKey: ["retrievemngrbids"] });
    },
    onError: (error) => {
      alert(error.response.data.message);
    },
  });

  const { mutate: rejectBid } = useMutation({
    mutationFn: async (bidId) => {
      const reason = prompt("Please enter a reason for rejection");
      if (reason == null) return;
      if (reason.trim() == "")
        return alert("Please enter a reason for rejection");

      return axios.put("http://localhost:3000/mngrbids/reject", {
        bidId: Number(bidId),
        reason,
      });
    },
    onSuccess: ({ data }) => {
      alert(data.message);
      queryClient.invalidateQueries({ queryKey: ["retrievemngrbids"] });
    },
    onError: ({ response }) => {
      alert(response.data.message);
    },
  });

  const columns = [
    {
      label: "Account ID",
      renderCell: (item: { workslotId: any }) => item.workslotId,
      sort: { sortKey: "WORKSLOTID" },
      resize: true,
    },
    {
      label: "Week",
      renderCell: (item: { weekNumber: any }) => item.weekNumber,
      sort: { sortKey: "WEEKNUMBER" },
      resize: true,
    },
    {
      label: "Start Date",
      renderCell: (item: { startTime: string | number | Date }) =>
        new Date(item.startTime).toLocaleString(),
      sort: { sortKey: "STARTTIME" },
      resize: true,
    },
    {
      label: "End Date",
      renderCell: (item: { endTime: string | number | Date }) =>
        new Date(item.endTime).toLocaleString(),
      sort: { sortKey: "ENDTIME" },
      resize: true,
    },
    {
      label: "Cashiers",
      renderCell: (item: { cashiers: any }) => item.cashiers,
      sort: { sortKey: "CASHIERS" },
      resize: true,
    },
    {
      label: "Chefs",
      renderCell: (item: { chefs: any }) => item.chefs,
      sort: { sortKey: "CHEFS" },
      resize: true,
    },
    {
      label: "Waiters",
      renderCell: (item: { waiters: any }) => item.waiters,
      sort: { sortKey: "WAITERS" },
      resize: true,
    },
  ];

  const sort = useSort(
    data,
    {
      onChange: onSortChange,
    },
    {
      sortFns: {
        WORKSLOTID: (array) =>
          array.sort((a, b) => a.workslotId - b.workslotId),
        ENDTIME: (array) => array.sort((a, b) => a.endTime - b.endTime),
        STARTTIME: (array) => array.sort((a, b) => a.startTime - b.endTime),
        CHEFS: (array) => array.sort((a, b) => a.chefs - b.chefs),
        CASHIERS: (array) => array.sort((a, b) => a.cashiers - b.cashiers),
        WAITERS: (array) => array.sort((a, b) => a.waiters - b.waiters),
      },
    }
  );

  function onSortChange(action: any, state: any) {
    console.log(action, state);
  }

  const handleExpand = (item: { workslotId: ConcatArray<never> }) => {
    if (ids.includes(item.workslotId)) {
      setIds(ids.filter((id) => id != item.workslotId));
    } else {
      setIds(ids.concat(item.workslotId));
    }
  };

  const ROW_PROPS = {
    onClick: handleExpand,
  };

  const ROW_OPTIONS = {
    renderAfterRow: (item: { workslotId: any; bids: any[] }) => (
      <>
        {ids.includes(item.workslotId) &&
          item.bids &&
          item.bids.map(
            (bid: {
              bidId:
                | boolean
                | React.Key
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | null
                | undefined;
              accountId:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | null
                | undefined;
              workslotId:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | null
                | undefined;
              status:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | null
                | undefined;
              reason:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | null
                | undefined;
            }) => {
              return (
                <tr
                  style={{ display: "flex", gridColumn: "1 / -1" }}
                  key={bid.bidId}
                >
                  <td style={{ flex: "1" }}>
                    <ul
                      style={{
                        margin: "0",
                        padding: "0",
                        backgroundColor: "#e0e0e0",
                      }}
                    >
                      <li style={{ wordWrap: "break-word" }}>
                        <strong>Bid ID:</strong> {bid.bidId}
                      </li>
                      <li>
                        <strong>Account ID:</strong> {bid.accountId}
                      </li>
                      <li>
                        <strong>Workslot ID:</strong> {bid.workslotId}
                      </li>
                      <li>
                        <strong>Status:</strong> {bid.status}
                      </li>
                      {bid.status == "rejected" && (
                        <li>
                          <strong>Reason:</strong> {bid.reason}
                        </li>
                      )}
                      <li>
                        {bid.status == "pending" ? (
                          <SimpleGrid cols={2}>
                            <Button
                              variant="filled"
                              onClick={() => approveBid(bid.bidId)}
                            >
                              Approve
                            </Button>
                            <Button
                              variant="filled"
                              onClick={() => rejectBid(bid.bidId)}
                            >
                              Reject
                            </Button>
                          </SimpleGrid>
                        ) : null}
                      </li>
                    </ul>
                  </td>
                </tr>
              );
            }
          )}
      </>
    ),
  };

  if (isFetching) {
    return <div>Loading...</div>;
  }
  if (status === "error") {
    return <div>Error fetching data</div>;
  }
  if (status === "success") {
    return (
      <CompactTable
        columns={columns}
        data={{ nodes: data }}
        rowProps={ROW_PROPS}
        rowOptions={ROW_OPTIONS}
        sort={sort}
      />
    );
  }
}
