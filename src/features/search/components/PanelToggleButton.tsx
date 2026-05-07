import { type FC } from "react";
import KeyboardTabIcon from "@mui/icons-material/KeyboardTab";
import type { ThemeMode } from "../types";

interface PanelToggleButtonProps {
  showPanel: boolean;
  theme: ThemeMode;
  onToggle: () => void;
}

const PanelToggleButton: FC<PanelToggleButtonProps> = ({
  showPanel,
  theme,
  onToggle,
}) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`group absolute top-1/2 -left-7 z-20 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border backdrop-blur-sm transition-all duration-300 focus-visible:ring-2 focus-visible:ring-indigo-400/80 focus-visible:ring-offset-2 focus-visible:outline-none active:scale-95 ${
        theme === "dark"
          ? "border-slate-700/80 bg-slate-900/85 text-slate-100 shadow-lg shadow-black/45 ring-offset-slate-950 hover:border-indigo-400/70 hover:bg-slate-800/95 hover:text-indigo-200"
          : "border-slate-300/80 bg-white/90 text-slate-700 shadow-lg shadow-slate-300/70 ring-offset-slate-100 hover:border-indigo-400/70 hover:bg-white hover:text-indigo-600"
      } cursor-pointer`}
      aria-label={showPanel ? "بستن پنل جستجو" : "باز کردن پنل جستجو"}
    >
      <KeyboardTabIcon
        className={`text-[22px] transition-transform duration-300 ${
          showPanel ? "" : "rotate-180"
        }`}
      />
    </button>
  );
};

export default PanelToggleButton;

