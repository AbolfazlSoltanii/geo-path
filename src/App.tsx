import { type FC } from "react";
import MapView from "./features/map/MapView.tsx";

const App: FC = () => {
  return (
    <div className={"flex"}>
      <div className={"flex-1/4"}></div>

      <div className={"flex-3/4"}>
        <MapView />
      </div>
    </div>
  );
};

export default App;
