import React from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, TextInput, Button, Box } from "@mantine/core";
import { useForm, isNotEmpty } from "@mantine/form";

export default function UpdateWorkslotForm(props: { data: any }) {
  const [opened, { open, close }] = useDisclosure(false);
  const {  workslotId, date, baristas_required, cashiers_required, chefs_required, waiters_required } = props.data;

  const form = useForm({
    initialValues: {
      workslotsId: workslotId,
      date:date,
      baristas_required: baristas_required,
      cashiers_required: cashiers_required,
      chefs_required: chefs_required,
      waiters_required:waiters_required,
    },

    validate: {
      workslotsId:isNotEmpty("Work slot Id cannot be empty."),
      date:(value) =>
      /^\d{2}-\d{2}-\d{4}$/.test(value) ? null : "Invalid date.",
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
        title="Update Work Slot"
        centered
      >
        <Box
          component="form"
          onSubmit={form.onSubmit(() => {
            async function updateWorkslot() {
              try {
                await fetch("http://localhost:3000/workslots/update", {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    workslotId: form.values.workslotsId,
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
                alert("Internal System Error.");
              }
            }
            updateWorkslot();
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
            label="Date of workslot"
            placeholder="dd-mm-yyyy"
            size="md"
            {...form.getInputProps("date")}
            my="1rem"
          />


          <TextInput
            label="Barista"
            placeholder="name of barista"
            size="md"
            {...form.getInputProps("baristas_required")}
            my="1rem"
            type="number"
          />

          <TextInput
            label="Cashier"
            placeholder="name of cashier"
            size="md"
            {...form.getInputProps("cashiers_required")}
            my="1rem"
            type="number"
          />

          <TextInput
            label="Chef"
            placeholder="name of chef"
            size="md"
            {...form.getInputProps("chefs_required")}
            my="1rem"
            type="number"
          />

          <TextInput
            label="Waiter"
            placeholder="name of cashier"
            size="md"
            {...form.getInputProps("waiters_required")}
            my="1rem"
            type="number"
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
