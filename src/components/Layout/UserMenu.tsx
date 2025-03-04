import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import SignIn from "../../pages/SignIn";
import { Link, useNavigate } from "react-router-dom";
import { logoutReducer } from "../../store/user/user";
import { deleteAuthHeader, globalUrl } from "../../server/userAPI";
import { useDispatch } from "react-redux";
import {
  TranslationFC,
  TranslationKeys,
} from "../../Translation/TranslationComponent";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { CurrentLanguageContext } from "../../App";
import { AddPostButton } from "../AddPost/AddPost";
import SignUpModal from "../SignUpModal";
import { emptyFilter } from "../../utils/utils";
import { Filter } from "../../server/types";
import { setFilter } from "../../store/filter/filter";
import { Button } from "@mui/material";
import { UserRoundedAvatar } from "../Common/UserAvatar";

const menuStyle = {
  overflow: "visible",
  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
  mt: 1.5,
  "& .MuiAvatar-root": {
    width: 32,
    height: 32,
    ml: -0.5,
    mr: 1,
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    top: 0,
    right: 14,
    width: 10,
    height: 10,
    bgcolor: "background.paper",
    transform: "translateY(-50%) rotate(45deg)",
    zIndex: 0,
  },
};
export default function AccountMenu() {
  //redux
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  //context for translation
  const translationContext: TranslationFC = React.useContext(
    CurrentLanguageContext
  );
  //local state
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open: boolean = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    deleteAuthHeader();
    dispatch(logoutReducer());
    //clear
    localStorage.clear();
    handleClose();
  };
  var src = user?.pictureUrl != null ? `${globalUrl}\\${user.pictureUrl}` : "";
  return user.isSignedIn ? (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <React.Fragment>
          <Button
            onClick={() => {
              const newFilter = { ...emptyFilter, userId: user.id } as Filter;
              dispatch(setFilter(newFilter));
              let str = Object.entries(newFilter)
                .map(([key, val]) => `${key}=${val}`)
                .join("&");
              navigate(`/list?${str}`);
            }}
          >
            <Typography sx={{ minWidth: 100 }}>
              {translationContext(TranslationKeys.MyPosts)}
            </Typography>
          </Button>
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open}
            >
              <UserRoundedAvatar
                login={user?.login}
                name={user?.name}
                surname={user?.surname}
                url={src}
                width={36}
                height={36}
              />
            </IconButton>
          </Tooltip>
        </React.Fragment>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: menuStyle,
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar />{" "}
          <Link to={`/profile`}>
            {translationContext(TranslationKeys.Profile)}
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Avatar>
            <PostAddIcon />
          </Avatar>{" "}
          <AddPostButton />
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <SignIn />
      <SignUpModal />
    </React.Fragment>
  );
}
