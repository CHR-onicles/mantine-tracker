import { useState } from "react";
import { Link } from "react-router-dom";
import { Anchor,Center, Code, Group, Text, Title } from "@mantine/core";

import { sidebarLinks } from "@data/sidebarLinks";

import { StyledSidebar } from "./Sidebar.styled";


export const Sidebar = ({ colorScheme }: { colorScheme: "light" | "dark" }) => {
  const [active, setActive] = useState("Dashboard");

  const links = sidebarLinks.map(item => (
    <Link
      className={"link"}
      data-active={item.label === active || undefined}
      to={`${item.link}`}
      key={item.label}
      onClick={() => {
        setActive(item.label);
      }}>
      <item.icon className={"linkIcon"} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <StyledSidebar $colorScheme={colorScheme}>
      <div className="navbarMain">
        <Group
          className={"header"}
          justify="space-between"
          mt={{ base: "1rem", md: "0" }}>
          <Title order={1} fz={22} c={"blue"}>
            RandoTracker
          </Title>{" "}
          <Code fw={700}>v0.0.1</Code>
        </Group>
        {links}
      </div>

      <div className={"footer"}>
        <Center>
          <Text fz={"sm"} c="dimmed">
            Made with 💖 by{" "}
            <Anchor
              fz={"sm"}
              fw={600}
              href="https://github.com/CHR-onicles"
              target="_blank">
              CHR-onicles
            </Anchor>
          </Text>
        </Center>
      </div>
    </StyledSidebar>
  );
};
