import {
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
import classes from "../styles/AuthenticationImage.module.css";

import React from "react";

export default function Login() {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: isEmail("Invalid email."),
      password: isNotEmpty("Password cannot be empty."),
    },
  });

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          Welcome back to Floppa!
        </Title>
        <Box
          component="form"
          onSubmit={form.onSubmit(async () => {
            await fetch("http://localhost:3000/login", {
              method: "POST",
              mode: "cors",
              cache: "no-cache",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: form.values.email,
                password: form.values.password,
              }),
            })
              .then((res) => res.json())
              .then(({ message }) => {
                alert(message);
              });
          })}
        >
          <TextInput
            label="Email address"
            placeholder="grumpy@floppa.com"
            size="md"
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            mt="md"
            size="md"
            {...form.getInputProps("password")}
          />
          <Checkbox label="Keep me logged in" mt="xl" size="md" />
          <Button fullWidth mt="xl" size="md" type="submit">
            Login
          </Button>
        </Box>

        <Text ta="center" mt="md">
          Don&apos;t have an account? <Anchor href="#">Register</Anchor>
        </Text>
      </Paper>
    </div>
  );
}
