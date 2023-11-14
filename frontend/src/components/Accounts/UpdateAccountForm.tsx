import React from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, TextInput, Button, Box, Select } from "@mantine/core";
import { useForm, isNotEmpty, isEmail } from "@mantine/form";
import axios from "axios";
import authHeader from "../../services/auth-header";
import { IconEdit } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";

export default function UpdateAccountForm(props: { data: any }) {
  const [opened, { open, close }] = useDisclosure(false);
  const { password, role, profileId, dob, ...account } = props.data;

  const { mutate: updateAccount } = useMutation({
    mutationFn: async (account: any) => {
      return axios.put("http://localhost:3000/accounts/update", account, {
        headers: authHeader(),
      });
    },
    onSuccess: (res) => {
      alert(res.data.message);
      location.reload();
    },
    onError: (err) => {
      alert(err.response.data.message);
    },
  });

  const form = useForm({
    initialValues: {
      profileId: profileId,
      dob: new Date(dob).toISOString().slice(0, -14),
      password: "",
      role: role ? role : undefined,
      ...account,
    },

    validate: {
      name: isNotEmpty("Name cannot be empty."),
      profileId: isNotEmpty("Profile cannot be empty."),
      email: isEmail("Invalid email."),
      role: (value, values) =>
        values.profile == "Cafe Staff" &&
        value == undefined &&
        isNotEmpty("Role cannot be empty."),
      dob: isNotEmpty("Date of birth cannot be empty."),
    },

    transformValues: (values) => ({
      accountId: Number(values.accountId),
      name: values.name,
      profileId: Number(values.profileId),
      email: values.email,
      password: values.password,
      role:
        values.profileId == Number(values.profileId) ? values.role : undefined,
      dob: new Date(values.dob).toISOString(),
    }),
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
          onSubmit={form.onSubmit((values) => {
            updateAccount(values);
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
            size="md"
            {...form.getInputProps("password")}
            my="1rem"
          />

          {form.values.profile == "Cafe Staff" && (
            <Select
              label="Role"
              placeholder="Pick role"
              data={["Cashier", "Waiter", "Chef"]}
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
      <IconEdit onClick={open} style={{ cursor: "pointer" }} />
    </>
  );
}
