"use client";
import React, { useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import ArrowIcon from "@/public/images/cards_arrowicon.svg";
import GuardRailCard from "@/public/images/Guardrail_card.svg";
import { GoArrowDownRight } from "react-icons/go";
import { useTheme } from "next-themes";
import "./Card.css";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface CardWithImageProps {
  title: string;
  description: string;
  rightImageSrc?: StaticImageData;
  rightImageAlt?: string;
  rightImageDark?: StaticImageData;
  links: string;
}

const CardWithImage: React.FC<CardWithImageProps> = ({
  title,
  description,
  rightImageSrc = GuardRailCard,
  rightImageAlt = "Guardrail",
  rightImageDark,
  links,
}) => {
  const { resolvedTheme } = useTheme();
  const isLightTheme = resolvedTheme === "light";
  const router = useRouter();

  return (
    <motion.div
      className="indv_card cursor-pointer group"
      style={{ paddingRight: "5px" }}
      transition={{
        type: "spring",
        stiffness: 50,
        damping: 15,
        mass: 0.5,
      }}
      onClick={() => router.push(links)}
    >
      <div className="p-[12px] h-full flex flex-col justify-between items-start flex-1 card_right_dashboard">
        <div className="w-[25px] h-[25px] rounded-[18px] flex justify-center items-center bg-[var(--dashboardCardIconColor)] group-hover:bg-[linear-gradient(133.72deg,_#f93c52_-38.09%,_#2b21f3_118.55%)] transition-all duration-300 ease-in-out ">
          <GoArrowDownRight className="text-[var(--foreground)] text-[10px] transition-transform duration-300 ease-in-out group-hover:rotate-[-45deg] group-hover:!text-[#FFFFFF]" />
        </div>
        <div>
          <div className="card-title-name">{title}</div>
          <div className="card-description-box">{description}</div>
        </div>
      </div>
      <Image
        src={isLightTheme ? rightImageSrc : rightImageDark}
        alt={rightImageAlt}
        width={0}
        height={0}
        className="max-w-[193px] w-1/2 min-h-[217px] dashboard_card_image"
      />
    </motion.div>
  );
};

export default CardWithImage;
