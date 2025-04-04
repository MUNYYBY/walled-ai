"use client";
import axios from "axios";
import React, { createContext, useState, useContext, ReactNode } from "react";

// Define the shape of the context data
interface GuardrailContextType {
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
  greetingsState: string[];
  setGreetingsState: React.Dispatch<React.SetStateAction<string[]>>;
  piiState: string[];
  setPiiState: React.Dispatch<React.SetStateAction<string[]>>;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  submit: () => void;
}

// Create the context
const GuardrailContext = createContext<GuardrailContextType | undefined>(
  undefined
);

// Create a provider component
export const GuardrailProvider = ({ children }: { children: ReactNode }) => {
  const [topicState, setTopicState] = useState({
    recent_prompts: "Select",
    new_prompt: "",
  });
  const [greetingsState, setGreetingsState] = useState<string[]>([]);
  const [piiState, setPiiState] = useState<string[]>([]);
  const [value, setValue] = useState("");

  function extractDataInsideBrackets(inputString: string) {
    const regex = /<([^>]+)>/g;
    let match;
    const extractedData = [];

    while ((match = regex.exec(inputString)) !== null) {
      extractedData.push(match[1]);
    }

    return extractedData;
  }

  const submit = async () => {
    const payload = {
      text: value,

      text_type: "prompt",

      generic_safety_check: true,

      greetings_list: greetingsState,
      compliance_list: extractDataInsideBrackets(topicState.new_prompt),
      pii_list: piiState,
    };
    console.log("PayLoad", payload);
    try {
      const res = await axios.post(
        "http://Dev-services-loadbalancer-1916118119.ap-southeast-1.elb.amazonaws.com/guardrail/moderate",
        payload
      );
      if (res.status === 400) {
        throw new Error("Not Found");
      }
      setValue("");
      return res;
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <GuardrailContext.Provider
      value={{
        topicState,
        setTopicState,
        greetingsState,
        setGreetingsState,
        piiState,
        setPiiState,
        value,
        setValue,
        submit,
      }}
    >
      {children}
    </GuardrailContext.Provider>
  );
};

// Custom hook to use the context
export const useGuardrailContext = () => {
  const context = useContext(GuardrailContext);
  if (!context) {
    throw new Error(
      "useGuardrailContext must be used within a GuardrailProvider"
    );
  }
  return context;
};
