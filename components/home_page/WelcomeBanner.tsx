"use client";

import Link from "next/link";
import Diagram from "./Diagram";
import { motion } from "framer-motion";

export default function WelcomeBanner() {
  return (
    <section
      className={`relative py-12 sm:py-16 lg:py-20 !bg-cover !bg-center !bg-no-repeat`}
      style={{
        background: `url(/home_page/main_banner.svg)`,
      }}
    >
      <div className="pt-16 flex items-center justify-center z-[1] text-[var(--anek)">
        <motion.div
          className="container mx-auto text-center space-y-3.5"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1
            className="text-[2.75rem] !text-[#EFEFF5]"
            style={{ fontWeight: 400 }}
          >
            Enterprise
            <span
              className="px-1.5 bg-clip-text text-transparent"
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
            className=""
            style={{
              fontFamily: "Inter",
              fontSize: "1.125rem",
              fontStyle: "normal",
              fontWeight: 300,
              lineHeight: "120%",
              letterSpacing: "0.28px",
              color: "#E0DFEC",
              opacity: 0.9,
            }}
          >
            WalledAI’s guardrails provide customizable on-premises protection
            for AI systems <br /> to enable effortless compliance, safety, and
            data security
          </p>
          <motion.div
            className="flex items-center justify-center gap-3.5"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          >
            <Link
              className="px-[3rem] py-2.5 flex items-center justify-center text-sm text-white border-[0px] !border-none rounded-[4px] transition-all duration-500"
              style={{
                border: "none",
                background:
                  "linear-gradient(92.82deg, #F93C52 -56.34%, #2B21F3 130.6%)",
              }}
              href="#contactEmailSection"
            >
              <button className="pt-1 border-none">Start for Free</button>
            </Link>
            <Link
              className="px-8 py-2.5 flex items-center justify-center text-sm text-white  rounded-[4px] border border-white transition-all duration-500"
              href="#contactEmailSection"
            >
              <button className="pt-1">Request For Demo</button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
      <Diagram />
    </section>
  );
}
