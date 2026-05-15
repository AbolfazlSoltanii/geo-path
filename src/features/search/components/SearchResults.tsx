import { type FC, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import type { SearchResult } from "../../../interfaces/search.ts";
import type { ThemeMode } from "../types.ts";
import "../styles/search-scrollbar.css";
import SearchResultItem from "./SearchResultItem.tsx";

interface SearchResultsProps {
  results: SearchResult[];
  isLoading: boolean;
  theme: ThemeMode;
  onResultClick: (item: SearchResult) => void;
}

const SearchResults: FC<SearchResultsProps> = ({
  results,
  isLoading,
  theme,
  onResultClick,
}) => {
  const [showFullResults, setShowFullResults] = useState<boolean>(false);

  const INITIAL_VISIBLE_COUNT = 3;

  const visibleResults = showFullResults
    ? results
    : results.slice(0, INITIAL_VISIBLE_COUNT);

  const hasMoreResults = results.length > INITIAL_VISIBLE_COUNT;

  return (
    <div className="relative flex h-full flex-col">
      {results.length > 0 && (
        <div
          className={`sticky top-0 z-10 flex items-center justify-between rounded-t-2xl border px-4 py-3 text-[11px] font-medium tracking-wide shadow-sm ${
            theme === "dark"
              ? "border-b border-slate-800/80 bg-slate-900/95 text-slate-400"
              : "border-b border-slate-200 bg-slate-50 text-slate-500"
          }`}
        >
          <span>{results.length} مکان پیدا شد</span>
          {hasMoreResults && !showFullResults && (
            <button
              onClick={() => setShowFullResults(true)}
              className={`flex cursor-pointer items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-medium transition-all hover:scale-105 ${
                theme === "dark"
                  ? "bg-indigo-600/80 text-white hover:bg-indigo-500"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
            >
              <span>مشاهده بیشتر</span>
              <KeyboardArrowDownIcon sx={{ fontSize: 16 }} />
            </button>
          )}

          {showFullResults && (
            <button
              onClick={() => setShowFullResults(false)}
              className={`flex cursor-pointer items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-medium transition-all hover:scale-105 ${
                theme === "dark"
                  ? "bg-slate-700 text-slate-200 hover:bg-slate-600"
                  : "bg-slate-200 text-slate-700 hover:bg-slate-300"
              }`}
            >
              <span>نمایش کمتر</span>
              <KeyboardArrowUpIcon sx={{ fontSize: 16 }} />
            </button>
          )}
        </div>
      )}

      <div
        className={`search-results-scrollbar flex-1 overflow-y-auto ${
          theme === "dark"
            ? "search-results-scrollbar--dark"
            : "search-results-scrollbar--light"
        }`}
        style={{ maxHeight: "calc(100vh - 350px)" }}
      >
        {results.length > 0 && (
          <div
            className={`rounded-b-2xl text-xs shadow-lg ${
              theme === "dark"
                ? "border border-t-0 border-slate-800/80 bg-slate-900/80"
                : "border border-t-0 border-slate-200 bg-white"
            }`}
          >
            <div className="grid grid-cols-1 gap-3 p-3">
              {visibleResults.map((item) => (
                <SearchResultItem
                  item={item}
                  theme={theme}
                  onResultClick={onResultClick}
                />
              ))}
            </div>
          </div>
        )}

        {results.length === 0 && !isLoading && (
          <div
            className={`rounded-2xl border border-dashed p-8 text-center text-sm ${
              theme === "dark"
                ? "border-slate-700 bg-slate-900/50 text-slate-400"
                : "border-slate-300 bg-white/70 text-slate-500"
            }`}
          >
            <div className="text-base font-semibold">
              هنوز نتیجه‌ای ثبت نشده
            </div>
            <p className="mt-2 text-xs">
              یک آدرس، نام محله یا مکان عمومی را جستجو کنید تا پیشنهادها اینجا
              نمایش داده شوند.
            </p>
          </div>
        )}

        {isLoading && (
          <div
            className={`absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 rounded-2xl backdrop-blur-[2px] ${
              theme === "dark"
                ? "bg-slate-950/65 text-slate-100"
                : "bg-white/70 text-slate-700"
            }`}
          >
            <span
              className={`h-10 w-10 animate-spin rounded-full border-2 border-t-transparent ${
                theme === "dark"
                  ? "border-indigo-300 border-t-transparent"
                  : "border-indigo-600 border-t-transparent"
              }`}
            />
            <p className="text-xs font-medium">در حال دریافت نتایج...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
