import {
  icon,
  LeafletEvent,
  LeafletEventHandlerFn,
  LeafletMouseEvent,
  Map,
  point,
} from "leaflet";
import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  ZoomControl,
} from "react-leaflet";
import { useSelectedCountry } from "../../context/SelectedCountryProvider";
import { Country } from "../../types";
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
    setSelectedCountry,
  } = useSelectedCountry() as import("../../context/SelectedCountryProvider").ProviderValue;

  const onZoom: LeafletEventHandlerFn = (e: LeafletEvent) => {
    const newZoom = e.target._zoom;
    setFlagSize([newZoom * 10, newZoom * 7.5]);
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
        center={[48, 0]}
        minZoom={MIN_ZOOM}
        maxZoom={MAX_ZOOM}
        zoom={DEFAULT_ZOOM}
        scrollWheelZoom={true}
        zoomControl={false}
        whenCreated={(map) => onCreated(map)}
      >
        <ZoomControl position="topright" />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {countries.map((country, index) => (
          <Marker
            key={country.countryInfo._id ?? `CustomId_${index}`}
            riseOnHover
            icon={icon({
              iconUrl: country.countryInfo.flag,
              iconSize: point(flagSize[0], flagSize[1]),
            })}
            eventHandlers={{ click: (e) => onMarkerClicked(e) }}
            position={[country.countryInfo.lat, country.countryInfo.long]}
          >
            <Tooltip direction="top">{country.country}</Tooltip>
            {/* <Popup className="popup">
              <h1 className="popup__title">{country.country}</h1>
              <h4 className="popup__subtitle">Pop: {country.population}</h4>
              <div className="popup__info">
                <div className="row">
                  <div>Cases:</div>
                  <div>{country.cases}</div>
                </div>
                <div className="row">
                  <div>Deaths:</div>
                  <div>{country.deaths}</div>
                </div>
                <div className="row">
                  <div>Recovered:</div>
                  <div>{country.recovered}</div>
                </div>
                <div className="row">
                  <div>Active:</div>
                  <div>{country.active}</div>
                </div>
              </div>
            </Popup> */}
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default WorldMap;
