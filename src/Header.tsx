// src/components/Header.tsx
import { Link, useLocation } from "react-router-dom";

import { ROUTES } from "@/constants/routes.ts";

export const Header = () => {
  const { pathname } = useLocation();

  const navLinks = [
    { label: "Overview", path: ROUTES.MAIN },
    { label: "Compare", path: ROUTES.COMPARISON },
    { label: "String Details", path: ROUTES.STRING_DETAILS },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
        <Link to={ROUTES.MAIN} className="text-sm font-semibold text-gray-900">
          🎾 String Lab
        </Link>

        <nav className="flex items-center gap-1">
          {navLinks.map(({ label, path }) => (
            <Link
              key={path}
              to={path}
              className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
                pathname === path
                  ? "bg-gray-100 font-medium text-gray-900"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};
