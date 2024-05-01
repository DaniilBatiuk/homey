import { Dispatch, SetStateAction } from "react";

import { Counter } from "@/components";

import "./Basic.scss";

type basicProp = {
  beds: number;
  childBeds: number;
  babyCribs: number;
  pets: number;
  bathrooms: number;
  setBeds: Dispatch<SetStateAction<number>>;
  setChildBeds: Dispatch<SetStateAction<number>>;
  setBabyCribs: Dispatch<SetStateAction<number>>;
  setPets: Dispatch<SetStateAction<number>>;
  setBathroom: Dispatch<SetStateAction<number>>;
};

export const Basic: React.FC<basicProp> = ({
  beds,
  childBeds,
  babyCribs,
  pets,
  bathrooms,
  setBeds,
  setChildBeds,
  setBabyCribs,
  setPets,
  setBathroom,
}: basicProp) => {
  return (
    <div className="basic__content">
      <h1 className="renting__title">Share basic information about housing</h1>
      <h2 className="renting__subtitle">Fill in key details to engage guests.</h2>
      <div className="basic__list">
        <div className="basic__list-item">
          <div className="basic__list-item-text">Beds</div>
          <Counter setGuestsCount={setBeds} guestsCount={beds} />
        </div>
        <div className="basic__list-item">
          <div className="basic__list-item-text">Child beds</div>
          <Counter setGuestsCount={setChildBeds} guestsCount={childBeds} />
        </div>
        <div className="basic__list-item">
          <div className="basic__list-item-text">Baby cribs</div>
          <Counter setGuestsCount={setBabyCribs} guestsCount={babyCribs} />
        </div>
        <div className="basic__list-item">
          <div className="basic__list-item-text">Pets</div>
          <Counter setGuestsCount={setPets} guestsCount={pets} />
        </div>
        <div className="basic__list-item">
          <div className="basic__list-item-text">Bathrooms</div>
          <Counter setGuestsCount={setBathroom} guestsCount={bathrooms} />
        </div>
      </div>
    </div>
  );
};
