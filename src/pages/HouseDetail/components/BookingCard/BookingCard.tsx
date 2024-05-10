import clsx from "clsx";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { ButtonConfirm, Counter } from "@/components";

import { ICONS } from "@/constants";

import { DateRange, DateRangeCalendar } from "@mui/x-date-pickers-pro";

import "./BookingCard.scss";
import { calculateNightCount } from "./helpers/calculateNightCount";

import { AssistanceAnimals } from "../../../../components/SearchForm/components/AssistanceAnimals/AssistanceAnimals";

type BookingCardProp = {
  user: IUser | null;
  house: IHouse;
  setConfirmActive: React.Dispatch<React.SetStateAction<boolean>>;
  confirmActive: boolean;
  date: DateRange<dayjs.Dayjs> | [];
  setDate: React.Dispatch<React.SetStateAction<DateRange<dayjs.Dayjs> | []>>;
  adultsCount: number;
  setAdultsCount: React.Dispatch<React.SetStateAction<number>>;
  childrenCount: number;
  setChildrenCount: React.Dispatch<React.SetStateAction<number>>;
  infantsCount: number;
  setInfantsCount: React.Dispatch<React.SetStateAction<number>>;
  petsCount: number;
  setPetsCount: React.Dispatch<React.SetStateAction<number>>;
};

