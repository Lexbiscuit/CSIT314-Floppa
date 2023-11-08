import React, { useState, useRef } from "react";
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
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import { useMutation } from "@tanstack/react-query";

export default function LoginGUI() {
  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          Welcome back to Floppa!
        </Title>
        <LoginForm />
        <Text ta="center" mt="md">
          Don&apos;t have an account? <Anchor href="#">Register</Anchor>
        </Text>
      </Paper>
    </div>
  );
}

function LoginForm() {
  const navigate = useNavigate();
  const { mutate: login, status: loginStatus } = useMutation({
    mutationFn: AuthService.login,
    onSuccess: (data) => {
      if (data.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(data.data));
      }
      alert(data.data.message);
      navigate("/dashboard");
      window.location.reload();
    },
    onError: (error) => {
      alert(error.response.data.message);
    },
  });

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
    <>
      <Box
        component="form"
        onSubmit={form.onSubmit((values) => {
          if (values.email.length > 0 && values.password.length > 0) {
            login({ ...values });
          }
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
        <Button
          fullWidth
          mt="xl"
          size="md"
          type="submit"
          disabled={loginStatus === "pending"}
        >
          Login
        </Button>
      </Box>
    </>
  );
}
