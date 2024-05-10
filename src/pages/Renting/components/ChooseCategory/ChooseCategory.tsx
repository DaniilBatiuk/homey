import clsx from "clsx";

import Houses from "@/assets/images/Houses_renting.png";
import Flats from "@/assets/images/Flats_renting.png";
import Hotels from "@/assets/images/Hotels_renting.png";
import Hostels from "@/assets/images/Hostels_renting.png";
import Guesthouses from "@/assets/images/Guesthouses_renting.png";
import Apartments from "@/assets/images/Apartment_renting.png";

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
          <img src={Houses} alt="flag" />
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
          <img src={Flats} alt="flag" />
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
          <img src={Hotels} alt="flag" />
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
          <img src={Hostels} alt="flag" />
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
          <img src={Guesthouses} alt="flag" />
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
          <img src={Apartments} alt="flag" />
          <p>Aparthotel</p>
        </div>
      </div>
    </div>
  );
};
