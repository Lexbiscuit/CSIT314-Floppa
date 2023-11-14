import React, { useState, useEffect } from "react";
import {
    useQuery,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import authHeader from "../../services/auth-header";
import axios from "axios";
import CreateBidBtn from "../StaffBids/CreateBidBtn";
import TanstackTable from "../TanstackTable";

const Options = (props: { row: any }) => {
    const { row } = props;

    return (
        <div style={{ display: "flex" }}>
            <CreateBidBtn data={row} />
        </div>
    );
};

type Info = {
    getValue: () => string;
    row: any;
};

const columns = [
    {
        accessorKey: "bidId",
        header: "Bid ID",
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
        header: "description",
        cell: (info: Info) => info.getValue(),
        footer: (props: any) => props.column.id,
    },
    {
        accessorKey: "suspended",
        header: "Suspended",
        cell: (info: Info) => info.getValue(),
        footer: (props: any) => props.column.id,
    },
    {
        id: "edit",
        cell: (info: Info) => <Options row={info.row.original} />,
    },
];

function retrieveStaffBids() {
    return useQuery({
        queryKey: ["retrieveStaffBids"],
        queryFn: async () => {
            const { data } = await axios.get(
                "http://localhost:3000/staffbids/retrieve",
                {
                    headers: authHeader(),
                }
            );
            const transformData = data.map((staffbid: any) => {
                staffbid.bidId = staffbid.bidId.toString();
                return staffbid;
            });
            return transformData;
        },
    });
}

export default function StaffBidsTable() {
    const { isSuccess, data, isError, isLoading } = retrieveStaffBids();

    return (
        <>
            {isLoading && <div>Loading...</div>}
            {isError && <div>Error</div>}
            {isSuccess && <TanstackTable {...{ data, columns }} />}
        </>
    );
}