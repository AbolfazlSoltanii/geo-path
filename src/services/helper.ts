import type { SearchResult } from "../interfaces/search";

const isSearchResult = (item: unknown): item is SearchResult => {
  if (typeof item !== "object" || item === null) {
    return false;
  }

  const candidate = item as Partial<SearchResult>;
  return (
    typeof candidate.place_id === "number" &&
    typeof candidate.display_name === "string" &&
    typeof candidate.lat === "string" &&
    typeof candidate.lon === "string"
  );
};

export const searchPlace = async (q: string): Promise<SearchResult[]> => {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      q
    )}&format=json`,
  );

  if (!response.ok) {
    throw new Error(`Failed to search place: ${response.statusText}`);
  }

  const data: unknown = await response.json();

  if (!Array.isArray(data)) {
    return [];
  }

  return data.filter(isSearchResult);
};
