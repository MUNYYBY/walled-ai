"use client";
import Image from "next/image";
import Link from "next/link";
import footer_sections from "./partial/sections";
import axios from "axios";
import baseUrl from "@/utils/baseUrl";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "@/hooks/useTheme";
import clsx from "clsx";

interface SocialIcon {
  src: string;
  alt: string;
  href?: string;
}
declare global {
  interface Window {
    grecaptcha: any;
  }
}

export default function Footer() {
  //** theme context */
  const theme = useTheme();
  const { darkMode } = theme;

  const socialIcons: SocialIcon[] = [
    { src: "/icons/twiter.svg", alt: "Twitter", href: "https://twitter.com" },
    {
      src: "/icons/linked_in.svg",
      alt: "LinkedIn",
      href: "https://www.linkedin.com/company/walled-ai/",
    },
  ];

  const currentYear = new Date().getFullYear();

  const [email, setEmail] = useState("");
  const [contacted, setContacted] = useState(false);
  const [contactIsProcessing, setContactIsProcessing] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState<boolean>(false);

  //** router */
  const pathname = usePathname();

  useEffect(() => {
    // Load reCAPTCHA script dynamically
    const script = document.createElement("script");
    script.src =
      "https://www.google.com/recaptcha/api.js?render=6Leb_ZIqAAAAAGk-9PPSGjRu3Z7zyylXnzC45BOG";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      window.grecaptcha.ready(() => {
        console.log("ReCAPTCHA is ready");
      });
    };
    document.body.appendChild(script);
  }, []);

  const handleReCaptchaVerify = async () => {
    return new Promise((resolve) => {
      if (window.grecaptcha) {
        window.grecaptcha
          .execute("6Leb_ZIqAAAAAGk-9PPSGjRu3Z7zyylXnzC45BOG", {
            action: "submit",
          })
          .then((token: string) => {
            setRecaptchaToken(token);
            resolve(token);
          })
          .catch((error: any) => {
            resolve(null);
          });
      } else {
        resolve(null);
      }
    });
  };

  const submit = async () => {
    const token = await handleReCaptchaVerify();
    setContactIsProcessing(true);
    setResponseMessage(null);
    setIsError(false);

    const payload = {
      email: email,
      recaptchaToken: token,
    };
    console.log("PayLoad", payload);
    try {
      const res = await axios.post(`${baseUrl}/mail/contactus`, payload);
      if (res.status === 400) {
        throw new Error("Not Found");
      }
      setContacted(true);
      setEmail("");
      setContactIsProcessing(false);
      setResponseMessage(
        "Thanks for showing your interest. We will be in touch soon!",
      );
      setIsError(false);
      return res;
    } catch (error: any) {
      setResponseMessage(
        error.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
      setIsError(true);
      console.log("error", error);
      setContactIsProcessing(false);
    }
  };

  return (
    <footer
      className={clsx(
        `relative !space-y-5 overflow-hidden !bg-cover !bg-center !bg-no-repeat py-20 transition-all duration-500`,
        darkMode ? "bg-[#141320]" : "bg-[#E0DEEC]",
      )}
    >
      <div className="absolute top-0 -left-20 z-1 md:left-0 md:size-[50%]">
        <Image
          src="/home_page/deployment_bg-mobile.svg"
          height={100}
          width={100}
          className={clsx(
            "h-full w-full object-cover",
            darkMode && "opacity-10",
          )}
          alt="bg"
        />
      </div>
      <div className="absolute top-0 -right-20 z-1 md:right-0 md:size-[50%]">
        <Image
          src="/home_page/deployment_bg-mobile.svg"
          height={100}
          width={100}
          className={clsx(
            "h-full w-full scale-x-[-1] object-cover",
            darkMode && "opacity-10",
          )}
          alt="bg"
        />
      </div>
      <div className="relative z-10 container !space-y-5">
        {/* CTA Section */}
        <div className="flex flex-col items-center justify-center !space-y-1 py-3.5 text-center">
          <h2
            className={clsx(
              "!text-[2.15rem] md:!text-[2.75rem]",
              darkMode ? "!text-[#F5F5F7]" : "",
            )}
            style={{ fontWeight: 400 }}
          >
            {pathname === "/about-us" ? "Lets's" : ""}
            <span
              className="bg-clip-text px-1.5 text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(92.82deg, rgb(249, 60, 82) -56.34%, rgb(43, 33, 243) 130.6%)  ",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {pathname === "/about-us" ? "Build" : "Get Started"}
            </span>
            {pathname === "/about-us"
              ? "Better AI?"
              : "Without Serious Commitments"}
          </h2>
          <p
            className={clsx(
              "w-full max-w-lg text-center text-sm sm:text-base",
              darkMode ? "!text-[#E0E0E6]" : "text-[#323150]",
            )}
            style={{
              fontFamily: "Inter",
              fontWeight: 400,
              lineHeight: "120%",
              letterSpacing: "-0.72px",
            }}
          >
            {pathname === "/about-us" ? (
              "If WalledAI aligns with your values, get in touch to discuss potential partnerships and path-breaking AI security solutions for your business."
            ) : (
              <>
                Try out WalledAI&apos;s capabilities today <br /> with our free
                trial for first-time customers.
              </>
            )}
          </p>
        </div>
        {contacted ? (
          <div
            className="text-center"
            style={{
              color: darkMode ? "#8A84FD" : "#4b25da",
              fontSize: "1em",
            }}
          >
            Thanks for showing your interest. We will be in touch with you soon.
          </div>
        ) : null}
        <div
          id="contactEmailSection"
          className={clsx(
            "mx-auto flex max-w-3xl flex-row items-center justify-between rounded-md px-3.5 py-2.5 md:gap-5",
            darkMode ? "bg-[#272638]" : "bg-[#EEEEF4]",
          )}
        >
          <>
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              placeholder="yourname@email.com"
              className={clsx(
                "border-none px-2.5 py-0.5 pt-1.5 outline-none",
                darkMode ? "bg-[#272638] !text-[#E0E0E6]" : "bg-[#EEEEF4]",
              )}
            />
            <button
              className="flex items-center justify-center !rounded-sm px-2 pt-2 pb-1 !text-xs text-white transition-all duration-500 md:px-8 md:!text-sm"
              style={{
                background:
                  "linear-gradient(92.82deg, #F93C52 -56.34%, #2B21F3 130.6%)",
              }}
              onClick={submit}
            >
              {!contactIsProcessing ? "Start for Free" : "Processing..."}
            </button>
          </>
        </div>
      </div>
      {/* Footer Links */}
      <div className="container mx-auto grid grid-cols-2 gap-10 pt-14 md:grid-cols-2 lg:grid-cols-6">
        {/* Logo and Social */}
        <div className="col-span-2 flex flex-col gap-3.5">
          <div className="flex w-full flex-row items-center justify-between md:!flex-col md:items-start">
            <Link href="/" className="inline-block">
              <Image
                src={
                  darkMode
                    ? "/images/walledailogo_dark.png"
                    : "/images/walledailogo.png"
                }
                width={200}
                height={50}
                alt="Walled AI"
                className="h-10 w-auto"
                priority
              />
            </Link>
            <div className="!mt-3 flex items-center gap-1.5">
              {socialIcons.map((icon, index) => (
                <Link
                  key={index}
                  href={icon.href || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className=""
                  aria-label={icon.alt}
                >
                  <Image
                    src={icon.src}
                    width={24}
                    height={24}
                    alt={icon.alt}
                    className="size-6"
                  />
                </Link>
              ))}
            </div>
          </div>
          <p
            className={clsx(
              "text-sm",
              darkMode ? "!text-[#E0E0E6]" : "!text-[#323150]",
            )}
            style={{
              fontFamily: "Inter",
              fontWeight: 300,
              lineHeight: "120%" /* 21.6px */,
              letterSpacing: "-0.72px",
            }}
          >
            © Walled AI {currentYear}.
          </p>
        </div>

        {/* Navigation Links */}
        {footer_sections.map((section, index) => (
          <div key={index} className="space-y-4">
            <h3
              className={clsx(
                "!text-lg",
                darkMode ? "!text-[#F5F5F7]" : "!text-[#323150]",
              )}
              style={{
                fontFamily: "Inter",
                fontWeight: 500,
                lineHeight: "120%" /* 21.6px */,
                letterSpacing: "-0.72px",
              }}
            >
              {section.title}
            </h3>
            <ul className="!space-y-1.5">
              {section.links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <Link
                    href={link.href}
                    className={clsx(
                      "!text-sm !font-light transition-all duration-300 hover:underline",
                      darkMode ? "!text-[#E0E0E6]" : "!text-[#323050]",
                    )}
                    style={{
                      /* Inter 18px/Light - Body Text */
                      fontFamily: "Inter",
                      fontWeight: 300,
                      lineHeight: "120%" /* 21.6px */,
                      letterSpacing: "-0.72px",
                    }}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}
