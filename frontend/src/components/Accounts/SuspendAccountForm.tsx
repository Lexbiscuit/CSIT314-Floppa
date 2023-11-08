import React from "react";
import { Modal, Button, Group, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";
import authHeader from "../../services/auth-header";
import { useQueryClient } from "@tanstack/react-query";
import { IconCircleMinus } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";

export const SuspendAccountForm = (props: { data: any | undefined }) => {
  const [opened, { close, open }] = useDisclosure(false);
  const { accountId, suspended } = props.data;
  const queryClient = useQueryClient();
  const { mutate: suspendAccount } = useMutation({
    mutationFn: (accountId: number) => {
      return axios.post(
        "http://localhost:3000/accounts/suspend",
        {
          accountId: Number(accountId),
        },
        {
          headers: authHeader(),
        }
      );
    },
    onSuccess: (res) => {
      alert(res.data.message);
      queryClient.invalidateQueries({ queryKey: ["retrieveAccounts"] });
    },
    onError: (err) => {
      alert(err.response.data.message);
    },
  });

  const { mutate: unsuspendAccount } = useMutation({
    mutationFn: (accountId: number) => {
      return axios.post(
        "http://localhost:3000/accounts/unsuspend",
        {
          accountId: Number(accountId),
        },
        {
          headers: authHeader(),
        }
      );
    },
    onSuccess: (res) => {
      alert(res.data.message);
      queryClient.invalidateQueries({ queryKey: ["retrieveAccounts"] });
    },
    onError: (err) => {
      alert(err.response.data.message);
    },
  });

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
