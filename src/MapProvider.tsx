import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { LatLngExpression } from 'leaflet';

type DispatchMarkers = React.Dispatch<React.SetStateAction<MapMarker[]>>;

// Определяем интерфейс для маркера
export interface MapMarker {
  id: string;
  el: React.ReactNode;
  position: LatLngExpression;
}

// Определяем интерфейс для контекста
interface MapContextProps {
  markers: MapMarker[];
  setMarkers: DispatchMarkers;
}

// Создаём контекст
const MapContext = createContext<MapContextProps | undefined>(undefined);

// Компонент провайдера
export const MapProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [markers, setMarkers] = useState<MapMarker[]>([]);

  useEffect(() => {
    console.log('Markers updated', markers);
  }, [markers]);

  return (
    <MapContext.Provider value={{ markers, setMarkers }}>
      {children}
    </MapContext.Provider>
  );
};

// Хук для использования контекста
// eslint-disable-next-line react-refresh/only-export-components
export const useMapContext = () => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error('useMapContext must be used within a MapProvider');
  }
  return context;
};
