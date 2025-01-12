import { LatLngExpression } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import { Cluster } from "./Cluster";
import { MapProvider } from "./MapProvider";
import { MarkerLayer } from "./MarkerLayer";
import L from 'leaflet';
import { useState } from "react";
import { useInterval } from "usehooks-ts";

const position: LatLngExpression = [51.505, -0.09];

export const Map = () => {
  const [tick, setTick] = useState<number>(1);
  const [testIcon, setTestIcon] = useState<L.DivIcon>(new L.DivIcon({
    className: 'div-marker',
    html: '<div style="border: 1px solid purple; color: green; background: white">test</div>'
  }));

  useInterval(() => {
    setTestIcon(new L.DivIcon({
      className: 'div-marker',
      html: `<div style="border: 1px solid purple; color: green; background: white">${tick}</div>`
    }));
    setTick(tick + 1);
  }, 1000);

  return (
    <MapContainer
      style={{ width: "100%", height: "100%" }}
      center={position}
      zoom={13}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapProvider>
        <Marker position={position} icon={testIcon}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>

        <MarkerLayer />

        <Cluster />
      </MapProvider>
    </MapContainer>
  );
};
