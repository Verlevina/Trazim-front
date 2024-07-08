import { ShareOutlined } from "@mui/icons-material";
import { Divider, IconButton, Menu, MenuItem } from "@mui/material";
import React from "react";
import {
  FacebookIcon,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
type LinkProps = {
  url: string;
};
const style = {
  size: 20,
  round: true,
};
export default function RSSUsage({ url }: LinkProps) {
  var path = `${window.location.protocol}//${window.location.host}/${url}`;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open: boolean = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{ ml: 2 }}
        aria-controls={open ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open}
      >
        <ShareOutlined />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          //  sx: menuStyle,
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          <FacebookShareButton url={path} hashtag="">
            <FacebookIcon {...style} />
          </FacebookShareButton>
          <Divider orientation="vertical" variant="middle" flexItem />
          <TelegramShareButton url={path}>
            <TelegramIcon {...style} />
          </TelegramShareButton>
          <Divider orientation="vertical" variant="middle" flexItem />
          <WhatsappShareButton url={path}>
            <WhatsappIcon {...style} />
          </WhatsappShareButton>
        </MenuItem>
      </Menu>
    </>
  );
}
