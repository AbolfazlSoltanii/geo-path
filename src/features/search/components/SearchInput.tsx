import { type ChangeEvent, type FC } from "react";
import SearchIcon from "@mui/icons-material/Search";
import type { ThemeMode } from "../types";

interface SearchInputProps {
  search: string;
  isLoading: boolean;
  theme: ThemeMode;
  onSearchChange: (value: string) => void;
  onSearchClick: () => void;
}

const SearchInput: FC<SearchInputProps> = ({
  search,
  isLoading,
  theme,
  onSearchChange,
  onSearchClick,
}) => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder={"مثلاً: تهران، میدان آزادی"}
        value={search}
        disabled={isLoading}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onSearchChange(e.target.value)
        }
        dir="rtl"
        className={`w-full rounded-2xl border py-3 pr-5 pl-12 text-right text-sm transition outline-none placeholder:opacity-100 focus:ring-0 ${
          theme === "dark"
            ? "border-slate-500/45 bg-slate-950/70 text-slate-50 placeholder:text-slate-200/78 focus:border-indigo-400"
            : "border-slate-400/50 bg-slate-50/90 text-slate-900 placeholder:text-slate-600/78 focus:border-indigo-600"
        } ${isLoading ? "cursor-not-allowed opacity-60" : ""}`}
      />
      <button
        type="button"
        onClick={onSearchClick}
        disabled={isLoading}
        aria-label="جستجو"
        title="جستجو"
        className={`absolute inset-y-0 end-2 my-auto inline-flex items-center justify-center rounded-full p-1 transition-colors ${
          isLoading
            ? "cursor-not-allowed opacity-40"
            : "cursor-pointer opacity-100"
        }`}
      >
        <SearchIcon
          fontSize="medium"
          className={`${
            theme === "dark"
              ? "text-slate-500 hover:text-slate-200"
              : "text-slate-400 hover:text-slate-700"
          }`}
        />
      </button>
    </div>
  );
};

export default SearchInput;
