import { type FC, type ReactNode } from "react";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import { QUICK_FILTERS } from "../constants";
import type { ThemeMode } from "../types";

interface SearchHeaderProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
  children?: ReactNode;
}

const SearchHeader: FC<SearchHeaderProps> = ({ theme, onToggleTheme, children }) => {
  return (
    <div
      className={`shrink-0 rounded-3xl border p-5 shadow-lg ${
        theme === "dark"
          ? "border-slate-800/80 bg-slate-900/70 shadow-black/20"
          : "border-slate-200/90 bg-white/90 shadow-slate-200/80"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2
            className={`mt-2 bg-linear-to-r uppercase bg-clip-text text-3xl font-black tracking-tight text-transparent ${
              theme === "dark"
                ? "from-indigo-200 via-violet-200 to-sky-300"
                : "from-indigo-700 via-violet-600 to-sky-600"
            }`}
          >
            GeoPath
          </h2>
          <p
            className={`mt-2 text-xs leading-5 ${
              theme === "dark" ? "text-slate-400" : "text-slate-600"
            }`}
          >
            جستجوی سریع آدرس، خیابان و اماکن شهری با تجربه حرفه‌ای
          </p>
        </div>

        <button
          type="button"
          onClick={onToggleTheme}
          className={`inline-flex h-9 w-9 items-center justify-center rounded-full border shadow-sm transition ${
            theme === "dark"
              ? "border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-800"
              : "border-slate-200 bg-slate-100 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
          } cursor-pointer`}
          aria-label={theme === "dark" ? "فعال‌سازی تم روشن" : "فعال‌سازی تم تیره"}
          title={theme === "dark" ? "تم روشن" : "تم تیره"}
        >
          {theme === "dark" ? (
            <LightModeRoundedIcon fontSize="small" />
          ) : (
            <DarkModeRoundedIcon fontSize="small" />
          )}
        </button>
      </div>

      {children}

      <div className="mt-5 flex flex-wrap items-center gap-2.5">
        {QUICK_FILTERS.map((filter) => (
          <span
            key={filter}
            className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-medium ${
              theme === "dark"
                ? "border-slate-700/80 bg-slate-900/70 text-white"
                : "border-slate-300 bg-white text-black"
            }`}
          >
            {filter}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SearchHeader;

