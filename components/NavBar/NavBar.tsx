"use client";
import nav_links from "./partial/nav_links";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import { usePathname } from "next/navigation";

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

  const pathname = usePathname();

  if (
    pathname === "/login" ||
    pathname === "/sign-up" ||
    pathname === "/forgot" ||
    pathname === "/forgot-otp" ||
    pathname === "/change-password" ||
    pathname === "/dashboard" ||
    pathname === "/pii" ||
    pathname === "/guard-rail/playground" ||
    pathname === "/hallucination" ||
    pathname === "/coming-soon"
  ) {
    return;
  }

  return (
    <>
      <motion.header
        className={`fixed inset-x-0 top-0 hidden md:flex flex-col justify-center h-fit mx-auto backdrop-blur-xl  ${
          scrollY > 0 ? "w-[72.5%]" : "w-full"
        } rounded-[1px] transition-all duration-300 z-50`}
        style={{
          maxWidth: "1920px",
          background: scrollY > 0 ? "rgba(14, 12, 24)" : "rgba(14, 12, 24, 1)",
          borderTop: "2px solid rgb(186, 52, 131)",
          borderRadius: scrollY > 0 ? "0px 0px 16px 16px" : "0",
        }}
      >
        <nav
          className={`px-3.5 py-2.5 container flex items-center justify-between font-normal rounded transition-all duration-500`}
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
                scrollY > 0 ? "w-[0] opacity-0" : "w-24 opacity-100"
              } overflow-hidden transition-all duration-500`}
              src={"/images/logoTxt.svg"}
              height={20}
              width={100}
              alt="Walled Ai"
            />
          </Link>

          {/* Desktop Navigation */}
          <div
            className="hidden md:flex items-center text-[18px]"
            style={{ gap: "0.85rem" }}
          >
            {nav_links.map((nav_link, i) => (
              <Link
                key={i}
                href={nav_link.path}
                className={`!text-sm md:!text-base !text-[#EFEFF5] hover:no-underline !outline-none transition-all duration-500`}
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
          <div className="hidden md:flex items-center" style={{ gap: "2rem" }}>
            {/*<Link
              className={`!no-underline text-white hover:no-underline transition-all duration-500`}
              href={"/login"}
            >
              Login
            </Link>*/}
            <div className="flex justify-center items-center">
              <Link
                className={`whitespace-pre flex items-center justify-center ${
                  scrollY > 0 ? "py-2 px-4" : "py-2 px-5"
                } text-sm text-white rounded-[4px] transition-all duration-500`}
                href="#contactEmailSection"
                style={{
                  background:
                    "linear-gradient(92.82deg, #F93C52 -56.34%, #2B21F3 130.6%)",
                }}
              >
                <button className="translate-y-0.5">Start for Free</button>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white focus:outline-none"
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
            className="fixed top-16 left-0 right-0 bg-[#0E0C18] z-40 md:hidden"
            style={{
              borderTop: "1px solid rgba(114, 43, 188, 1)",
              borderBottom: "1px solid rgba(114, 43, 188, 1)",
            }}
          >
            <div className="flex flex-col px-4 py-4 space-y-4">
              {nav_links.map((nav_link, i) => (
                <Link
                  key={`mobile-${i}`}
                  href={nav_link.path}
                  className={`text-white hover:no-underline !outline-none transition-all duration-500 py-2`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {nav_link.title}
                </Link>
              ))}

              <div className="flex flex-col space-y-4 pt-2 border-t border-gray-700">
                <Link
                  className={`!no-underline text-white hover:no-underline transition-all duration-500 py-2`}
                  href={"/login"}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  className={`whitespace-pre flex items-center justify-center py-2 px-5 text-sm text-white rounded-[4px] transition-all duration-500`}
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
