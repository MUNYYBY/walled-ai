"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import SectionTitle from "../common/SectionTitile";
import Link from "next/link";

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
      "MEASURING AND ENHANCING TRUSTWORTHINESS OF LLMS IN RAG THROUGH GROUNDED...",
  },
  {
    image: "/home_page/research_2.svg",
    title: "Ferret",
    description:
      "Faster and Effective Automated Red Teaming with Reward-Based Scoring Technique",
  },
  {
    image: "/home_page/research_1.svg",
    title: "Model",
    description:
      "Framework for explaining model decisions while maintaining performance.",
  },
  {
    image: "/home_page/research_2.svg",
    title: "Guardrails",
    description:
      "Architecture patterns for safe production deployment of generative AI.",
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

export default function ProprietaryResearch() {
  return (
    <section className="bg-[#EEEEF4] py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto w-3/4 px-4">
        <div className="mb-12 flex flex-col items-center text-center">
          <h2
            className="!text-[2.75rem] -tracking-wide !text-[#323150]"
            style={{ fontWeight: 400, margin: 0 }}
          >
            Powered by Years of Proprietary
            <span
              className="!ml-2 bg-clip-text text-transparent"
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
            and associated metrics like <br /> safety, security, and
            reliability.
          </p>
          <p
            className="max-w-6xl !text-[1.5rem]"
            style={{
              fontWeight: 400,
              fontFamily: "Anek Devanagari",
              lineHeight: "120%",
            }}
          >
            Count upon guardrails driven by systematic academic research to{" "}
            <br />
            streamline and secure AI systems.
          </p>
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

const ResearchCard = ({ image, title, description }: ResearchItem) => (
  <div className="flex h-96 max-w-fit flex-col overflow-hidden rounded-[1.75rem] bg-[#E0DEEC] p-1 transition-all hover:shadow-lg">
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
  <div className="mt-4 flex h-10 items-center justify-center gap-3.5">
    <button
      className="prev z-10 flex h-full rotate-180 items-center justify-center !rounded-sm border-[1.75px] border-[#A1A0C5] p-2.5 transition-all hover:bg-gray-100"
      aria-label="Previous slide"
    >
      <ArrowIcon />
    </button>
    <Link
      href={"/coming-soon"}
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
    <button
      className="next z-10 flex h-full items-center justify-center !rounded-sm border-[1.75px] border-[#A1A0C5] p-2.5 transition-all hover:bg-gray-100"
      aria-label="Next slide"
    >
      <ArrowIcon />
    </button>
  </div>
);
