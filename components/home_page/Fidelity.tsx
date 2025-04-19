"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import SimpleMovingGradients from "../Animations/BackgroundAnimation";
import { useTheme } from "@/hooks/useTheme";
import clsx from "clsx";

export default function Fidelity() {
  //** theme context */
  const theme = useTheme();
  const { darkMode } = theme;

  return (
    <>
      <section
        className={clsx(
          "relative overflow-hidden !bg-cover !bg-center !bg-no-repeat pb-12 transition-all duration-500 sm:pb-16 lg:pb-20",
          darkMode ? "!bg-[#141320]" : "!bg-[#E0DEEC]",
        )}
        style={{
          background: darkMode
            ? `url('/home_page/fidelity_bg_dark.svg')`
            : `url('/home_page/fidelity_bg.svg')`,
        }}
      >
        <div className="relative container mx-auto flex flex-col items-center gap-10 md:flex-row md:justify-center md:gap-20">
          <div className="relative hidden md:block">
            <Image
              className="w-full"
              src="/home_page/backed_by/fidelity.svg"
              width={450}
              height={450}
              alt="Fidelity Logo"
            />
          </div>
          <div className="relative z-10 !space-y-3.5">
            <h2
              className={clsx(
                "!text-[2.55rem] font-semibold md:!text-[2.75rem]",
                darkMode ? "!text-[#F5F5F7]" : "!text-[#323150]",
              )}
              style={{ fontWeight: 400, letterSpacing: "-1px" }}
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
                Secure AI
              </span>{" "}
              <br />
              without Sharing Data
            </h2>
            <div className="relative block md:hidden">
              <Image
                className="!mt-3 mb-4 w-full"
                src="/home_page/backed_by/fidelity.svg"
                width={450}
                height={450}
                alt="Fidelity Logo"
              />
            </div>
            <div
              className={clsx(
                "!space-y-5 !text-[1.125rem]",
                darkMode ? "!text-[#E0E0E6]" : "",
              )}
            >
              <p
                className={clsx("max-w-lg leading-5")}
                style={{ fontFamily: "Inter", fontWeight: 375 }}
              >
                Supercharge AI deployments without sharing data outside
                enterprise bounds.
              </p>
              <p
                className={clsx("max-w-lg leading-5")}
                style={{ fontFamily: "Inter", fontWeight: 375 }}
              >
                WalledAI{"'"}s guardrails can be deployed 100% within
                organizational premises to ensure complete data privacy and
                confidentiality.
              </p>
              <p
                className={clsx("max-w-lg leading-5")}
                style={{ fontFamily: "Inter", fontWeight: 375 }}
              >
                WalledAI also enables you to leverage third-party LLMs and AI
                Agents worry-free with privacy-preserving PII solutions like
                WalledRedact.
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
              darkMode ? "opacity-15" : "opacity-50",
            )}
          ></div>
          <div className="absolute -right-[35rem] -bottom-44 z-0 rounded-full">
            <SimpleMovingGradients />
          </div>
        </div>
      </section>
      <section
        className={clsx(
          "overflow-hidden !bg-cover !bg-center !bg-no-repeat py-20 transition-all duration-500",
          darkMode ? "bg-[#1C1B2C]" : "bg-[#EFEFF5]",
        )}
      >
        <div className="relative container mx-auto flex flex-col items-center gap-10 md:flex-row md:justify-center md:gap-20">
          <div className="space-y-3.5">
            <h2
              className={clsx(
                "!text-[2.55rem] md:!text-[2.75rem]",
                darkMode ? "!text-[#F5F5F7]" : "!text-[#323150]",
              )}
              style={{ fontWeight: 400, letterSpacing: "-1px" }}
            >
              Only AI Guardrail <br className="block md:hidden" />
              with <br className="hidden md:block" /> Overarching{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(92.82deg, rgb(249, 60, 82) -56.34%, rgb(43, 33, 243) 130.6%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Customization
              </span>
            </h2>
            <div className="relative block md:hidden">
              <Image
                className="!mt-3 mb-4 w-full"
                src="/home_page/backed_by/fidelity_chat.svg"
                width={500}
                height={450}
                alt="Fidelity Chat"
              />
            </div>
            <div
              className={clsx(
                "!space-y-5 !text-[1.125rem]",
                darkMode ? "!text-[#E0E0E6]" : "",
              )}
            >
              <p
                className={clsx("max-w-lg leading-5")}
                style={{ fontFamily: "Inter", fontWeight: 375 }}
              >
                Your search for AI guardrails that accommodates specific
                enterprise needs ends here.
              </p>
              <p
                className={clsx("max-w-lg leading-5")}
                style={{ fontFamily: "Inter", fontWeight: 375 }}
              >
                Ensure compliance with company policies, build custom data
                redaction schemes, and carry out additional customizations
                tailored to your business needs.
              </p>
              <p
                className={clsx("max-w-lg leading-5")}
                style={{ fontFamily: "Inter", fontWeight: 375 }}
              >
                <Link
                  href="#contactEmailSection"
                  className={clsx(
                    "!underline",
                    darkMode ? "!text-[#756EF7]" : "!text-[#2B21F3]",
                  )}
                >
                  Book a call
                </Link>{" "}
                with our support team to explore enterprise customization
                options in depth.
              </p>
            </div>
          </div>
          <div className="relative hidden md:block">
            <Image
              className="w-full"
              src="/home_page/backed_by/fidelity_chat.svg"
              width={500}
              height={450}
              alt="Fidelity Chat"
            />
          </div>
          <div
            className={clsx(
              "absolute top-3/4 left-full h-[500px] w-[500px] rounded-full bg-purple-300 blur-3xl",
              darkMode ? "opacity-15" : "opacity-50",
            )}
          ></div>
        </div>
      </section>
    </>
  );
}
