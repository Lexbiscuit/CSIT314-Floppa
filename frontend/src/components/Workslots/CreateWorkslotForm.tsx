import React from "react";
import { Modal, TextInput, Button, Box, Select } from "@mantine/core";
import { useForm, isNotEmpty } from "@mantine/form";
import axios from "axios";
import authHeader from "../../services/auth-header";
import { useMutation } from "@tanstack/react-query";

export default function CreateWorkslotForm() {
  const { mutate: createWorkslot } = useMutation({
    mutationFn: async (data: any) => {
      return axios.post(
        "http://localhost:3000/workslots/create",
        {
          ...data,
        },
        {
          headers: authHeader(),
        }
      );
    },
    onSuccess: (res) => {
      alert(res.data.message);
    },
    onError: (err) => {
      alert(err.response.data.message);
    },
  });

  const form = useForm({
    initialValues: {
      startTime: "",
      endTime: "",
      chefs: 1,
      cashiers: 1,
      waiters: 1,
    },

    validate: {
      startTime: isNotEmpty("Start time cannot be empty."),
      endTime: isNotEmpty("End time cannot be empty."),
      chefs: isNotEmpty("Number of chefs cannot be empty."),
      cashiers: isNotEmpty("Number of cashiers cannot be empty."),
      waiters: isNotEmpty("Number of waiters cannot be empty."),
    },

    transformValues: (values) => ({
      startTime: new Date(values.startTime).toISOString(),
      endTime: new Date(values.endTime).toISOString(),
      chefs: Number(values.chefs),
      cashiers: Number(values.cashiers),
      waiters: Number(values.waiters),
    }),
  });

  return (
    <Box
      component="form"
      onSubmit={form.onSubmit((values) => {
        createWorkslot(values);
        form.reset();
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
        Create
      </Button>
    </Box>
  );
}
