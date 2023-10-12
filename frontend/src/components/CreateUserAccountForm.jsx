import { useDisclosure } from "@mantine/hooks";
import {
  Modal,
  Paper,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Title,
  Text,
  Anchor,
  Box,
} from "@mantine/core";
import { useForm, isNotEmpty, isEmail } from "@mantine/form";

export default function CreateUserAccountForm() {
  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm({
    initialValues: {
      id: "",
      name: "",
      email: "",
      password: "",
    },

    validate: {
      name: isNotEmpty("Name cannot be empty."),
      email: isEmail("Invalid email."),
      password: isNotEmpty("Password cannot be empty."),
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
        <Box component="form" onSubmit={form.onSubmit(() => {})}>
          <TextInput
            label="Account ID"
            placeholder="1"
            size="md"
            type="number"
            {...form.getInputProps("id")}
            my="1rem"
          />

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

          <Button type="submit" my="1rem" w="100%">
            Create
          </Button>
        </Box>
      </Modal>

      <Button onClick={open}>Create User Account</Button>
    </>
  );
}
