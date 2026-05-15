import { type Dispatch, type FC, type SetStateAction, useState } from "react";

import type { Location, SearchResult } from "../../interfaces/search";
import SearchResults from "./components/SearchResults.tsx";
import type { ThemeMode } from "./types";
import SearchInput from "./components/SearchInput.tsx";
import { searchPlace } from "../../services/helper.ts";

interface SearchPanelProps {
  theme: ThemeMode;
  onSelectedLocationChange: Dispatch<SetStateAction<Location | null>>;
}

const SearchPanel: FC<SearchPanelProps> = ({
  theme,
  onSelectedLocationChange,
}) => {
  const [search, setSearch] = useState<string>("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSearchClick = async () => {
    if (!search.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const data: SearchResult[] = await searchPlace(search);

      if (data.length === 0) {
        setResults([]);
        return;
      }

      setResults(data);

      const first = data[0];
      const lat = Number(first.lat);
      const lon = Number(first.lon);

      if (Number.isNaN(lat) || Number.isNaN(lon)) {
        return;
      }

      onSelectedLocationChange({ lat, lon });
    } finally {
      setIsLoading(false);
    }
  };

  const onResultClick = (item: SearchResult) => {
    const lat = Number(item.lat);
    const lon = Number(item.lon);

    if (Number.isNaN(lat) || Number.isNaN(lon)) {
      return;
    }

    onSelectedLocationChange({ lat, lon });
  };

  return (
    <>
      <div className={"mb-5"}>
        <SearchInput
          search={search}
          isLoading={isLoading}
          theme={theme}
          onSearchChange={(searchValue) => setSearch(searchValue)}
          onSearchClick={onSearchClick}
        />
      </div>

      <SearchResults
        results={results}
        isLoading={isLoading}
        theme={theme}
        onResultClick={onResultClick}
      />
    </>
  );
};

export default SearchPanel;
