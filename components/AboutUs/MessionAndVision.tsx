"use client";

import Image from "next/image";
import React from "react";
import { useTheme } from "@/hooks/useTheme";
import clsx from "clsx";

export default function MissionAndVision() {
  //** theme context */
  const theme = useTheme();
  const { darkMode } = theme;

  return (
    <section
      className={clsx(
        "overflow-hidden !bg-cover !bg-center !bg-no-repeat pb-12 transition-all duration-500 sm:pb-16 lg:pb-20",
        darkMode ? "bg-[#141320]" : "bg-[#E0DEEC]",
      )}
      style={{
        background: darkMode
          ? `url('/home_page/fidelity_bg_dark.svg')`
          : `url('/home_page/fidelity_bg.svg')`,
      }}
    >
      <div className="relative container mx-auto flex flex-col items-center gap-4 md:flex-row md:justify-center">
        <div
          className={clsx(
            "w-full rounded-3xl p-1 md:h-88 md:w-1/2",
            darkMode ? "bg-[#272638]" : "bg-[#EFEFF5]",
          )}
        >
          <div className="relative h-66 overflow-hidden rounded-3xl">
            <Image
              className="h-full w-full object-cover"
              src="/about-us/MESSION.svg"
              width={450}
              height={450}
              alt="Mission"
            />
          </div>
          <div className="flex flex-col px-3 pt-2">
            <h4
              className={clsx(darkMode ? "!text-[#F5F5F7]" : "!text-[#323150]")}
            >
              Mission
            </h4>
            <p
              className={clsx(
                "!-mt-3",
                darkMode ? "!text-[#E0E0E6]" : "!text-[#323150]",
              )}
            >
              Enable safe, reliable, and impartial AI systems
            </p>
          </div>
        </div>
        <div
          className={clsx(
            "w-full rounded-3xl p-1 md:h-88 md:w-1/2",
            darkMode ? "bg-[#272638]" : "bg-[#EFEFF5]",
          )}
        >
          <div className="relative h-[15.8rem] overflow-hidden rounded-3xl">
            <Image
              className="h-full w-full object-cover"
              src="/about-us/VISION.svg"
              width={450}
              height={450}
              alt="Vision"
            />
          </div>
          <div className="flex flex-col px-3 pt-2">
            <h4
              className={clsx(darkMode ? "!text-[#F5F5F7]" : "!text-[#323150]")}
            >
              Vision
            </h4>
            <p
              className={clsx(
                "!-mt-3",
                darkMode ? "!text-[#E0E0E6]" : "!text-[#323150]",
              )}
            >
              A better AI-enabled world made possible without compromising
              safety, security, and ethics
            </p>
          </div>
        </div>
        <Image
          className={clsx(
            "absolute top-full left-full",
            darkMode && "opacity-10",
          )}
          src="/home_page/backed_by/bg_pattern.svg"
          width={500}
          height={450}
          alt="Background Pattern"
        />
        <div
          className={clsx(
            "absolute top-3/4 left-full h-[500px] w-[500px] rounded-full bg-purple-300 blur-3xl",
            darkMode ? "opacity-10" : "opacity-50",
          )}
        ></div>
      </div>
    </section>
  );
}
