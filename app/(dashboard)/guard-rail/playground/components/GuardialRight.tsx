"use client";
import Button from "@/components/common/Buttons";
import { useEffect, useMemo, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { NavigationButtons, NavItem } from "../components/navigation";
import { motion } from "framer-motion";
import { useGuardrailContext } from "./GuadrialContext";

const GuardialRight = () => {
  const {
    topicState,
    setTopicState,
    greetingsState,
    setGreetingsState,
    piiState,
    setPiiState,
  } = useGuardrailContext();

  const handleApply = () => {
    console.log("Topic State:", topicState);
    console.log("Greetings State:", greetingsState);
    console.log("PII State:", piiState);
  };

  const handleReset = () => {
    setTopicState({
      recent_prompts: "Select",
      new_prompt: "",
    });
    setGreetingsState([]);
    setPiiState([]);
  };
  const navs: NavItem[] = useMemo(
    () => [
      {
        label: "Topic",
        component: (
          <Topic topicState={topicState} setTopicState={setTopicState} />
        ),
        image: "",
      },
      {
        label: "Greetings",
        component: (
          <Greetings
            greetingsState={greetingsState}
            setGreetingsState={setGreetingsState}
          />
        ),
        image: "",
      },
      {
        label: "PII",
        component: <PII piiState={piiState} setPiiState={setPiiState} />,
        image: "",
      },
    ],
    [topicState, greetingsState, piiState]
  );
  useEffect(() => {
    setCurrentNav(
      (prev) => navs.find((items) => items.label === prev.label) as NavItem
    );
  }, [topicState, greetingsState, piiState]);
  const [currentNav, setCurrentNav] = useState(navs[0]);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 758);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 758);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <motion.div
      initial={isSmallScreen ? { opacity: 0, scale: 0.9 } : {}}
      animate={
        isSmallScreen ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }
      }
      exit={
        isSmallScreen ? { opacity: 0, scale: 0.9 } : { opacity: 0, scale: 0.9 }
      }
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="guardial_right !space-y-1.5"
    >
      <div className="play_ground_guardial">Filter</div>
      <NavigationButtons
        navs={navs}
        currentNav={currentNav}
        setCurrentNav={setCurrentNav}
      />
      {currentNav.component}
      <div className="button_container">
        <Button
          type="submit"
          className="active_nav secondary_hover flex items-center justify-center"
          onClick={handleApply}
        >
          <span className="pt-1">Apply</span>
        </Button>
        <Button
          type="reset"
          className="reset_button flex items-center justify-center"
          onClick={handleReset}
        >
          <span className="pt-1">Reset</span>
        </Button>
      </div>
    </motion.div>
  );
};

export default GuardialRight;

// Topic Component
interface TopicProps {
  topicState: {
    recent_prompts: string;
    new_prompt: string;
  };
  setTopicState: React.Dispatch<
    React.SetStateAction<{
      recent_prompts: string;
      new_prompt: string;
    }>
  >;
}

const Topic: React.FC<TopicProps> = ({ topicState, setTopicState }) => {
  const recent_prompts = ["Hello", "How", "When", "Love"];

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value: inputValue } = e.target;
    setTopicState({
      ...topicState,
      [name]: inputValue,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <section className="greeting_container">
      <TopicGuardrail
        topic="Topic"
        description="Write the topic of the agent that it should adhere to. The guardrail will flag any off-topic conversations."
      />

      <div className="guardial_right_middle !space-y-2.5">
        <label style={{ position: "relative" }}>
          <div className="label_heading mb-1"> Recent Compliances</div>
          <select
            name="recent_prompts"
            value={topicState.recent_prompts}
            onChange={handleChange}
          >
            <option value="Select">Select</option>
            {recent_prompts.map((prompt, index) => (
              <option key={index} value={prompt}>
                {prompt}
              </option>
            ))}
          </select>
          <RiArrowDropDownLine className="dropdown_icon" />
        </label>
        <label className="textArea_label">
          <div className="label_heading mb-1"> Write a new compliance:</div>
          <textarea
            name="new_prompt"
            value={topicState.new_prompt}
            onChange={handleChange}
            placeholder="Type New Prompt Here"
          />
        </label>
      </div>
    </section>
  );
};

