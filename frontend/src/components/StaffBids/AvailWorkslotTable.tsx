import { Modal, Text, Group, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";
import authHeader from "../../services/auth-header";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { IconCirclePlus } from "@tabler/icons-react";
import TanstackTable from "../TanstackTable";

function CreateBidBtn({ workslotId }) {
  const queryClient = useQueryClient();
  const { mutate: createBid } = useMutation({
    mutationFn: async () => {
      return axios.post(
        "http://localhost:3000/staffbids/create",
        {
          workslotId,
        },
        {
          headers: authHeader(),
        }
      );
    },
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ["retrieveStaffAvailWS"] });
      alert(data.message);
    },
    onError: ({ response }) => {
      alert(response.data.message);
    },
  });
  return <IconCirclePlus onClick={() => createBid(workslotId)} />;
}

const Options = (props: { row: any }) => {
  const { row } = props;

  return (
    <div style={{ display: "flex" }}>
      <CreateBidBtn workslotId={row.workslotId} />
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
    accessorKey: "vacancies",
    header: "Vacancies",
    cell: (info: Info) => info.getValue(),
    footer: (props: any) => props.column.id,
  },
  {
    id: "edit",
    cell: (info: Info) => <Options row={info.row.original} />,
  },
];

function retrieveAvailWS() {
  return useQuery({
    queryKey: ["retrieveStaffAvailWS"],
    queryFn: async () => {
      const { data } = await axios.get(
        "http://localhost:3000/staffbids/availws",
        {
          headers: authHeader(),
        }
      );
      return data;
    },
  });
}

export default function AvailWorkslotTable() {
  const { isSuccess, data, isError, isLoading } = retrieveAvailWS();

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error</div>}
      {isSuccess && <TanstackTable {...{ data, columns }} />}
    </>
  );
}
