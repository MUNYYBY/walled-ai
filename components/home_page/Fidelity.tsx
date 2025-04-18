import Image from "next/image";
import Link from "next/link";
import React from "react";
import SimpleMovingGradients from "../Animations/BackgroundAnimation";

export default function Fidelity() {
  return (
    <>
      <section
        className="relative overflow-hidden bg-[#E0DEEC] !bg-cover !bg-center !bg-no-repeat pb-12 sm:pb-16 lg:pb-20"
        style={{
          background: `url('/home_page/fidelity_bg.svg')`,
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
              className="!text-[2.55rem] font-semibold !text-[#323150] md:!text-[2.75rem]"
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
            <div className="!space-y-5 !text-[1.125rem]">
              <p
                className="max-w-lg leading-5"
                style={{ fontFamily: "Inter", fontWeight: 375 }}
              >
                Supercharge AI deployments without sharing data outside
                enterprise bounds.
              </p>
              <p
                className="max-w-lg leading-5"
                style={{ fontFamily: "Inter", fontWeight: 375 }}
              >
                WalledAI{"'"}s guardrails can be deployed 100% within
                organizational premises to ensure complete data privacy and
                confidentiality.
              </p>
              <p
                className="max-w-lg leading-5"
                style={{ fontFamily: "Inter", fontWeight: 375 }}
              >
                WalledAI also enables you to leverage third-party LLMs and AI
                Agents worry-free with privacy-preserving PII solutions like
                WalledRedact.
              </p>
            </div>
          </div>
          <Image
            className="absolute top-full left-full"
            src="/home_page/backed_by/bg_pattern.svg"
            width={500}
            height={450}
            alt="Background Pattern"
          />
          <div className="absolute top-3/4 left-full h-[500px] w-[500px] rounded-full bg-purple-300 opacity-50 blur-3xl"></div>
        </div>
        <div className="absolute -right-72 -bottom-16 z-0 rounded-full">
          <SimpleMovingGradients />
        </div>
      </section>
      <section className="overflow-hidden bg-[#EFEFF5] !bg-cover !bg-center !bg-no-repeat py-20">
        <div className="relative container mx-auto flex flex-col items-center gap-10 md:flex-row md:justify-center md:gap-20">
          <div className="space-y-3.5">
            <h2
              className="!text-[2.55rem] !text-[#323150] md:!text-[2.75rem]"
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
            <div className="!space-y-5 !text-[1.125rem]">
              <p
                className="max-w-lg leading-5"
                style={{ fontFamily: "Inter", fontWeight: 375 }}
              >
                Your search for AI guardrails that accommodates specific
                enterprise needs ends here.
              </p>
              <p
                className="max-w-lg leading-5"
                style={{ fontFamily: "Inter", fontWeight: 375 }}
              >
                Ensure compliance with company policies, build custom data
                redaction schemes, and carry out additional customizations
                tailored to your business needs.
              </p>
              <p
                className="max-w-lg leading-5"
                style={{ fontFamily: "Inter", fontWeight: 375 }}
              >
                <Link
                  href="#contactEmailSection"
                  className="!text-[#2B21F3] !underline"
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
          <div className="absolute top-3/4 left-full h-[500px] w-[500px] rounded-full bg-purple-300 opacity-50 blur-3xl"></div>
        </div>
      </section>
    </>
  );
}
