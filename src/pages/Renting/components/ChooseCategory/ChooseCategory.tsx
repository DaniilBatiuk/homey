import clsx from "clsx";

import Rectangle13 from "@/assets/images/Rectangle13.png";

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
          <img src={Rectangle13} alt="flag" />
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
          <img src={Rectangle13} alt="flag" />
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
          <img src={Rectangle13} alt="flag" />
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
          <img src={Rectangle13} alt="flag" />
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
          <img src={Rectangle13} alt="flag" />
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
          <img src={Rectangle13} alt="flag" />
          <p>Aparthotel</p>
        </div>
      </div>
    </div>
  );
};