export const BookingCard: React.FC<BookingCardProp> = ({
  user,
  house,
  setConfirmActive,
  confirmActive,
  date,
  setDate,
  adultsCount,
  setAdultsCount,
  childrenCount,
  setChildrenCount,
  infantsCount,
  setInfantsCount,
  petsCount,
  setPetsCount,
}: BookingCardProp) => {
  const [activeMenuIndex, setActiveMenuIndex] = useState<number | null>(null);
  const [activeModal, setActiveModal] = useState(false);

  useEffect(() => {
    let firstTimeClick = false;
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const isOutsideDropdown = target.closest(".search__dropdown-menu") === null;
      if (isOutsideDropdown && activeMenuIndex !== null && firstTimeClick) {
        setActiveMenuIndex(null);
        firstTimeClick = false;
      } else {
        firstTimeClick = true;
      }
    };

    if (activeMenuIndex !== null) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [activeMenuIndex]);

  return (
    <div
      className={clsx("booking-card", {
        ["booking-card__confirm-sizes"]: confirmActive,
      })}
    >
      {!confirmActive ? (
        <h1 className="booking-card__price">
          <span>${house.price} </span>Оvernight
        </h1>
      ) : (
        <>
          <div className="booking-card__main">
            <div className="booking-card__image-block">
              <img
                src={house.images.find(image => image.isMain === true)?.path}
                alt="Card Photo"
                className="booking-card__image"
              />
            </div>
            <div className="booking-card__text">
              <div className="booking-card__title">
                {house?.category.name}, {house?.address.country}, {house?.address.city}
              </div>
              <div className="booking-card__subtitle">
                {house?.beds} beds, {house?.childBeds} childBeds, {house?.babyCribs} babyCribs,{" "}
                {house?.pets} pets
              </div>
              <div className="booking-card__icon">
                {ICONS.star()}{" "}
                <span>{!house?.rating || house?.rating === 0 ? "0.0" : house?.rating}</span>
              </div>
            </div>
          </div>
          <div className="booking-card__line"></div>
        </>
      )}
      <div className="booking-card__dates">
        <div
          className={clsx("booking-card__date", { active: activeMenuIndex === 1})}
          onClick={() => setActiveMenuIndex(prev => (prev === 2 || prev === 1 ? null : 1))}
        >
          <div className="search__item">
            <div className="search__item-name">Check in</div>
            <div className="search__item-sub">
              {date[0] ? date[0].format("D MMMM") : "Add dates"}
            </div>
          </div>
        </div>
        <div
          className={clsx("booking-card__date", { active: activeMenuIndex === 2})}
          onClick={() => setActiveMenuIndex(prev => (prev === 2 || prev === 1 ? null : 2))}
        >
          <div className="search__item">
            <div className="search__item-name">Check out</div>
            <div className="search__item-sub">
              {date[1] ? date[1].format("D MMMM") : "Add dates"}
            </div>
          </div>
        </div>
      </div>
      <div
        className={clsx("booking-card__who", { active: activeMenuIndex === 3 })}
        onClick={() => setActiveMenuIndex(prev => (prev === 3 ? null : 3))}
      >
        <div className="search__item">
          <div className="search__item-name">Who's going</div>
          <div className="search__item-sub">
            {adultsCount + childrenCount + infantsCount + petsCount === 0
              ? "Add guests"
              : `${adultsCount + childrenCount + infantsCount + petsCount} guests`}
          </div>
        </div>
      </div>
      {!confirmActive && (
        <ButtonConfirm
          text="Booking"
          onClick={() =>
            user
              ? user.rents.find(rent => rent.house.id === house.id)
                ? toast.error("You have been already rented this house")
                : user.houses.find(myHouse => myHouse.id === house.id)
                  ? toast.error("You can not rent your own house")
                  : setConfirmActive(true)
              : toast.error("You have to login to booking")
          }
          style={{ background: "#9A041F" }}
        />
      )}
      <div className="booking-card__line"></div>
      <div className="booking-card__calculate">
        <div className="booking-card__calculate-item">
          <div className="booking-card__calculate-item-name">
            ${house.price} X {calculateNightCount(date[0], date[1])} nights
          </div>
          <div className="booking-card__calculate-item-price">
            ${house.price * calculateNightCount(date[0], date[1])}
          </div>
        </div>
        <div className="booking-card__calculate-item">
          <div className="booking-card__calculate-item-name">Loyalty programme discount 0%</div>
          <div className="booking-card__calculate-item-price">-$0</div>
        </div>
        <div className="booking-card__calculate-item">
          <div
            className="booking-card__calculate-item-name underline"
            title="A one-off fee charged by the landlord to cover the cost of cleaning the property."
          >
            Cleaning fee
          </div>
          <div className="booking-card__calculate-item-price">$54</div>
        </div>
        <div className="booking-card__calculate-item">
          <div
            className="booking-card__calculate-item-name underline"
            title="This fee helps us to develop the service and support travellers around the clock."
          >
            Service charge
          </div>
          <div className="booking-card__calculate-item-price">$280</div>
        </div>
      </div>
      <div className="booking-card__line"></div>
      <div className="booking-card__total">
        <div className="booking-card__total-name">Total</div>
        <div className="booking-card__total-price">
          ${280 + 54 + house.price * calculateNightCount(date[0], date[1])}
        </div>
      </div>
      <div
        data-dropdown
        className={clsx("search__dropdown-menu booking-card__dropdown-menu", {
          ["people"]: activeMenuIndex === 3,
          ["people-confirm"]: activeMenuIndex === 3 && confirmActive,
          ["date-confirm"]: (activeMenuIndex === 1 || activeMenuIndex === 2) && confirmActive,
          ["active"]: activeMenuIndex !== null,
        })}
      >
        <div
          className="search__dropdown-menu__body-date"
          style={activeMenuIndex !== 2 && activeMenuIndex !== 1 ? { display: "none" } : undefined}
        >
          <DateRangeCalendar
            // @ts-ignore
            value={date}
            calendars={1}
            onChange={newValue => setDate(newValue)}
            minDate={dayjs()}
          />
        </div>

        <div
          className="search__dropdown-menu__body-who"
          style={activeMenuIndex !== 3 ? { display: "none" } : undefined}
        >
          <ul className="search__dropdown-menu__guests-list">
            <li className="search__dropdown-menu__guests-list-item">
              <div className="search__dropdown-menu__guests-list-item-text">
                <div className="search__dropdown-menu__guests-list-item-title">Adults</div>
                <div className="search__dropdown-menu__guests-list-item-sub">Ages 13 or above</div>
              </div>
              <Counter setGuestsCount={setAdultsCount} guestsCount={adultsCount} />
            </li>
            <li className="search__dropdown-menu__guests-list-item">
              <div className="search__dropdown-menu__guests-list-item-text">
                <div className="search__dropdown-menu__guests-list-item-title">Children</div>
                <div className="search__dropdown-menu__guests-list-item-sub">Ages 2-12</div>
              </div>
              <Counter setGuestsCount={setChildrenCount} guestsCount={childrenCount} />
            </li>
            <li className="search__dropdown-menu__guests-list-item">
              <div className="search__dropdown-menu__guests-list-item-text">
                <div className="search__dropdown-menu__guests-list-item-title">Infants</div>
                <div className="search__dropdown-menu__guests-list-item-sub">Under 2</div>
              </div>
              <Counter setGuestsCount={setInfantsCount} guestsCount={infantsCount} />
            </li>
            <li className="search__dropdown-menu__guests-list-item">
              <div className="search__dropdown-menu__guests-list-item-text">
                <div className="search__dropdown-menu__guests-list-item-title">Pets</div>
                <div
                  className="search__dropdown-menu__guests-list-item-sub underline"
                  onClick={() => setActiveModal(true)}
                >
                  Bringing a service animal?
                </div>
              </div>
              <Counter setGuestsCount={setPetsCount} guestsCount={petsCount} />
            </li>
          </ul>
        </div>
      </div>
      <AssistanceAnimals activeModal={activeModal} setActiveModal={setActiveModal} />
    </div>
  );
};
