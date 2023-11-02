import React from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, TextInput, Button, Box, Select } from "@mantine/core";
import { useForm, isNotEmpty, isEmail } from "@mantine/form";
import axios from "axios";
import authHeader from "../../services/auth-header";

export default function CreateAccountForm() {
  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm({
    initialValues: {
      name: "",
      profileId: "",
      email: "",
      password: "",
      roleId: "",
      dob: "",
    },

    validate: {
      name: isNotEmpty("Name cannot be empty."),
      profileId: isNotEmpty("Profile cannot be empty."),
      email: isEmail("Invalid email."),
      password: isNotEmpty("Password cannot be empty."),
      dob: isNotEmpty("Date of birth cannot be empty."),
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
                if (Number(form.values.profileId) == 4) {
                  await axios
                    .post(
                      "http://localhost:3000/accounts/create",
                      {
                        name: form.values.name,
                        profileId: Number(form.values.profileId),
                        email: form.values.email,
                        password: form.values.password,
                        roleId: Number(form.values.roleId),
                        dob: new Date(form.values.dob).toISOString(),
                        suspended: false,
                      },
                      { headers: authHeader() }
                    )
                    .then((res) => {
                      alert(res.data.message);
                      location.reload();
                    });
                } else {
                  await axios
                    .post(
                      "http://localhost:3000/accounts/create",
                      {
                        name: form.values.name,
                        profileId: Number(form.values.profileId),
                        email: form.values.email,
                        password: form.values.password,
                        dob: new Date(form.values.dob).toISOString(),
                        suspended: false,
                      },
                      { headers: authHeader() }
                    )
                    .then((res) => {
                      alert(res.data.message);
                      location.reload();
                    });
                }
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

          <Select
            label="Profile"
            placeholder="Pick profile"
            data={[
              { value: "1", label: "System Administrator" },
              { value: "2", label: "Cafe Owner" },
              { value: "3", label: "Cafe Manager" },
              { value: "4", label: "Cafe Staff" },
            ]}
            {...form.getInputProps("profileId")}
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

          {Number(form.values.profileId) == 4 && (
            <Select
              label="Role"
              placeholder="Pick role"
              data={[
                { value: "1", label: "Barista" },
                { value: "2", label: "Cashier" },
                { value: "3", label: "Chef" },
                { value: "4", label: "Waiter" },
              ]}
              {...form.getInputProps("roleId")}
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
            Create
          </Button>
        </Box>
      </Modal>

      <Button onClick={open}>Create User Account</Button>
    </>
  );
}
