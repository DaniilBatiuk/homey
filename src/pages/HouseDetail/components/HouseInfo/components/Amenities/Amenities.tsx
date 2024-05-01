import { ICONS } from "@/constants";

import "./Amenities.scss";

type AmenitiesProp = {
  house: IHouse;
};

export const Amenities: React.FC<AmenitiesProp> = ({ house }: AmenitiesProp) => {
  return (
    <div className="amenities">
      {house.tags.map(tag => (
        <div key={tag.id} className="amenities__item">
          {tag.name === "TV"
            ? ICONS.tv()
            : tag.name === "Wi-Fi"
              ? ICONS.wifi()
              : tag.name === "Kitchen"
                ? ICONS.kitchen()
                : tag.name === "Cradle"
                  ? ICONS.cradle()
                  : tag.name === "Fridge"
                    ? ICONS.fridge()
                    : tag.name === "Shower"
                      ? ICONS.shower()
                      : tag.name === "Wardrobe"
                        ? ICONS.wardrobe()
                        : tag.name === "Washer"
                          ? ICONS.washer()
                          : tag.name === "Free car parking"
                            ? ICONS.freeCarParking()
                            : tag.name === "Air conditioner"
                              ? ICONS.airConditioner()
                              : tag.name === "Central heating"
                                ? ICONS.centralHeating()
                                : ICONS.carbonMonoxideSensor()}
          <p>{tag.name}</p>
        </div>
      ))}
    </div>
  );
};
