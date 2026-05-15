import type { ThemeMode } from "../types.ts";
import type { SearchResult } from "../../../interfaces/search.ts";

interface SearchResultItemProps {
  theme: ThemeMode;
  onResultClick: (item: SearchResult) => void;
  item: SearchResult;
}

const SearchResultItem = ({
  theme,
  onResultClick,
  item,
}: SearchResultItemProps) => {
  return (
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
  );
};

export default SearchResultItem;
