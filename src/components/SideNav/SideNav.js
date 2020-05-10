import React from "react";
import { Avatar, Box, Nav, Sidebar } from "grommet";
import { Spotify, Chat, Group, SettingsOption, Logout } from "grommet-icons";
import { Link } from "react-router-dom";

const MainNavigation = () => (
  <Nav gap="small">
    <Link to="/room/songs">
      <Spotify />
    </Link>
    <Link to="/room/chat">
      <Chat />
    </Link>
    <Link to="/room/members">
      <Group />
    </Link>
    <Box
      pad="small"
      border={{ color: "white", side: "bottom" }}
      hoverIndicator
    />
    <Box gap="small" pad={{ vertical: "medium" }} hoverIndicator>
      <Link to="/room/settings">
        <SettingsOption />
      </Link>
      <Link to="/room/logout">
        <Logout />
      </Link>
    </Box>
  </Nav>
);

const SidebarHeader = () => (
  <Avatar border={{ size: "small", color: "accent-2" }} background="white">
    SY
  </Avatar>
);
export default function SideNav() {
  return (
    <div>
      <Box direction="row" height={{ min: "100%" }}>
        <Sidebar background="#28302a" header={<SidebarHeader />}>
          <MainNavigation />
        </Sidebar>
      </Box>
    </div>
  );
}
