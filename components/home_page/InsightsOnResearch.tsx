"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import SectionTitle from "../common/SectionTitile";
import Link from "next/link";

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

const SWIPER_BREAKPOINTS = {
  640: { slidesPerView: 2 },
  1024: { slidesPerView: 3 },
  1920: { slidesPerView: 4 },
  2048: { slidesPerView: 5 },
  3500: { slidesPerView: 6 },
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
  return (
    <section className="bg-[#E0DEEC] py-20">
      <div className="container mx-auto w-3/4 px-4">
        <div className="mb-12 flex flex-col items-center text-center">
          <h2
            className="text-center !text-[2.75rem] -tracking-wide !text-[#323150]"
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
      <div className="relative mx-auto">
        <Swiper
          modules={[Navigation]}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={SWIPER_BREAKPOINTS}
          navigation={{
            nextEl: ".next",
            prevEl: ".prev",
          }}
          loop
          className="px-2 py-4"
        >
          {RESEARCH_DATA.map((research, index) => (
            <SwiperSlide key={index}>
              <ResearchCard {...research} />
            </SwiperSlide>
          ))}
        </Swiper>

        <NavigationControls />
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
  <div className="flex h-[25.5rem] max-w-fit flex-col overflow-hidden rounded-[1.75rem] bg-[#EFEFF5] p-1 transition-all 2xl:h-fit">
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
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12.7124 9.53027V12.7123H9.53042"
            stroke="#323150"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>
  </div>
);

const NavigationControls = () => (
  <div className="mx-2 mt-4 flex h-10 items-center justify-center gap-3.5">
    <button
      className="prev 0 z-10 flex h-full rotate-180 items-center justify-center !rounded-sm border-[1.75px] border-[#A1A0C5] !bg-[#EFEFF5] p-2.5 transition-all"
      aria-label="Previous slide"
    >
      <ArrowIcon />
    </button>
    <Link
      href={"#contactEmailSection"}
      className="flex h-full items-center justify-center !rounded-[4px] border-[1.75px] border-[#A1A0C5] !bg-[#EFEFF5] px-12 text-sm !text-[#323050]"
      style={{
        fontFamily: "Inter",
        fontWeight: 400,
        lineHeight: "120%",
        letterSpacing: "-0.56px",
      }}
    >
      <button className="">See All</button>
    </Link>
    <button
      className="next z-10 flex h-full items-center justify-center !rounded-sm border-[1.75px] border-[#A1A0C5] !bg-[#EFEFF5] p-2.5 transition-all"
      aria-label="Next slide"
    >
      <ArrowIcon />
    </button>
  </div>
);
