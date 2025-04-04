"use client";

// import MotionTrailArrow from "./MotionTrailArrow";
import Image from "next/image";

export default function Diagram() {
  const icons = [
    "/icons/unlock.svg",
    "/icons/unlock (1).svg",
    "/icons/unlock (2).svg",
    "/icons/unlock (3).svg",
  ];

  return (
    <section className="pt-20 container mx-auto flex items-center justify-center">
      <Image
        width={1000}
        height={700}
        src={"/diagram/diagram.svg"}
        alt=""
        className="min-w-full"
      />

      {/* <div
        className="w-[450px] mx-auto bg-[#28273F] flex items-center justify-center"
        style={{
          gap: "0.5rem",
          borderRadius: "999px",
          padding: "0.75rem 3.5rem",
        }}
      >
        {icons?.map((icon, i) => (
          <div
            key={i}
            className="bg-[#0A0A10]"
            style={{
              width: "45px", // Set equal width & height
              height: "45px",
              borderRadius: "999px",
              boxShadow: "1.5px -1.25px 0.5px rgba(71, 62, 244, 0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image className="" src={icon} height={26} width={26} alt="" />
          </div>
        ))}
      </div>

      <div className="mt-[3.5rem] grid grid-cols-11 items-center gap-x-[1.25rem] gap-y-[3.5rem]">
        <div className="relative w-fit">
          <div
            className="relative bg-[#28273D] flex items-center justify-center rounded-[0.5rem] border-[1.75px] border-[#323150] z-[1]"
            style={{ padding: "0.65rem 0.85rem", zIndex: 5 }}
          >
            <Image
              className="z-10"
              src={`/diagram/user.svg`}
              height={50}
              width={50}
              alt=""
            />
          </div>
          <MotionTrailArrow className="absolute left-full top-1/2" />
        </div>

        <div className="z-[1]">
          <div className="flex flex-col items-center justify-center">
            <span className="text-[0.5rem] text-white whitespace-pre">
              User Promt
            </span>
            <svg
              className="fill-[#8281B1]"
              width="4.5rem"
              height="2.75rem"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#141220"
            >
              <path
                d="M885.746 741.427H514.972l-105.37 105.395c-0.788 0.764-1.77 1.09-2.623 1.726-0.787 0.59-1.333 1.42-2.228 1.922-0.416 0.218-0.875 0.218-1.29 0.416-1.53 0.742-3.08 1.158-4.718 1.55-1.224 0.284-2.404 0.614-3.627 0.7-1.551 0.11-3.037-0.086-4.566-0.306-1.376-0.195-2.709-0.35-4.042-0.786-1.2-0.416-2.292-1.028-3.43-1.64-1.551-0.808-2.971-1.683-4.304-2.862-0.35-0.306-0.787-0.414-1.114-0.72-0.547-0.548-0.745-1.268-1.224-1.836-0.72-0.875-1.66-1.508-2.25-2.492L314.28 741.427H169.847c-49.419 0-89.487-40.07-89.487-89.485V226.875c0-49.42 40.07-89.487 89.487-89.487h715.9c49.42 0 89.486 40.069 89.486 89.487v425.067c0.001 49.417-40.067 89.485-89.487 89.485zM307.07 729.26c-1.222-2.054-1.77-4.284-2.25-6.511 0.612 3.451 1.9 6.555 3.89 9.284l-1.64-2.773z m4.895-26.938c-0.59 0.524-1.202 0.938-1.726 1.506 0.502-0.546 1.158-1.006 1.726-1.506z m-7.669 17.87c-0.087-1.18 0.153-2.338 0.264-3.518-0.088 0.832-0.482 1.53-0.482 2.382 0 0.393 0.197 0.742 0.218 1.136z m2.316-10.988c-0.307 0.61-0.656 1.158-0.917 1.812 0.24-0.635 0.61-1.203 0.917-1.812z m623.878-482.33c0-24.71-20.033-44.743-44.744-44.743H169.847c-24.71 0-44.744 20.034-44.744 44.743V651.94c0 24.71 20.035 44.743 44.744 44.743h156.602c-0.326 0-0.612 0.174-0.938 0.195 8.04-0.327 16.015 3.344 20.318 10.597l51.821 87.435 91.74-91.76c4.609-4.587 10.66-6.663 16.69-6.464h379.667c24.711 0 44.744-20.034 44.744-44.743V226.874zM317.01 698.934c0.896-0.416 1.813-0.612 2.73-0.896-0.916 0.285-1.856 0.48-2.73 0.896z m412.133-225.97c-24.71 0-44.744-20.032-44.744-44.743 0-24.71 20.032-44.744 44.744-44.744 24.71 0 44.743 20.034 44.743 44.744s-20.034 44.744-44.743 44.744z m-201.347 0c-24.71 0-44.744-20.032-44.744-44.743 0-24.71 20.035-44.744 44.744-44.744s44.744 20.034 44.744 44.744-20.036 44.744-44.744 44.744z m-201.347 0c-24.71 0-44.744-20.032-44.744-44.743 0-24.71 20.035-44.744 44.744-44.744s44.743 20.034 44.743 44.744-20.033 44.744-44.743 44.744z"
                strokeWidth={0.5}
                // className="bg-[#141220]"
                fill="#8281B1"
              />
            </svg>
          </div>
        </div>

        <div className="relative max-w-fit">
          <div className="max-w-fit">
            <div
              className="relative bg-[#28263E] flex flex-col items-center justify-center rounded-[0.5rem] border-[1.75px] border-[#423F6A] overflow-hidden"
              style={{
                padding: "0.75rem 1.15rem",
              }}
            >
              <Image
                src={`/diagram/protect.svg`}
                height={37.5}
                width={37.5}
                alt=""
              />
              <span className="whitespace-pre text-white text-[0.5rem]">
                Walled Protect
              </span>
            </div>
          </div>
          <MotionTrailArrow className="absolute left-full top-1/2" />
        </div>

        <div className="max-w-fit py-[0.125rem] px-[0.75rem] bg-[#28273D] text-[0.65rem] text-white rounded-[0.25rem] border-[1.75px] border-[#859900] z-[1]">
          Safe
        </div>

        <div className="relative max-w-fit">
          <div
            className="relative max-w-fit bg-[#0A0A10] flex flex-col items-center rounded-[0.5rem] overflow-hidden translate-y-[33.5%]"
            style={{
              padding: "0.75rem 0.5rem",
            }}
          >
            {["encryption", "redact", "decryption"].map((icon) => (
              <div key={icon} className="flex flex-col items-center">
                <div className="py-[0.35rem] px-[0.5rem] bg-[#28263E] border-[1.5px] border[#352D4D] rounded-[0.5rem]">
                  <Image
                    src={`/diagram/${icon}.svg`}
                    width={24}
                    height={24}
                    alt={icon.replace(/-/g, " ")}
                    className="size-6"
                  />
                </div>
                <p className="mt-[0.125rem] text-white text-[0.5rem] capitalize">
                  {icon.replace(/-/g, " ")}
                </p>
              </div>
            ))}
          </div>
          <MotionTrailArrow width={47} className="absolute left-full top-1/2" />
        </div>

        <div
          className="relative max-w-fit rounded-[0.5rem] border-[1.75px] border-[#4E4E7E]"
          style={{
            padding: "1.125rem 0.75rem",
            background: "rgba(40, 38, 62, 0.625)",
          }}
        >
          <div className="min-w-fit flex items-center justify-center gap-[0.25rem]">
            <div className="h-[0.45rem] w-[0.135rem] bg-[#4F4E7E] rounded-full" />
            <div className="py-[0.2rem] px-[0.5rem] bg-[#141220] text-[0.75rem] text-[#EFEFF5] rounded-[0.5rem] border-[1.75px] border-[#473EF4]">
              AI
            </div>
            <div className="h-[0.45rem] w-[0.135rem] bg-[#4F4E7E] rounded-full" />
          </div>
          <MotionTrailArrow width={47} className="absolute left-full top-1/2" />
        </div>

        <div className="relative max-w-fit flex flex-col items-center justify-center">
          <span className="text-[0.5rem] text-white whitespace-pre">
            Agent’s Response
          </span>
          <svg
            className="fill-[#8281B1]"
            width="4.5rem"
            height="2.75rem"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M885.746 741.427H514.972l-105.37 105.395c-0.788 0.764-1.77 1.09-2.623 1.726-0.787 0.59-1.333 1.42-2.228 1.922-0.416 0.218-0.875 0.218-1.29 0.416-1.53 0.742-3.08 1.158-4.718 1.55-1.224 0.284-2.404 0.614-3.627 0.7-1.551 0.11-3.037-0.086-4.566-0.306-1.376-0.195-2.709-0.35-4.042-0.786-1.2-0.416-2.292-1.028-3.43-1.64-1.551-0.808-2.971-1.683-4.304-2.862-0.35-0.306-0.787-0.414-1.114-0.72-0.547-0.548-0.745-1.268-1.224-1.836-0.72-0.875-1.66-1.508-2.25-2.492L314.28 741.427H169.847c-49.419 0-89.487-40.07-89.487-89.485V226.875c0-49.42 40.07-89.487 89.487-89.487h715.9c49.42 0 89.486 40.069 89.486 89.487v425.067c0.001 49.417-40.067 89.485-89.487 89.485zM307.07 729.26c-1.222-2.054-1.77-4.284-2.25-6.511 0.612 3.451 1.9 6.555 3.89 9.284l-1.64-2.773z m4.895-26.938c-0.59 0.524-1.202 0.938-1.726 1.506 0.502-0.546 1.158-1.006 1.726-1.506z m-7.669 17.87c-0.087-1.18 0.153-2.338 0.264-3.518-0.088 0.832-0.482 1.53-0.482 2.382 0 0.393 0.197 0.742 0.218 1.136z m2.316-10.988c-0.307 0.61-0.656 1.158-0.917 1.812 0.24-0.635 0.61-1.203 0.917-1.812z m623.878-482.33c0-24.71-20.033-44.743-44.744-44.743H169.847c-24.71 0-44.744 20.034-44.744 44.743V651.94c0 24.71 20.035 44.743 44.744 44.743h156.602c-0.326 0-0.612 0.174-0.938 0.195 8.04-0.327 16.015 3.344 20.318 10.597l51.821 87.435 91.74-91.76c4.609-4.587 10.66-6.663 16.69-6.464h379.667c24.711 0 44.744-20.034 44.744-44.743V226.874zM317.01 698.934c0.896-0.416 1.813-0.612 2.73-0.896-0.916 0.285-1.856 0.48-2.73 0.896z m412.133-225.97c-24.71 0-44.744-20.032-44.744-44.743 0-24.71 20.032-44.744 44.744-44.744 24.71 0 44.743 20.034 44.743 44.744s-20.034 44.744-44.743 44.744z m-201.347 0c-24.71 0-44.744-20.032-44.744-44.743 0-24.71 20.035-44.744 44.744-44.744s44.744 20.034 44.744 44.744-20.036 44.744-44.744 44.744z m-201.347 0c-24.71 0-44.744-20.032-44.744-44.743 0-24.71 20.035-44.744 44.744-44.744s44.743 20.034 44.743 44.744-20.033 44.744-44.743 44.744z"
              strokeWidth={0.5}
              fill="#473EF4"
            />
          </svg>
        </div>

        <div className="relative max-w-fit">
          <div className="max-w-fit">
            <div
              className="relative bg-[#28263E] flex flex-col items-center justify-center rounded-[0.5rem] border-[1.75px] border-[#423F6A] overflow-hidden"
              style={{
                padding: "0.75rem 1.15rem",
              }}
            >
              <Image
                src={`/diagram/protect.svg`}
                height={37.5}
                width={37.5}
                alt=""
              />
              <span className="whitespace-pre text-white text-[0.5rem]">
                Walled Protect
              </span>
            </div>
          </div>
          <MotionTrailArrow
            width={47}
            className="absolute right-full top-1/2"
          />
          <MotionTrailArrow className="absolute left-full top-1/2" />
        </div>

        <div className="relative max-w-fit py-[0.125rem] px-[0.75rem] bg-[#28273D] text-[0.65rem] text-white rounded-[0.25rem] border-[1.75px] border-[#859900]">
          Safe
        </div>

        <div className="relative max-w-fit">
          <div className="max-w-fit">
            <div
              className="relative bg-[#28263E] flex flex-col items-center justify-center rounded-[0.5rem] border-[1.75px] border-[#423F6A] overflow-hidden"
              style={{
                padding: "0.75rem 1.15rem",
              }}
            >
              <Image
                src={`/diagram/walled_correct.svg`}
                height={37.5}
                width={37.5}
                alt=""
              />
              <span className="whitespace-pre text-white text-[0.5rem]">
                Walled Correct
              </span>
            </div>
          </div>
          <MotionTrailArrow width={47} className="absolute left-full top-1/2" />
        </div>

        <div className="max-w-fit py-[0.125rem] px-[0.75rem] bg-[#28273D] text-[0.65rem] text-white rounded-[0.25rem] border-[1.75px] border-[#859900] z-[1]">
          True
        </div>
      </div> */}
    </section>
  );
}
