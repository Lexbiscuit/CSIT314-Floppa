import React from "react";
import { Modal, Button, Group, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";
import authHeader from "../../services/auth-header";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IconCircleMinus } from "@tabler/icons-react";

export const SuspendProfileForm = (props: { data: any | undefined }) => {
  const [opened, { close, open }] = useDisclosure(false);
  const { profileId, suspended } = props.data;
  const queryClient = useQueryClient();
  const { mutate: suspendProfile } = useMutation({
    mutationFn: (profileId: number) => {
      return axios.post(
        "http://localhost:3000/profiles/suspend",
        {
          profileId: Number(profileId),
        },
        {
          headers: authHeader(),
        }
      );
    },
    onSuccess: (res) => {
      alert(res.data.message);
      queryClient.invalidateQueries({ queryKey: ["retrieveProfiles"] });
    },
    onError: (err) => {
      alert(err.response.data.message);
    },
  });

  const { mutate: unsuspendProfile } = useMutation({
    mutationFn: (profileId: number) => {
      return axios.post(
        "http://localhost:3000/profiles/unsuspend",
        {
          profileId: Number(profileId),
        },
        {
          headers: authHeader(),
        }
      );
    },
    onSuccess: (res) => {
      alert(res.data.message);
      queryClient.invalidateQueries({ queryKey: ["retrieveProfiles"] });
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
        title="Suspend Profile"
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
              <Text>Are you sure you want to unsuspend this profile?</Text>

              <Button
                variant="filled"
                bg="red"
                onClick={() => {
                  unsuspendProfile(profileId);
                  close();
                }}
              >
                Unsuspend
              </Button>
            </>
          )}

          {suspended == "No" && (
            <>
              <Text>Are you sure you want to suspend this profile?</Text>

              <Button
                variant="filled"
                bg="red"
                onClick={() => {
                  suspendProfile(profileId);
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
