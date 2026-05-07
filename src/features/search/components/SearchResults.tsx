import { type FC } from "react";
import type { SearchResult } from "../../../interfaces/search";
import type { ThemeMode } from "../types";
import "../styles/search-scrollbar.css";

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
  return (
    <div
      className={`search-results-scrollbar relative flex-1 overflow-y-auto ${
        theme === "dark"
          ? "search-results-scrollbar--dark"
          : "search-results-scrollbar--light"
      }`}
    >
      {results.length > 0 && (
        <div
          className={`rounded-2xl text-xs shadow-lg ${
            theme === "dark"
              ? "border border-slate-800/80 bg-slate-900/80"
              : "border border-slate-200 bg-white"
          }`}
        >
          <div
            className={`sticky top-0 z-10 px-4 py-3 text-[11px] font-medium tracking-wide ${
              theme === "dark"
                ? "border-b border-slate-800/80 bg-slate-900/95 text-slate-400"
                : "border-b border-slate-200 bg-slate-50 text-slate-500"
            }`}
          >
            {results.length} مکان پیدا شد
          </div>

          <div className="grid grid-cols-1 gap-3 p-3">
            {results.map((item) => (
              <div
                key={item.place_id}
                className={`group cursor-pointer rounded-xl p-4 transition-all hover:-translate-y-px hover:shadow-md ${
                  theme === "dark"
                    ? "border border-slate-800/70 bg-slate-900/80 hover:border-indigo-500/70 hover:bg-slate-900"
                    : "border border-slate-200 bg-white hover:border-indigo-400/70 hover:bg-indigo-50/60"
                }`}
                onClick={() => onResultClick(item)}
              >
                <div
                  className={`line-clamp-2 text-[13px] font-bold ${
                    theme === "dark" ? "text-slate-50" : "text-slate-800"
                  }`}
                >
                  {item.display_name}
                </div>
                <div
                  className={`mt-3 flex flex-wrap items-center gap-1.5 text-[11px] ${
                    theme === "dark" ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  <span
                    className={`rounded-full px-2 py-0.5 ${
                      theme === "dark" ? "bg-slate-800/80" : "bg-slate-100"
                    }`}
                  >
                    نوع مکان: {item.type}
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 ${
                      theme === "dark" ? "bg-slate-800/80" : "bg-slate-100"
                    }`}
                  >
                    دسته‌بندی: {item.class}
                  </span>
                  <span
                    className={`ms-auto rounded-full px-2 py-0.5 text-[10px] font-medium ${
                      theme === "dark"
                        ? "bg-indigo-600/80 text-indigo-50"
                        : "bg-indigo-600/90 text-white"
                    }`}
                  >
                    مختصات: {item.lon}, {item.lat}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {results.length === 0 && (
        <div
          className={`rounded-2xl border border-dashed p-8 text-center text-sm ${
            theme === "dark"
              ? "border-slate-700 bg-slate-900/50 text-slate-400"
              : "border-slate-300 bg-white/70 text-slate-500"
          }`}
        >
          <div className="text-base font-semibold">هنوز نتیجه‌ای ثبت نشده</div>
          <p className="mt-2 text-xs">
            یک آدرس، نام محله یا مکان عمومی را جستجو کنید تا پیشنهادها اینجا نمایش داده
            شوند.
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
  );
};

export default SearchResults;

