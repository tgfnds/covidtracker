import { useState } from "react";
import {
  icon,
  LeafletEvent,
  LeafletEventHandlerFn,
  LeafletMouseEvent,
  Map,
  point,
} from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  ZoomControl,
  Circle,
} from "react-leaflet";
import { useSelectedCountry } from "../../context/SelectedCountryProvider";
import ModeControl from "./ModeControl";
import { Country, Mode } from "../../types";
import "./WorldMap.scss";

type Props = {
  countries: Country[];
};

const WorldMap = ({ countries }: Props) => {
  const DEFAULT_ZOOM = 4;
  const MIN_ZOOM = 2;
  const MAX_ZOOM = 10;
  const [flagSize, setFlagSize] = useState<[number, number]>([
    DEFAULT_ZOOM * 10,
    DEFAULT_ZOOM * 7.5,
  ]);
  const {
    selectedCountry,
    setSelectedCountry,
  } = useSelectedCountry() as import("../../context/SelectedCountryProvider").ProviderValue;
  const [mode, setMode] = useState<Mode>("FLAGS");

  const onZoom: LeafletEventHandlerFn = (e: LeafletEvent) => {
    const newZoom = e.target._zoom;
    setFlagSize([newZoom * 8, newZoom * 6]);
  };

  const onCreated = (map: Map) => {
    map.on("zoomend", (e) => onZoom(e));
  };

  const onMarkerClicked = (e: LeafletMouseEvent) => {
    const selected = countries.find(
      (c) =>
        c.countryInfo.lat === e.latlng.lat &&
        c.countryInfo.long === e.latlng.lng
    );
    setSelectedCountry({
      code: selected?.country ?? "worldwide",
      data: selected ?? null,
    });
  };

  return (
    <div className="worldmap">
      <MapContainer
        center={[48, 10]}
        minZoom={MIN_ZOOM}
        maxZoom={MAX_ZOOM}
        zoom={DEFAULT_ZOOM}
        scrollWheelZoom={true}
        zoomControl={false}
        whenCreated={(map) => onCreated(map)}
      >
        <ZoomControl />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ModeControl
          position="topright"
          change={(mode: Mode) => setMode(mode)}
        />
        {mode === "FLAGS" &&
          countries.map((country, index) => (
            <Marker
              key={country.countryInfo._id ?? `CustomId_${index}`}
              riseOnHover
              icon={icon({
                iconUrl: country.countryInfo.flag,
                iconSize: point(flagSize[0], flagSize[1]),
                className:
                  selectedCountry.code === country.country
                    ? "flag-icon flag-icon_selected"
                    : "flag-icon",
              })}
              eventHandlers={{ click: (e) => onMarkerClicked(e) }}
              position={[country.countryInfo.lat, country.countryInfo.long]}
            >
              <Tooltip direction="top">{country.country}</Tooltip>
            </Marker>
          ))}
        {mode === "RED_ZONES" &&
          countries.map((country, index) => (
            <Circle
              key={country.countryInfo._id ?? `CustomId_${index}`}
              center={[country.countryInfo.lat, country.countryInfo.long]}
              radius={country.activePerOneMillion * 10}
              color="red"
            />
          ))}
      </MapContainer>
    </div>
  );
};

export default WorldMap;
