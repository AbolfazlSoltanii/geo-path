import { type FC, useState } from "react";
import MapView from "./features/map/MapView";
import Sidebar from "./layouts/Sidebar.tsx";
import type { Location } from "./interfaces/search.ts";

const App: FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null,
  );

  return (
    <div className="relative flex h-screen overflow-hidden">
      <div className="flex-1">
        <MapView selectedLocation={selectedLocation ?? undefined} />
      </div>

      <Sidebar onSelectedLocationChange={setSelectedLocation} />
    </div>
  );
};

export default App;
