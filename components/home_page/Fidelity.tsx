import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Fidelity() {
  return (
    <>
      <section
        className="overflow-hidden bg-[#E0DEEC] !bg-cover !bg-center !bg-no-repeat py-12 sm:py-16 lg:py-20"
        style={{
          background: `url('/home_page/fidelity_bg.svg')`,
        }}
      >
        <div className="relative container mx-auto flex flex-col items-center gap-20 md:flex-row md:justify-center">
          <div className="relative">
            <Image
              className="w-full"
              src="/home_page/backed_by/fidelity.svg"
              width={450}
              height={450}
              alt="Fidelity Logo"
            />
          </div>
          <div className="space-y-3.5">
            <h2
              className="!text-[44px] font-semibold !text-[#323150]"
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
            <div className="!space-y-5 !text-[18px]">
              <p
                className="max-w-md leading-5"
                style={{ fontFamily: "Inter", fontWeight: 375 }}
              >
                Supercharge AI deployments without sharing data outside
                enterprise bounds.
              </p>
              <p
                className="max-w-md leading-5"
                style={{ fontFamily: "Inter", fontWeight: 375 }}
              >
                WalledAI’s guardrails can be deployed 100% within organizational
                premises to ensure complete data privacy and confidentiality.
              </p>
              <p
                className="max-w-md leading-5"
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
      </section>
      <section className="overflow-hidden bg-[#E0DEEC] !bg-cover !bg-center !bg-no-repeat py-12 sm:py-16 lg:py-20">
        <div className="flex flex-col items-center gap-20 md:flex-row md:justify-center">
          <div className="space-y-3.5">
            <h2
              className="!text-[44px] -tracking-wider !text-[#323150]"
              style={{ fontWeight: 400 }}
            >
              Only AI Guardrail with <br /> Overarching
              <span
                className="!ml-2 bg-clip-text text-transparent"
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
            <div className="space-y-3.5">
              <div className="!mt-4 !space-y-5 !text-[18px]">
                <p
                  className="max-w-md leading-5"
                  style={{ fontFamily: "Inter", fontWeight: 375 }}
                >
                  Your search for AI guardrails that accommodates specific
                  enterprise needs ends here.
                </p>
                <p
                  className="max-w-md leading-5"
                  style={{ fontFamily: "Inter", fontWeight: 375 }}
                >
                  Ensure compliance with company policies, build custom data
                  redaction schemes, and carry out additional customizations
                  tailored to your business needs.
                </p>
                <p
                  className="max-w-md leading-5"
                  style={{ fontFamily: "Inter", fontWeight: 375 }}
                >
                  <Link
                    href={"/contact"}
                    className="!text-[#2B21F3] !underline"
                  >
                    Book a call
                  </Link>{" "}
                  with our support team to explore enterprise customization
                  options in depth.
                </p>
              </div>
            </div>
          </div>
          <div className="relative">
            <Image
              className="w-full"
              src="/home_page/backed_by/fidelity_chat.svg"
              width={500}
              height={450}
              alt="Fidelity Chat"
            />
          </div>
        </div>
      </section>
    </>
  );
}
