import React, { useEffect, useRef, useState } from 'react';
import CardAddItem from './CardAddItem';
import { Grid } from '@mui/material';
import { getPosts } from '../server/api';
import { Filter, Post } from '../server/types';
import { useLocation } from 'react-router-dom';

  const InfiniteScroll: React.FC = (props) => {
    const location = useLocation();
    const urlSearchParams = new URLSearchParams(window.location.search);
    useEffect(
      () => {
        loadMorePosts();
      }, [window.location.search]
    );
    const params = Object.fromEntries(urlSearchParams.entries());
    const [posts, setPosts] = useState<Post[]>([]);
    const page = useRef<number>(0);
    const isLoading = useRef<Boolean>(false);
    const pageCount = 12;
    const sentinelRef = useRef<HTMLDivElement>(null);
    // const sentinelRefstart = useRef<HTMLDivElement>(null);

    const loadMorePosts = async () => {
      if(isLoading.current) return;
      isLoading.current = true;
      page.current = page.current + 1;
      const filter: Filter = {
        id: params?.id ?? null,
        title: params?.title ?? null,
        originalLanguageId: params?.originalLanguageId ?? null,
        pictureExisting: params?.pictureExisting ?? null,
        locationId: params?.locationId ?? null,
        isArchived: params?.isArchived ?? null,
        userId: +params?.userID ?? null,

        // Ordering
        orderBy: "title",
        orderDescending: true,
        // Paging
        pageNumber: page.current,
        pageCount: pageCount
      } as unknown as Filter;
      getPosts(filter)
        .then(res => {
          setPosts(prevPosts => [ ...prevPosts, ...( res?.posts ?? [])]);
        })
        .finally(()=>{
          isLoading.current = false;
        });
    };

    return (
      <div>
       {/* {isLoading && currentFilter.isStart && <div>Loading...</div>} */}
       {/* <div ref={sentinelRefstart} style={{ height: '10px', margin: 10}}>observer start</div> */}
        <Grid container spacing={{ xs: 1, md: 3 }} columns={{xs: 4, sm: 8, md: 12 }}>
          {posts.map((post, index)=> (
            <Grid item  xs={4} sm={4} md={4} key={index}>
              <CardAddItem post={post}/>
            </Grid>
          ))}
        </Grid>
        <div ref={sentinelRef} style={{ height: '10px'}}>observer</div>
      </div>
    );
  };

  export default InfiniteScroll;
