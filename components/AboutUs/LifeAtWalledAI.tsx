import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function LifeAtWalledAI() {
  return (
    <>
      <section className="overflow-hidden bg-[#E0DFEC] !bg-cover !bg-center !bg-no-repeat py-20">
        <div className="relative container mx-auto flex flex-col items-center gap-10 md:flex-row md:justify-center md:gap-20">
          <div className="relative hidden md:block md:w-1/2">
            <Image
              className="w-full"
              src="/about-us/life.png"
              width={500}
              height={450}
              alt="Fidelity Chat"
            />
          </div>
          <div className="space-y-3.5">
            <h2
              className="!text-[2.75rem] !text-[#323150]"
              style={{ fontWeight: 400, letterSpacing: "-1px" }}
            >
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(92.82deg, rgb(249, 60, 82) -56.34%, rgb(43, 33, 243) 130.6%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Life{" "}
              </span>
              at WalledAI
            </h2>
            <div className="relative block pb-5 md:hidden md:w-1/2">
              <Image
                className="w-full"
                src="/about-us/life.png"
                width={500}
                height={450}
                alt="Fidelity Chat"
              />
            </div>
            <div className="!space-y-5 !text-[1.125rem]">
              <p
                className="max-w-md leading-5"
                style={{ fontFamily: "Inter", fontWeight: 375 }}
              >
                Life at WalledAI is a series of endless innovations, exciting
                research, and well-deserved escapes from path breaking work.
              </p>
            </div>
          </div>

          <div className="absolute top-3/4 right-full h-[500px] w-[500px] rounded-full bg-purple-300 opacity-50 blur-3xl"></div>
          <div className="absolute top-3/4 left-full h-[500px] w-[500px] rounded-full bg-purple-300 opacity-50 blur-3xl"></div>
        </div>
      </section>
    </>
  );
}
