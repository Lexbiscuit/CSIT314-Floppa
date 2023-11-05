import React from "react";
import { Modal, Button, Group, TextInput, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";
import authHeader from "../../services/auth-header";
import { useQuery } from "@tanstack/react-query";
import { IconEdit, IconCircleMinus } from "@tabler/icons-react";

const suspendProfile = async (profileId: number) => {
    await axios
        .post(
            "http://localhost:3000/profiles/suspend",
            {
                profileId: Number(profileId),
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

const unsuspendProfile = async (profileId: number) => {
    await axios
        .post(
            "http://localhost:3000/profiles/unsuspend",
            {
                profileId: Number(profileId),
            },
            {
                headers: authHeader(),
            }
        )
        .then(() => alert("Profiles unsuspended"))
        .catch((err) => alert(err));
};

export const SuspendProfileForm = (props: { data: any | undefined }) => {
    const [opened, { close, open }] = useDisclosure(false);
    const { profileId, suspended } = props.data;

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
                                    location.reload();
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
