import React from "react";
import { Modal, Button, Group, TextInput, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";
import authHeader from "../../services/auth-header";
import { useQuery } from "@tanstack/react-query";
import { IconEdit, IconCircleMinus } from "@tabler/icons-react";

const suspendAccount = async (accountId: number, reason?: string) => {
  const { data } = await axios.post(
    "http://localhost:3000/accounts/suspend",
    {
      accountId: Number(accountId),
      reason: reason,
    },
    {
      headers: authHeader(),
    }
  );
  alert(data.message);
};

const unsuspendAccount = async (accountId: number) => {
  const { data } = await axios.post(
    "http://localhost:3000/accounts/unsuspend",
    {
      accountId: Number(accountId),
    },
    {
      headers: authHeader(),
    }
  );
  alert(data.message);
};

export const SuspendAccountForm = (props: { data: any | undefined }) => {
  const [opened, { close, open }] = useDisclosure(false);
  const { accountId, suspended } = props.data;
  const reasonRef = React.useRef<HTMLInputElement>(null);

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
          {!suspended && (
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

          {suspended && (
            <>
              <TextInput label="Reason" ref={reasonRef} size="md"></TextInput>
              <Button
                variant="filled"
                bg="red"
                onClick={() => {
                  suspendAccount(accountId, reasonRef.current?.value);
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
