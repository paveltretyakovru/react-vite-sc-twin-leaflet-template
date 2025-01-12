import styled from "styled-components";
import { DivMarker } from "./DivMarker";
import { MapMarker, useMapContext } from "./MapProvider";
import { useEffect } from "react";
import { v4 as uuid } from 'uuid';
import { LatLngExpression } from "leaflet";

const CheckDiv = styled.div`
  color: red;
`;

// Центральная точка Лондона
const center: LatLngExpression = [51.5074, -0.1278];

// Функция для генерации случайного числа в диапазоне
const getRandomInRange = (from: number, to: number, fixed: number): number => {
  return parseFloat((Math.random() * (to - from) + from).toFixed(fixed));
};

// Генерация 1000 маркеров вокруг центра Лондона
const generateMarkers = (numMarkers: number): MapMarker[] => {
  const markers: MapMarker[] = [];

  for (let i = 0; i < numMarkers; i++) {
    const lat = getRandomInRange(center[0] - 0.05, center[0] + 0.05, 6);
    const lng = getRandomInRange(center[1] - 0.1, center[1] + 0.1, 6);

    const marker: MapMarker = {
      id: uuid(),
      position: [lat, lng],
      el: (
        <DivMarker id={`marker-${i}`} isMarker={true} coords={[lat, lng]}>
          <CheckDiv>Marker {i + 1}</CheckDiv>
        </DivMarker>
      ),
    };

    markers.push(marker);
  }

  return markers;
};

const markers: MapMarker[] = generateMarkers(1000);

export const MarkerLayer = () => {
  const context = useMapContext();

  useEffect(() => {
    context.setMarkers(markers);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};
