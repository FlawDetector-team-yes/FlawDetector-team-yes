"use client";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "@/css/swiperStyles.css";

// import required modules
import { Mousewheel, Pagination } from "swiper/modules";
import HeadArticle from "./HeadArticle";
import SecondArticle from "./SecondArticle";
import ThirdArticle from "./ThirdArticle";
import CardArticle from "./CardArticle";
import ServiceArticle from "./ServiceArticle";

function LandingPage() {
  return (
    <>
      <Swiper
        mousewheel={true}
        direction={"vertical"}
        pagination={{
          clickable: true,
        }}
        modules={[Mousewheel, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide className="flex">
          <HeadArticle />
        </SwiperSlide>
        <SwiperSlide>
          <SecondArticle />
        </SwiperSlide>
        <SwiperSlide>
          <ThirdArticle />
        </SwiperSlide>
        <SwiperSlide>
          <CardArticle />
        </SwiperSlide>
        <SwiperSlide>
          <ServiceArticle />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
export default LandingPage;
