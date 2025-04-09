"use client";

import Image from "next/image";
import React, { useEffect, useRef } from "react";

const COMPANIES = [
  {
    desc: "Forem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus.",
    image: "/companies/logo-1.svg",
  },
  {
    desc: "Forem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus.",
    image: "/companies/logo-2.svg",
  },
  {
    desc: "Forem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus.",
    image: "/companies/logo-3.svg",
  },
  {
    desc: "Forem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus.",
    image: "/companies/logo-1.svg",
  },
  {
    desc: "Forem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus.",
    image: "/companies/logo-2.svg",
  },
  {
    desc: "Forem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus.",
    image: "/companies/logo-3.svg",
  },
];

// Double the companies array to create a seamless loop effect
const DUPLICATED_COMPANIES = [...COMPANIES, ...COMPANIES];

export default function CompanyTestimonials() {
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
    <section
      className="relative flex flex-col items-center gap-10 overflow-hidden !bg-cover !bg-center !bg-no-repeat py-20"
      style={{
        background: `url('/home_page/comparison_bg.svg')`,
      }}
    >
      <div className="container flex flex-col items-center gap-10">
        <div className="item-start flex flex-col !gap-[0.5rem] md:items-center">
          <h2
            className="text-center !text-[2.75rem] -tracking-wide !text-[#EFEFF5]"
            style={{ fontWeight: 400, margin: 0 }}
          >
            <span
              className="!mr-2 bg-clip-text text-white"
              style={{
                backgroundImage: "linear-gradient(to right, #F93C52, #2B21F3)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Rest Assured
            </span>
            , You{"'"}re in Good Company
          </h2>
          <p
            className="max-w-[30rem] text-center leading-5 !text-[#EFEFF5]"
            style={{ fontFamily: "Inter", fontWeight: 300, margin: 0 }}
          >
            Join a growing club of industry leaders who trust WalledCorrect to
            keep their AI ventures on track.
          </p>
        </div>
      </div>

      {/* Carousel Container with Edge Gradients */}
      <div className="w-full">
        {/* Left Gradient Fade */}
        <div className="absolute top-0 left-0 z-10 h-full w-24 bg-gradient-to-r from-black/50 to-transparent"></div>

        {/* Right Gradient Fade */}
        <div className="absolute top-0 right-0 z-10 h-full w-24 bg-gradient-to-l from-black/50 to-transparent"></div>

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
          <div className="flex gap-4 px-24">
            {DUPLICATED_COMPANIES.map((item, idx) => (
              <div
                key={idx}
                className="flex min-h-72 w-80 shrink-0 flex-col items-start justify-between rounded-xl bg-[#28273F] p-3 md:w-88"
              >
                <div className="flex flex-col gap-5">
                  <svg
                    width="38"
                    height="33"
                    viewBox="0 0 38 33"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.5286 32.4256H0.581335C0.45215 31.6074 0.322964 30.5739 0.193779 29.3251C0.0645929 28.0763 0 26.7199 0 25.2558C0 20.3467 0.667459 15.8252 2.00238 11.6913C3.33729 7.55736 5.53345 3.66026 8.59084 0L15.9544 2.19616C13.9305 5.46886 12.4449 8.93533 11.4975 12.5956C10.5502 16.2128 10.0765 20.2391 10.0765 24.6744C10.0765 26.0094 10.1195 27.3012 10.2057 28.55C10.2918 29.7988 10.3994 31.0907 10.5286 32.4256ZM32.2318 32.4256H22.2845C22.1553 31.6074 22.0261 30.5739 21.897 29.3251C21.7678 28.0763 21.7032 26.7199 21.7032 25.2558C21.7032 20.3467 22.3706 15.8252 23.7055 11.6913C25.0405 7.55736 27.2366 3.66026 30.294 0L37.6576 2.19616C35.6767 5.46886 34.1911 8.93533 33.2007 12.5956C32.2533 16.2128 31.7796 20.2391 31.7796 24.6744C31.7796 26.0094 31.8227 27.3012 31.9088 28.55C31.995 29.7988 32.1026 31.0907 32.2318 32.4256Z"
                      fill="#3B3A5F"
                    />
                  </svg>
                  <h4
                    className="!text-[18px] leading-5 text-white"
                    style={{
                      fontFamily: "Inter",
                      fontWeight: 300,
                      wordSpacing: "-1px",
                    }}
                  >
                    {item.desc}
                  </h4>
                </div>
                <Image
                  src={item.image}
                  alt="company logo"
                  height={100}
                  width={150}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Add this to your CSS file or in a style tag in your document head
const scrollbarHideStyles = `
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
`;
