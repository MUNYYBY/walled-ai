"use client";

import Link from "next/link";
import Diagram from "./Diagram";
import { motion } from "framer-motion";

export default function WelcomeBanner() {
  return (
    <section
      className={`relative !bg-cover !bg-center !bg-no-repeat py-24 md:py-20`}
      style={{
        background: `url(/home_page/main_banner.svg)`,
      }}
    >
      <div className="text-[var(--anek) z-[1] flex items-center justify-center pt-16">
        <motion.div
          className="container mx-auto space-y-3.5 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1
            className="!text-[44px] !text-[#EFEFF5]"
            style={{ fontWeight: 400 }}
          >
            Enterprise
            <span
              className="bg-clip-text px-1.5 text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(92.82deg, rgb(249, 60, 82) -56.34%, rgb(43, 33, 243) 130.6%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              AI Guardrails
            </span>
            for End-to-End AI Security
          </h1>
          <p
            className="!text-[18px]"
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
            WalledAI’s guardrails provide customizable on-premises protection
            for AI systems
            <br /> to enable effortless compliance, safety, and data security
          </p>
          <motion.div
            className="flex flex-col items-center justify-center gap-3.5 md:flex-row"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          >
            <Link
              className="flex w-full items-center justify-center rounded-[4px] border-[0px] !border-none px-[3rem] py-[8px] text-sm text-white transition-all duration-500 md:w-fit md:py-[12px]"
              style={{
                border: "none",
                background:
                  "linear-gradient(92.82deg, #F93C52 -56.34%, #2B21F3 130.6%)",
              }}
              href="#contactEmailSection"
            >
              <button className="border-none pt-1">Start for Free</button>
            </Link>
            <Link
              className="flex w-full items-center justify-center rounded-[4px] border border-white px-8 py-[8px] text-sm text-white transition-all duration-500 md:w-fit md:py-[12px]"
              href="#contactEmailSection"
            >
              <button className="pt-1">Request For Demo</button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
      <div className="hidden md:block">
        <Diagram />
      </div>
    </section>
  );
}
