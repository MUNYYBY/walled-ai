import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import CardWithImage from "./Card";
//Dark Card Images
import GuardialCardDark from "@/public/images/dashboard/Guardrail Image dark.svg";
import HallucinationCardDark from "@/public/images/dashboard/Hallucination Image dark.svg";
import PiiCardDark from "@/public/images/dashboard/PII Image dark.svg";

//light Images
import GuardRailCard from "@/public/images/dashboard/light/Guardrail image.svg";
import HallucinationCard from "@/public/images/dashboard/light/Hallucination.svg";
import PiiCard from "@/public/images/dashboard/light/PII.svg";
import MobileCards from "./MobileCards";
import { Swiper as SwiperType } from "swiper/types";

const MobileCard = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);
  return (
    <div className="flex flex-col gap-[20px] justify-center">
      {" "}
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        pagination={false}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        loop
        className="dashboard_card_container_mobile"
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        <SwiperSlide className="indv_card group">
          <MobileCards
            title="Guardrail"
            description="Sorem ipsum dolor sit amet, consectetur adipiscing elit."
            rightImageDark={GuardialCardDark}
            rightImageSrc={GuardRailCard}
            links="/guard-rail/playground"
          />
        </SwiperSlide>
        <SwiperSlide className="indv_card group">
          <MobileCards
            title="PII"
            rightImageSrc={PiiCard}
            description="Sorem ipsum dolor sit amet, consectetur adipiscing elit."
            rightImageDark={PiiCardDark}
            links="/pii"
          />{" "}
        </SwiperSlide>
        <SwiperSlide className="indv_card group">
          <MobileCards
            title="Hallucination"
            rightImageSrc={HallucinationCard}
            rightImageDark={HallucinationCardDark}
            description="Sorem ipsum dolor sit amet, consectetur adipiscing elit."
            links="/hallucination"
          />{" "}
        </SwiperSlide>
      </Swiper>
      <div className="custom-pagination">
        {[0, 1, 2].map((_, index) => (
          <span
            key={index}
            className={`pagination-dot ${
              index === activeIndex ? "active bg-custom-gradient" : ""
            }`}
            onClick={() => swiperRef.current?.slideTo(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default MobileCard;
