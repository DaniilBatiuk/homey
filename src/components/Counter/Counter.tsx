import { Dispatch, SetStateAction } from "react";

import { ICONS } from "@/constants";

import "./Counter.scss";

type CounterProp = {
  setGuestsCount: Dispatch<SetStateAction<number>>;
  guestsCount: number;
};

export const Counter: React.FC<CounterProp> = ({ setGuestsCount, guestsCount }: CounterProp) => {
  const handrelClick = () => {
    if (guestsCount > 0) {
      setGuestsCount(prev => prev - 1);
    }
  };

  return (
    <div className="counter">
      {ICONS.minus({
        className: guestsCount > 0 ? "counter__minus" : "",
        onClick: handrelClick,
      })}
      <span>{guestsCount}</span>
      {ICONS.plus({
        onClick: () => setGuestsCount(prev => prev + 1),
      })}
    </div>
  );
};
