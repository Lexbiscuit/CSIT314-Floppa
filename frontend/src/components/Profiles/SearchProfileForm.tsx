import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import authHeader from "../../services/auth-header";
import UpdateProfileForm from "./UpdateProfileForm";
import axios from "axios";
import { SuspendProfileForm } from "./SuspendProfileForm";
import TanstackTable from "../TanstackTable";
import { TextInput, Button, Box, Container, Select } from "@mantine/core";
import { useForm } from "@mantine/form";

const Options = (props: { row: any }) => {
    const { row } = props;

    return (
        <div style={{ display: "flex" }}>
            <UpdateProfileForm data={row} />
            <SuspendProfileForm data={row} />
        </div>
    );
};

type Info = {
    getValue: () => string;
    row: any;
};

const columns = [
    {
        accessorKey: "profileId",
        header: "Profile ID",
        cell: (info: Info) => info.getValue(),
        footer: (props: any) => props.column.id,
    },
    {
        accessorKey: "name",
        header: "Name",
        cell: (info: Info) => info.getValue(),
        footer: (props: any) => props.column.id,
    },
    {
        accessorKey: "description",
        header: "Description",
        cell: (info: Info) => info.getValue(),
        footer: (props: any) => props.column.id,
    },
    {
        accessorKey: "suspended",
        header: "Suspended",
        cell: (info: Info) => (Number(info.getValue()) == 1 ? "Yes" : "No"),
        footer: (props: any) => props.column.id,
    },
    {
        id: "edit",
        cell: (info: Info) => <Options row={info.row.original} />,
    },
];

function searchProfiles(profileFilter: any) {
    return useQuery({
        queryKey: ["searchProfiles", profileFilter],
        queryFn: async () => {
            const { data } = await axios.post(
                "http://localhost:3000/profiles/search",
                profileFilter,
                {
                    headers: authHeader(),
                }
            );

            if (data.length > 0) {
                const transformData = data.map((profile: any) => {
                    profile.profileId = profile.profileId.toString();
                    profile.suspended = profile.suspended == 0 ? "No" : "Yes";
                    return profile;
                });
                return transformData;
            } else {
                return data;
            }
        },
        enabled: false,
    });
}

export default function SearchProfileForm() {
    const [profileFilter, setProfileFilter] = useState<any>({});

    const form = useForm({
        initialValues: {
            name: "",
            description: "",
        },

        transformValues: (values) => ({
            name: values.name == "" ? undefined : values.name,
            description: values.description == "" ? undefined : values.description,
        }),
    });

    const { isSuccess, data, isError, isLoading, refetch } =
        searchProfiles(profileFilter);

    return (
        <>
            <Container mb="2rem">
                <Box
                    component="form"
                    onSubmit={form.onSubmit((values) => {
                        setProfileFilter(values);
                        refetch();
                    })}
                >
                    <TextInput
                        label="Name"
                        placeholder="Angsty Floppa"
                        size="md"
                        {...form.getInputProps("name")}
                        my="1rem"
                    />

                    <TextInput
                        label="Description"
                        placeholder=""
                        size="md"
                        {...form.getInputProps("description")}
                        my="1rem"
                    />

                    <Button type="submit" my="1rem" w="100%">
                        Search Profile
                    </Button>
                </Box>
            </Container>
            {isLoading && <div>Loading...</div>}
            {isError && <div>Something went wrong ...</div>}
            {isSuccess && <TanstackTable {...{ data, columns }} />}
        </>
    );
}
