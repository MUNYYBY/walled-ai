"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const paragraph = textRef.current;

    if (!section || !paragraph) return;

    const words = paragraph.querySelectorAll("span");

    const ctx = gsap.context(() => {
      gsap.set(words, { opacity: 0.1 });

      gsap.to(words, {
        opacity: 1,
        ease: "none",
        stagger: 0.07,
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=2000",
          scrub: true,
          pin: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const text = `WalledAI evolved as an offshoot of Rishab Bharadwaj’s PhD research at the Singapore University of Technology and Design (SUTD). Under the guidance of Prof. Soujanya Poria (PhD), Rishab had set out to understand critical issues in AI safety and fairness.

Soon, the duo’s groundbreaking work on investigating gender bias in BERT models revealed deep AI vulnerabilities. They also uncovered a host of other safety and data privacy vulnerabilities in popular state-of-the-art LLMs and AI models. 

These findings posed serious security implications that prevented large-scale AI adoption. Determined to bridge this gap between research and reality, Rishab and Prof. Soujanya set out to build safeguards that enabled mainstream AI adoption without legal, ethical, and security complications.

Months of research and multiple break-throughs later, WalledAI was formally born. Today, we stand as pioneers in AI security, ensuring that as AI continues to evolve, it remains transparent, safe, and aligned with human values.`;

  const wrappedWords = text.split(" ").map((word, i) => (
    <span
      key={i}
      style={{
        display: "inline-block",
        marginRight: "0.25ch",
        transition: "opacity 0.3s ease",
      }}
    >
      {word}
    </span>
  ));

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[url('/home_page/main_banner.svg')] bg-cover bg-center bg-no-repeat py-24 md:py-20"
    >
      <div className="container">
        <div className="z-[1] flex items-center justify-center pt-16 text-[var(--anek)] md:pt-8">
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
              Welcome to{" "}
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
              ref={textRef}
              className="!text-[1.125rem] leading-relaxed"
              style={{
                fontFamily: "Inter",
                fontWeight: 300,
                lineHeight: "160%",
                letterSpacing: "0.28px",
                color: "#E0DFEC",
                flexWrap: "wrap",
              }}
            >
              {wrappedWords}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
