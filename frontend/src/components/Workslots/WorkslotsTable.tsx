import { useQuery } from "@tanstack/react-query";
import authHeader from "../../services/auth-header";
import axios from "axios";
import UpdateWorkslotForm from "./UpdateWorkslotForm";
import DeleteWorkslotBtn from "../Workslots/DeleteWorkslotBtn";
import TanstackTable from "../TanstackTable";

const Options = (props: { row: any }) => {
  const { row } = props;

  return (
    <div style={{ display: "flex" }}>
      <UpdateWorkslotForm data={row} />
      <DeleteWorkslotBtn data={row} />
    </div>
  );
};

type Info = {
  getValue: () => string;
  row: any;
};

const columns = [
  {
    accessorKey: "workslotId",
    header: "Workslot ID",
    cell: (info: Info) => info.getValue(),
    footer: (props: any) => props.column.id,
  },
  {
    accessorKey: "startTime",
    header: "Start Time",
    cell: (info: Info) => new Date(info.getValue()).toLocaleString(),
    footer: (props: any) => props.column.id,
  },
  {
    accessorKey: "endTime",
    header: "End Time",
    cell: (info: Info) => new Date(info.getValue()).toLocaleString(),
    footer: (props: any) => props.column.id,
  },
  {
    accessorKey: "chefs",
    header: "Chefs",
    cell: (info: Info) => info.getValue(),
    footer: (props: any) => props.column.id,
  },
  {
    accessorKey: "cashiers",
    header: "Cashiers",
    cell: (info: Info) => info.getValue(),
    footer: (props: any) => props.column.id,
  },
  {
    accessorKey: "waiters",
    header: "Waiters",
    cell: (info: Info) => info.getValue(),
    footer: (props: any) => props.column.id,
  },
  {
    id: "edit",
    cell: (info: Info) => <Options row={info.row.original} />,
  },
];

function retrieveWorkslots() {
  return useQuery({
    queryKey: ["retrieveWorkslots"],
    queryFn: async () => {
      const { data } = await axios.get(
        "http://localhost:3000/workslots/retrieve",
        {
          headers: authHeader(),
        }
      );
      return data;
    },
  });
}

export default function WorkslotsTable() {
  const { isSuccess, data, isError, isLoading } = retrieveWorkslots();

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error</div>}
      {isSuccess && <TanstackTable {...{ data, columns }} />}
    </>
  );
}
