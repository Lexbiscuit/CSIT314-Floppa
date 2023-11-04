import React from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, TextInput, Button, Box, Select } from "@mantine/core";
import { useForm, isNotEmpty, isEmail } from "@mantine/form";
import axios from "axios";
import authHeader from "../../services/auth-header";
import { IconEdit } from "@tabler/icons-react";

type Account = {
  name: string;
  profileId: number;
  email: string;
  password: string | undefined;
  roleId?: number;
  dob: string;
};

async function updateAccount(account: Account) {
  try {
    await axios
      .put("http://localhost:3000/accounts/update", account, {
        headers: authHeader(),
      })
      .then((res) => {
        alert(res.data.message);
        location.reload();
      });
  } catch (err) {
    alert("Internal System Error.");
  }
}

export default function UpdateAccountForm(props: { data: any }) {
  const [opened, { open, close }] = useDisclosure(false);
  const { password, roleId, profile, ...account } = props.data;

  const form = useForm({
    initialValues: {
      ...account,
      roleId: roleId ? roleId : 0,
      password: "",
    },

    validate: {
      name: isNotEmpty("Name cannot be empty."),
      profileId: isNotEmpty("Profile cannot be empty."),
      email: isEmail("Invalid email."),
      roleId: (value, values) =>
        values.profileId == 4 &&
        value == null &&
        isNotEmpty("Role cannot be empty."),
      dob: isNotEmpty("Date of birth cannot be empty."),
    },

    transformValues: (values) => ({
      ...values,
      accountId: Number(values.accountId),
      password: values.password == "" ? undefined : values.password,
      profileId: Number(values.profileId),
      roleId: Number(values.profileId) == 4 ? Number(values.roleId) : undefined,
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
            Update
          </Button>
        </Box>
      </Modal>
      <IconEdit onClick={open} style={{ cursor: "pointer" }} />
    </>
  );
}
