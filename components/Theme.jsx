import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { MdOutlineWbSunny } from "react-icons/md";
import { LuMoon } from "react-icons/lu";

const Theme = () => {
  const [mounted, setMounted] = useState(false);

  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isLightTheme = resolvedTheme === "light";

  return (
    <section>
      {
        <div
          onClick={() => (isLightTheme ? setTheme("dark") : setTheme("light"))}
          className={`theme_container  rounded-[27px] flex justify-center items-center
            bg-[var(--backgroundColor)] dark:bg-black cursor-pointer z-10
          `}
        >
          {isLightTheme ? (
            <MdOutlineWbSunny className="theme_icon text-[#8281B1]" />
          ) : (
            <LuMoon className="theme_icon text-[#8281B1]" />
          )}
        </div>
      }
    </section>
  );
};

export default Theme;
