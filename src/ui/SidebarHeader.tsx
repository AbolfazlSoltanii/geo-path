import type { ThemeMode } from "../features/search/types.ts";
import { type ReactNode } from "react";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";

interface SearchHeaderProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
  children?: ReactNode;
  title: string;
}

const SidebarHeader = ({
  theme,
  onToggleTheme,
  children,
  title,
}: SearchHeaderProps) => {
  return (
    <div className={`shrink-0 rounded-3xl ps-5 pt-5 shadow-lg`}>
      <div className="flex items-start justify-between gap-3">
        <div className={"flex-1"}>
          <h2
            className={`mt-2 bg-linear-to-r bg-clip-text text-center text-3xl font-black tracking-tight text-transparent uppercase select-none ${
              theme === "dark"
                ? "from-indigo-200 via-violet-200 to-sky-300"
                : "from-indigo-700 via-violet-600 to-sky-600"
            }`}
          >
            GeoPath
          </h2>
          <p
            className={`mt-2! border-slate-400 text-center text-xs leading-5 select-none ${
              theme === "dark" ? "text-slate-400" : "text-slate-600"
            }`}
          >
            {title}
          </p>

          <svg
            className="h-3 w-full"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,64L80,69C160,75,240,85,320,80C400,75,480,53,560,48C640,43,720,53,800,64C880,75,960,85,1040,80C1120,75,1200,53,1200,53L1200,120L1120,120C1040,120,960,120,880,120C800,120,720,120,640,120C560,120,480,120,400,120C320,120,240,120,160,120C80,120,0,120,0,120Z"
              fill="currentColor"
              className={theme === "dark" ? "text-slate-600" : "text-slate-300"}
            />
          </svg>
        </div>

        <button
          type="button"
          onClick={() => onToggleTheme()}
          className={`inline-flex h-9 w-9 items-center justify-center rounded-full border shadow-sm transition ${
            theme === "dark"
              ? "border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-800"
              : "border-slate-200 bg-slate-100 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
          } cursor-pointer`}
          aria-label={
            theme === "dark" ? "فعال‌سازی تم روشن" : "فعال‌سازی تم تیره"
          }
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
    </div>
  );
};

export default SidebarHeader;
