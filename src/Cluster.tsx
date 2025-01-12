import { LatLngTuple } from "leaflet";
import { MapMarker, useMapContext } from "./MapProvider";
import { useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import { DivMarker } from "./DivMarker";
import styled from "styled-components";

const ClusterWrapper = styled.div`
  color: red;
`;

// Функция для вычисления расстояния между двумя точками
const distanceBetween = (
  position1: LatLngTuple,
  position2: LatLngTuple
): number => {
  const [lat1, lng1] = position1;
  const [lat2, lng2] = position2;
  return Math.sqrt(Math.pow(lat1 - lat2, 2) + Math.pow(lng1 - lng2, 2));
};

// Определяет, кластеризовать ли два маркера на основе их расстояния и уровня зума
const shouldCluster = (
  zoom: number,
  position1: LatLngTuple,
  position2: LatLngTuple
): boolean => {
  const distanceThreshold = 0.01 * (zoom <= 10 ? 21 : 15 - zoom);
  return distanceBetween(position1, position2) < distanceThreshold;
};
const clusterMarkers = (markers: MapMarker[], zoom: number): MapMarker[] => {
  const clustered: MapMarker[] = [];
  const usedMarkers = new Set<string>();

  markers.forEach((marker) => {
    if (usedMarkers.has(marker.id)) return;

    const cluster = markers.filter(
      (m) =>
        !usedMarkers.has(m.id) &&
        shouldCluster(
          zoom,
          marker.position as LatLngTuple,
          m.position as LatLngTuple
        )
    );

    if (cluster.length > 1) {
      const clusterMarker: MapMarker = {
        id: `cluster-${cluster.map((m) => m.id).join("-")}`,
        position: marker.position,
        el: (
        <DivMarker
            id={`cluster-${cluster.map((m) => m.id).join("-")}`}
            coords={marker.position as LatLngTuple}
          >
            {/* Замените на компонент кластера или сгруппированный элемент */}
            <ClusterWrapper onClick={() => console.log('Click by cluster')}>
              C:{cluster.length}
            </ClusterWrapper>
          </DivMarker>
        ),
      };

      clustered.push(clusterMarker);
      cluster.forEach((m) => usedMarkers.add(m.id));
    } else {
      clustered.push(marker);
      usedMarkers.add(marker.id);
    }
  });

  return clustered;
};

export const Cluster = () => {
  const { markers } = useMapContext();

  const [clusteredMarkers, setClusteredMarkers] = useState<MapMarker[]>([]);
  const map = useMap();

  useEffect(() => {
    const updateClusters = () => {
      const zoom = map.getZoom();

      console.log('ZOOM:', zoom);

      const newClusters = clusterMarkers(markers, zoom);
      setClusteredMarkers(newClusters);
    };

    updateClusters();

    map.on("zoomend", updateClusters);

    return () => {
      map.off("zoomend", updateClusters);
    };
  }, [markers, map]);

  return (
    <>
      {clusteredMarkers.map((m) => (
        <div key={m.id}>{m.el}</div>
      ))}
    </>
  );
};
