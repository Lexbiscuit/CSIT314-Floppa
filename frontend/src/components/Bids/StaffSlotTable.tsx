import React from "react";
import ReactTable from "../ReactTable";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CompactTable } from "@table-library/react-table-library/compact";
import { useSort } from "@table-library/react-table-library/sort";

export default function StaffSlotTable() {
  const { data, status, isFetching } = useQuery({
    queryKey: ["fetchStaffSlots"],
    queryFn: async () => {
      const { data } = await axios.get(
        "http://localhost:3000/mngrbids/staffslots"
      );
      return data;
    },
  });

  const columns = [
    {
      label: "Account ID",
      renderCell: (item) => item.accountId,
      sort: { sortKey: "ACCOUNTID" },
      resize: true,
    },
    {
      label: "Profile",
      renderCell: (item) => item.profiles.name,
      sort: { sortKey: "PROFILE" },
      resize: true,
    },
    {
      label: "Name",
      renderCell: (item) => item.name,
      sort: { sortKey: "NAME" },
      resize: true,
    },
    {
      label: "Email",
      renderCell: (item) => item.email,
      sort: { sortKey: "EMAIL" },
      resize: true,
    },
    {
      label: "Role",
      renderCell: (item) => item.role,
      sort: { sortKey: "ROLE" },
      resize: true,
    },
  ];

  const [ids, setIds] = React.useState([]);

  const sort = useSort(
    data,
    {
      onChange: onSortChange,
    },
    {
      sortFns: {
        ACCOUNTID: (array) => array.sort((a, b) => a.accountId - b.accountId),
        PROFILE: (array) =>
          array.sort((a, b) => a.profiles.name - b.profiles.name),
        NAME: (array) => array.sort((a, b) => a.name - b.name),
        EMAIL: (array) => array.sort((a, b) => a.email - b.email),
        ROLE: (array) => array.sort((a, b) => a.role - b.role),
      },
    }
  );

  function onSortChange(action, state) {
    console.log(action, state);
  }

  const handleExpand = (item) => {
    if (ids.includes(item.accountId)) {
      setIds(ids.filter((id) => id != item.accountId));
    } else {
      setIds(ids.concat(item.accountId));
    }
  };

  const ROW_PROPS = {
    onClick: handleExpand,
  };

  const ROW_OPTIONS = {
    renderAfterRow: (item) => (
      <>
        {ids.includes(item.accountId) &&
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
                      <strong>Workslot ID</strong> {bid.workslots.workslotId}
                    </li>
                    <li>
                      <strong>Start Time:</strong>{" "}
                      {new Date(bid.workslots.startTime).toLocaleString()}
                    </li>
                    <li>
                      <strong>End Time:</strong>{" "}
                      {new Date(bid.workslots.endTime).toLocaleString()}
                    </li>
                    <li>
                      <strong>Week Number:</strong> {bid.workslots.weekNumber}
                    </li>
                  </ul>
                </td>
              </tr>
            );
          })}
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
        data={{ nodes: data }}
        columns={columns}
        rowProps={ROW_PROPS}
        rowOptions={ROW_OPTIONS}
        sort={sort}
      />
    );
  }
}
