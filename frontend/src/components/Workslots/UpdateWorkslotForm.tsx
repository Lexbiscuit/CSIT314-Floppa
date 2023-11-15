import React from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, TextInput, Button, Box } from "@mantine/core";
import { useForm, isNotEmpty } from "@mantine/form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import authHeader from "../../services/auth-header";
import { IconEdit } from "@tabler/icons-react";

export default function UpdateWorkslotForm(props: { data: any }) {
  const [opened, { open, close }] = useDisclosure(false);
  const { workslotId, startTime, endTime, cashiers, chefs, waiters } =
    props.data;

  const queryClient = useQueryClient();
  const { mutate: updateWorkslot } = useMutation({
    mutationFn: (values: any) => {
      return axios.put("http://localhost:3000/workslots/update", values, {
        headers: authHeader(),
      });
    },
    onSuccess: ({ data }) => {
      alert(data.message);
      queryClient.invalidateQueries({ queryKey: ["retrieveWorkslots"] });
    },
    onError: ({ response }) => {
      alert(response.data.message);
    },
  });

  const form = useForm({
    initialValues: {
      workslotId: workslotId,
      startTime: startTime.slice(0, 16),
      endTime: endTime.slice(0, 16),
      cashiers: cashiers,
      chefs: chefs,
      waiters: waiters,
    },

    validate: {
      workslotId: isNotEmpty("Workslot ID cannot be empty."),
      startTime: isNotEmpty("Start time cannot be empty."),
      endTime: isNotEmpty("Start time cannot be empty."),
      cashiers: isNotEmpty("Cashiers cannot be empty."),
      chefs: isNotEmpty("Chefs cannot be empty."),
      waiters: isNotEmpty("Waiters cannot be empty."),
    },

    transformValues: (values) => ({
      workslotId: Number(values.workslotId),
      startTime: new Date(values.startTime).toISOString(),
      endTime: new Date(values.endTime).toISOString(),
      chefs: Number(values.chefs),
      cashiers: Number(values.cashiers),
      waiters: Number(values.waiters),
    }),
  });

  return (
    <>
      <Modal opened={opened} onClose={close} title="Update Work Slot" centered>
        <Box
          component="form"
          onSubmit={form.onSubmit((values) => {
            updateWorkslot(values);
            close();
          })}
        >
          <TextInput
            label="Work Slot ID"
            size="md"
            {...form.getInputProps("workslotId")}
            my="1rem"
            disabled
          />

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
            Update
          </Button>
        </Box>
      </Modal>
      <IconEdit onClick={open} style={{ cursor: "pointer" }} />
    </>
  );
}
