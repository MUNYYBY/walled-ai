import HeroSection from "@/components/AboutUs/HeroSection";
import LifeAtWalledAI from "@/components/AboutUs/LifeAtWalledAI";
import MessionAndVision from "@/components/AboutUs/MessionAndVision";
import Team from "@/components/AboutUs/Team";
import Values from "@/components/AboutUs/Values";
import BackedBy from "@/components/home_page/Backed_By";
import React from "react";

export default function AboutUs() {
  return (
    <div className="bg-[#141220]">
      <HeroSection />
      <BackedBy text="Backed By the Very Best in AI" />
      <MessionAndVision />
      <Team />
      <Values />
      <LifeAtWalledAI />
    </div>
  );
}
