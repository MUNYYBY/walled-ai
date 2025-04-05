import Image from "next/image";
import React from "react";

export default function MessionAndVision() {
  return (
    <section
      className="overflow-hidden bg-[#E0DEEC] !bg-cover !bg-center !bg-no-repeat pb-12 sm:pb-16 lg:pb-20"
      style={{
        background: `url('/home_page/fidelity_bg.svg')`,
      }}
    >
      <div className="relative container mx-auto flex flex-col items-center gap-4 md:flex-row md:justify-center">
        <div className="w-full rounded-3xl bg-[#EFEFF5] p-1 md:h-88 md:w-1/2">
          <div className="relative h-66 overflow-hidden rounded-3xl">
            <Image
              className="h-full w-full object-cover"
              src="/about-us/MESSION.svg"
              width={450}
              height={450}
              alt="Mission"
            />
          </div>
          <div className="flex flex-col px-3 pt-2">
            <h4>Mission</h4>
            <p className="!-mt-3">
              Enable safe, reliable, and impartial AI systems
            </p>
          </div>
        </div>
        <div className="w-full rounded-3xl bg-[#EFEFF5] p-1 md:h-88 md:w-1/2">
          <div className="relative h-[15.8rem] overflow-hidden rounded-3xl">
            <Image
              className="h-full w-full object-cover"
              src="/about-us/VISION.svg"
              width={450}
              height={450}
              alt="Vision"
            />
          </div>
          <div className="flex flex-col px-3 pt-2">
            <h4>Vision</h4>
            <p className="!-mt-3">
              A better AI-enabled world made possible without compromising
              safety, security, and ethics
            </p>
          </div>
        </div>
        <Image
          className="absolute top-full left-full"
          src="/home_page/backed_by/bg_pattern.svg"
          width={500}
          height={450}
          alt="Background Pattern"
        />
        <div className="absolute top-3/4 left-full h-[500px] w-[500px] rounded-full bg-purple-300 opacity-50 blur-3xl"></div>
      </div>
    </section>
  );
}
