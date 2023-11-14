import * as React from "react";
import { CompactTable } from "@table-library/react-table-library/compact";
import { useSort } from "@table-library/react-table-library/sort";
import { Button, SimpleGrid } from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import UnfoldMoreOutlinedIcon from "@mui/icons-material/UnfoldMoreOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import axios from "axios";

export default function ReactTable({ data, columns }) {
  const [ids, setIds] = React.useState([]);

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
      return axios.put("http://localhost:3000/mngrbids/reject", {
        bidId: Number(bidId),
        reason,
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

  function onSortChange(action, state) {
    console.log(action, state);
  }

  const handleExpand = (item) => {
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
    renderAfterRow: (item) => (
      <>
        {ids.includes(item.workslotId) &&
          item.bids &&
          item.bids.map((bid) => {
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
                    <li>
                      <strong>Reason:</strong> {bid.reason}
                    </li>
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
          })}
      </>
    ),
  };

  return (
    <CompactTable
      data={{ nodes: data }}
      columns={columns}
      rowProps={ROW_PROPS}
      rowOptions={ROW_OPTIONS}
      sort={sort}
    />
  );
}
