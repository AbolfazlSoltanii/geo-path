import { type FC, useState } from "react";
import MapView from "./features/map/MapView";
import { searchPlace } from "./services/helper";
import type { Location, SearchResult } from "./interfaces/search";
import SearchPanel from "./features/search/SearchPanel";

const App: FC = () => {
  const [search, setSearch] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null,
  );
  const [results, setResults] = useState<SearchResult[]>([]);
  const [theme, setTheme] = useState<"light" | "dark">("light");
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

      setSelectedLocation({ lat, lon });
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

    setSelectedLocation({ lat, lon });
  };

  return (
    <div className="relative flex h-screen overflow-hidden">
      <div className="flex-1">
        <MapView selectedLocation={selectedLocation ?? undefined} />
      </div>

      <SearchPanel
        search={search}
        results={results}
        isLoading={isLoading}
        theme={theme}
        onSearchChange={setSearch}
        onSearchClick={onSearchClick}
        onResultClick={onResultClick}
        onToggleTheme={() =>
          setTheme((prev) => (prev === "light" ? "dark" : "light"))
        }
      />
    </div>
  );
};

export default App;
