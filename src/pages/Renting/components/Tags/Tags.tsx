import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";

import { ICONS } from "@/constants";

import "./Tags.scss";

type basicProp = {
  tags: string[];
  setTags: Dispatch<SetStateAction<string[]>>;
};

export const Tags: React.FC<basicProp> = ({ tags, setTags }: basicProp) => {
  return (
    <div className="tags__content">
      <h1 className="renting__title">Tell us about the main amenities of your accommodation</h1>
      <h2 className="renting__subtitle">
        Other amenities can be added after the advert has been published.
      </h2>
      <div className="tags__list">
        <div
          onClick={() => {
            setTags(prev => {
              return prev.includes("TV") ? prev.filter(tag => tag !== "TV") : [...prev, "TV"];
            });
          }}
          className={clsx("tags__list-item", {
            ["active"]: tags.includes("TV"),
          })}
        >
          {ICONS.tv()}
          <p>TV</p>
        </div>
        <div
          onClick={() => {
            setTags(prev => {
              return prev.includes("Wi-Fi")
                ? prev.filter(tag => tag !== "Wi-Fi")
                : [...prev, "Wi-Fi"];
            });
          }}
          className={clsx("tags__list-item", {
            ["active"]: tags.includes("Wi-Fi"),
          })}
        >
          {ICONS.wifi()}
          <p>Wi-Fi</p>
        </div>
        <div
          onClick={() => {
            setTags(prev => {
              return prev.includes("Kitchen")
                ? prev.filter(tag => tag !== "Kitchen")
                : [...prev, "Kitchen"];
            });
          }}
          className={clsx("tags__list-item", {
            ["active"]: tags.includes("Kitchen"),
          })}
        >
          {ICONS.kitchen()}
          <p>Kitchen</p>
        </div>
        <div
          onClick={() => {
            setTags(prev => {
              return prev.includes("Cradle")
                ? prev.filter(tag => tag !== "Cradle")
                : [...prev, "Cradle"];
            });
          }}
          className={clsx("tags__list-item", {
            ["active"]: tags.includes("Cradle"),
          })}
        >
          {ICONS.cradle()}
          <p>Cradle</p>
        </div>
        <div
          onClick={() => {
            setTags(prev => {
              return prev.includes("Fridge")
                ? prev.filter(tag => tag !== "Fridge")
                : [...prev, "Fridge"];
            });
          }}
          className={clsx("tags__list-item", {
            ["active"]: tags.includes("Fridge"),
          })}
        >
          {ICONS.fridge()}
          <p>Fridge</p>
        </div>
        <div
          onClick={() => {
            setTags(prev => {
              return prev.includes("Shower")
                ? prev.filter(tag => tag !== "Shower")
                : [...prev, "Shower"];
            });
          }}
          className={clsx("tags__list-item", {
            ["active"]: tags.includes("Shower"),
          })}
        >
          {ICONS.shower()}
          <p>Shower</p>
        </div>
        <div
          onClick={() => {
            setTags(prev => {
              return prev.includes("Wardrobe")
                ? prev.filter(tag => tag !== "Wardrobe")
                : [...prev, "Wardrobe"];
            });
          }}
          className={clsx("tags__list-item", {
            ["active"]: tags.includes("Wardrobe"),
          })}
        >
          {ICONS.wardrobe()}
          <p>Wardrobe</p>
        </div>
        <div
          onClick={() => {
            setTags(prev => {
              return prev.includes("Washer")
                ? prev.filter(tag => tag !== "Washer")
                : [...prev, "Washer"];
            });
          }}
          className={clsx("tags__list-item", {
            ["active"]: tags.includes("Washer"),
          })}
        >
          {ICONS.washer()}
          <p>Washer</p>
        </div>
        <div
          onClick={() => {
            setTags(prev => {
              return prev.includes("Free car parking")
                ? prev.filter(tag => tag !== "Free car parking")
                : [...prev, "Free car parking"];
            });
          }}
          className={clsx("tags__list-item", {
            ["active"]: tags.includes("Free car parking"),
          })}
        >
          {ICONS.freeCarParking()}
          <p>Free car parking</p>
        </div>
        <div
          onClick={() => {
            setTags(prev => {
              return prev.includes("Air conditioner")
                ? prev.filter(tag => tag !== "Air conditioner")
                : [...prev, "Air conditioner"];
            });
          }}
          className={clsx("tags__list-item", {
            ["active"]: tags.includes("Air conditioner"),
          })}
        >
          {ICONS.airConditioner()}
          <p>Air conditioner</p>
        </div>
        <div
          onClick={() => {
            setTags(prev => {
              return prev.includes("Central heating")
                ? prev.filter(tag => tag !== "Central heating")
                : [...prev, "Central heating"];
            });
          }}
          className={clsx("tags__list-item", {
            ["active"]: tags.includes("Central heating"),
          })}
        >
          {ICONS.centralHeating()}
          <p>Central heating</p>
        </div>
        <div
          onClick={() => {
            setTags(prev => {
              return prev.includes("Carbon monoxide sensor")
                ? prev.filter(tag => tag !== "Carbon monoxide sensor")
                : [...prev, "Carbon monoxide sensor"];
            });
          }}
          className={clsx("tags__list-item", {
            ["active"]: tags.includes("Carbon monoxide sensor"),
          })}
        >
          {ICONS.carbonMonoxideSensor()}
          <p>Carbon monoxide sensor</p>
        </div>
      </div>
    </div>
  );
};
