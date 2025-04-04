"use client";
import Image from "next/image";
import Link from "next/link";
import footer_sections from "./partial/sections";
import { usePathname } from "next/navigation";
import axios from "axios";
import baseUrl from "@/utils/baseUrl";
import { useEffect, useState } from "react";

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
  const socialIcons: SocialIcon[] = [
    // { src: "/icons/twiter.svg", alt: "Twitter", href: "https://twitter.com" },
    {
      src: "/icons/linked_in.svg",
      alt: "LinkedIn",
      href: "https://www.linkedin.com/company/walled-ai/",
    },
  ];

  const currentYear = new Date().getFullYear();

  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [contacted, setContacted] = useState(false);
  const [contactIsProcessing, setContactIsProcessing] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState<boolean>(false);
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
        "Thanks for showing your interest. We will be in touch soon!"
      );
      setIsError(false);
      return res;
    } catch (error: any) {
      setResponseMessage(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
      setIsError(true);
      console.log("error", error);
      setContactIsProcessing(false);
    }
  };

  return (
    <footer
      className={`hidden md:block relative bg-[#E0DEEC] py-12 sm:py-16 lg:py-20 !bg-center !bg-cover !bg-no-repeat !space-y-5 overflow-hidden`}
      style={{
        background: `url('/footer_bg.svg')`,
      }}
    >
      <div className="absolute top-0 -left-20 siz-[25rem] rounded-full bg-fuchsia-400 opacity-25 blur-[100px]"></div>

      <div className="!space-y-5">
        {/* CTA Section */}
        <div className="text-center !space-y-1 py-3.5">
          <h2 className="!text-[2.75rem] " style={{ fontWeight: 400 }}>
            <span
              className="px-1.5 bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(92.82deg, rgb(249, 60, 82) -56.34%, rgb(43, 33, 243) 130.6%)  ",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Get Started
            </span>
            Without Serious Commitments
          </h2>
          <p
            className="text-sm sm:text-base text-center"
            style={{
              color: "#323150",
              fontFamily: "Inter",
              fontWeight: 400,
              lineHeight: "120%",
              letterSpacing: "-0.72px",
            }}
          >
            Try out WalledAI&apos;s capabilities today <br /> with our free
            trial for first-time customers.
          </p>
        </div>
        {contacted ? (
          <div
            className="text-green-600 text-center"
            style={{ color: "#4b25da", fontSize: "1em" }}
          >
            Thanks for showing your interest. We will be in touch with you soon.
          </div>
        ) : null}
        <div
          id="contactEmailSection"
          className="bg-[#EEEEF4] px-3.5 py-2.5 rounded-md flex flex-col sm:flex-row gap-5 max-w-3xl mx-auto"
        >
          <>
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              placeholder="yourname@email.com"
              className="flex-grow px-2.5 py-0.5 pt-1.5 border-none outline-none"
            />
            <button
              className="px-8 py-1.5 flex items-center justify-center !text-sm text-white !rounded-sm transition-all duration-500"
              style={{
                background:
                  "linear-gradient(92.82deg, #F93C52 -56.34%, #2B21F3 130.6%)",
              }}
              onClick={submit}
            >
              <button className="pt-1">
                {!contactIsProcessing ? "Start for Free" : "Processing..."}
              </button>
            </button>
          </>
        </div>
      </div>
      {/* Footer Links */}
      <div className="pt-14 container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
        {/* Logo and Social */}
        <div className="lg:col-span-2 flex flex-col gap-3.5">
          <Link href="/" className="inline-block">
            <Image
              src="/images/walledailogo.png"
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
          <p
            className="text-sm"
            style={{
              color: "#323150",
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
              className="!text-lg"
              style={{
                color: "#323150",
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
                    className="!text-sm !font-light !text-[#323050] hover:underline transition-all duration-300"
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
