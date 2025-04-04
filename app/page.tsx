import ProprietaryResearch from "@/components/home_page/ProprietaryResearch";
import ProtectionProcess from "@/components/home_page/ProtectionProcess";
import Deployment from "@/components/home_page/DeploymentGuardrails";
import WelcomeBanner from "@/components/home_page/WelcomeBanner";
import ReasonToTry from "@/components/home_page/ReasonToTry";
import Backed_By from "@/components/home_page/Backed_By";
import Fidelity from "@/components/home_page/Fidelity";

export default function Page() {
  return (
    <>
      {/* Hide on all screens below lg */}
      <div className="hidden md:block bg-[#141220]">
        <WelcomeBanner />
        <ProtectionProcess />
        <Backed_By />
        <Fidelity />
        <Deployment />
        <ProprietaryResearch />
        <ReasonToTry />
      </div>
      <div className="min-h-screen md:hidden flex items-center justify-center text-center">
        <span className="text-3xl px-4">
          Coming soon on mobile. Visit{" "}
          <a
            href="https://www.walled.ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            www.walled.ai
          </a>{" "}
          on your PC for the desktop version.
        </span>
      </div>
    </>
  );
}
