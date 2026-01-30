import { type FC, useEffect, useRef } from "react";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import { View } from "ol";
import Map from "ol/Map";
import { fromLonLat, transformExtent } from "ol/proj";
import { defaults as defaultControls } from "ol/control";
import "ol/ol.css";

const MapView: FC = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapRef.current) {
      return;
    }

    const map: Map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([53.688, 32.4279]), // center of Iran
        extent: transformExtent(
          [44.0, 25.0, 63.5, 39.8],
          "EPSG:4326",
          "EPSG:3857",
        ), // bounding box of Iran
        zoom: 6,
      }),
      controls: defaultControls({
        attribution: false,
      }),
    });

    return () => {
      map.setTarget(undefined);
    };
  }, []);

  return <div className={"h-screen w-full"} ref={mapRef}></div>;
};

export default MapView;
