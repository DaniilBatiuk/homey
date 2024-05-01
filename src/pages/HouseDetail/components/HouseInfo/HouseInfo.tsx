import clsx from "clsx";
import { useEffect, useState } from "react";

import "./HouseInfo.scss";
import { AboutHouse } from "./components/AboutHouse/AboutHouse";
import { Amenities } from "./components/Amenities/Amenities";
import { Location } from "./components/Location/Location";
import { PersonalCard } from "./components/PersonalCard/PersonalCard";

type HouseInfoProp = {
  house: IHouse;
};

export const HouseInfo: React.FC<HouseInfoProp> = ({ house }: HouseInfoProp) => {
  const [categoryActive, setCategoryActive] = useState(0);
  const [coordinates, setCoordinates] = useState<{ lat: string; lon: string } | null>(null);
  const nominatimUrl = "https://nominatim.openstreetmap.org/search.php?";

  useEffect(() => {
    const fetchCoordinates = async () => {
      const response = await fetch(
        `${nominatimUrl}street=${house.address.addressLabel.split(" ")[1]}%2F${house.address.addressLabel.split(" ")[0]}&city=${house.address.city}&country=${house.address.country}&exclude_place_ids=203949819%2C202716725%2C203203140%2C202724434%2C203351883%2C203872543&format=jsonv2`,
      );
      const data = await response.json();

      if (data.length > 0) {
        const { lat, lon } = data[0];
        setCoordinates({ lat, lon });
      } else {
        setCoordinates(null);
      }
    };

    fetchCoordinates();
  }, []);

  useEffect(() => {
    const scrollContainerHouseInfo = document.getElementById(
      "scrollContainerHouseInfo",
    ) as HTMLDivElement;
    if (scrollContainerHouseInfo) {
      scrollContainerHouseInfo.addEventListener("wheel", e => {
        e.preventDefault();
        scrollContainerHouseInfo.scrollLeft += e.deltaY;
      });
    }
  }, []);

  return (
    <div className="house-info">
      <div className="house-info__list" id="scrollContainerHouseInfo">
        <div
          onClick={() => setCategoryActive(0)}
          className={clsx("house-info__list-item", {
            ["active"]: categoryActive === 0,
          })}
        >
          About housing
        </div>
        <div
          onClick={() => setCategoryActive(1)}
          className={clsx("house-info__list-item", {
            ["active"]: categoryActive === 1,
          })}
        >
          Amenities
        </div>
        <div
          onClick={() => setCategoryActive(2)}
          className={clsx("house-info__list-item", {
            ["active"]: categoryActive === 2,
          })}
        >
          Host's profile
        </div>
        <div
          onClick={() => setCategoryActive(3)}
          className={clsx("house-info__list-item", {
            ["active"]: categoryActive === 3,
          })}
        >
          Location
        </div>
      </div>
      <div className="house-info__body">
        {categoryActive === 0 ? (
          <AboutHouse house={house} />
        ) : categoryActive === 1 ? (
          <Amenities house={house} />
        ) : categoryActive === 2 ? (
          <PersonalCard house={house} />
        ) : (
          <Location house={house} />
        )}
      </div>
    </div>
  );
};
