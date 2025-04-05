"use client";
import Image from "next/image";
import Link from "next/link";
import footer_sections from "./partial/sections";
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
      className={`relative !space-y-5 overflow-hidden bg-[#E0DEEC] !bg-cover !bg-center !bg-no-repeat py-20`}
      style={{
        background: `url('/footer_bg.svg')`,
      }}
    >
      <div className="container !space-y-5">
        {/* CTA Section */}
        <div className="!space-y-1 py-3.5 text-center">
          <h2 className="!text-[2.75rem]" style={{ fontWeight: 400 }}>
            <span
              className="bg-clip-text px-1.5 text-transparent"
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
            className="text-center text-sm sm:text-base"
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
            className="text-center text-green-600"
            style={{ color: "#4b25da", fontSize: "1em" }}
          >
            Thanks for showing your interest. We will be in touch with you soon.
          </div>
        ) : null}
        <div
          id="contactEmailSection"
          className="mx-auto flex max-w-3xl flex-col gap-5 rounded-md bg-[#EEEEF4] px-3.5 py-2.5 sm:flex-row"
        >
          <>
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              placeholder="yourname@email.com"
              className="flex-grow border-none px-2.5 py-0.5 pt-1.5 outline-none"
            />
            <button
              className="flex items-center justify-center !rounded-sm px-8 py-1.5 !text-sm text-white transition-all duration-500"
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
      <div className="container mx-auto grid grid-cols-2 gap-10 pt-14 md:grid-cols-2 lg:grid-cols-6">
        {/* Logo and Social */}
        <div className="col-span-2 flex flex-col gap-3.5">
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
                    className="!text-sm !font-light !text-[#323050] transition-all duration-300 hover:underline"
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
