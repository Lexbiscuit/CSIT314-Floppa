import React from "react";
import { Modal, TextInput, Button, Box, Select } from "@mantine/core";
import { useForm, isNotEmpty, isEmail } from "@mantine/form";
import axios from "axios";
import authHeader from "../../services/auth-header";

type Account = {
  name: string;
  profileId: number;
  email: string;
  password: string;
  roleId?: number;
  dob: string;
};

async function createAccount(account: Account) {
  try {
    await axios
      .post("http://localhost:3000/accounts/create", account, {
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

export default function CreateAccountForm() {
  const form = useForm({
    initialValues: {
      name: "",
      profileId: 0,
      email: "",
      password: "",
      roleId: 0,
      dob: "",
    },

    validate: {
      name: isNotEmpty("Name cannot be empty."),
      profileId: isNotEmpty("Profile cannot be empty."),
      email: isEmail("Invalid email."),
      password: isNotEmpty("Password cannot be empty."),
      dob: isNotEmpty("Date of birth cannot be empty."),
    },

    transformValues: (values) => ({
      ...values,
      profileId: Number(values.profileId),
      roleId: Number(values.roleId) == 4 ? Number(values.roleId) : undefined,
      dob: new Date(values.dob).toISOString(),
    }),
  });

  return (
    <Box
      component="form"
      onSubmit={form.onSubmit((values) => {
        createAccount(values);
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
        Create Account
      </Button>
    </Box>
  );
}
