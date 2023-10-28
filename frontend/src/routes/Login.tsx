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

export default function Login() {
  const navigate = useNavigate();
  const formRef = useRef();
  const [loading, setLoading] = useState(false);

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

  const handleLogin = async (values: { email: string; password: string }) => {
    setLoading(true);

    if (values.email.length > 0 && values.password.length > 0) {
      AuthService.login(values.email, values.password).then(
        () => {
          navigate("/dashboard");
          window.location.reload();
        },
        (error: any) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          alert(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          Welcome back to Floppa!
        </Title>
        <Box
          component="form"
          onSubmit={form.onSubmit((values) => handleLogin(values))}
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
