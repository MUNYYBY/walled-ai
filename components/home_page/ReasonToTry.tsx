"use client";

import Image from "next/image";
import React from "react";
import { useTheme } from "@/hooks/useTheme";
import clsx from "clsx";

export default function ReasonToTry() {
  //** theme context */
  const theme = useTheme();
  const { darkMode } = theme;

  return (
    <section
      className={clsx(
        "relative overflow-hidden !bg-cover !bg-center !bg-no-repeat py-20 transition-all duration-500",
        darkMode ? "!bg-[#141320]" : "!bg-[#E0DEEC]",
      )}
      style={{
        background: darkMode
          ? `url('/home_page/reason_to_try_bg_dark.svg')`
          : `url('/home_page/reason_to_try_bg.svg')`,
      }}
    >
      <div className="container mx-auto flex flex-col items-center gap-[2.5rem] lg:flex-row">
        <div className="lg:!w-[40%] lg:!max-w-sm">
          <h2
            className={clsx(
              "!text-[2.35rem] -tracking-wider md:!text-[2.75rem]",
              darkMode ? "!text-[#F5F5F7]" : "",
            )}
            style={{ fontWeight: 400 }}
          >
            More Reasons <br /> to Try
            <span
              className="!ml-2.5 bg-clip-text text-white"
              style={{
                backgroundImage: "linear-gradient(to right, #F93C52, #2B21F3)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              WalledAI
            </span>
          </h2>
          <p
            className={clsx(
              "!mt-3.5 !text-[1.125rem] leading-5",
              darkMode ? "!text-[#E0E0E6]" : "",
            )}
            style={{
              fontFamily: "Inter",
              fontWeight: 375,
              wordSpacing: "-1px",
            }}
          >
            We{"'"}ve built scores of other features to simplify and streamline
            AI governance.
          </p>
          <div className="!mt-14 !space-y-4">
            <div className="group transition-all duration-500">
              <h3
                className={clsx(
                  "!text-2xl opacity-100 transition-all duration-300 md:!opacity-50 md:group-hover:opacity-100",
                  darkMode ? "!text-[#F5F5F7]" : "text-[#323150]",
                )}
                style={{
                  fontFamily: "Anek Devanagari",
                  fontWeight: 400,
                  lineHeight: "120%" /* 33.6px */,
                  letterSpacing: "-1.12px",
                }}
              >
                Sleek Dashboards to Help You Stay on Top of Things
              </h3>
              <div
                className={clsx(
                  "relative mt-2 h-[0.25rem] w-full overflow-hidden rounded-full",
                  darkMode ? "bg-[#272638]" : "bg-[#EFEFF5]",
                )}
              >
                <div
                  className="absolute top-0 left-0 h-full w-full rounded-full transition-all duration-500 group-hover:w-full md:w-[0]"
                  style={{
                    background:
                      " linear-gradient(92.82deg, #F93C52 -56.34%, #2B21F3 130.6%)",
                  }}
                />
              </div>
              <Image
                className="mt-3 block w-full md:!-mr-32 md:hidden"
                src={"/home_page/dashboard_preview.svg"}
                width={1500}
                height={1000}
                alt="Dashboard preview"
              />
            </div>
            <div className="group transition-all duration-500">
              <h3
                className={clsx(
                  "!text-2xl opacity-100 transition-all duration-300 group-hover:!opacity-100 md:!opacity-50",
                  darkMode ? "!text-[#F5F5F7]" : "text-[#323150]",
                )}
                style={{
                  fontFamily: "Anek Devanagari",
                  fontWeight: 400,
                  lineHeight: "120%" /* 33.6px */,
                  letterSpacing: "-1.12px",
                }}
              >
                Effortless Performance Even in Edgy Situations
              </h3>
              <div
                className={clsx(
                  "relative mt-2 h-[0.25rem] w-full overflow-hidden rounded-full",
                  darkMode ? "bg-[#272638]" : "bg-[#EFEFF5]",
                )}
              >
                <div
                  className="absolute top-0 left-0 h-full w-full rounded-full transition-all duration-500 group-hover:w-full md:w-[0]"
                  style={{
                    background:
                      " linear-gradient(92.82deg, #F93C52 -56.34%, #2B21F3 130.6%)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <Image
          className="hidden w-full md:!-mr-32 md:block"
          src={"/home_page/dashboard_preview.svg"}
          width={1500}
          height={1000}
          alt="Dashboard preview"
        />
      </div>
    </section>
  );
}
