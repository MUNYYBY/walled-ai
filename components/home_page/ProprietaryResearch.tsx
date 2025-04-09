"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
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

// Double the research data array to create a seamless loop effect
const DUPLICATED_RESEARCH = [...RESEARCH_DATA, ...RESEARCH_DATA];

export default function ProprietaryResearch() {
  const scrollContainerRef = useRef<any>(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
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
    <section className="bg-[#EEEEF4] py-20">
      <div className="container mx-auto w-3/4 px-4">
        <div className="mb-12 flex flex-col items-center text-center">
          <h2
            className="text-center !text-[2.75rem] -tracking-wide !text-[#323150]"
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

      {/* Carousel Container with Edge Gradients */}
      <div className="relative mt-3 w-full">
        {/* Left Gradient Fade */}
        {/* <div className="absolute top-0 left-0 z-10 h-full w-24 bg-gradient-to-r from-[#EEEEF4]/50 to-transparent"></div> */}

        {/* Right Gradient Fade */}
        {/* <div className="absolute top-0 right-0 z-10 h-full w-24 bg-gradient-to-l from-[#EEEEF4]/50 to-transparent"></div> */}

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

      <div className="mx-2 !mt-8 flex h-10 items-center justify-center gap-3.5">
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
    </section>
  );
}

const ResearchCard = ({ image, title, description }: ResearchItem) => (
  <div className="flex h-96 max-w-fit flex-col overflow-hidden rounded-[1.75rem] bg-[#E0DEEC] p-1 transition-all 2xl:h-fit">
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

// Add this to your CSS file or in a style tag in your document head
const scrollbarHideStyles = `
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
`;
