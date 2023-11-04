import React from "react";
import { Modal, Button, Group, TextInput, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";
import authHeader from "../../services/auth-header";
import { useQuery } from "@tanstack/react-query";
import { IconEdit, IconCircleMinus } from "@tabler/icons-react";

const suspendAccount = async (accountId: number) => {
  await axios
    .post(
      "http://localhost:3000/accounts/suspend",
      {
        accountId: Number(accountId),
      },
      {
        headers: authHeader(),
      }
    )
    .then((res) => {
      alert(res.data.message);
    })
    .catch((err) => {
      alert(err);
    });
};

const unsuspendAccount = async (accountId: number) => {
  await axios
    .post(
      "http://localhost:3000/accounts/unsuspend",
      {
        accountId: Number(accountId),
      },
      {
        headers: authHeader(),
      }
    )
    .then(() => alert("Account unsuspended"))
    .catch((err) => alert(err));
};

export const SuspendAccountForm = (props: { data: any | undefined }) => {
  const [opened, { close, open }] = useDisclosure(false);
  const { accountId, suspended } = props.data;

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        size="auto"
        title="Suspend Account"
      >
        <Group
          mt="xl"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {suspended == "Yes" && (
            <>
              <Text>Are you sure you want to unsuspend this account?</Text>

              <Button
                variant="filled"
                bg="red"
                onClick={() => {
                  unsuspendAccount(accountId);
                  close();
                  location.reload();
                }}
              >
                Unsuspend
              </Button>
            </>
          )}

          {suspended == "No" && (
            <>
              <Text>Are you sure you want to suspend this account?</Text>

              <Button
                variant="filled"
                bg="red"
                onClick={() => {
                  suspendAccount(accountId);
                  close();
                  location.reload();
                }}
              >
                Suspend
              </Button>
            </>
          )}

          <Button variant="outline" onClick={close}>
            Cancel
          </Button>
        </Group>
      </Modal>

      <IconCircleMinus
        onClick={open}
        style={{
          cursor: "pointer",
          userSelect: "none",
        }}
      />
    </>
  );
};
