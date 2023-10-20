import React from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, TextInput, Button, Box, Select } from "@mantine/core";
import { useForm, isNotEmpty, isEmail } from "@mantine/form";

export default function CreateAccountForm() {
  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
      role: "",
      dob: "",
    },

    validate: {
      name: isNotEmpty("Name cannot be empty."),
      email: isEmail("Invalid email."),
      password: isNotEmpty("Password cannot be empty."),
      role: isNotEmpty("Role cannot be empty."),
      dob: (value) =>
        /^\d{2}-\d{2}-\d{4}$/.test(value) ? null : "Invalid date of birth.",
    },
  });

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Create User Account"
        centered
      >
        <Box
          component="form"
          onSubmit={form.onSubmit(() => {
            async function createAccount() {
              try {
                await fetch("http://localhost:3000/account/create", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    name: form.values.name,
                    email: form.values.email,
                    password: form.values.password,
                    role: form.values.role,
                    dob: new Date(form.values.dob).toISOString(),
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
            createAccount();
          })}
        >
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
            placeholder=""
            type="password"
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

          <TextInput
            label="Date of Birth"
            placeholder="dd-mm-yyyy (eg. 01-01-1999)"
            size="md"
            {...form.getInputProps("dob")}
            my="1rem"
          />

          <Button type="submit" my="1rem" w="100%">
            Create
          </Button>
        </Box>
      </Modal>

      <Button onClick={open}>Create User Account</Button>
    </>
  );
}
