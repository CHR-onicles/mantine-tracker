import { useState } from "react";
import { Link } from "react-router-dom";

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
      <div className="navbarMain">{links}</div>
    </StyledSidebar>
  );
};
