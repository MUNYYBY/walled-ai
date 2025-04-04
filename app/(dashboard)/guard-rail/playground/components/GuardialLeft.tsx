"use client";
import { copy } from "@/app/login/popups/LogInFirstPopUps";
import { CopyBox } from "@/app/login/popups/LoginSecondPopUp";
import Button from "@/components/common/Buttons";
import sendIcon from "@/public/images/guardial/navigation.png";
import otherprofile from "@/public/images/guardial/Vector.svg";
import userProfile from "@/public/images/userProfile.svg";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FiMessageSquare } from "react-icons/fi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { PiBracketsAngle } from "react-icons/pi";
import "./index.css";
import { NavigationButtons, NavItem } from "../components/navigation";
import axiosInstance from "@/components/utils/axios";
import toast from "react-hot-toast";
import { useGuardrailContext } from "./GuadrialContext";

const GuardialLeft = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const navs: NavItem[] = [
    {
      label: "Chat",
      image: <FiMessageSquare />,
      component: <Chat messages={messages} />,
    },
    {
      label: "Api",
      image: <PiBracketsAngle />,
      component: <Api />,
    },
  ];

  const { value, setValue, submit } = useGuardrailContext();
  const [render, setRender] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res: any = await submit();

    console.log("res", res?.data?.data?.safety[0]?.isSafe);
    setRender(() => true);
    setMessages((prev) => [
      ...prev,
      {
        message: value,
        yours: true,
      },
      {
        message: "StaticMessage",
        complaint: res?.data?.data?.safety[0]?.isSafe,
        yours: false,
      },
    ]);
  };

  const [currentNav, setCurrentNav] = useState(navs[0]);

  useEffect(() => {
    if (render) {
      const findNav = navs.find(
        (items) => items.label === currentNav.label
      ) as NavItem;
      setCurrentNav(() => findNav);
      setRender(() => false);
    }
  }, [render]);

  return (
    <div className="guardial_left space">
      <div className="play_ground_guardial mb-2">Playground</div>
      <div className="flex flex-col gap-2">
        <div className="play_ground_guardial api_guardial">API</div>
        <CopyBox
          copyText="Onboarding-key-2025"
          className="guardial_playground_copy_box "
          classNameIcon="guardrial_copy_icon"
          classNameBottom="guardial_copy_box_text"
        />
      </div>
      <div className="guardial_middle_left">
        <NavigationButtons
          navs={navs}
          currentNav={currentNav}
          setCurrentNav={setCurrentNav}
        />
        {currentNav.label === "Api" && <div className="margin_bottom"></div>}
        {currentNav.component}
      </div>
      {currentNav.label === navs[0].label && (
        <form className="pt-1 guardial_form" onSubmit={handleSubmit}>
          <input
            placeholder="Type"
            type="text"
            value={value}
            className="guardial_input"
            required
            onChange={(e) => setValue(e.target.value)}
          />
          <Button className="bg-custom-gradient w-10 flex items-center justify-center rounded">
            <Image src={sendIcon} alt="Send_image" width={15} height={15} />
          </Button>
        </form>
      )}
      {currentNav.label === navs[1].label && (
        <CopyBox
          copyText={`“is_safe”: true`}
          className="guardial_playground_copy_box "
          classNameIcon="guardrial_copy_icon"
          classNameBottom="guardial_copy_box_text"
        />
      )}
    </div>
  );
};

export default GuardialLeft;

const Chat = ({ messages }: { messages: any }) => {
  return (
    <section className="messageContainer">
      {messages.map((items: any, index: number) => {
        if (items.yours)
          return (
            <div className="yours_message" key={index}>
              <div className="yours_message_message exact_message">
                {items.message}
              </div>
              <Image
                width={40}
                height={40}
                src={userProfile}
                alt="user Profile"
                className="rounded-[27px] cursor-pointer "
              />{" "}
            </div>
          );
        return (
          <div key={index} className="others_message">
            <div className="other_profile_image_container">
              <Image
                width={24}
                height={24}
                src={otherprofile}
                alt="user Profile"
                className="rounded-[27px] cursor-pointer "
              />{" "}
            </div>

            <div className="others_message_right">
              <div
                className={`exact_message complaint ${
                  !items.complaint && "non_complaint"
                }`}
              >
                <IoMdCheckmarkCircleOutline />
                <span>{items.complaint ? "Complaint" : "Non-Complaint"}</span>
              </div>

              <div className="exact_message">{items.message}</div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

const Api = () => {
  const navs = ["Javscript", "Python", "cUrl"];
  const [currentNav, setCurrentNav] = useState(navs[0]);
  const copyText = `from together import Together ${currentNav} `;

  return (
    <section className="api_container">
      <div className="guardial_middle_left_button_container guardial_api_nav_container">
        {navs.map((items, index) => {
          return (
            <Button
              key={index}
              onClick={() => setCurrentNav(items)}
              className={`flex items-center justify-center
                  ${items == currentNav ? "active_nav" : "in_active_nav"} 
                ${index === 0 ? "first_nav" : "last_nav"}
                `}
            >
              <span className="pt-1.5">{items}</span>
            </Button>
          );
        })}
      </div>
      {/* <ContentCopyIcon
        className={`copy_Icon copy_Icon_secondPouPop copyIcon_Guardial_api`}
        onClick={() => copy(copyText)}
        style={{ cursor: "pointer" }}
      />
      {copyText} */}
      <CopyBox
        copyText={copyText}
        className="guardial_playground_copy_box guardial_api_container_copy_box"
        classNameIcon="guardrial_copy_icon"
        classNameBottom="guardial_copy_box_text"
      />{" "}
    </section>
  );
};
