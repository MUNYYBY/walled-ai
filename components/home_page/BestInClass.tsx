"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { useTheme } from "@/hooks/useTheme";
import { motion, useInView } from "framer-motion";

export default function BestInClass() {
  /** theme context */
  const { darkMode, setDarkMode } = useTheme();

  // Create a ref for the component
  const sectionRef = useRef(null);

  // Use Framer Motion's useInView hook with more sensitive settings
  const isInView = useInView(sectionRef, {
    amount: 0.3, // Very sensitive - only needs 30% to be considered "in view"
    once: false, // Continue to track visibility changes
  });

  // Update dark mode when visibility changes
  useEffect(() => {
    console.log("BestInClass visibility changed - isInView:", isInView);
    setDarkMode(isInView);
  }, [isInView, setDarkMode]); // Only depend on these two values

  return (
    <motion.section
      ref={sectionRef}
      className="flex flex-col items-center gap-10 overflow-hidden !bg-cover !bg-center !bg-no-repeat py-20"
      style={{
        background: `url('/home_page/comparison_bg.svg')`,
      }}
      id="best-in-class-section"
      // Add data attributes for debugging
      data-in-view={isInView ? "true" : "false"}
      data-dark-mode={darkMode ? "true" : "false"}
    >
      <div className="container flex flex-col items-center gap-10">
        <div className="item-start flex flex-col !gap-[0.5rem] md:items-center">
          <h2
            className="text-center !text-[2.35rem] -tracking-wide !text-[#EFEFF5] md:!text-[2.75rem]"
            style={{ fontWeight: 400, margin: 0 }}
          >
            <span
              className="!mr-2 bg-clip-text text-white"
              style={{
                backgroundImage: "linear-gradient(to right, #F93C52, #2B21F3)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Best-In-Class
            </span>
            Metrics that Beat Popular Alternatives
          </h2>
          <p
            className="text-center leading-5 !text-[#EFEFF5]"
            style={{ fontFamily: "Inter", fontWeight: 300, margin: 0 }}
          >
            WalledAI is demonstrably superior to similar solutions in terms of{" "}
            <br />
            speed, accuracy, and reliability.
          </p>

          <p
            className="!mt-2 max-w-6xl text-center text-base text-[1.5rem] text-white"
            style={{ fontWeight: 300, fontFamily: "Anek Devanagari" }}
          >
            Make the switch to enjoy sturdier AI protection that provides more
            bang for your buck.
          </p>
          <Link
            className="flex items-center justify-center rounded-[4px] border-[1.75px] border-[#A1A0C5] px-4 py-2.5 text-center text-sm !text-[#EFEFF5] no-underline hover:no-underline"
            href={"#contactEmailSection"}
          >
            <button
              className=""
              style={{
                fontFamily: "Inter",
                fontWeight: 300,
              }}
            >
              Grab a FREE Demo to experience the difference for yourself {"->"}
            </button>
          </Link>
        </div>
        <Image
          src={"/home_page/deploy_graph.svg"}
          width={1050}
          height={450}
          alt=""
        />
        <div className="flex items-center gap-[1rem]">
          {[
            { color: "#F46E56", label: "No Guardrails" },
            { color: "#756EF7", label: "Other Guardrails" },
            {
              color: "linear-gradient(93deg, #F93C52 -56.34%, #2B21F3 130.6%)",
              label: "Walled AI Guardrails",
            },
          ].map((item, i) => (
            <div key={i} className="flex !items-center gap-[0.35rem]">
              <div
                className={`size-[1rem] rounded-full`}
                style={{ background: item.color }}
              />
              <span
                className="pt-2 !text-[10px] !text-[#EFEFF5] md:!text-base"
                style={{ fontWeight: 300 }}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
