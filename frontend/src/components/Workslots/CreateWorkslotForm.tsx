import React from "react";
import { Modal, TextInput, Button, Box, Select } from "@mantine/core";
import { useForm, isNotEmpty } from "@mantine/form";
import axios from "axios";
import authHeader from "../../services/auth-header";
import { useMutation } from "@tanstack/react-query";

export default function CreateWorkslotForm() {
  const createWorkslot = useMutation({
    mutationFn: async (data: any) => {
      await axios
        .post(
          "http://localhost:3000/workslots/create",
          {
            startTime: data.startTime,
            endTime: data.endTime,
          },
          {
            headers: authHeader(),
          }
        )
        .then((res) => alert(res.data.message))
        .catch((error) => alert(error));
    },
  });

  const form = useForm({
    initialValues: {
      startTime: "",
      endTime: "",
    },

    validate: {
      startTime: isNotEmpty("Start time cannot be empty."),
      endTime: isNotEmpty("End time cannot be empty."),
    },
    transformValues: (values) => ({
      startTime: new Date(values.startTime).toISOString(),
      endTime: new Date(values.endTime).toISOString(),
    }),
  });

  return (
    <Box
      component="form"
      onSubmit={form.onSubmit((values) => {
        createWorkslot.mutate(values);
        window.location.reload();
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

      <Button type="submit" my="1rem" w="100%">
        Create
      </Button>
    </Box>
  );
}
