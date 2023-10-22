import React from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, TextInput, Button, Box, Select } from "@mantine/core";
import { useForm, isNotEmpty } from "@mantine/form";

export default function CreateWorkslotForm() {
  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm({
    initialValues: {
      date: "",
      baristas_required: "",
      cashiers_required: "",
      chefs_required:"",
      waiters_required:""
    },

    validate: {
      date:isNotEmpty("Date is not empty"),
      baristas_required: isNotEmpty("barista cannot be empty."),
      cashiers_required: isNotEmpty("cashier cannot be empty."),
      chefs_required: isNotEmpty("chef cannot be empty."),
      waiters_required: isNotEmpty("waiter cannot be empty."),
    },
  });

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Create Work slot"
        centered
      >
        <Box
          component="form"
          onSubmit={form.onSubmit(() => {
            async function createWorkslot() {
              try {
                await fetch("http://localhost:3000/workslots/create", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    date: new Date(form.values.date).toISOString(),
                    baristas_required: parseInt(form.values.baristas_required),
                    cashiers_required: parseInt(form.values.cashiers_required),
                    chefs_required: parseInt(form.values.chefs_required),
                    waiters_required: parseInt(form.values.waiters_required),
                  }),
                })
                  .then((res) => res.json())
                  .then((res) => alert(res.message));

                location.reload();
              } catch (err) {
                console.log(err);
                alert("Internal System Error.");
              }
            }
            createWorkslot();
          })}
        >
          <TextInput
            label="Date of workslot"
            placeholder="dd-mm-yyyy"
            size="md"
            type="dateTime-local"
            {...form.getInputProps("date")}
            my="1rem"
          />


          <TextInput
            label="Barista"
            placeholder="number of barista"
            size="md"
            {...form.getInputProps("baristas_required")}
            my="1rem"
            type="number"
          />

          <TextInput
            label="Cashier"
            placeholder="number of cashier"
            size="md"
            {...form.getInputProps("cashiers_required")}
            my="1rem"
            type="number"
          />

          <TextInput
            label="Chef"
            placeholder="number of chef"
            size="md"
            {...form.getInputProps("chefs_required")}
            my="1rem"
            type="number"
          />

          <TextInput
            label="Waiter"
            placeholder="number of cashier"
            size="md"
            {...form.getInputProps("waiters_required")}
            my="1rem"
            type="number"
          />          



          <Button type="submit" my="1rem" w="100%">
            Create
          </Button>
        </Box>
      </Modal>

      <Button onClick={open}>Create Work</Button>
    </>
  );
}
