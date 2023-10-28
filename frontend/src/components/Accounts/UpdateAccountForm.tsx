import React from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, TextInput, Button, Box, Select } from "@mantine/core";
import { useForm, isNotEmpty, isEmail } from "@mantine/form";
import axios from "axios";
import authHeader from "../../services/auth-header";

export default function UpdateAccountForm(props: { data: any }) {
  const [opened, { open, close }] = useDisclosure(false);
  const { accountId, name, profile, email, role, dob } = props.data;

  const form = useForm({
    initialValues: {
      accountId: accountId,
      name: name,
      profile: profile,
      email: email,
      password: "",
      role: role,
      dob: dob,
    },

    validate: {
      name: isNotEmpty("Name cannot be empty."),
      profile: isNotEmpty("Profile cannot be empty."),
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
        title="Update User Account"
        centered
      >
        <Box
          component="form"
          onSubmit={form.onSubmit(() => {
            async function updateAccount() {
              try {
                await axios
                  .put(
                    "http://localhost:3000/accounts/update",
                    {
                      accountId: Number(form.values.accountId),
                      name: form.values.name,
                      profile: form.values.profile,
                      email: form.values.email,
                      password: form.values.password,
                      role: form.values.role,
                      dob: new Date(form.values.dob).toISOString(),
                    },
                    {
                      headers: authHeader(),
                    }
                  )
                  .then((res) => {
                    alert(res.data.message);
                  });
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

          <Select
            label="Profile"
            placeholder="Pick profile"
            data={[
              "System Administrator",
              "Cafe Owner",
              "Cafe Manager",
              "Cafe Staff",
            ]}
            {...form.getInputProps("profile")}
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

          {form.values.profile == "Cafe Staff" && (
            <Select
              label="Role"
              placeholder="Pick role"
              data={["Cashier", "Waiter", "Chef", "Barista"]}
              {...form.getInputProps("role")}
              my="1rem"
            />
          )}

          <TextInput
            label="Date of Birth"
            type="date"
            placeholder="dd-mm-yyyy (eg. 01-01-1999)"
            size="md"
            {...form.getInputProps("dob")}
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
