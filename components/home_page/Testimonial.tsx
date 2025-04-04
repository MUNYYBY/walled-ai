"use client";
import { Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import SectionTitle from "../common/SectionTitile";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

interface Testimonial {
  id: number;
  img: string;
  quote: string;
  alt?: string;
}

export default function TestimonialSection() {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      img: "/home_page/testimonial/amazon.svg",
      quote:
        "WalledCorrect transformed our AI deployment process. Their solutions helped us reduce errors by 75% and improved our system's reliability significantly.",
      alt: "Amazon logo",
    },
    {
      id: 2,
      img: "/home_page/testimonial/sutd.svg",
      quote:
        "The team at WalledCorrect understands the challenges of AI implementation like no one else. Their tools saved us countless hours of debugging.",
      alt: "SUTD logo",
    },
    {
      id: 3,
      img: "/home_page/testimonial/nvidia.svg",
      quote:
        "Since implementing WalledCorrect, our team's confidence in our AI systems has skyrocketed. It's become an essential part of our workflow.",
      alt: "NVIDIA logo",
    },
    {
      id: 4,
      img: "/home_page/testimonial/sutd.svg",
      quote:
        "WalledCorrect's solutions provided the perfect balance between automation and control for our AI validation needs.",
      alt: "SUTD logo",
    },
  ];

  return (
    <section className="py-[3.5rem] sm:py-[5rem] lg:py-[7.25rem] flex flex-col items-center">
      <div className="w-full max-w-7xl px-4 flex flex-col items-center">
        <SectionTitle
          title="Rest Assured, You're in Good Company"
          highlight="Rest Assured"
        />
        <p className="text-sm text-center text-white/90 mb-8 max-w-2xl">
          Join a growing club of industry leaders who trust WalledCorrect to
          keep their AI ventures on track.
        </p>

        <div className="w-full max-w-6xl">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={32}
            slidesPerView={1}
            pagination={{
              clickable: true,
              bulletClass: "swiper-pagination-bullet bg-white/30",
              bulletActiveClass: "swiper-pagination-bullet-active bg-white",
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              768: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 32,
              },
            }}
            className="pb-12"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id} className="h-auto">
                <div
                  className="bg-[#28263E] h-full p-5 flex flex-col rounded-lg"
                  style={{ minHeight: "380px" }}
                >
                  <div className="flex flex-col h-full">
                    <span className="text-3xl text-[#3B3A5F] mb-2">❝</span>
                    <blockquote className="text-sm text-white flex-grow">
                      {testimonial.quote}
                    </blockquote>
                    <div className="mt-auto">
                      <Image
                        src={testimonial.img}
                        width={125}
                        height={50}
                        alt={
                          testimonial.alt || testimonial.quote.substring(0, 20)
                        }
                        className="object-contain h-12 w-auto"
                      />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
