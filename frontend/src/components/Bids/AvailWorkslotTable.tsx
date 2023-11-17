import React from "react";
import authHeader from "../../services/auth-header";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { CompactTable } from "@table-library/react-table-library/compact";
import { SimpleGrid, Button } from "@mantine/core";
import { useSort } from "@table-library/react-table-library/sort";

export function AvailWorkslotTable() {
  const [ids, setIds] = React.useState([]);

  function retrieveAvailWorkslots() {
    return useQuery({
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
  }

  const columns = [
    {
      label: "Workslot ID",
      renderCell: (item: any) => item.workslotId,
      sort: { sortKey: "WORKSLOTID" },
      resize: true,
    },

    {
      label: "Start Date",
      renderCell: (item: any) => new Date(item.startTime).toLocaleString(),
      sort: { sortKey: "STARTTIME" },
      resize: true,
    },
    {
      label: "End Date",
      renderCell: (item: any) => new Date(item.endTime).toLocaleString(),
      sort: { sortKey: "ENDTIME" },
      resize: true,
    },
    {
      label: "Cashiers",
      renderCell: (item: any) => item.cashiers,
      sort: { sortKey: "CASHIERS" },
      resize: true,
    },
    {
      label: "Chefs",
      renderCell: (item: any) => item.chefs,
      sort: { sortKey: "CHEFS" },
      resize: true,
    },
    {
      label: "Waiters",
      renderCell: (item: any) => item.waiters,
      sort: { sortKey: "WAITERS" },
      resize: true,
    },
  ];

  const { data, status, isFetching } = retrieveAvailWorkslots();

  type Info = {
    getValue: () => string;
    row: any;
  };

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

  const handleExpand = (item: any) => {
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
    renderAfterRow: (item: any) => (
      <>
        {ids.includes(item.workslotId) &&
          item.currentBids &&
          item.currentBids.map((bid) => {
            return (
              <tr
                style={{ display: "flex", gridColumn: "1 / -1" }}
                key={bid.name}
              >
                <td style={{ flex: "1" }}>
                  <ul
                    style={{
                      margin: "0",
                      padding: "0",
                      backgroundColor: "#e0e0e0",
                    }}
                  >
                    <li>
                      <strong>Role:</strong> {bid.role}
                    </li>
                    <li>
                      <strong>Count:</strong> {bid.count}
                    </li>
                  </ul>
                </td>
              </tr>
            );
          })}
      </>
    ),
  };

  if (status === "error") {
    return <div>An error occured ...</div>;
  }

  if (isFetching) {
    return <div>Fetching data ...</div>;
  }

  if (status === "success") {
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
}
