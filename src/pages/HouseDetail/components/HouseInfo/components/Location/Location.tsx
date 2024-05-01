import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

import placeholder from "../../../../../../assets/images/placeholder.png";

type LocationProp = {
  house: IHouse;
};
const customIcon = new Icon({
  iconUrl: placeholder,
  iconSize: [38, 38],
});

export const Location: React.FC<LocationProp> = ({ house }: LocationProp) => {
  return (
    <div className="location">
      <MapContainer center={[+house.address.latitude, +house.address.longitude]} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          position={[+house.address.latitude, +house.address.longitude]}
          icon={customIcon}
        ></Marker>
      </MapContainer>
    </div>
  );
};
