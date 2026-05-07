import { type FC, useState } from "react";
import type { SearchResult } from "../../interfaces/search";
import SearchHeader from "./components/SearchHeader";
import SearchInput from "./components/SearchInput";
import SearchResults from "./components/SearchResults";
import PanelToggleButton from "./components/PanelToggleButton";
import type { ThemeMode } from "./types";

interface SearchPanelProps {
  search: string;
  results: SearchResult[];
  isLoading: boolean;
  theme: ThemeMode;
  onSearchChange: (value: string) => void;
  onSearchClick: () => void;
  onResultClick: (item: SearchResult) => void;
  onToggleTheme: () => void;
}

const SearchPanel: FC<SearchPanelProps> = ({
  search,
  results,
  isLoading,
  theme,
  onSearchChange,
  onSearchClick,
  onResultClick,
  onToggleTheme,
}) => {
  const [showPanel, setShowPanel] = useState<boolean>(true);

  return (
    <div
      className={`relative h-full w-full transition-all duration-400 ${
        showPanel ? "max-w-105" : "max-w-0"
      }`}
    >
      <div
        className={`flex h-full flex-col gap-6 p-5 shadow-2xl transition-all duration-500 ease-out ${
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
        <SearchHeader theme={theme} onToggleTheme={onToggleTheme}>
          <SearchInput
            search={search}
            isLoading={isLoading}
            theme={theme}
            onSearchChange={onSearchChange}
            onSearchClick={onSearchClick}
          />
        </SearchHeader>

        <div className="flex shrink-0 items-center justify-between gap-2 rounded-xl px-1 pt-1">
          <div>
            <h3 className="text-base font-bold tracking-tight">نتایج جستجو</h3>
            <p
              className={`mt-2 text-xs leading-5 ${
                theme === "dark" ? "text-slate-400" : "text-slate-500"
              }`}
            >
              مقصد مناسب را انتخاب کنید تا نقشه روی آن زوم شود
            </p>
          </div>
        </div>

        <SearchResults
          results={results}
          isLoading={isLoading}
          theme={theme}
          onResultClick={onResultClick}
        />
      </div>

      <PanelToggleButton
        showPanel={showPanel}
        theme={theme}
        onToggle={() => setShowPanel((prev) => !prev)}
      />
    </div>
  );
};

export default SearchPanel;
