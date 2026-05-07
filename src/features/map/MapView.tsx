import { type FC, useEffect, useRef } from "react";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import { OSM } from "ol/source";
import VectorSource from "ol/source/Vector";
import { View } from "ol";
import Map from "ol/Map";
import { fromLonLat, transformExtent } from "ol/proj";
import { defaults as defaultControls } from "ol/control";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import Style from "ol/style/Style";
import Icon from "ol/style/Icon";
import "ol/ol.css";
import type { Location } from "../../interfaces/search";

const PIN_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
      <path fill="#DC2626" d="M12 2C8.686 2 6 4.686 6 8c0 4.098 3.751 7.994 5.316 9.445a1 1 0 0 0 1.368 0C14.249 15.994 18 12.098 18 8c0-3.314-2.686-6-6-6z"/>
      <circle cx="12" cy="8" r="2.5" fill="#ffffff"/>
    </svg>`,
  );

interface MapViewProps {
  selectedLocation?: Location;
}

const MapView: FC<MapViewProps> = ({ selectedLocation }) => {
  const mapElementRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Map | null>(null);
  const markerSourceRef = useRef<VectorSource | null>(null);

  useEffect(() => {
    if (!mapElementRef.current || mapRef.current) {
      return;
    }

    const markerSource = new VectorSource();
    const markerLayer = new VectorLayer({
      source: markerSource,
    });

    const map: Map = new Map({
      target: mapElementRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        markerLayer,
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

    map.on("pointermove", (event) => {
      if (!markerSourceRef.current) return;

      const pixel = event.pixel;
      let isHoveringMarker = false;

      map.forEachFeatureAtPixel(pixel, (feature) => {
        if (
          markerSourceRef.current?.getFeatures().includes(feature as Feature)
        ) {
          isHoveringMarker = true;
          return true;
        }
        return false;
      });

      markerSourceRef.current.getFeatures().forEach((feature) => {
        const style = feature.getStyle() as Style | null;
        if (!style) return;

        const image = style.getImage() as Icon | null;
        if (!image) return;

        image.setOpacity(isHoveringMarker ? 0.4 : 1);
        feature.changed();
      });
    });

    mapRef.current = map;
    markerSourceRef.current = markerSource;

    return () => {
      map.setTarget(undefined);
      mapRef.current = null;
      markerSourceRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!selectedLocation || !mapRef.current || !markerSourceRef.current) {
      return;
    }

    const { lat, lon } = selectedLocation;
    const coordinates = fromLonLat([lon, lat]);

    markerSourceRef.current.clear();

    const marker = new Feature({
      geometry: new Point(coordinates),
    });

    const baseScale = 2.4;

    marker.setStyle(
      new Style({
        image: new Icon({
          src: PIN_SVG,
          anchor: [0.5, 1],
          anchorXUnits: "fraction",
          anchorYUnits: "fraction",
          scale: baseScale,
        }),
      }),
    );

    markerSourceRef.current.addFeature(marker);

    const view = mapRef.current.getView();
    const currentZoom = view.getZoom() ?? 6;

    if (currentZoom > 10) {
      const zoomOutLevel = Math.max(currentZoom - 3, 6);

      view.animate(
        {
          zoom: zoomOutLevel,
          duration: 1500,
        },
        {
          center: coordinates,
          zoom: 18,
          duration: 1500,
        },
      );
    } else {
      view.animate({
        center: coordinates,
        zoom: 18,
        duration: 1500,
      });
    }
  }, [selectedLocation]);

  return <div className={"h-full w-full"} ref={mapElementRef}></div>;
};

export default MapView;
