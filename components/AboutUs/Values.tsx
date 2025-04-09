import Image from "next/image";
import Link from "next/link";

export default function Values() {
  return (
    <>
      <section
        className="flex flex-col items-center gap-10 overflow-hidden !bg-cover !bg-center !bg-no-repeat py-20"
        style={{
          background: `url('/home_page/comparison_bg.svg')`,
        }}
      >
        <div className="container flex flex-col items-center gap-10">
          <div className="item-start flex flex-col !gap-[0.5rem] md:items-center">
            <h2
              className="text-center !text-[2.35rem] -tracking-wide !text-[#EFEFF5] md:!text-[2.75rem]"
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
                Values
              </span>{" "}
              that Drive Us
            </h2>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex w-full flex-col items-center justify-between rounded-[2rem] !bg-[#28273F] p-1 pt-4 md:h-96 lg:flex-row lg:!pt-1">
              <div className="px-4 !text-white md:px-10">
                <h3>Endless Innovation</h3>
                <p>
                  We believe in endless innovation to achieve AI security
                  breakthroughs and build better products everyday.
                  <br />
                  <br />  We reinforce this conviction through a culture of
                  continuous learning, and a can-do attitude that lets us take
                  on the toughest challenges in AI security.
                </p>
              </div>

              <Image
                src={"/about-us/values/value-1.svg"}
                alt={"Value"}
                width={50}
                height={185}
                className="h-full w-full rounded-[2rem] object-cover md:w-1/2"
              />
            </div>
            <div className="flex flex-col items-center justify-center gap-2 lg:flex-row">
              <div className="flex w-full flex-col items-center justify-start gap-4 rounded-[2rem] !bg-[#28273F] p-1 lg:h-[31rem]">
                <div className="w-full overflow-hidden !rounded-[2rem] lg:h-72">
                  <Image
                    src={"/about-us/values/value-2.svg"}
                    alt={"Value"}
                    width={50}
                    height={185}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="px-4 !text-white lg:px-10">
                  <h3>Creation through Collaboration</h3>
                  <p>
                    Great work only happens when great minds come together.
                    Beyond our professional achievements and proprietary
                    breakthroughs lies extensive collaboration, knowledge
                    sharing, and open communication.
                  </p>
                </div>
              </div>
              <div className="flex w-full flex-col items-center justify-start gap-4 rounded-[2rem] !bg-[#28273F] p-1 lg:h-[31rem]">
                <div className="w-full overflow-hidden !rounded-[2rem] lg:h-72">
                  <Image
                    src={"/about-us/values/value-3.svg"}
                    alt={"Value"}
                    width={50}
                    height={185}
                    className="h-full w-full rounded-[2rem] object-cover"
                  />
                </div>
                <div className="px-4 !text-white lg:px-10">
                  <h3>People over Processes</h3>
                  <p>
                    Great work only happens when great minds come together. The
                    work we do is not possible without passionate people and
                    their ingenuity. That’s why we prioritize people over
                    processes and give them the space and resources necessary to
                    aid the next AI breakthrough.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
