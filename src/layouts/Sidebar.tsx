import { type Dispatch, type SetStateAction, useState } from "react";
import { Tab } from "@mui/material";
import { Tabs } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RouteIcon from "@mui/icons-material/Route";

import SidebarHeader from "../ui/SidebarHeader.tsx";
import type { ThemeMode } from "../features/search/types.ts";
import SearchPanel from "../features/search/SearchPanel.tsx";
import PanelToggleButton from "../ui/PanelToggleButton.tsx";
import type { Location } from "../interfaces/search.ts";

interface SidebarProps {
  onSelectedLocationChange: Dispatch<SetStateAction<Location | null>>;
}

const Sidebar = ({ onSelectedLocationChange }: SidebarProps) => {
  const [showPanel, setShowPanel] = useState<boolean>(true);
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [activeTab, setActiveTab] = useState<"search" | "routing">("search");

  const headerTitle =
    activeTab === "search"
      ? "جستجوی هوشمند خیابان‌ها، اماکن شهری و نقاط دیدنی"
      : "بهینه‌ترین مسیرها با در نظر گرفتن ترافیک";

  const onToggleTheme = () => {
    setTheme((prevState) => (prevState === "light" ? "dark" : "light"));
  };

  return (
    <div
      className={`relative h-full w-full transition-all duration-400 ${
        showPanel ? "max-w-105" : "max-w-0"
      }`}
    >
      <div
        className={`flex h-full flex-col gap-6 px-5 py-2 shadow-2xl transition-all duration-500 ease-out ${
          showPanel
            ? "translate-x-0 scale-100 opacity-100"
            : "pointer-events-none translate-x-6 scale-95 opacity-0"
        } ${
          theme === "dark"
            ? "border-l border-slate-800/70 bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50 backdrop-blur-sm"
            : "border-l border-slate-200 bg-linear-to-b from-white via-slate-50 to-slate-100 text-slate-900"
        }`}
        dir="rtl"
      >
        <SidebarHeader
          title={headerTitle}
          theme={theme}
          onToggleTheme={onToggleTheme}
        />

        <Tabs
          value={activeTab}
          onChange={(_, value) => setActiveTab(value)}
          variant="fullWidth"
          className={`min-h-9! rounded-lg ${
            theme === "dark" ? "bg-slate-800" : "bg-slate-100"
          }`}
          slotProps={{
            indicator: {
              hidden: true,
            },
          }}
        >
          <Tab
            value="search"
            label="جستجو"
            icon={<SearchIcon />}
            iconPosition={"start"}
            className={
              "min-h-9! rounded-lg! font-[inherit]! transition-all duration-200!"
            }
            sx={{
              "&.Mui-selected": {
                backgroundColor: theme === "dark" ? "#4f46e5" : "#7c3aed",
                color: "#ffffff",
              },
              "&:not(.Mui-selected)": {
                backgroundColor: "transparent",
                color: theme === "dark" ? "#cbd5e1" : "#475569",
              },
              "&:hover:not(.Mui-selected)": {
                backgroundColor: theme === "dark" ? "#334155" : "#e2e8f0",
              },
            }}
          />
          <Tab
            value="routing"
            label="مسیریابی"
            icon={<RouteIcon />}
            iconPosition={"start"}
            className={
              "min-h-9! rounded-lg! font-[inherit]! transition-all duration-200!"
            }
            sx={{
              "&.Mui-selected": {
                backgroundColor: theme === "dark" ? "#4f46e5" : "#7c3aed",
                color: "#ffffff",
              },
              "&:not(.Mui-selected)": {
                backgroundColor: "transparent",
                color: theme === "dark" ? "#cbd5e1" : "#475569",
              },
              "&:hover:not(.Mui-selected)": {
                backgroundColor: theme === "dark" ? "#334155" : "#e2e8f0",
              },
            }}
          />
        </Tabs>

        <div>
          {activeTab === "search" && (
            <SearchPanel
              theme={theme}
              onSelectedLocationChange={onSelectedLocationChange}
            />
          )}
        </div>
      </div>

      <PanelToggleButton
        showPanel={showPanel}
        theme={theme}
        onToggle={() => setShowPanel((prev) => !prev)}
      />
    </div>
  );
};

export default Sidebar;
