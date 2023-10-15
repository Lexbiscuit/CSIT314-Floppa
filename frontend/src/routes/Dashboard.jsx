import Appshell from "../components/Appshell";
import CreateUserAccountForm from "../components/CreateUserAccountForm";
import { Stack, Grid } from "@mantine/core";
import { useCookies } from "react-cookie";
import { useEffect } from "react";

export default function Dashboard() {
  const [cookies, setCookies, removeCookie] = useCookies(["name", "TOKEN"]);

  useEffect(() => {
    !cookies.TOKEN && !cookies.name && window.location.replace("/");
  }, []);

  if (cookies.name && cookies.TOKEN)
    return (
      <Appshell>
        <Grid>
          <Grid.Col span={{ xs: 12, md: 6 }}>
            <Stack
              h="100%"
              bg="var(--mantine-color-blue-light)"
              align="center"
              justify="center"
            >
              <h2 style={{ margin: 0 }}>User Account</h2>
              <CreateUserAccountForm />
              <CreateUserAccountForm />
              <CreateUserAccountForm />
              <CreateUserAccountForm />
            </Stack>
          </Grid.Col>
          <Grid.Col span={{ xs: 12, md: 6 }}>
            <Stack
              h={300}
              bg="var(--mantine-color-blue-light)"
              align="center"
              justify="center"
            >
              <h2 style={{ margin: 0 }}>User Profile</h2>
              <CreateUserAccountForm />
              <CreateUserAccountForm />
              <CreateUserAccountForm />
              <CreateUserAccountForm />
            </Stack>
          </Grid.Col>
        </Grid>
      </Appshell>
    );
}
