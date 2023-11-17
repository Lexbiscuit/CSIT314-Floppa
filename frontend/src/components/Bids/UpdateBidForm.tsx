import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import authHeader from "../../services/auth-header";
import axios from "axios";
import { useDisclosure } from "@mantine/hooks";
import { Button, TextInput, Modal, Box } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import { isNotEmpty, useForm } from "@mantine/form";

export default function UpdateBidForm({ bidId, accountId, role }) {
  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm({
    initialValues: {
      bidId: Number(bidId),
      accountId: Number(accountId),
      newWorkslotId: "",
      role: role,
    },

    validate: {
      bidId: isNotEmpty("Bid ID cannot be empty"),
      accountId: isNotEmpty("Account ID cannot be empty"),
      newWorkslotId: isNotEmpty("New Workslot ID cannot be empty"),
    },

    transformValues: (values) => ({
      bidId: Number(values.bidId),
      accountId: Number(values.accountId),
      newWorkslotId: Number(values.newWorkslotId),
      role: values.role,
    }),
  });

  const queryClient = useQueryClient();
  const { mutate: updateBid } = useMutation({
    mutationFn: async ({ bidId, accountId, newWorkslotId, role }) => {
      return axios.put(
        "http://localhost:3000/mngrbids/update",
        {
          bidId,
          accountId,
          newWorkslotId,
          role,
        },
        {
          headers: authHeader(),
        }
      );
    },
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({
        queryKey: ["fetchStaffSlots"],
      });
      alert(data.message);
    },
    onError: ({ response }) => {
      alert(response.data.message);
    },
  });
  return (
    <>
      <Modal opened={opened} onClose={close} size="lg" title="Update Bid">
        <Box
          component="form"
          onSubmit={form.onSubmit((values) => {
            console.log(
              "🚀 ~ file: UpdateBidForm.tsx:64 ~ onSubmit={form.onSubmit ~ values:",
              values
            );
            updateBid(values);
          })}
        >
          <TextInput
            label="Bid ID"
            size="md"
            {...form.getInputProps("bidId")}
            my="1rem"
            disabled
          />

          <TextInput
            label="Account ID"
            size="md"
            {...form.getInputProps("accountId")}
            my="1rem"
            disabled
          />

          <TextInput
            label="Workslot ID"
            size="md"
            {...form.getInputProps("newWorkslotId")}
            my="1rem"
          />

          <Button type="submit">Update</Button>
        </Box>
      </Modal>
      <div
        onClick={open}
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <IconEdit /> Update
      </div>
    </>
  );
}
