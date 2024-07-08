import React, { useEffect, useState } from "react";
import CardPostItem from "./CardPostItem";
import { styled, useTheme } from "@mui/material/styles";

import {
  AppBar,
  Divider,
  Drawer,
  Grid,
  IconButton,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
} from "@mui/material";
import { getPosts } from "../server/userAPI";
import { Post } from "../server/types";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Loader from "./Loader";
import { Menu, ChevronLeft } from "@mui/icons-material";
const MainData: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const filter = useSelector((state: RootState) => state.filter);
  useEffect(() => {
    loadMorePosts();
  }, [filter]);
  const loadMorePosts = async () => {
    setIsLoading(true);
    getPosts(filter)
      .then((res) => {
        setPosts(res?.posts ?? []);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <SideFilterPanel>
        <PostsDrawer posts={posts} isLoading={isLoading} />
      </SideFilterPanel>
    </>
  );
};
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
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
    marginLeft: `${150}px`,
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
        <Menu />
      </IconButton>
      <Drawer
        sx={{
          width: 150,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 150,
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
        <List>
          <ListItem disablePadding>
            <ListItemButton>button</ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton>button2</ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Main open={isOpen}>{children}</Main>
    </>
  );
};

interface PostDrawerProps {
  isLoading: boolean;
  posts: Post[];
}
const PostsDrawer = ({ posts, isLoading }: PostDrawerProps) => {
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <Grid
          container
          spacing={{ xs: 1, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {posts.length > 0 ? (
            <>
              {posts.map((post, index) => (
                <Grid item xs={4} sm={4} md={4} key={index}>
                  <CardPostItem post={post} />
                </Grid>
              ))}
            </>
          ) : (
            <Grid item xs={12}>
              List is empty yet!
            </Grid>
          )}
        </Grid>
      )}
    </div>
  );
};
export default MainData;
