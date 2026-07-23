
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

  const currentTheme = theme === "system" ? resolvedTheme : theme;

  const handleToggle = () => {
    setTheme(currentTheme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={handleToggle}
      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors duration-200"
      title={currentTheme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
      aria-label="Toggle theme"
    >
      {currentTheme === "dark" ? (
        <FaMoon className="w-5 h-5 text-indigo-400" />
      ) : (
        <MdSunny className="w-5 h-5 text-orange-500" />
      )}
    </button>
  );
}