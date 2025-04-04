"use client";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import "./index.css";
import { copy } from "./LogInFirstPopUps";
import sample from "./utils";
import axiosInstance from "@/components/utils/axios";

function removeLastWords(text: string, wordCount: number) {
  if (!text) return ""; // Handle undefined or non-string values
  return text.split("").slice(0, -wordCount).join("");
}

const LoginSecondPopUp = ({
  callback,
  apikey,
}: {
  callback: () => void;
  apikey: string;
}) => {
  const nav = [
    { name: "Python", value: sample["python"] },
    { name: "JavaScript", value: sample["javascript"] },
    { name: "Java", value: sample["java"] },
  ];
  const [navs, setNavs] = useState<any>([]);
  const [activeNav, setActiveNav] = useState<any>({});
  const [language, setLanguage] = useState("python");

  const fetchCode = async () => {
    try {
      const res = await axiosInstance.get(
        "/api-service-docs/sample-docs?service=guardrail"
      );
      setNavs(() => res?.data?.data.config);
      setActiveNav(() => res?.data?.data.config[0]);
      console.log("res", res?.data?.data.config);
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    fetchCode();
  }, []);

  return (
    <section className="second_popUp_container">
      <CopyBox
        copyText={removeLastWords(apikey, 4) || ""}
        exact_copy={apikey}
        bottomText="Save this API key to use later!"
        className="clip_"
      />
      <div className="second_popup_nav_container">
        {navs.map((items: any, index: number) => (
          <div
            key={index}
            className={`nav_indv ${
              items.language === activeNav.language ? "active_nav_login" : ""
            }`}
            onClick={() => {
              console.log("language", items.language.toLowerCase());
              setLanguage(items.language.toLowerCase());
              setActiveNav(items);
            }}
          >
            {items.language}
          </div>
        ))}
      </div>
      <CopyBox
        copyText={activeNav.installationCode}
        bottomText={`Run the following command in your terminal to install the Walled AI ${activeNav.name} client`}
      />
      <div className="code_block_container relative">
        <SyntaxHighlighter
          language={activeNav.language}
          customStyle={{
            margin: "0px",
            paddingTop: "12px",
            background: "white",
          }}
        >
          {activeNav?.sampleCode}
        </SyntaxHighlighter>
        <ContentCopyIcon
          className={`copy_Icon copy_Icon_secondPouPop `}
          onClick={() => {
            copy(activeNav.value);
          }}
          style={{ cursor: "pointer" }}
        />
      </div>
    </section>
  );
};

export default LoginSecondPopUp;

interface CopyBoxProps {
  copyText: string;
  bottomText?: string;
  className?: string;
  classNameContainer?: string;
  classNameIcon?: string;
  classNameBottom?: string;
  exact_copy?: string;
}

export const CopyBox: React.FC<CopyBoxProps> = ({
  copyText,
  exact_copy = "",
  bottomText,
  className,
  classNameIcon,
  classNameContainer,
  classNameBottom,
}) => {
  return (
    <section className={`copyBox_section ${classNameContainer}`}>
      <div className={`copy_box ${className}`}>
        <span className={` ${classNameBottom}`}>{copyText} </span>
        <ContentCopyIcon
          className={`copy_Icon copy_Icon_secondPouPop ${classNameIcon}`}
          onClick={() => {
            if (!exact_copy) {
              copy(copyText);
            } else {
              copy(exact_copy);
            }
          }}
          style={{ cursor: "pointer" }}
        />
      </div>
      <div className="copy_bottom">{bottomText}</div>
    </section>
  );
};
