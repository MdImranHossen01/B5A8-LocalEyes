
"use client";

import { useTheme } from "next-themes";
import { FaMoon } from "react-icons/fa6";
import { MdSunny } from "react-icons/md";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  // Use the hook from next-themes. It handles everything for you.
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    // Defer setting mounted to the next tick to avoid calling setState synchronously within the effect
    const id = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(id);
  }, []);

  // When the component is not mounted yet, we don't want to render anything
  // to avoid a hydration mismatch.
  if (!mounted) {
    return null;
  }

  const handleToggle = () => {
    // Simply toggle the theme without any audio effects
    setTheme(theme === "dark" ? "light" : "dark");
  };
  
  // Use resolvedTheme to avoid UI flicker on initial load
  const currentTheme = theme === "system" ? resolvedTheme : theme;

  return (
    <div className="p-0.5 rounded-full hover:bg-orange-100 duration-500 max-w-16 fixed top-40 rotate-90 z-20">
      <div className="p-1 rounded-full bg-orange-100">
        <label
          className={`relative flex items-center cursor-pointer w-12 h-6 border border-orange-300 rounded-full transition-colors duration-300 ${
            currentTheme === "dark" ? "bg-gray-800" : "bg-orange-50"
          }`}
        >
          <input
            type="checkbox"
            checked={currentTheme === "dark"}
            onChange={handleToggle}
            className="sr-only"
          />

          {/* Toggle knob */}
          <div
            className={`absolute w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 ${
              currentTheme === "dark" ? "translate-x-6" : "translate-x-0"
            }`}
          >
            {currentTheme === "dark" ? (
              <FaMoon className="text-orange-400 p-0.5 -rotate-90 text-sm bg-gray-900 rounded-full" />
            ) : (
              <MdSunny className="text-orange-500 p-0.5 text-sm bg-orange-100 rounded-full" />
            )}
          </div>
        </label>
      </div>
    </div>
  );
}