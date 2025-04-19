"use client";

import ProprietaryResearch from "@/components/home_page/ProprietaryResearch";
import ProtectionProcess from "@/components/home_page/ProtectionProcess";
import WelcomeBanner from "@/components/home_page/WelcomeBanner";
import ReasonToTry from "@/components/home_page/ReasonToTry";
import Backed_By from "@/components/home_page/Backed_By";
import Fidelity from "@/components/home_page/Fidelity";
import DeploymentGuardrails from "@/components/home_page/DeploymentGuardrails";
import BestInClass from "@/components/home_page/BestInClass";

export default function Page() {
  return (
    <div className="relative bg-[#141220]">
      <div className="sticky top-0 z-10">
        <WelcomeBanner />
      </div>
      <div className="relative z-20 mt-[-100px]">
        <ProtectionProcess />
        <Backed_By />
        <Fidelity />
        <DeploymentGuardrails />
        <BestInClass />
        <ProprietaryResearch />
        <ReasonToTry />
        {/* <CompanyTestamonials />
        <InsightsOnResearch /> */}
      </div>
    </div>
  );
}
