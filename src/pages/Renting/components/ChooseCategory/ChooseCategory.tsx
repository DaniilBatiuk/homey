import clsx from "clsx";

import Apartments from "@/assets/images/Apartment_renting.webp";
import Flats from "@/assets/images/Flats_renting.webp";
import Guesthouses from "@/assets/images/Guesthouses_renting.webp";
import Hostels from "@/assets/images/Hostels_renting.webp";
import Hotels from "@/assets/images/Hotels_renting.webp";
import Houses from "@/assets/images/Houses_renting.webp";

import "../../Renting.scss";

type chooseCategoryProp = {
  category: string;
  setCategory: (prev: string) => void;
};

export const ChooseCategory: React.FC<chooseCategoryProp> = ({
  category,
  setCategory,
}: chooseCategoryProp) => {
  return (
    <div className="renting__content">
      <h1 className="renting__title">Choose your type of accommodation</h1>
      <div className="renting__list-category">
        <div
          onClick={() => {
            setCategory("Houses");
          }}
          className={clsx("renting__list-category-item", {
            ["active"]: category === "Houses",
          })}
        >
          <img src={Houses} alt="flag" loading="lazy" />
          <p>Houses</p>
        </div>
        <div
          onClick={() => {
            setCategory("Flat");
          }}
          className={clsx("renting__list-category-item", {
            ["active"]: category === "Flat",
          })}
        >
          <img src={Flats} alt="flag" loading="lazy" />
          <p>Flat</p>
        </div>
        <div
          onClick={() => {
            setCategory("Hotel");
          }}
          className={clsx("renting__list-category-item", {
            ["active"]: category === "Hotel",
          })}
        >
          <img src={Hotels} alt="flag" loading="lazy" />
          <p>Hotel</p>
        </div>
        <div
          onClick={() => {
            setCategory("Hostel");
          }}
          className={clsx("renting__list-category-item", {
            ["active"]: category === "Hostel",
          })}
        >
          <img src={Hostels} alt="flag" loading="lazy" />
          <p>Hostel</p>
        </div>
        <div
          onClick={() => {
            setCategory("Guesthouse");
          }}
          className={clsx("renting__list-category-item", {
            ["active"]: category === "Guesthouse",
          })}
        >
          <img src={Guesthouses} alt="flag" loading="lazy" />
          <p>Guesthouse</p>
        </div>
        <div
          onClick={() => {
            setCategory("Aparthotel");
          }}
          className={clsx("renting__list-category-item", {
            ["active"]: category === "Aparthotel",
          })}
        >
          <img src={Apartments} alt="flag" loading="lazy" />
          <p>Aparthotel</p>
        </div>
      </div>
    </div>
  );
};
