"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import data from "@/data/mock-data.json";

// Import Swiper styles
import "swiper/css/pagination";
import "swiper/css";

import { ChevronLeft, ChevronRight, Pause } from "lucide-react";
import { useState } from "react";

const HeroCarousal = () => {
  const banners = data.banners;
  const [swiperInstance, setSwiperInstance] = useState<any>(null);

  return (
    <div className="relative">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        className="hero-carousel h-[300px] md:h-[400px]"
        onSwiper={setSwiperInstance}
      >
        {banners.map((banner, i) => (
          <SwiperSlide key={i} className="h-full">
            <div
              className="relative h-full bg-cover bg-center px-4 sm:px-8 before:absolute before:inset-0 before:bg-gradient-to-r before:from-black/60 before:to-transparent"
              style={{ backgroundImage: `url(${banner["banner-img"]})` }}
            >
              {/* Overlay */}
              <div
                className="absolute inset-0 bg-black/10 z-10 pointer-events-none"
                aria-hidden="true"
              />

              {/* Content */}
              <div className="relative z-20 grid grid-cols-12 h-full items-center">
                <div className="col-span-12 md:col-span-8">
                  <h1
                    className="text-white text-3xl md:text-4xl font-bold leading-snug sm:leading-tight"
                    style={
                      banner?.title?.color
                        ? { color: banner.title.color }
                        : undefined
                    }
                  >
                    {banner.title.text}
                  </h1>

                  <p
                    className="text-white/90 mt-2 sm:mt-3 text-xs sm:text-sm md:text-base max-w-md md:max-w-2xl"
                    style={
                      banner?.description?.color
                        ? { color: banner.description.color }
                        : undefined
                    }
                  >
                    {banner.description.text}
                  </p>

                  <div className="mt-3 sm:mt-5">
                    <button
                      className="rounded-md sm:rounded-lg py-2 px-4 sm:py-3 sm:px-6 text-xs sm:text-sm md:text-base text-white font-semibold shadow-md"
                      style={{
                        backgroundColor: banner?.button?.color ?? "#2563eb",
                      }}
                    >
                      {banner.button.text}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Buttons */}
      <div className="flex gap-x-2 absolute bottom-3 sm:bottom-5 right-3 sm:right-5 z-30">
        <button
          className="swiper-btn"
          onClick={() => swiperInstance?.slidePrev()}
        >
          <ChevronLeft />
        </button>
        <button
          className="swiper-btn"
          onClick={() => swiperInstance?.slideNext()}
        >
          <ChevronRight />
        </button>
        <div className="hidden md:block">
          <button
            className="swiper-btn"
            onClick={() => {
              if (swiperInstance?.autoplay?.running) {
                swiperInstance.autoplay.stop();
              } else {
                swiperInstance?.autoplay?.start();
              }
            }}
          >
            <Pause />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroCarousal;
