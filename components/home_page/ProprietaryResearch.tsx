"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface ResearchItem {
  image: string;
  title: string;
  description: string;
}

const RESEARCH_DATA: ResearchItem[] = [
  {
    image: "/home_page/research_2.svg",
    title: "WalledEval",
    description:
      "WalledEval: A Comprehensive Safety Evaluation Toolkit for Large Language Models",
  },
  {
    image: "/home_page/research_1.svg",
    title: "RAG",
    description:
      "Measuring and Enhancing Trustworthiness of LLMs in RAG through Grounded...",
  },
  {
    image: "/home_page/research_3.svg",
    title: "Ferret",
    description:
      "Faster and Effective Automated Red Teaming with Reward-Based Scoring Technique",
  },
  {
    image: "/home_page/research_4.svg",
    title: "RED-EVAL",
    description:
      "Red-Teaming Large Language Models using Chain of Utterances for Safety-Alignment",
  },
];

const SWIPER_BREAKPOINTS = {
  640: { slidesPerView: 2 },
  1024: { slidesPerView: 3 },
  1920: { slidesPerView: 4 },
  2048: { slidesPerView: 5 },
  3500: { slidesPerView: 6 },
};

// Mobile Swiper for Research Data
const MobileResearchSwiper = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative w-full md:hidden">
      <Swiper
        modules={[Pagination]}
        spaceBetween={24}
        slidesPerView={1}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        pagination={{
          clickable: true,
          bulletClass: "custom-bullet-research",
          bulletActiveClass: "custom-bullet-active",
          renderBullet: function (index, className) {
            return `<span class="${className}"></span>`;
          },
        }}
        className="swiper-research"
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
        .custom-bullet-research {
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

export default function ProprietaryResearch() {
  return (
    <section className="bg-[#EEEEF4] py-20">
      <div className="container mx-auto w-3/4 px-4">
        <div className="mb-12 flex flex-col items-center text-center">
          <h2
            className="text-center !text-[2.35rem] -tracking-wide !text-[#323150] md:!text-[2.75rem]"
            style={{ fontWeight: 400, margin: 0 }}
          >
            Powered by Years of Proprietary{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(93deg, #F93C52 -56.34%, #2B21F3 130.6%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Research
            </span>{" "}
          </h2>
          <p
            style={{
              color: "#323150",
              textAlign: "center",
              fontFamily: "Inter",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "120%" /* 21.6px */,
              letterSpacing: "-0.72px",
            }}
            className="!text-[1.125rem]"
          >
            WalledAI is grounded in years of proprietary research on AI systems
            and associated metrics like safety, security, and reliability. Count
            upon guardrails driven by systematic academic research to streamline
            and secure AI systems.
          </p>
        </div>
      </div>

      {/* Desktop Swiper with Navigation (visible only on md and larger screens) */}
      <div className="relative mx-auto hidden md:block">
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
      </div>

      <NavigationControls />

      {/* Mobile Swiper (visible only on small screens) */}
      <MobileResearchSwiper />
    </section>
  );
}

const ResearchCard = ({ image, title, description }: ResearchItem) => (
  <div className="flex h-96 max-w-fit flex-col overflow-hidden rounded-[1.75rem] bg-[#E0DEEC] p-1 transition-all hover:shadow-lg 2xl:h-fit">
    <div className="relative aspect-video w-full">
      <Image
        src={image}
        alt={title}
        width={350}
        height={185}
        className="h-full w-full object-cover"
      />
    </div>
    <div className="flex flex-1 items-end gap-1 !px-[0.925rem] !py-[1rem]">
      <div>
        <span
          className="!text-2xl font-semibold !text-[#323150]"
          style={{
            fontFamily: "Inter",
            fontWeight: 600,
            letterSpacing: "-0.96px",
          }}
        >
          {title}
        </span>
        <p
          className="!mt-2.5"
          style={{
            color: "#323150",
            fontFamily: "Inter",
            fontWeight: 400,
            lineHeight: "120%" /* 21.6px */,
            letterSpacing: "-0.72px",
          }}
        >
          {description}
        </p>
      </div>
      <div className="!mr-2 !mb-2 rounded-full !bg-[#EFEFF5] p-2.5">
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

const NavigationControls = () => (
  <div className="mx-2 mb-4 flex h-10 items-center justify-center gap-3.5 md:mt-4 md:mb-0">
    <Link
      href={"#contactEmailSection"}
      className="flex h-full w-full max-w-md items-center justify-center !rounded-[4px] border-[1.75px] border-[#A1A0C5] text-sm !text-[#323050] hover:bg-gray-100"
      style={{
        fontFamily: "Inter",
        fontWeight: 400,
        lineHeight: "120%",
        letterSpacing: "-0.56px",
      }}
    >
      <button className="">
        Meet our research team <span className="!text-[12px]">{"🡢"}</span>
      </button>
    </Link>
  </div>
);
