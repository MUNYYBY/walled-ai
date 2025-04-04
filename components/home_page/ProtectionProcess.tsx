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
    },
    {
      title: "Walled Redact",
      description:
        "Use WalledRedact to preserve data privacy and confidentiality while leveraging third-party LLMs, agents, and other AI solutions.",
      link: "",
    },
    {
      title: "Walled Correct",
      description:
        "Fix problematic hallucinations and improve the reliability of production AI with WalledCorrect.",
      link: "",
    },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 flex flex-col gap-5 items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center space-y-3.5"
      >
        <h2
          className="!text-[2.75rem] !text-[#EFEFF5]"
          style={{
            fontWeight: 400,
          }}
        >
          Complete
          <span
            className="px-1.5 bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(92.82deg, rgb(249, 60, 82) -56.34%, rgb(43, 33, 243) 130.6%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Protection
          </span>
          for AI in Production
        </h2>
        <p
          className="!text-[#E0DFEC] text-sm text-[1.125rem]"
          style={{ fontFamily: "Inter", fontWeight: 300, lineHeight: "120%" }}
        >
          WalledAI&apos;s guardrail solutions offer a one-stop solution to
          ensure safe and <br /> secure AI operations in production.
        </p>
        <p
          className="max-w-6xl text-white text-base text-[1.5rem]"
          style={{ fontWeight: 300, fontFamily: "Anek Devanagari" }}
        >
          Capitalize on a complete ecosystem of AI guardrails, each catering to
          specific challenges of AI in production
        </p>
      </motion.div>
      <div className="container mx-auto text-center space-y-3.5">
        <Image
          width={1000}
          height={700}
          src="/home_page/protection_process.svg"
          alt="AI Protection Diagram"
          className="min-w-full"
        />
      </div>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {processes.map((process, i) => (
          <motion.div
            key={i++}
            className="group relative text-white p-2.5 transition-all duration-300"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2, duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative space-y-2.5 min-h-36">
              <Link
                className="absolute right-0 top-0 !bg-[#4F4E7E] p-2 flex items-center justify-center gap-2.5 rounded-full rotate-45 group-hover:bg-gradient-to-r group-hover:from-[#F93C52] group-hover:to-[#2B21F3] group-hover:rotate-0 transition-all duration-300"
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
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M11.6702 7.54565L13.9202 9.79565L11.6702 12.0457"
                    stroke="#EFEFF5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </Link>
              <h3
                className="font-medium !text-[#4F4E7E] !text-2xl group-hover:!text-white transition-all duration-300"
                style={{
                  fontFamily: "Inter",
                  fontWeight: 600,
                }}
              >
                {process.title}
              </h3>
              <p
                className="max-w-72 !text-[#4F4E7E] text-[0.925rem] group-hover:!text-white transition-all duration-300"
                style={{ fontFamily: "Inter", fontWeight: 300 }}
              >
                {process.description}
              </p>
            </div>
            <motion.div className="bg-[#28273F] w-full h-1 rounded-full relative overflow-hidden">
              <motion.div className="absolute top-0 left-0 h-full w-0 rounded-full group-hover:w-full transition-all duration-300 bg-gradient-to-r from-[#F93C52] to-[#2B21F3]" />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
