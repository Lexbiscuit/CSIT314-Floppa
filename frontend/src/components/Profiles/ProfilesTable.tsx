import React, { useState, useEffect } from "react";
import {
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import authHeader from "../../services/auth-header";
import UpdateProfileForm from "./UpdateProfileForm";
import axios from "axios";
import { SuspendProfileForm } from "./SuspendProfileForm";
import TanstackTable from "../TanstackTable";

const Options = (props: { row: any }) => {
  const { row } = props;

  return (
    <div style={{ display: "flex" }}>
      <UpdateProfileForm data={row} />
      <SuspendProfileForm data={row} />
    </div>
  );
};

type Info = {
  getValue: () => string;
  row: any;
};

const columns = [
  {
    accessorKey: "profileId",
    header: "Profile ID",
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
    accessorKey: "description",
    header: "Description",
    cell: (info: Info) => info.getValue(),
    footer: (props: any) => props.column.id,
  },
  {
    accessorKey: "suspended",
    header: "Suspended",
    cell: (info: Info) => info.getValue(),
    footer: (props: any) => props.column.id,
  },
  {
    id: "edit",
    cell: (info: Info) => <Options row={info.row.original} />,
  },
];

function retrieveProfiles() {
  return useQuery({
    queryKey: ["retrieveProfiles"],
    queryFn: async () => {
      const { data } = await axios.get(
        "http://localhost:3000/profiles/retrieve",
        {
          headers: authHeader(),
        }
      );
      const transformData = data.map((profile: any) => {
        profile.profileId = profile.profileId.toString();
        profile.suspended = profile.suspended == 0 ? "No" : "Yes";
        return profile;
      });
      return transformData;
    },
  });
}

export default function ProfilesTable() {
  const { isSuccess, data, isError, isLoading } = retrieveProfiles();

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error</div>}
      {isSuccess && <TanstackTable {...{ data, columns }} />}
    </>
  );
}
