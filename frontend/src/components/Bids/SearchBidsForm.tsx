import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import authHeader from "../../services/auth-header";
import UpdateAccountForm from "./UpdateAccountForm";
import axios from "axios";
import { SuspendAccountForm } from "./SuspendAccountForm";
import TanstackTable from "../TanstackTable";
import { TextInput, Button, Box, Container, Select } from "@mantine/core";
import { useForm } from "@mantine/form";

type Info = {
  getValue: () => string;
  row: any;
};

const columns = [
  {
    accessorKey: "bidId",
    header: "Bid ID",
    cell: (info: Info) => info.getValue(),
    footer: (props: any) => props.column.id,
  },
  {
    accessorKey: "accountId",
    header: "Account ID",
    cell: (info: Info) => info.getValue(),
    footer: (props: any) => props.column.id,
  },
  {
    accessorKey: "workslotId",
    header: "Workslot ID",
    cell: (info: Info) => info.getValue(),
    footer: (props: any) => props.column.id,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (info: Info) => info.getValue(),
    footer: (props: any) => props.column.id,
  },
  {
    accessorKey: "reason",
    header: "Reason",
    cell: (info: Info) => info.getValue(),
    footer: (props: any) => props.column.id,
  },
];

function searchBids(bidFilter: any) {
  return useQuery({
    queryKey: ["searchBids", bidFilter],
    queryFn: async () => {
      const { data } = await axios.post(
        "http://localhost:3000/mngrbids/search",
        bidFilter,
        {
          headers: authHeader(),
        }
      );

      return data;
    },
    enabled: false,
  });
}

export default function SearchBidForm() {
  const [bidFilter, setBidFilter] = useState<any>({});

  const form = useForm({
    initialValues: {
      bidId: null,
      accountId: null,
      workslotId: null,
      status: "",
      reason: "",
    },

    transformValues: (values) => ({
      bidId:
        Number(values.bidId) == 0
          ? undefined
          : { equals: Number(values.bidId) },
      accountId:
        Number(values.accountId) == 0
          ? undefined
          : { equals: Number(values.accountId) },
      workslotId:
        Number(values.workslotId) == 0
          ? undefined
          : { contains: values.workslotId },
      status: values.status == "" ? undefined : { equals: values.status },
      reason: values.reason == "" ? undefined : { contains: values.reason },
    }),
  });

  const { isSuccess, data, isError, isLoading, refetch } =
    searchBids(bidFilter);

  const BidsTable = () => <TanstackTable {...{ data, columns }} />;
  return (
    <>
      <Container mb="2rem">
        <Box
          component="form"
          onSubmit={form.onSubmit((values) => {
            setBidFilter({ ...values });
            refetch();
          })}
        >
          <TextInput
            label="Bid ID"
            size="md"
            type="number"
            {...form.getInputProps("bidId")}
            my="1rem"
          />

          <TextInput
            label="Account ID"
            size="md"
            type="number"
            {...form.getInputProps("accountId")}
            my="1rem"
          />

          <TextInput
            label="Workslot ID"
            size="md"
            type="number"
            {...form.getInputProps("workslotId")}
            my="1rem"
          />

          <Select
            label="Status"
            placeholder="Pick status"
            data={[
              { label: "✨ Pending", value: "pending" },
              { label: "✅ Approved", value: "approved" },
              { label: "❌ Rejected", value: "rejected" },
            ]}
            {...form.getInputProps("status")}
            my="1rem"
          />

          {form.values.status == "rejected" && (
            <TextInput
              label="Reason"
              size="md"
              {...form.getInputProps("reason")}
              my="1rem"
            />
          )}

          <Button type="submit" my="1rem" w="100%">
            Search Bids
          </Button>
        </Box>
        {isLoading && <div>Loading...</div>}
        {isError && <div>Something went wrong ...</div>}
        {isSuccess && <BidsTable />}
      </Container>
    </>
  );
}
