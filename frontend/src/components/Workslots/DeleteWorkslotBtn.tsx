import { Modal, Text, Group, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";
import authHeader from "../../services/auth-header";
import { useMutation } from "@tanstack/react-query";

const DeleteWorkslotBtn = (props: { data: any }) => {
  const [opened, { close, open }] = useDisclosure(false);
  const { workslotId } = props.data;

  const deleteWorkslot = useMutation({
    mutationFn: async (workslotId: number) => {
      await axios
        .delete("http://localhost:3000/workslots/delete", {
          headers: authHeader(),
          data: { workslotId },
        })
        .then((res) => alert(res.data.message))
        .catch((error) => alert(error.message));
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
              deleteWorkslot.mutate(workslotId);
              close();
              location.reload();
            }}
          >
            Delete
          </Button>
        </Group>
      </Modal>

      <Button bg="red" onClick={open}>
        Delete
      </Button>
    </>
  );
};

export default DeleteWorkslotBtn;
