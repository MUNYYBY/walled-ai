import ProprietaryResearch from "@/components/home_page/ProprietaryResearch";
import ProtectionProcess from "@/components/home_page/ProtectionProcess";
import Deployment from "@/components/home_page/DeploymentGuardrails";
import WelcomeBanner from "@/components/home_page/WelcomeBanner";
import ReasonToTry from "@/components/home_page/ReasonToTry";
import Backed_By from "@/components/home_page/Backed_By";
import Fidelity from "@/components/home_page/Fidelity";

export default function Page() {
  return (
    <div className="bg-[#141220]">
      <WelcomeBanner />
      <ProtectionProcess />
      <Backed_By />
      <Fidelity />
      <Deployment />
      <ProprietaryResearch />
      <ReasonToTry />
    </div>
  );
}
