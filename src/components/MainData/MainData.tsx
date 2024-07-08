import React, { useEffect, useState } from "react";
import { getPosts } from "../../server/userAPI";
import { Post } from "../../server/types";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import SideFilterPanel from "./SideFilterPanel";
import PostsDrawer from "./PostsDrawer";

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
export default MainData;
