"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useTheme } from "@/hooks/useTheme";
import clsx from "clsx";

// Mobile Swiper component for deployment images
const DeploymentSwiper = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const deploymentImages = [
    "/home_page/deployments/deploy-1.svg",
    "/home_page/deployments/deploy-2.svg",
    "/home_page/deployments/deploy-3.svg",
  ];

  return (
    <div className="relative w-[105.5%] lg:hidden">
      <Swiper
        modules={[Pagination]}
        spaceBetween={24}
        slidesPerView={1}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        pagination={{
          clickable: true,
          bulletClass: "custom-bullet-deploy",
          bulletActiveClass: "custom-bullet-active",
          renderBullet: function (index, className) {
            return `<span class="${className}"></span>`;
          },
        }}
        className="swiper-deployment"
      >
        {deploymentImages.map((image, i) => (
          <SwiperSlide key={i}>
            <div className="flex justify-center px-4 pb-10">
              <Image
                src={image}
                width={1050}
                height={450}
                alt={`Deployment option ${i + 1}`}
                className="w-full"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom pagination styling */}
      <style jsx global>{`
        .custom-bullet-deploy {
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

export default function DeploymentGuardrails() {
  //** theme context */
  const theme = useTheme();
  const { darkMode } = theme;

  return (
    <>
      <section
        className={clsx(
          "relative flex flex-col items-center gap-10 !bg-cover !bg-no-repeat py-20 transition-all duration-500",
          darkMode ? "bg-[#141320]" : "bg-[#E0DEEC]",
        )}
      >
        <div className="absolute top-0 left-0 z-1 md:size-[50%]">
          <Image
            src="/home_page/deployment_bg-mobile.svg"
            height={100}
            width={100}
            className="h-full w-full object-cover"
            alt="bg"
          />
        </div>
        <div className="relative z-10 container flex flex-col items-center gap-10">
          <div className="flex flex-col items-center">
            <div className="space-y-3.5">
              <h2
                className={clsx(
                  "text-center !text-[2.35rem] -tracking-wide md:!text-[2.75rem]",
                  darkMode ? "!text-[#F5F5F7]" : "!text-[#323150]",
                )}
                style={{ fontWeight: 400 }}
              >
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(92.82deg, rgb(249, 60, 82) -56.34%, rgb(43, 33, 243) 130.6%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Flexible
                </span>{" "}
                Deployments that Fit Right In
              </h2>
            </div>
            <p
              className={clsx(
                "text-center !text-[1rem] leading-5",
                darkMode ? "!text-[#E0E0E6]" : "",
              )}
              style={{ fontFamily: "Inter", fontWeight: 400 }}
            >
              WalledAI further supports both collective and standalone
              deployments of guardrails to suit complex enterprise setups.{" "}
              <br />
              Adopt our entire ecosystem of Guardrails for complete AI security
              or cherry pick modules that meet your needs for more fine-grained
              control.
            </p>
          </div>

          {/* Mobile Swiper for small screens (hidden on lg and up) */}
          <DeploymentSwiper />

          {/* Desktop layout for lg screens and up (hidden on smaller screens) */}
          <div className="hidden flex-row items-center justify-center gap-4 lg:flex">
            <Image
              src={"/home_page/deployments/deploy-1.svg"}
              width={1050}
              height={450}
              alt="Deployment option 1"
            />
            <Image
              src={"/home_page/deployments/deploy-2.svg"}
              width={1050}
              height={450}
              alt="Deployment option 2"
            />
            <Image
              src={"/home_page/deployments/deploy-3.svg"}
              width={1050}
              height={450}
              alt="Deployment option 3"
            />
          </div>

          <p
            className={clsx(
              "text-center !text-[1.125rem]",
              darkMode ? "!text-[#E0E0E6]" : "",
            )}
            style={{ fontFamily: "Inter", fontWeight: 375 }}
          >
            <Link
              className={clsx(
                "text-left !underline md:text-center",
                darkMode ? "!text-[#756EF7]" : "!text-[#2B21F3]",
              )}
              href={"#contactEmailSection"}
            >
              Connect with our experts
            </Link>{" "}
            to explore the ideal guardrail setup for your use case
          </p>
        </div>
      </section>
    </>
  );
}
