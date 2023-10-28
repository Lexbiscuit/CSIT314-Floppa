import React from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, TextInput, Button, Box, Select } from "@mantine/core";
import { useForm, isNotEmpty } from "@mantine/form";
import axios from "axios";
import authHeader from "../../services/auth-header";

export default function CreateProfileForm() {
  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm({
    initialValues: {
      name: "",
      description: "",
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
        title="Create User Profile"
        centered
      >
        <Box
          component="form"
          onSubmit={form.onSubmit(() => {
            async function createProfile() {
              try {
                axios
                  .post(
                    "http://localhost:3000/profiles/create",
                    {
                      name: form.values.name,
                      description: form.values.description,
                    },
                    {
                      headers: authHeader(),
                    }
                  )
                  .then((res) => alert(res.data.message));

                location.reload();
              } catch (err) {
                console.log(err);
                alert("Internal System Error.");
              }
            }
            createProfile();
          })}
        >
          <TextInput
            label="Name"
            placeholder="Floppa Master"
            size="md"
            {...form.getInputProps("name")}
            my="1rem"
          />

          <TextInput
            label="Description"
            placeholder="Description goes here ..."
            size="md"
            {...form.getInputProps("description")}
            my="1rem"
          />

          <Button type="submit" my="1rem" w="100%">
            Create
          </Button>
        </Box>
      </Modal>

      <Button onClick={open}>Create User Profile</Button>
    </>
  );
}
