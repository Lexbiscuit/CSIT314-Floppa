import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import authHeader from "../../services/auth-header";
import UpdateWorkslotForm from "./UpdateWorkslotForm";
import DeleteWorkslotBtn from "./DeleteWorkslotBtn";
import axios from "axios";
import TanstackTable from "../TanstackTable";
import { TextInput, Button, Box, Container, Select } from "@mantine/core";
import { useForm } from "@mantine/form";

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
    header: "Work Slot ID",
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
    header: "Number of Chefs",
    cell: (info: Info) => info.getValue(),
    footer: (props: any) => props.column.id,
  },
  {
    accessorKey: "cashiers",
    header: "Number of Cashiers",
    cell: (info: Info) => info.getValue(),
    footer: (props: any) => props.column.id,
  },
  {
    accessorKey: "waiters",
    header: "Number of Waiters",
    cell: (info: Info) => info.getValue(),
    footer: (props: any) => props.column.id,
  },
  {
    id: "edit",
    cell: (info: Info) => <Options row={info.row.original} />,
  },
];

function searchWorkslots(workslotFilter: any) {
  return useQuery({
    queryKey: ["searchWorkslots", workslotFilter],
    queryFn: async () => {
      const { data } = await axios.post(
        "http://localhost:3000/workslots/search",
        workslotFilter,
        {
          headers: authHeader(),
        }
      );
      return data;
    },
    enabled: false,
  });
}

export default function SearchWorkslotForm() {
  const [workslotFilter, setWorkslotFilter] = useState<any>({});

  const form = useForm({
    initialValues: {
      startTime: "",
      endTime: "",
      chefs: 1,
      cashiers: 1,
      waiters: 1,
    },

    transformValues: (values) => ({
      startTime:
        values.startTime == ""
          ? undefined
          : new Date(values.startTime).toISOString(),
      endTime:
        values.endTime == ""
          ? undefined
          : new Date(values.endTime).toISOString(),
      chefs: Number(values.chefs),
      waiters: Number(values.waiters),
      cashiers: Number(values.cashiers),
    }),
  });

  const { isSuccess, data, isError, isLoading, refetch } =
    searchWorkslots(workslotFilter);

  const WorkslotsTable = () => <TanstackTable {...{ data, columns }} />;
  return (
    <>
      <Container mb="2rem">
        <Box
          component="form"
          onSubmit={form.onSubmit((values) => {
            setWorkslotFilter(values);
            refetch();
          })}
        >
          <TextInput
            label="Start Time"
            size="md"
            type="dateTime-local"
            {...form.getInputProps("startTime")}
            my="1rem"
          />

          <TextInput
            label="End Time"
            size="md"
            type="dateTime-local"
            {...form.getInputProps("endTime")}
            my="1rem"
          />

          <TextInput
            label="Chefs"
            size="md"
            type="number"
            {...form.getInputProps("chefs")}
            my="1rem"
          />

          <TextInput
            label="Waiters"
            size="md"
            type="number"
            {...form.getInputProps("waiters")}
            my="1rem"
          />

          <TextInput
            label="Cashiers"
            size="md"
            type="number"
            {...form.getInputProps("cashiers")}
            my="1rem"
          />

          <Button type="submit" my="1rem" w="100%">
            Search Workslot
          </Button>
        </Box>
      </Container>

      {isLoading && <div>Loading...</div>}
      {isError && <div>Something went wrong ...</div>}
      {isSuccess && <WorkslotsTable />}
    </>
  );
}
