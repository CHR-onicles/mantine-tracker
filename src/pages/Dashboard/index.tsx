import { Stack, Title } from "@mantine/core";

import { AppShellLayout } from "@layouts/AppShell";

import { Charts } from "./components/Charts";
import { OverviewCards } from "./components/OverviewCards";
import { RecentActivityTable } from "./components/RecentActivityTable";


export const Dashboard = () => {
  return (
    <AppShellLayout>
      <Stack gap={"3rem"}>
        <Stack mt={"sm"}>
          <Title order={3} fw={600} fz={20} mb={"xs"} c={"dimmed"}>
            Overview
          </Title>
          <OverviewCards />
        </Stack>

        <Stack mt={"sm"}>
          <Title order={3} fw={600} fz={20} mb={"xs"} c={"dimmed"}>
            Monthly activity
          </Title>
          <Charts />
        </Stack>

        <RecentActivityTable />
      </Stack>
    </AppShellLayout>
  );
};
