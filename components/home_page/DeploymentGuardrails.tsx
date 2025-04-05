import Image from "next/image";
import SectionTitle from "../common/SectionTitile";
import Link from "next/link";

export default function DeploymentGuardrails() {
  return (
    <>
      <section
        className="flex flex-col items-center gap-10 bg-[#E0DEEC] !bg-cover !bg-no-repeat py-12 sm:py-16 lg:py-20"
        style={{
          background: `url('/home_page/deployment_bg.svg')`,
        }}
      >
        <div className="container flex flex-col items-center gap-10">
          <div className="flex flex-col items-center">
            <div className="space-y-3.5">
              <h2
                className="!text-[2.75rem] -tracking-wide !text-[#323150]"
                style={{ fontWeight: 400 }}
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
                  Flexible
                </span>{" "}
                Deployments that Fit Right In
              </h2>
            </div>
            <p
              className="text-center !text-[1.125rem] leading-5"
              style={{ fontFamily: "Inter", fontWeight: 400 }}
            >
              WalledAI further supports both collective and standalone
              deployments of guardrails to suit complex enterprise setups.{" "}
              <br />
              Adopt our entire ecosystem of Guardrails for complete AI security
              or cherry pick modules that meet your needs for more fine-grained
              control.
            </p>
          </div>
          <Image
            src={"/home_page/deployments.svg"}
            width={1050}
            height={450}
            alt=""
          />
          <p
            className="text-center !text-[1.125rem]"
            style={{ fontFamily: "Inter", fontWeight: 375 }}
          >
            <Link className="!text-[#2B21F3] !underline" href={"/coming-soon"}>
              Connect with our experts
            </Link>{" "}
            to explore the ideal guardrail setup for your use case
          </p>
        </div>
      </section>
      <section
        className="flex flex-col items-center gap-10 overflow-hidden !bg-cover !bg-center !bg-no-repeat py-12 sm:py-16 lg:py-20"
        style={{
          background: `url('/home_page/comparison_bg.svg')`,
        }}
      >
        <div className="container flex flex-col items-center gap-10">
          <div className="flex flex-col items-center !gap-[0.5rem]">
            <h2
              className="!text-[2.75rem] -tracking-wide !text-[#EFEFF5]"
              style={{ fontWeight: 400, margin: 0 }}
            >
              <span
                className="!mr-2 bg-clip-text text-white"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #F93C52, #2B21F3)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Best-In-Class
              </span>
              Metrics that Beat Popular Alternatives
            </h2>
            <p
              className="text-center leading-5 !text-[#EFEFF5]"
              style={{ fontFamily: "Inter", fontWeight: 300, margin: 0 }}
            >
              WalledAI is demonstrably superior to similar solutions in terms of{" "}
              <br />
              speed, accuracy, and reliability.
            </p>

            <p
              className="!mt-2 max-w-6xl text-base text-[1.5rem] text-white"
              style={{ fontWeight: 300, fontFamily: "Anek Devanagari" }}
            >
              Make the switch to enjoy sturdier AI protection that provides more
              bang for your buck.
            </p>
            <Link
              className="flex items-center justify-center rounded-[4px] border-[1.75px] border-[#A1A0C5] px-4 py-2.5 text-sm !text-[#EFEFF5] no-underline hover:no-underline"
              href={"/coming-soon"}
            >
              <button
                className=""
                style={{
                  fontFamily: "Inter",
                  fontWeight: 300,
                }}
              >
                Grab a FREE Demo to experience the difference for yourself{" "}
                {"->"}
              </button>
            </Link>
          </div>
          <Image
            src={"/home_page/deploy_graph.svg"}
            width={1050}
            height={450}
            alt=""
          />
          <div className="flex items-center gap-[1rem]">
            {[
              { color: "#F46E56", label: "No Guardrails" },
              { color: "#756EF7", label: "Other Guardrails" },
              {
                color:
                  "linear-gradient(93deg, #F93C52 -56.34%, #2B21F3 130.6%)",
                label: "Walled AI Guardrails",
              },
            ].map((_, i) => (
              <div key={i} className="flex !items-center gap-[0.35rem]">
                <div
                  className={`size-[1rem] rounded-full`}
                  style={{ background: _.color }}
                />
                <span
                  className="pt-2 !text-[#EFEFF5]"
                  style={{ fontWeight: 300 }}
                >
                  {_.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
