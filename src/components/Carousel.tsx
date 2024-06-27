import React from "react";
import { globalUrl } from "../server/userAPI";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

type pictureProps = {
  pictures: string[];
};

const PostCarousel = ({ pictures }: pictureProps) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  return (
    <div style={{ width: "90%", margin: "auto" }}>
      <Carousel
        swipeable={false}
        draggable={false}
        showDots={true}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={false}
        autoPlay={false}
        centerMode={true}
        autoPlaySpeed={1000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        deviceType={"desctop"}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {pictures.map((pic) => (
          <img height={400} alt="" src={`${globalUrl}\\${pic}`}></img>
        ))}
      </Carousel>
    </div>
  );
};

export default PostCarousel;
