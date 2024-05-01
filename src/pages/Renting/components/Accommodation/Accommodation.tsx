import clsx from "clsx";

import { ICONS } from "@/constants";

import "./Accommodation.scss";

type accommodationProp = {
  accommodationType: string;
  setAccommodationType: (prev: string) => void;
};

export const Accommodation: React.FC<accommodationProp> = ({
  accommodationType,
  setAccommodationType,
}: accommodationProp) => {
  return (
    <div className="accommodation__content">
      <h1 className="renting__title">What type of accommodation do you rent out?</h1>
      <div className="accommodation__list-category">
        <div
          onClick={() => setAccommodationType("Whole dwelling")}
          className={clsx("accommodation__list-category-item", {
            ["active"]: accommodationType === "Whole dwelling",
          })}
        >
          <div className="accommodation__list-category-item-text">
            <h2>Whole dwelling</h2>
            <p>
              You are renting out the entire house or flat. Guests will have full access to all
              rooms and facilities and they will be the only occupants during their stay.
            </p>
          </div>
          {ICONS.house()}
        </div>
        <div
          onClick={() => setAccommodationType("Room")}
          className={clsx("accommodation__list-category-item", {
            ["active"]: accommodationType === "Room",
          })}
        >
          <div className="accommodation__list-category-item-text">
            <h2>Room</h2>
            <p>
              Renting out a room involves renting one room with access to common areas, with the
              owner or other tenants able to live in the accommodation.
            </p>
          </div>
          {ICONS.room()}
        </div>
        <div
          onClick={() => setAccommodationType("Common room")}
          className={clsx("accommodation__list-category-item", {
            ["active"]: accommodationType === "Common room",
          })}
        >
          <div className="accommodation__list-category-item-text">
            <h2>Common room</h2>
            <p>
              This option involves sharing a room with other tenants, similar to a dormitory with
              multiple beds.
            </p>
          </div>
          {ICONS.commonRoom()}
        </div>
      </div>
    </div>
  );
};
