import React, { useEffect, useRef, useState } from 'react';
import CardAddItem from './CardAddItem';
import { Grid } from '@mui/material';
import { getPosts } from '../server/api';
import { Filter, Post } from '../server/types';
// import InfiniteScroll from 'react-infinite-scroll-component';

  const InfiniteScroll: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const page = useRef<number>(-1);
    const isLoading = useRef<Boolean>(false);
    const pageCount = 12;
    const sentinelRef = useRef<HTMLDivElement>(null);
    // const sentinelRefstart = useRef<HTMLDivElement>(null);

    const loadMorePosts = async () => {
      if(isLoading.current) return;
      isLoading.current = true;
      page.current = page.current + 1;
      const filter: Filter = {page: page.current, pageCount: pageCount};
      getPosts(filter)
        .then(res => {
          setPosts(prevPosts => [ ...prevPosts, ...( res?.posts ?? [])]);
        })
        .finally(()=>{
          isLoading.current = false;
        });
      // if(currentFilter.isStart) {
      //   setPosts(prevPosts => [ ...(newPosts ?? []), ...prevPosts.slice(40)]);
      // } else {
      //}
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      if(isLoading.current) return;
      if (entries[0].isIntersecting) {
        loadMorePosts();
      }
    };

    // const handleIntersectionStart = (entries: IntersectionObserverEntry[]) => {
    //   if(isLoading) return;
    //   if (entries[0].isIntersecting && currentFilter.page > 0) {
    //     setCurrentFilter({...currentFilter, page: currentFilter.page - 1, isStart: true});
    //   }
    // };
  
    useEffect(() => {
      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 1.0
      };
      const sentineRefCurrent = sentinelRef.current;
      //const sentinelRefstartCurrent = sentinelRefstart.current;
      const observer = new IntersectionObserver(handleIntersection, options);
      //const observerStart = new IntersectionObserver(handleIntersectionStart, options);

      if (sentineRefCurrent) {
        observer.observe(sentineRefCurrent);
      }
  
      // if (sentinelRefstartCurrent) {
      //   observerStart.observe(sentinelRefstartCurrent);
      // }
       return () => {
        if (sentineRefCurrent) {
          observer.unobserve(sentineRefCurrent);
        }
        // if (sentinelRefstartCurrent) {
        //   observerStart.unobserve(sentinelRefstartCurrent);
        // }
      };
    }, []);

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
  

  // const MainData: React.FC = () => {
  //   const [posts, setPosts] = useState<Post[]>([]);
  //   const [currentFilter, setCurrentFilter] = useState({page: 0, pageCount: 10, isStart: false});
  //   const [isLoading, setIsLoading] = useState(false);

  //   const loadMorePosts = async () => {
  //     if(isLoading) return;
  //     debugger;
  //     setIsLoading(true);
  //     const newFullPosts = await getPosts(currentFilter); 
  //     const newPosts = newFullPosts?.posts;
  //     if(currentFilter.isStart) {
  //       setPosts(prevPosts => [ ...(newPosts ?? []), ...prevPosts.slice(40)]);
  //     } else {
  //       setPosts(prevPosts => [ ...prevPosts.slice(-40), ...(newPosts ?? [])]);
  //     }
  //     setCurrentFilter({...currentFilter, page: currentFilter.page + 1, isStart: true});
  //     setIsLoading(false);
  //   };

  //   return (
  //     <div>
  //     <InfiniteScroll
  //       dataLength={currentFilter.pageCount}
  //       next={loadMorePosts}
  //       hasMore={true} // Replace with a condition based on your data source
  //       loader={<p>Loading...</p>}
  //       endMessage={<p>No more data to load.</p>}
  //     >
  //       <div>
  //         {posts.map(post => (
  //           <CardAddItem post={post}/>
  //         ))}
  //       </div>
  //     </InfiniteScroll>
  //   </div>
  //   );
  // };

  export default InfiniteScroll;
