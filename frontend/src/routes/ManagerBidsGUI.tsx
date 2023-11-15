import React, { useState, useEffect } from "react";
import Appshell from "../components/Appshell";
import { Box, Button, Modal, Select, Tabs, TextInput } from "@mantine/core";
import { Container } from "@mantine/core";
import AuthService from "../services/auth.service";
import BidsTable from "../components/Bids/BidsTable";
import TanstackTableSub from "../components/ReactTable";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IconEdit } from "@tabler/icons-react";
import { isEmail, isNotEmpty, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { AvailWorkslotTable } from "../components/Bids/AvailWorkslotTable";
import { AvailStaffTable } from "../components/Bids/AvailStaffTable";
import StaffSlotTable from "../components/Bids/StaffSlotTable";
import SearchBidForm from "../components/Bids/SearchBidsForm";

export default function ManageProfileGUI() {
  if (AuthService.getCurrentUser()) {
    return (
      <Appshell>
        <Container size="xl" my="1rem">
          <Tabs defaultValue="viewbids" keepMounted={false}>
            <Tabs.List>
              <Tabs.Tab value="viewbids">View Bids</Tabs.Tab>
              <Tabs.Tab value="availws">View Available Workslots</Tabs.Tab>
              <Tabs.Tab value="availstaff">View Available Staff</Tabs.Tab>
              <Tabs.Tab value="staffslots">View Staff Slots</Tabs.Tab>
              <Tabs.Tab value="searchbids">Search Bids</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="viewbids">
              {/* View bids in each workslots
              update bids
              approve bids */}

              <h1>View Bids</h1>
              <BidsTable />
            </Tabs.Panel>

            <Tabs.Panel value="availws">
              <h1>View Available Workslots</h1>
              <AvailWorkslotTable />
            </Tabs.Panel>

            <Tabs.Panel value="availstaff">
              <h1>View Available Staff</h1>
              <AvailStaffTable />
            </Tabs.Panel>

            <Tabs.Panel value="staffslots">
              <h1>View Cafe Staff with allocated slots</h1>
              <StaffSlotTable />
            </Tabs.Panel>

            <Tabs.Panel value="searchbids">
              <h1>Search Cafe Staff bids</h1>
              <SearchBidForm />
            </Tabs.Panel>
          </Tabs>
        </Container>
      </Appshell>
    );
  }
}
