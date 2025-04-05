import HeroSection from "@/components/AboutUs/HeroSection";
import MessionAndVision from "@/components/AboutUs/MessionAndVision";
import BackedBy from "@/components/home_page/Backed_By";
import React from "react";

export default function AboutUs() {
  return (
    <div className="bg-[#141220]">
      <HeroSection />
      <BackedBy text="Backed By the Very Best in AI" />
      <MessionAndVision />
    </div>
  );
}
