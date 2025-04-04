"use client";
import Image from "next/image";
import userProfile from "@/public/images/userProfile.svg";
import Theme from "../Theme";
import pathnames from "../utils/noNavbars";
import "./Topbar.css";
import { usePathname } from "next/navigation";

export default function Topbar({ label }: { label: string }) {
  const pathname = usePathname();

  const signout = () => {
    localStorage.removeItem("userInfo");
    window.location.href = "/login";
  };

  if (pathnames.includes(pathname)) {
    return;
  }
  return (
    <section className=" profile_container">
      <div className="topbar_label">{label}</div>
      <div className="flex flex-row gap-[15px] ">
        <Theme />
        <Image
          width={0}
          height={0}
          src={userProfile}
          alt="user Profile"
          className="rounded-[27px] cursor-pointer user_profile_image"
        />
      </div>
    </section>
  );
}
