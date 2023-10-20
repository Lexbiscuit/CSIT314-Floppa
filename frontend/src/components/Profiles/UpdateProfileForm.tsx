import React from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, TextInput, Button, Box } from "@mantine/core";
import { useForm, isNotEmpty } from "@mantine/form";

export default function UpdateProfileForm(props: { data: any }) {
  const [opened, { open, close }] = useDisclosure(false);
  const { profileId, name, description } = props.data;

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
          onSubmit={form.onSubmit(() => {
            async function updateProfile() {
              try {
                await fetch("http://localhost:3000/profile/update", {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    profileId: form.values.profileId,
                    name: form.values.name,
                    description: form.values.description,
                  }),
                })
                  .then((res) => res.json())
                  .then((res) => alert(res.message));
                location.reload();
              } catch (err) {
                alert("Internal System Error.");
              }
            }
            updateProfile();
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
      <Button onClick={open}>Edit</Button>
    </>
  );
}
