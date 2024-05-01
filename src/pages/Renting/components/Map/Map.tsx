import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";

import "./Map.scss";

import placeholder from "../../../../assets/images/placeholder.png";

type MapProp = {
  selectedPosition: [number, number] | null;
  setSelectedPosition: React.Dispatch<React.SetStateAction<[number, number] | null>>;
};

export const Map: React.FC<MapProp> = ({ selectedPosition, setSelectedPosition }: MapProp) => {
  const position: [number, number] = [48.8566, 2.3522];
  const customIcon = new Icon({
    iconUrl: placeholder,
    iconSize: [38, 38],
  });

  const MapClickHandler = () => {
    useMapEvents({
      click: e => {
        setSelectedPosition([e.latlng.lat, e.latlng.lng]);
      },
    });
    return null;
  };

  return (
    <div className="map">
      <MapContainer center={position} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapClickHandler />
        {selectedPosition && <Marker position={selectedPosition} icon={customIcon}></Marker>}
      </MapContainer>
    </div>
  );
};
