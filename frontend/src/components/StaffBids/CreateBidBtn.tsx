import { Modal, Text, Group, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";
import authHeader from "../../services/auth-header";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IconCircleMinus } from "@tabler/icons-react";

const CreateBidBtn = (props: { data: any }) => {
  const [opened, { close, open }] = useDisclosure(false);
  const { bidId, created } = props.data;
  const queryClient = useQueryClient();
  const { mutate: createBid } = useMutation({
    mutationFn: async (bidId: number) => {
      return axios.post("http://localhost:3000/staffbids/create", {
        headers: authHeader(),
        data: { bidId },
      });
    },
    onSuccess: (res) => {
      alert(res.data.message);
      queryClient.invalidateQueries({ queryKey: ["retrieveStaffBids"] });
    },
    onError: (err) => {
      alert(err.response.data.message);
    },
  });
  const { mutate: uncreateBid } = useMutation({
    mutationFn: (bidId: number) => {
      return axios.post(
        "http://localhost:3000/profiles/unsuspend",
        {
          profileId: Number(bidId),
        },
        {
          headers: authHeader(),
        }
      );
    },
    onSuccess: (res) => {
      alert(res.data.message);
      queryClient.invalidateQueries({ queryKey: ["retrieveStaffBids"] });
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
        title="Create Bid"
      >
        <Group
          mt="xl"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {created == "Yes" && (
            <>
              <Text>Are you sure you want to uncreate this profile?</Text>

              <Button
                variant="filled"
                bg="red"
                onClick={() => {
                  uncreateBid(bidId);
                  close();
                }}
              >
                Unsuspend
              </Button>
            </>
          )}

          {created == "No" && (
            <>
              <Text>Are you sure you want to create this bid?</Text>

              <Button
                variant="filled"
                bg="red"
                onClick={() => {
                  createBid(bidId);
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

export default CreateBidBtn;