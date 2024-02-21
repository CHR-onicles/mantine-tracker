import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AppShell,
  Avatar,
  Burger,
  Group,
  Menu,
  rem,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure, useLocalStorage } from "@mantine/hooks";
import {
  IconChevronDown,
  IconLogout,
  IconPlayerPause,
  IconSettings,
  IconSwitchHorizontal,
  IconTrash,
} from "@tabler/icons-react";

import { Sidebar } from "@components/Sidebar";

import { COLOR_SCHEME_KEY } from "@constants/index";

import { sidebarLinks } from "@data/sidebarLinks";

import { StyledUnstyledButton } from "./Menu.styled";


interface AppShellLayoutProps {
  children: React.ReactNode;
}

const user = {
  name: "CHR-onicles",
  email: "chr-onicles@test.dev",
  image:
    "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png",
};

export function AppShellLayout({ children }: AppShellLayoutProps) {
  const [opened, { toggle }] = useDisclosure();
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const [colorScheme] = useLocalStorage<"light" | "dark">({
    key: COLOR_SCHEME_KEY,
  });
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [pageTitle, setPageTitle] = useState("");

  useEffect(() => {
    const firstLevelLink = pathname.split("/")[1];
    sidebarLinks.forEach(item => {
      if (firstLevelLink === item.link) setPageTitle(item.label);
    });
  }, [pathname]);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 270, breakpoint: "md", collapsed: { mobile: !opened } }}
      layout="alt"
      padding="md">
      <AppShell.Header>
        <Group h="100%" px="md" w="100%" gap="sm">
          <Burger
            opened={opened}
            onClick={toggle}
            hiddenFrom="md"
            size="sm"
            maw={30}
          />
          <Group
            justify="space-between"
            w={{ base: `calc(100% - 30px - 1rem)`, md: "100%" }}>
            <Title order={2} fz={22} fw={600}>
              {pageTitle}
            </Title>

            <Menu
              width={260}
              position="bottom-end"
              transitionProps={{ transition: "pop-top-right" }}
              onClose={() => setUserMenuOpened(false)}
              onOpen={() => setUserMenuOpened(true)}
              withinPortal>
              <Menu.Target>
                <StyledUnstyledButton
                  theme={theme}
                  $colorScheme={colorScheme}
                  as="button"
                  className={`user ${userMenuOpened ? "userActive" : ""}`}>
                  <Group gap={7}>
                    <Avatar
                      src={user.image}
                      alt={user.name}
                      radius="xl"
                      size={25}
                    />
                    <Text fw={500} size="sm" lh={1} mr={3} className="name">
                      {user.name}
                    </Text>
                    <IconChevronDown
                      style={{ width: rem(12), height: rem(12) }}
                      stroke={1.5}
                    />
                  </Group>
                </StyledUnstyledButton>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Label>Settings</Menu.Label>
                <Menu.Item
                  leftSection={
                    <IconSettings
                      style={{ width: rem(16), height: rem(16) }}
                      stroke={1.5}
                    />
                  }>
                  Account settings
                </Menu.Item>
                <Menu.Item
                  leftSection={
                    <IconSwitchHorizontal
                      style={{ width: rem(16), height: rem(16) }}
                      stroke={1.5}
                    />
                  }>
                  Change account
                </Menu.Item>
                <Menu.Item
                  onClick={() => navigate("/")}
                  leftSection={
                    <IconLogout
                      style={{ width: rem(16), height: rem(16) }}
                      stroke={1.5}
                    />
                  }>
                  Logout
                </Menu.Item>

                <Menu.Divider />

                <Menu.Label>Danger zone</Menu.Label>
                <Menu.Item
                  leftSection={
                    <IconPlayerPause
                      style={{ width: rem(16), height: rem(16) }}
                      stroke={1.5}
                    />
                  }>
                  Pause subscription
                </Menu.Item>
                <Menu.Item
                  color="red"
                  leftSection={
                    <IconTrash
                      style={{ width: rem(16), height: rem(16) }}
                      stroke={1.5}
                    />
                  }>
                  Delete account
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Group gap={7}>
          <Burger
            opened={opened}
            onClick={toggle}
            hiddenFrom="sm"
            size="sm"></Burger>
          <Text hiddenFrom="sm">Close</Text>
        </Group>
        {/* Navbar
        {Array(15)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} h={28} mt="sm" animate={false} />
          ))} */}
        <Sidebar colorScheme={colorScheme} />
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
