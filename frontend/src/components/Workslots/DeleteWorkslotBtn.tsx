import { Modal, Text, Group, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";
import authHeader from "../../services/auth-header";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IconCircleMinus } from "@tabler/icons-react";

const DeleteWorkslotBtn = (props: { data: any }) => {
  const [opened, { close, open }] = useDisclosure(false);
  const { workslotId } = props.data;

  const queryClient = useQueryClient();
  const { mutate: deleteWorkslot } = useMutation({
    mutationFn: async (workslotId: number) => {
      return axios.delete("http://localhost:3000/workslots/delete", {
        headers: authHeader(),
        data: { workslotId },
      });
    },
    onSuccess: (res) => {
      alert(res.data.message);
      queryClient.invalidateQueries({ queryKey: ["retrieveWorkslots"] });
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
        title="Delete Workslot"
      >
        <Text>Are you sure you want to delete this work slot?</Text>

        <Group
          mt="xl"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button variant="outline" onClick={close}>
            Cancel
          </Button>

          <Button
            variant="filled"
            bg="red"
            onClick={() => {
              deleteWorkslot(Number(workslotId));
              close();
            }}
          >
            Delete
          </Button>
        </Group>
      </Modal>
      <IconCircleMinus onClick={open} style={{ cursor: "pointer" }} />
    </>
  );
};

export default DeleteWorkslotBtn;
