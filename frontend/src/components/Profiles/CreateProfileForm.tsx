import React from "react";
import { Modal, TextInput, Button, Box, Select } from "@mantine/core";
import { useForm, isNotEmpty, isEmail } from "@mantine/form";
import axios from "axios";
import authHeader from "../../services/auth-header";

type Profile = {
  name: string;
  description: string;

};

async function createProfile(profile: Profile) {
  try {
    await axios
      .post("http://localhost:3000/profiles/create", profile, {
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

export default function CreateProfileForm() {
  const form = useForm({
    initialValues: {
      name: "",
      description: "",
    },

    validate: {
      name: isNotEmpty("Name cannot be empty."),
      description: isNotEmpty("Description cannot be empty")
    },

    transformValues: (values) => ({
      ...values,

    }),
  });

  return (
    <Box
      component="form"
      onSubmit={form.onSubmit((values) => {
        createProfile(values);
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
        label="Description"
        placeholder=""
        size="md"
        {...form.getInputProps("description")}
        my="1rem"
      />



      <Button type="submit" my="1rem" w="100%">
        Create Profile
      </Button>
    </Box>
  );
}
