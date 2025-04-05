"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative w-full bg-[url('/home_page/main_banner.svg')] bg-cover bg-center bg-no-repeat py-24 md:py-20">
      <div className="container">
        <div className="text-[var(--anek) z-[1] flex items-center justify-center pt-16 md:pt-32">
          <motion.div
            className="mx-auto max-w-3xl space-y-3.5 text-left"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1
              className="!text-[1.75rem] !text-[#EFEFF5]"
              style={{ fontWeight: 400 }}
            >
              Welcome to
              <span
                className="bg-clip-text px-1.5 text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(92.82deg, rgb(249, 60, 82) -56.34%, rgb(43, 33, 243) 130.6%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Walled AI
              </span>
            </h1>
            <p
              className="!text-[1.125rem]"
              style={{
                fontFamily: "Inter",
                fontStyle: "normal",
                fontWeight: 300,
                lineHeight: "120%",
                letterSpacing: "0.28px",
                color: "#E0DFEC",
                opacity: 0.9,
              }}
            >
              WalledAI evolved as an offshoot of Rishab Bharadwaj’s PhD research
              at the Singapore University of Technology and Design (SUTD).{" "}
              <span className="!text-[#4F4E7E]">
                Under the guidance of Prof. Soujanya Poria (PhD), Rishab had set
                out to understand critical issues in AI safety and fairness.{" "}
                <br />
                <br /> Soon, the duo’s groundbreaking work on investigating
                gender bias in BERT models revealed deep AI vulnerabilities.
                They also uncovered a host of other safety and data privacy
                vulnerabilities in popular state-of-the-art LLMs and AI models.
                <br />
                <br />  These findings posed serious security implications that
                prevented large-scale AI adoption. Determined to bridge this gap
                between research and reality, Rishab and Prof. Soujanya set out
                to build safeguards that enabled mainstream AI adoption without
                legal, ethical, and security complications.
                <br />
                <br /> Months of research and multiple break-throughs later,
                WalledAI was formally born. Today, we stand as pioneers in AI
                security, ensuring that as AI continues to evolve, it remains
                transparent, safe, and aligned with human values.
              </span>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
