"use client";

import { createContext, useEffect, useState, ReactNode } from "react";

// ** Define proper type for the context
type ThemeContextType = {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
};

// ** Defaults with proper typing
const defaultProvider: ThemeContextType = {
  darkMode: false,
  setDarkMode: () => null,
};

const ThemeContext = createContext<ThemeContextType>(defaultProvider);

type Props = {
  children: ReactNode;
};

const ThemeProvider = ({ children }: Props) => {
  // ** States
  const [darkMode, setDarkMode] = useState<boolean>(defaultProvider.darkMode);

  const values: ThemeContextType = {
    darkMode,
    setDarkMode,
  };

  return (
    <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
