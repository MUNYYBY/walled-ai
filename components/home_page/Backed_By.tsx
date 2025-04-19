"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import { useTheme } from "@/hooks/useTheme";
import clsx from "clsx";

export default function BackedBy({ text }: { text?: string }) {
  //** theme context */
  const theme = useTheme();
  const { darkMode } = theme;

  const backedItems = [
    "/home_page/backed_by/amazon.svg",
    "/home_page/backed_by/ibda.svg",
    "/home_page/backed_by/nvidia.svg",
    "/home_page/backed_by/sutd.svg",
    "/home_page/backed_by/google.svg",
    "/home_page/backed_by/interative.svg",
  ];

  return (
    <section
      className={clsx(
        "relative w-full overflow-hidden py-20 transition-all duration-500",
        darkMode ? "bg-[#141320]" : "bg-[#E0DEEC]",
      )}
    >
      <h3
        className={clsx(
          "mb-3 text-center !text-[1.125rem]",
          darkMode ? "!text-[#9998C9]" : "!text-[#8281B1]",
        )}
        style={{
          fontFamily: "Inter",
          fontWeight: 300,
        }}
      >
        {text ?? "Backed by"}
      </h3>
      <Swiper
        modules={[Autoplay, FreeMode]}
        spaceBetween={50}
        slidesPerView="auto"
        loop={true}
        speed={2500} // Continuous scrolling effect
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        freeMode={{ enabled: true, momentum: false }}
        grabCursor={false}
        breakpoints={{
          320: { slidesPerView: 2 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
      >
        {[
          ...backedItems,
          ...backedItems,
          ...backedItems,
          ...backedItems,
          ...backedItems,
          ...backedItems,
          ...backedItems,
          ...backedItems,
          ...backedItems,
          ...backedItems,
          ...backedItems,
          ...backedItems,
          ...backedItems,
          ...backedItems,
          ...backedItems,
        ].map((item, index) => (
          <SwiperSlide key={index} className="w-auto">
            <Image src={item} height={100} width={300} alt="Backed by logo" />
          </SwiperSlide>
        ))}
      </Swiper>
      <style>{`
        .swiper-wrapper {
          transition-timing-function: linear !important;
        }
      `}</style>
    </section>
  );
}
