"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const RESEARCH_DATA = [
  {
    image: "/data-privacy/thumbnail-1.png",
    name: "Justin Franci",
    designation: "Designation",
    avatar: "/data-privacy/avatar.png",
    description: "Optimizing AI Models with Quanto on H100 GPUs",
  },
  {
    image: "/data-privacy/thumbnail-2.png",
    name: "Justin Franci",
    designation: "Designation",
    avatar: "/data-privacy/avatar.png",
    description: "Optimizing AI Models with Quanto on H100 GPUs",
  },
  {
    image: "/data-privacy/thumbnail-3.png",
    name: "Justin Franci",
    designation: "Designation",
    avatar: "/data-privacy/avatar.png",
    description: "Optimizing AI Models with Quanto on H100 GPUs",
  },
  {
    image: "/data-privacy/thumbnail-1.png",
    name: "Justin Franci",
    designation: "Designation",
    avatar: "/data-privacy/avatar.png",
    description: "Optimizing AI Models with Quanto on H100 GPUs",
  },
  {
    image: "/data-privacy/thumbnail-2.png",
    name: "Justin Franci",
    designation: "Designation",
    avatar: "/data-privacy/avatar.png",
    description: "Optimizing AI Models with Quanto on H100 GPUs",
  },
  {
    image: "/data-privacy/thumbnail-3.png",
    name: "Justin Franci",
    designation: "Designation",
    avatar: "/data-privacy/avatar.png",
    description: "Optimizing AI Models with Quanto on H100 GPUs",
  },
];

// Double the research data array to create a seamless loop effect
const DUPLICATED_RESEARCH = [...RESEARCH_DATA, ...RESEARCH_DATA];

// Mobile Swiper for Research Insights
const MobileResearchSwiper = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative md:hidden">
      <Swiper
        modules={[Pagination]}
        spaceBetween={24}
        slidesPerView={1}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        pagination={{
          clickable: true,
          bulletClass: "custom-bullet-insights",
          bulletActiveClass: "custom-bullet-active",
          renderBullet: function (index, className) {
            return `<span class="${className}"></span>`;
          },
        }}
        className="swiper-insights"
      >
        {RESEARCH_DATA.map((research, index) => (
          <SwiperSlide key={index}>
            <div className="px-2 pb-10">
              <ResearchCard {...research} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom pagination styling */}
      <style jsx global>{`
        .custom-bullet-insights {
          display: inline-block;
          width: 15px;
          height: 8px;
          border-radius: 40%;
          background: #c1c0d8;
          margin: 0 4px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .custom-bullet-active {
          background: linear-gradient(to right, #f93c52, #2b21f3);
          width: 80px;
          border-radius: 4px;
        }

        .swiper-pagination {
          position: absolute;
          bottom: 0px !important;
          left: 0;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 100 !important;
          padding-top: 20px;
        }
      `}</style>
    </div>
  );
};

const ArrowIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3.42065 9.79517L13.9207 9.79517"
      stroke="#323150"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.6702 7.54565L13.9202 9.79565L11.6702 12.0457"
      stroke="#323150"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function InsightsOnResearch() {
  const scrollContainerRef = useRef<any>(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    let animationFrameId: any;
    let scrollPosition = 0;
    const scrollSpeed = 1; // Adjust speed as needed

    const scrollCarousel = () => {
      if (scrollContainer) {
        scrollPosition += scrollSpeed;

        // When we've scrolled the width of the original set of items, reset to start
        if (scrollPosition >= scrollContainer.scrollWidth / 2) {
          scrollPosition = 0;
        }

        scrollContainer.scrollLeft = scrollPosition;
      }
      animationFrameId = requestAnimationFrame(scrollCarousel);
    };

    // Start the animation
    animationFrameId = requestAnimationFrame(scrollCarousel);

    // Pause animation when user hovers
    const handleMouseEnter = () => {
      cancelAnimationFrame(animationFrameId);
    };

    const handleMouseLeave = () => {
      animationFrameId = requestAnimationFrame(scrollCarousel);
    };

    scrollContainer.addEventListener("mouseenter", handleMouseEnter);
    scrollContainer.addEventListener("mouseleave", handleMouseLeave);

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
      if (scrollContainer) {
        scrollContainer.removeEventListener("mouseenter", handleMouseEnter);
        scrollContainer.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <section className="bg-[#E0DEEC] py-20">
      <div className="container mx-auto w-3/4 px-4">
        <div className="mb-12 flex flex-col items-center text-center">
          <h2
            className="text-center !text-[2.35rem] -tracking-wide !text-[#323150] md:!text-[2.75rem]"
            style={{ fontWeight: 400, margin: 0 }}
          >
            Insights on{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(93deg, #F93C52 -56.34%, #2B21F3 130.6%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Data Privacy
            </span>{" "}
          </h2>
        </div>
      </div>

      {/* Mobile Swiper (visible only on small screens) */}
      <MobileResearchSwiper />

      {/* Desktop Carousel with Continuous Scrolling (hidden on small screens) */}
      <div className="relative !mt-3 hidden w-full md:block">
        {/* Left Gradient Fade */}
        <div className="absolute top-0 left-0 z-10 h-full w-24 bg-gradient-to-r from-[#E0DEEC]/70 to-transparent"></div>

        {/* Right Gradient Fade */}
        <div className="absolute top-0 right-0 z-10 h-full w-24 bg-gradient-to-l from-[#E0DEEC]/70 to-transparent"></div>

        {/* Scrolling Container */}
        <div
          ref={scrollContainerRef}
          className="scrollbar-hide flex overflow-x-auto"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <div className="flex gap-6 px-24">
            {DUPLICATED_RESEARCH.map((research, index) => (
              <div key={index} className="w-80 shrink-0">
                <ResearchCard {...research} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="mx-2 !mt-8 flex h-10 items-center justify-center gap-3.5">
        <Link
          href={"#contactEmailSection"}
          className="flex h-full w-full max-w-md items-center justify-center !rounded-[4px] border-[1.75px] border-[#A1A0C5] !bg-[#EFEFF5] text-sm !text-[#323050]"
          style={{
            fontFamily: "Inter",
            fontWeight: 400,
            lineHeight: "120%",
            letterSpacing: "-0.56px",
          }}
        >
          <button className="">See All</button>
        </Link>
      </div>
    </section>
  );
}

const ResearchCard = ({
  image,
  name,
  designation,
  avatar,
  description,
}: any) => (
  <div className="flex h-[25.5rem] max-w-fit flex-col overflow-hidden rounded-[1.75rem] bg-[#EFEFF5] p-1 transition-all hover:shadow-lg 2xl:h-fit">
    <div className="flex items-start justify-start gap-2 p-3 pb-1">
      <Image src={avatar} alt={name} width={60} height={185} className="" />
      <div className="flex flex-col gap-1">
        <h4
          className="!text-[1rem] leading-5"
          style={{
            fontFamily: "Inter",
            fontWeight: 375,
            wordSpacing: "-1px",
          }}
        >
          {name}
        </h4>
        <p
          className="!-mt-3 !text-[1rem] leading-5 !text-[#8281B1]"
          style={{
            fontFamily: "Inter",
            fontWeight: 375,
            wordSpacing: "-1px",
          }}
        >
          {designation}
        </p>
      </div>
    </div>
    <div className="relative aspect-video w-full">
      <Image
        src={image}
        alt={name}
        width={50}
        height={185}
        className="h-full w-full object-cover"
      />
    </div>
    <div className="flex items-center justify-between gap-1 !px-[0.925rem] !py-[1rem]">
      <div>
        <span
          className="!text-[1.125rem] font-semibold !text-[#323150]"
          style={{
            fontFamily: "Inter",
            fontWeight: 400,
            letterSpacing: "-0.96px",
          }}
        >
          {description}
        </span>
      </div>
      <div className="!mr-2 !mb-2 rounded-full !bg-[#E0DFEC] p-2.5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 18 18"
          fill="none"
        >
          <path
            d="M5.2876 5.2876L12.7122 12.7122"
            stroke="#323150"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12.7124 9.53027V12.7123H9.53042"
            stroke="#323150"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  </div>
);

// Add this to your CSS file or in a style tag in your document head
const scrollbarHideStyles = `
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
`;
