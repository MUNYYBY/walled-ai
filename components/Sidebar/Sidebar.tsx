"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { twMerge } from "tailwind-merge";
import "./Sidebar.css";
import { RxCross2 } from "react-icons/rx";

import { motion } from "framer-motion";

import MessageIcon from "@/public/images/messageIcon.svg";

// dark Mode Images
import bardChartDarkMode from "@/public/images/sidebar/dark/bar-chart-2.svg";
import CpuDarkMode from "@/public/images/sidebar/dark/cpu.svg";
import dashboardDarkTheme from "@/public/images/sidebar/dark/dashboard.svg";
import GuirdalDarkMode from "@/public/images/sidebar/dark/Guirdal.svg";
import LockDarkMode from "@/public/images/sidebar/dark/lock.svg";
import percentDarkMode from "@/public/images/sidebar/dark/percent .svg";
import walletDaiLogoDark from "@/public/images/sidebar/walledDai.svg";

//light themes
import barChartLightTheme from "@/public/images/sidebar/light/bar-chart-2.svg";
import cpuLightTheme from "@/public/images/sidebar/light/cpu.svg";
import DashBoard from "@/public/images/sidebar/light/dashboard.svg";
import lockLightTheme from "@/public/images/sidebar/light/lock.svg";
import percentLightTheme from "@/public/images/sidebar/light/percent.svg";
import guirdalLightTheme from "@/public/images/sidebar/light/shield.svg";
import walleDaiLightMode from "@/public/images/sidebar/WalleDaiDarkMode.svg"; //light

//Active themes
import barChartActiveTheme from "@/public/images/sidebar/active/bar-chart-2.svg";
import cpuActiveTheme from "@/public/images/sidebar/active/cpu.svg";
import DashBoardActive from "@/public/images/sidebar/active/dashboard.svg";
import lockActiveTheme from "@/public/images/sidebar/active/lock.svg";
import percentActiveTheme from "@/public/images/sidebar/active/percent.svg";
import guirdalActiveTheme from "@/public/images/sidebar/active/shield.svg";
import pathnames from "../utils/noNavbars";

import { useTheme } from "next-themes";
import Image from "next/image";

export default function Sidebar() {
  const { resolvedTheme } = useTheme();

  const pathname = usePathname();
  let [over, setOver] = React.useState(false);

  useEffect(() => {
    console.log("Pathname", pathname);
  }, [pathname]);

  const navs = [
    {
      image: DashBoard,
      imageDark: dashboardDarkTheme,
      name: "Dashboard",
      path: "/dashboard",
      active: DashBoardActive,
    },
    {
      image: guirdalLightTheme,
      imageDark: GuirdalDarkMode,
      active: guirdalActiveTheme,
      name: "Guardrail",
      path: "/guard-rail/playground",
    },
    {
      image: lockLightTheme,
      active: lockActiveTheme,
      imageDark: LockDarkMode,
      name: "Pll",
      path: "/pii",
    },
    {
      image: percentLightTheme,
      active: percentActiveTheme,
      imageDark: percentDarkMode,
      name: "Hallucination",
      path: "/hallucination",
    },
    {
      image: cpuLightTheme,
      active: cpuActiveTheme,
      imageDark: CpuDarkMode,

      name: "API keys",
      path: "/api-access",
    },
    {
      image: barChartLightTheme,
      active: barChartActiveTheme,
      imageDark: bardChartDarkMode,
      path: "/usagestats",
      name: "Usage Stats",
    },
  ];
  const isLightTheme = resolvedTheme === "light";
  const [hum, setHum] = useState(false);

  const isReportPath = "/report" === pathname;
  //change pathname of report
  if (pathnames.includes(pathname)) {
    return;
  }
  return (
    <>
      <GiHamburgerMenu
        onClick={() => setHum(() => true)}
        className="flex hamburger_menu absolute top-[15px] left-[20px] text-[var(--humColor)] cursor-pointer"
      />
      <motion.nav
        onMouseOver={() => setOver(true)}
        onMouseOut={() => setOver(false)}
        className={twMerge(
          "py-[15px] !min-h-screen flex-col hidden overflow-y-auto gap-[60px] box-border backgroundTheme",
          over && "expanded",
          hum && "showSidebar",
          "sidebar_container_main"
        )}
        style={{ paddingLeft: "18px" }}
        initial={{ width: 70 }}
        animate={{ width: hum ? 220 : over ? 180 : 70 }}
        transition={{
          type: "spring",
          stiffness: 50,
          damping: 15,
          mass: 0.5,
        }}
      >
        <RxCross2
          className=" cross_sidebar  cursor-pointer  text-[var(--humColor)]"
          onClick={() => setHum(() => false)}
        />
        <div className="flex flex-row gap-2 items-center justify-start">
          <Image
            src={!isLightTheme ? walletDaiLogoDark : walleDaiLightMode}
            width={215}
            height={54}
            alt="log_image"
            className={
              "!min-w-[150px] !min-h-[35px] !max-w-[150px] !max-h-[35px]"
            }
          />
        </div>
        <div className="flex flex-col gap-[15px]">
          {navs.map((items, index) => {
            const isCurrentPath = items.path == pathname;
            return (
              <Link
                key={index}
                onClick={() => setHum(() => false)}
                href={items.path}
                className="flex flex-row gap-3 items-center cursor-pointer no-underline! hover:no-underline! "
              >
                <div
                  className={twMerge(
                    ` min-h-[35px] min-w-[35px] rounded-[12px] !text-[#A1A0C5] sidebarIcon flex justify-center items-center `,
                    isCurrentPath && "  bg-custom-gradient text-black "
                  )}
                  key={index}
                >
                  <Image
                    width={15}
                    height={15}
                    src={
                      isCurrentPath
                        ? items.active
                        : isLightTheme
                        ? items.image
                        : items.imageDark
                    }
                    alt="nav_image"
                    className="image_icon_sidebar"
                  />
                </div>
                {
                  <div
                    className={twMerge(
                      "font-normal text-[14px] leading-[120%] tracking-[-4%]  sidebarLinkText ",
                      !isCurrentPath && "text-[#A1A0C5]!",
                      !(hum || over) && "opacity-0"
                    )}
                  >
                    {items.name}
                  </div>
                }{" "}
              </Link>
            );
          })}
        </div>
        <Link
          href={"/"}
          className="flex flex-row gap-3 items-center cursor-pointer  no-underline hover:no-underline"
        >
          <div
            className={twMerge(
              `min-h-[35px] min-w-[35px] rounded-[12px] sidebarIcon text-white flex justify-center items-center`
              // "bg-[#00FF00] text-white bg-custom-gradient"
            )}
          >
            <Image
              width={15}
              height={15}
              src={isLightTheme ? MessageIcon : MessageIcon}
              alt="nav_image"
            />
          </div>
          {
            <div
              className={twMerge(
                "font-normal text-[14px] leading-[120%] tracking-[-4%]  sidebarLinkText",
                !isReportPath && "text-[#A1A0C5]!",
                !(hum || over) && "opacity-0"
              )}
            >
              Report Issue
            </div>
          }{" "}
        </Link>
      </motion.nav>
    </>
  );
}
