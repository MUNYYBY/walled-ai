"use client";
import PageLayout from "@/components/common/PageLayout";
import FilterImage from "@/public/images/guardial/sliders.svg";
import Image from "next/image";
import { useLayoutEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import GuardialLeft from "./components/GuardialLeft";
import GuardialRight from "./components/GuardialRight";
import "./guard-rail.css";
import { GuardrailProvider } from "./components/GuadrialContext";

const Page = () => {
  const [showRight, setShowRight] = useState(window.innerWidth > 758);

  useLayoutEffect(() => {
    const handleResize = () => setShowRight(window.innerWidth > 758);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <PageLayout label="Guardrail">
      <GuardrailProvider>
        {" "}
        {/* Wrap with the provider */}
        <section className="guardial_container">
          <Image
            src={FilterImage}
            height={20}
            width={20}
            alt="filter_image"
            className="filter_icon"
            onClick={() => setShowRight((prev) => !prev)}
          />
          <GuardialLeft />
          {showRight && <GuardialRight />}{" "}
          {showRight && (
            <RxCross2
              className="filter_icon cross_filter"
              onClick={() => setShowRight((prev) => !prev)}
            />
          )}
        </section>
      </GuardrailProvider>
    </PageLayout>
  );
};

export default Page;
