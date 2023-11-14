import React from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, TextInput, Button, Box } from "@mantine/core";
import { useForm, isNotEmpty } from "@mantine/form";
import axios from "axios";
import { IconEdit } from "@tabler/icons-react";
import authHeader from "../../services/auth-header";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function UpdateProfileForm(props: { data: any }) {
  const [opened, { open, close }] = useDisclosure(false);
  const { profileId, name, description } = props.data;
  const queryClient = useQueryClient();

  const { mutate: updateProfile } = useMutation({
    mutationFn: async (profile: any) => {
      return axios.put("http://localhost:3000/profiles/update", profile, {
        headers: authHeader(),
      });
    },
    onSuccess: (res) => {
      alert(res.data.message);
      queryClient.invalidateQueries({ queryKey: ["retrieveProfiles"] });
    },
    onError: (err) => {
      alert(err.response.data.message);
    },
  });

  const form = useForm({
    initialValues: {
      profileId: profileId,
      name: name,
      description: description,
    },

    validate: {
      name: isNotEmpty("Name cannot be empty."),
      description: isNotEmpty("Description cannot be empty."),
    },
  });

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Update User Profile"
        centered
      >
        <Box
          component="form"
          onSubmit={form.onSubmit((values) => {
            updateProfile(values);
            close();
          })}
        >
          <TextInput
            label="Profile ID"
            size="md"
            {...form.getInputProps("profileId")}
            my="1rem"
            disabled
          />

          <TextInput
            label="Name"
            placeholder="Cafe Staff"
            size="md"
            {...form.getInputProps("name")}
            my="1rem"
          />

          <TextInput
            label="Description"
            placeholder="Enter a description ..."
            size="md"
            {...form.getInputProps("description")}
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
