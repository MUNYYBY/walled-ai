"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ProtectionProcess() {
  const processes = [
    {
      title: "Walled Protect",
      description:
        "Deploy WalledProtect for seamless compliance with AI laws like the EU AI Act, GDPR, and regulations in 130+ countries.",
      link: "",
      image: "/pp/pp-1.svg",
    },
    {
      title: "Walled Redact",
      description:
        "Use WalledRedact to preserve data privacy and confidentiality while leveraging third-party LLMs, agents, and other AI solutions.",
      link: "",
      image: "/pp/pp-2.svg",
    },
    {
      title: "Walled Correct",
      description:
        "Fix problematic hallucinations and improve the reliability of production AI with WalledCorrect.",
      link: "",
      image: "/pp/pp-3.svg",
    },
  ];

  return (
    <section className="relative container mx-auto px-4 py-20">
      <div className="z-[1] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mx-auto w-full space-y-3.5 text-center"
        >
          <h2
            className="text-center !text-[38px] !text-[#EFEFF5] md:!text-[2.75rem]"
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
            style={{ fontFamily: "Inter", fontWeight: 300, lineHeight: "120%" }}
          >
            WalledAI’s guardrail solutions offer a one-stop solution to ensure
            safe and secure AI applications in production. Capitalize on a
            complete ecosystem of AI guardrails, each catering to specific
            challenges of AI in production
          </p>

          <div className="mx-auto mt-5 hidden space-y-3.5 text-center md:block">
            <Image
              width={1000}
              height={700}
              src="/home_page/protection_process.svg"
              alt="AI Protection Diagram"
              className="w-full max-w-full"
            />
          </div>
          <div className="mx-auto grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-10">
            {processes.map((process, i) => (
              <div key={i} className="flex flex-col gap-4">
                <Image
                  src={process.image}
                  alt={process.title}
                  height={100}
                  width={100}
                  className="block w-full md:hidden"
                />
                <motion.div
                  className="group relative rounded-xl bg-[#28273F] px-3 py-3 text-white transition-all duration-300 md:bg-transparent"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: i * 0.2,
                    duration: 0.8,
                    ease: "easeOut",
                  }}
                >
                  <div className="relative flex min-h-32 flex-col space-y-4 md:min-h-36">
                    <Link
                      className="absolute top-0 right-0 hidden rotate-45 items-center justify-center gap-2.5 rounded-full !bg-[#4F4E7E] p-2 transition-all duration-300 group-hover:rotate-0 group-hover:bg-gradient-to-r group-hover:from-[#F93C52] group-hover:to-[#2B21F3] md:flex"
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
                    <Link
                      className="absolute top-0 right-0 flex rotate-0 items-center justify-center gap-2.5 rounded-full !bg-gradient-to-r !from-[#F93C52] !to-[#2B21F3] p-2 transition-all duration-300 md:hidden md:rotate-45 md:!bg-[#4F4E7E] md:group-hover:rotate-0 md:group-hover:bg-gradient-to-r md:group-hover:from-[#F93C52] md:group-hover:to-[#2B21F3]"
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
                      className="text-left !text-xl font-medium !text-white transition-all duration-300 md:!text-2xl md:!text-[#4F4E7E] md:group-hover:!text-white"
                      style={{
                        fontFamily: "Inter",
                        fontWeight: 600,
                      }}
                    >
                      {process.title}
                    </h3>
                    <p
                      className="text-left !text-sm !text-white transition-all duration-300 md:!text-[0.925rem] md:!text-[#4F4E7E] md:group-hover:!text-white"
                      style={{ fontFamily: "Inter", fontWeight: 300 }}
                    >
                      {process.description}
                    </p>
                  </div>
                  <motion.div className="relative hidden h-1 w-full overflow-hidden rounded-full bg-[#28273F] md:block">
                    <motion.div className="absolute top-0 left-0 h-full w-full rounded-full bg-gradient-to-r from-[#F93C52] to-[#2B21F3] transition-all duration-300 md:w-0 md:group-hover:w-full" />
                  </motion.div>
                </motion.div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
