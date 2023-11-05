import React from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, TextInput, Button, Box } from "@mantine/core";
import { useForm, isNotEmpty } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import authHeader from "../../services/auth-header";

export default function UpdateWorkslotForm(props: { data: any }) {
  const [opened, { open, close }] = useDisclosure(false);

  const updateWorkslot = useMutation({
    mutationFn: async (values: any) => {
      axios
        .put("http://localhost:3000/workslots/update", values, {
          headers: authHeader(),
        })
        .then((res) => alert(res.data.message))
        .catch((error) => alert(error));
    },
  });

  const form = useForm({
    initialValues: { ...props.data },

    validate: {
      startTime: isNotEmpty("Start time cannot be empty."),
      endTime: isNotEmpty("Start time cannot be empty."),
    },

    transformValues: (values) => ({
      ...values,
      startTime: new Date(values.startTime).toISOString(),
      endTime: new Date(values.endTime).toISOString(),
    }),
  });

  return (
    <>
      <Modal opened={opened} onClose={close} title="Update Work Slot" centered>
        <Box
          component="form"
          onSubmit={form.onSubmit((values) => {
            updateWorkslot.mutate(values);
            close();
            window.location.reload();
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

          <Button type="submit" my="1rem" w="100%">
            Update
          </Button>
        </Box>
      </Modal>
      <Button onClick={open}>Edit</Button>
    </>
  );
}
