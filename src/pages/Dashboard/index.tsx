import { useState } from "react";
import { Stack, Title } from "@mantine/core";

import { AppShellLayout } from "@layouts/AppShell";

import { Charts } from "./components/Charts";
import { OverviewCards } from "./components/OverviewCards";
import { RecentActivityTable } from "./components/RecentActivityTable";


export const Dashboard = () => {
  const [date, setDate] = useState<Date | null>(new Date());
  return (
    <AppShellLayout>
      <Stack gap={"3rem"}>
        <OverviewCards date={date} setDate={setDate} />

        <Stack mt={"sm"}>
          <Title order={3} fw={600} fz={20} mb={"xs"} c={"dimmed"}>
            Yearly activity for {date?.getFullYear()}
          </Title>
          <Charts />
        </Stack>

        <RecentActivityTable />
      </Stack>
    </AppShellLayout>
  );
};
