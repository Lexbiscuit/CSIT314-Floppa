import React from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, TextInput, Button, Box, Select } from "@mantine/core";
import { useForm, isNotEmpty, isEmail } from "@mantine/form";

export default function UpdateAccountForm(props: { data: any }) {
  const [opened, { open, close }] = useDisclosure(false);
  const { accountId, name, email, role } = props.data;

  const form = useForm({
    initialValues: {
      accountId: accountId,
      name: name,
      email: email,
      password: "",
      role: role,
    },

    validate: {
      name: isNotEmpty("Name cannot be empty."),
      email: isEmail("Invalid email."),
      role: isNotEmpty("Role cannot be empty."),
    },
  });

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Update User Account"
        centered
      >
        <Box
          component="form"
          onSubmit={form.onSubmit(() => {
            async function updateAccount() {
              try {
                await fetch("http://localhost:3000/accounts/update", {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    accountId: form.values.accountId,
                    name: form.values.name,
                    email: form.values.email,
                    password: form.values.password,
                    role: form.values.role,
                  }),
                })
                  .then((res) => res.json())
                  .then((res) => alert(res.message));
                location.reload();
              } catch (err) {
                alert("Internal System Error.");
              }
            }
            updateAccount();
          })}
        >
          <TextInput
            label="Account ID"
            size="md"
            {...form.getInputProps("accountId")}
            my="1rem"
            disabled
          />

          <TextInput
            label="Name"
            placeholder="Angsty Floppa"
            size="md"
            {...form.getInputProps("name")}
            my="1rem"
          />

          <TextInput
            label="Email address"
            placeholder="grumpy@floppa.com"
            size="md"
            {...form.getInputProps("email")}
            my="1rem"
          />

          <TextInput
            label="Password"
            size="md"
            {...form.getInputProps("password")}
            my="1rem"
          />

          <Select
            label="Role"
            placeholder="Pick role"
            data={[
              "System Administrator",
              "Cafe Owner",
              "Cafe Manager",
              "Cafe Staff",
            ]}
            {...form.getInputProps("role")}
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
