"use client";
import nav_links from "./partial/nav_links";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import clsx from "clsx";

export default function NavBar() {
  const [scrollY, setScrollY] = useState<number>(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    // Initial check
    handleResize();

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <motion.header
        className={clsx(
          "fixed inset-x-0 top-0 mx-auto flex h-fit flex-col justify-center backdrop-blur-xl",
          scrollY > 0 ? "w-full md:w-[72.5%]" : "w-full",
          "z-50 rounded-[1px] transition-all duration-300",
          "border-[2px solid rgb(186, 52, 131)]",
          scrollY > 0 ? "md:rounded-b-[16px]" : "rounded-none",
        )}
        style={{
          background: scrollY > 0 ? "rgba(14, 12, 24)" : "rgba(14, 12, 24, 1)",
        }}
      >
        <nav
          className={`container flex items-center justify-between rounded px-3.5 py-3 font-normal transition-all duration-500 md:py-2.5`}
        >
          <Link href={"/"} className="flex items-center">
            <Image
              className="size-6 md:size-9"
              src={"/images/whiteLogo.svg"}
              height={42.5}
              width={42.5}
              alt="Walled Ai"
              style={{
                marginRight: "0.5rem",
              }}
            />
            <Image
              className={`origin-left ${
                scrollY > 0 ? "w-24 md:w-[0] md:opacity-0" : "w-24 opacity-100"
              } overflow-hidden transition-all duration-500`}
              src={"/images/logoTxt.svg"}
              height={20}
              width={100}
              alt="Walled Ai"
            />
          </Link>

          {/* Desktop Navigation */}
          <div
            className="hidden items-center text-[1.125rem] lg:flex"
            style={{ gap: "0.85rem" }}
          >
            {nav_links.map((nav_link, i) => (
              <Link
                key={i}
                href={nav_link.path}
                className={`!text-sm !text-[1.125rem] !text-[#EFEFF5] transition-all duration-500 !outline-none hover:no-underline`}
                style={{
                  fontFamily: "Inter",
                  fontWeight: 300,
                  lineHeight: "120%" /* 21.6px */,
                  letterSpacing: "-0.72px",
                }}
              >
                {nav_link.title}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div
            className="hidden items-center md:flex"
            style={{ gap: "1.5rem" }}
          >
            <Link
              className={`pt-2 text-[1.125rem] text-white !no-underline transition-all duration-500 hover:no-underline`}
              href={"/login"}
            >
              Login
            </Link>
            <div className="flex items-center justify-center">
              <Link
                className={`flex items-center justify-center whitespace-pre ${
                  scrollY > 0 ? "px-4 py-[12px]" : "px-5 py-[12px]"
                } rounded-[4px] text-sm text-white transition-all duration-500`}
                href="#contactEmailSection"
                style={{
                  background:
                    "linear-gradient(92.82deg, #F93C52 -56.34%, #2B21F3 130.6%)",
                }}
              >
                <button className="translate-y-0.5 text-[14px]">
                  Start for Free
                </button>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="text-white focus:outline-none md:hidden"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 right-0 left-0 z-40 bg-[#0E0C18] md:hidden"
            style={{
              borderTop: "1px solid rgba(114, 43, 188, 1)",
              borderBottom: "1px solid rgba(114, 43, 188, 1)",
            }}
          >
            <div className="flex flex-col space-y-4 px-4 py-4">
              {nav_links.map((nav_link, i) => (
                <Link
                  key={`mobile-${i}`}
                  href={nav_link.path}
                  className={`py-2 text-white transition-all duration-500 !outline-none hover:no-underline`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {nav_link.title}
                </Link>
              ))}

              <div className="flex flex-col space-y-4 border-t border-gray-700 pt-2">
                <Link
                  className={`py-2 text-white !no-underline transition-all duration-500 hover:no-underline`}
                  href={"/login"}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  className={`flex items-center justify-center rounded-[4px] px-5 py-2 text-sm whitespace-pre text-white transition-all duration-500`}
                  href="#contactEmailSection"
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{
                    background: "linear-gradient(to right, #F93C52, #2B21F3)",
                  }}
                >
                  <button className="pt-1">Start for Free</button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