interface GreetingsProps {
  greetingsState: string[];
  setGreetingsState: React.Dispatch<React.SetStateAction<string[]>>;
}

const Greetings: React.FC<GreetingsProps> = ({
  greetingsState,
  setGreetingsState,
}) => {
  console.log("Called greetings");
  const greetingsStyle = [
    {
      label: "Casual & Friendly",
      values: [
        "Hey there! How’s it going?",
        "What’s up? Hope you're having a great day!",
        "Yo! How’s life treating you?",
      ],
    },
    {
      label: "Professional & Polite",
      values: [
        "Hey there! How’s it going?",
        "Good [morning/afternoon/evening]! Hope you're doing well.",
        "Hello! I hope your day is going smoothly.",
        "Hi [Name], nice to connect with you.",
      ],
    },
  ];

  const handleCheckboxChange = (label: string) => {
    if (greetingsState.includes(label)) {
      setGreetingsState((prev) => [...prev.filter((item) => item !== label)]);
    } else {
      setGreetingsState((prev) => [...prev, label]);
    }
  };

  return (
    <section className="greeting_container">
      <TopicGuardrail
        topic="Greetings"
        description="You may want to allow greetings if it’s a chatbot, choose which type of greetings are allowed."
      />
      <div className="guardial_right_middle">
        {greetingsStyle.map((items, index) => {
          return (
            <div key={index}>
              <label className="label_greeting_container cursor-pointer">
                <input
                  className="checkbox_input"
                  type="checkbox"
                  checked={greetingsState.includes(items.label)}
                  onChange={() => handleCheckboxChange(items.label)}
                />
                <div className="labels_greeting_label_conatiner">
                  <div>{items.label}</div>
                  <div className="labels_greeting_gray_conatiner">
                    {items.values.map((value, id) => {
                      return <div key={id}>{value}</div>;
                    })}
                  </div>
                </div>
              </label>
              {index === 0 && <div className="border_"></div>}
            </div>
          );
        })}
      </div>
    </section>
  );
};

// PII Component
interface PIIProps {
  piiState: string[];
  setPiiState: React.Dispatch<React.SetStateAction<string[]>>;
}

const PII: React.FC<PIIProps> = ({ piiState, setPiiState }) => {
  const data = [
    "Person's Name",
    "Address",
    "Email Id",
    "Contact No",
    "Date Of Birth",
    "Unique Id",
    "Financial Data",
  ];

  const handleCheckboxChange = (item: string) => {
    if (piiState.includes(item)) {
      setPiiState(piiState.filter((selected) => selected !== item));
    } else {
      setPiiState([...piiState, item]);
    }
  };

  return (
    <section className="greeting_container">
      <TopicGuardrail
        topic="PII"
        description="You may want to flag any PII mentions in the conversation. Mention which PIIs mentions should be flagged."
      />
      <div className="guardial_right_middle">
        <div className="label_heading">Detect personal data:</div>
        <div className="pii_checkbox_container">
          {data.map((item, index) => (
            <div key={index}>
              <label className="cursor-pointer">
                <input
                  className="checkbox_input"
                  type="checkbox"
                  checked={piiState.includes(item)}
                  onChange={() => handleCheckboxChange(item)}
                />
                <span className="checkbox_label">{item}</span>
              </label>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// TopicGuardrail Component
interface TopicGuardrailProps {
  topic: string;
  description: string;
}

const TopicGuardrail: React.FC<TopicGuardrailProps> = ({
  topic,
  description,
}) => {
  return (
    <>
      <div className="flex flex-column gap-[5px] topic_guardials">
        <div className="play_ground_guardial">{topic}</div>
        <div className="card-description-box topic_bottom">{description}</div>
      </div>
      <div className="border_"></div>
    </>
  );
};
