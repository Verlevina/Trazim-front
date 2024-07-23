import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Divider, Drawer, IconButton } from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import FilterComponent from "./FilterComponent";
import { HeaderHeight, LeftPannelWidth } from "../../constants/common";
const panelWidth = LeftPannelWidth;
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: 0,
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: 0,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: `${panelWidth}px`,
    top: HeaderHeight,
  }),
}));

interface SidePanelDrawerProps {
  children: string | JSX.Element | JSX.Element[];
}

const SideFilterPanel = ({ children }: SidePanelDrawerProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };
  const openDrawer = () => {
    setIsOpen(true);
  };
  const closeDrawer = () => {
    setIsOpen(false);
  };

  return (
    <>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={openDrawer}
        edge="start"
        sx={{
          mr: 2,
          position: "fixed",
          top: 10,
          left: 10,
          ...(isOpen && { display: "none" }),
        }}
      >
        <FilterAltOutlinedIcon />
      </IconButton>
      <Drawer
        sx={{
          width: panelWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: panelWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={isOpen}
      >
        <div>
          <IconButton onClick={closeDrawer}>
            <ChevronLeft />
          </IconButton>
        </div>
        <Divider />
        <FilterComponent />
      </Drawer>
      <Main open={isOpen}>{children}</Main>
    </>
  );
};

export default SideFilterPanel;
