"use client";

import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Swiper component for mobile devices
const MobileSwiper = ({ processes }: any) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative mt-8 w-full md:hidden">
      <Swiper
        modules={[Pagination]}
        spaceBetween={24}
        slidesPerView={1}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        pagination={{
          clickable: true,
          bulletClass: "custom-bullet-process",
          bulletActiveClass: "custom-bullet-active",
          renderBullet: function (index, className) {
            return `<span class="${className}"></span>`;
          },
        }}
        className="swiper-mobile"
      >
        {processes.map((process: any, i: number) => (
          <SwiperSlide key={i}>
            <div className="flex flex-col gap-4 px-4 pb-20">
              <Image
                src={process.image}
                alt={process.title}
                height={100}
                width={100}
                className="block w-full"
              />
              <motion.div
                className="group relative rounded-xl bg-[#28273F] px-3 py-3 text-white transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: i * 0.2,
                  duration: 0.8,
                  ease: "easeOut",
                }}
              >
                <div className="relative flex min-h-32 flex-col space-y-4">
                  <Link
                    className="absolute top-0 right-0 flex rotate-0 items-center justify-center gap-2.5 rounded-full !bg-gradient-to-r !from-[#F93C52] !to-[#2B21F3] p-2 transition-all duration-300"
                    href={process.link}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.42065 9.79517L13.9207 9.79517"
                        stroke="#EFEFF5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M11.6702 7.54565L13.9202 9.79565L11.6702 12.0457"
                        stroke="#EFEFF5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                  <h3
                    className="text-left !text-xl font-medium !text-white transition-all duration-300"
                    style={{
                      fontFamily: "Inter",
                      fontWeight: 600,
                    }}
                  >
                    {process.title}
                  </h3>
                  <p
                    className="text-left !text-sm !text-white transition-all duration-300"
                    style={{ fontFamily: "Inter", fontWeight: 300 }}
                  >
                    {process.description}
                  </p>
                </div>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom pagination styling */}
      <style jsx global>{`
        .custom-bullet-process {
          display: inline-block;
          width: 15px;
          height: 8px;
          border-radius: 35%;
          background: #28273f;
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

export default function ProtectionProcess() {
  const processes = [
    {
      title: "Walled Protect",
      description:
        "Deploy WalledProtect for seamless compliance with AI laws like the EU AI Act, GDPR, and regulations in 130+ countries.",
      link: "",
      image: "/home_page/protection_process-1.svg",
    },
    {
      title: "Walled Redact",
      description:
        "Use WalledRedact to preserve data privacy and confidentiality while leveraging third-party LLMs, agents, and other AI solutions.",
      link: "",
      image: "/home_page/protection_process-2.svg",
    },
    {
      title: "Walled Correct",
      description:
        "Fix problematic hallucinations and improve the reliability of production AI with WalledCorrect.",
      link: "",
      image: "/home_page/protection_process-3.svg",
    },
  ];

  const sectionRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth < 768) return;

    gsap.registerPlugin(ScrollTrigger);

    const setHalfScreenHeight = () => {
      setImageHeight(window.innerHeight / 2);
    };

    setHalfScreenHeight();
    window.addEventListener("resize", setHalfScreenHeight);

    // Create refs for progress bars
    const progressBars = processes.map(() => ({ progress: 0 }));

    const ctx = gsap.context(() => {
      // Create a timeline with ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=2000",
          scrub: true,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            // Calculate overall progress (0-1)
            const totalProgress = self.progress;

            // Calculate which step we're on (0, 1, or 2)
            const step = Math.floor(totalProgress * 3);
            setCurrentStep(step > 2 ? 2 : step);

            // Calculate progress within each step
            progressBars.forEach((bar, index) => {
              if (index < step) {
                // Previous steps are 100% complete
                bar.progress = 1;
              } else if (index > step) {
                // Future steps are 0% complete
                bar.progress = 0;
              } else {
                // Current step progress (0-1 within this step)
                bar.progress = totalProgress * 3 - step;
              }
            });

            // Update DOM elements with current progress values
            progressBars.forEach((bar, index) => {
              const progressElement: any = document.querySelector(
                `#progress-bar-${index}`,
              );
              if (progressElement) {
                progressElement.style.width = `${bar.progress * 100}%`;
              }
            });
          },
        },
      });

      // Create 3 equal segments in the timeline (one for each step)
      tl.to({}, { duration: 1 });
      tl.to({}, { duration: 1 });
      tl.to({}, { duration: 1 });
    }, sectionRef);

    return () => {
      window.removeEventListener("resize", setHalfScreenHeight);
      ctx.revert();
    };
  }, []);

  return (
    <>
      <section className="relative container mx-auto px-4 pt-20">
        <div className="z-[1] flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mx-auto w-full space-y-3.5 text-center"
          >
            <h2
              className="text-center !text-[2.25rem] !text-[#EFEFF5] md:!text-[2.75rem]"
              style={{
                fontWeight: 400,
              }}
            >
              Complete
              <span
                className="bg-clip-text px-1.5 text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(92.82deg, rgb(249, 60, 82) -56.34%, rgb(43, 33, 243) 130.6%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Protection
              </span>
              <br className="block md:hidden" />
              for AI in Production
            </h2>
            <p
              className="!text-[1.125rem] !text-[#E0DFEC]"
              style={{
                fontFamily: "Inter",
                fontWeight: 300,
                lineHeight: "120%",
              }}
            >
              WalledAI{"'"}s guardrail solutions offer a one-stop solution to
              ensure safe and secure AI applications in production. Capitalize
              on a complete ecosystem of AI guardrails, each catering to
              specific challenges of AI in production
            </p>
          </motion.div>
        </div>
      </section>

      {/* DESKTOP SCROLL SECTION */}
      <div
        ref={sectionRef}
        className="mx-auto hidden w-full max-w-6xl flex-col items-center justify-center px-4 pt-20 md:flex"
      >
        <div>
          <Image
            width={1200}
            height={imageHeight + 10}
            src={processes[currentStep].image}
            alt="Protection Step Image"
            className="!mb-5 object-contain transition-all duration-500 ease-in-out"
            style={{ height: `${imageHeight + 10}px` }}
          />
        </div>

        <div className="grid w-full grid-cols-3 gap-10">
          {/* Replace the progress bar div in the existing component with this version */}
          {processes.map((process, i) => {
            const id = `progress-bar-${i}`;
            return (
              <div key={i} className="flex flex-col gap-4">
                <motion.div
                  className={`relative rounded-xl px-3 py-3 text-white transition-all duration-300 ${
                    i === currentStep ? "bg-[#28273F]" : "bg-transparent"
                  }`}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: i * 0.2,
                    duration: 0.8,
                    ease: "easeOut",
                  }}
                >
                  <div className="relative flex min-h-32 flex-col space-y-4">
                    <Link
                      className={`absolute top-0 right-0 flex rotate-45 items-center justify-center gap-2.5 rounded-full p-2 transition-all duration-300 ${
                        i === currentStep
                          ? "rotate-0 bg-gradient-to-r from-[#F93C52] to-[#2B21F3]"
                          : "bg-[#4F4E7E]"
                      }`}
                      href={process.link}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3.42065 9.79517L13.9207 9.79517"
                          stroke="#EFEFF5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M11.6702 7.54565L13.9202 9.79565L11.6702 12.0457"
                          stroke="#EFEFF5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                    <h3
                      className={`text-left text-xl font-medium transition-all duration-300 ${
                        i === currentStep ? "text-white" : "text-[#4F4E7E]"
                      }`}
                      style={{
                        fontFamily: "Inter",
                        fontWeight: 600,
                      }}
                    >
                      {process.title}
                    </h3>
                    <p
                      className={`text-left text-[0.725rem] transition-all duration-300 ${
                        i === currentStep ? "text-white" : "text-[#4F4E7E]"
                      }`}
                      style={{ fontFamily: "Inter", fontWeight: 300 }}
                    >
                      {process.description}
                    </p>
                  </div>
                  <div className="relative h-1 w-full overflow-hidden rounded-full bg-[#28273F]">
                    <div
                      id={id}
                      className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-[#F93C52] to-[#2B21F3]"
                      style={{ width: "0%" }}
                    />
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      {/* MOBILE SWIPER SECTION */}
      <div className="pt-5 pb-20">
        <MobileSwiper processes={processes} />
      </div>
    </>
  );
}
