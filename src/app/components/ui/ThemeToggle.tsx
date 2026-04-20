"use client";

import { useTheme } from "../../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md transition-colors duration-200 bg-(--badge-bg) text-(--text-primary) hover:bg-(--muted)"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
        </svg>
      ) : (
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.536a1 1 0 07-1.415-1.414 4 4 0 111.415 1.414zm0-7.071a1 1 0 001.415-1.415 6 6 0 10-1.415 1.415zm2.121 2.121a1 1 0 01-1.414-1.415A6 6 0 1118 9a1 1 0 01-1.414 1.414zM4 3a1 1 0 00-1 1v1a1 1 0 002 0V4a1 1 0 00-1-1z"
            clipRule="evenodd"
          ></path>
        </svg>
      )}
    </button>
  );
}
