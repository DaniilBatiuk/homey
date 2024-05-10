import clsx from "clsx";
import dayjs from "dayjs";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { Counter } from "@/components";

import { ICONS } from "@/constants";

import { useSearchForm } from "@/hooks";

import { DateRangeCalendar } from "@mui/x-date-pickers-pro/DateRangeCalendar";

import "./SearchForm.scss";
import { AssistanceAnimals } from "./components/AssistanceAnimals/AssistanceAnimals";

import { dropdownMenuClick2 } from "../Layout/helpers/dropdownMenuClick";

export const SearchForm: React.FC = () => {
  const {
    handleClick,
    handlerSubmit,
    activeMenuIndex,
    inputRef,
    search,
    setSearch,
    setActiveMenuIndex,
    date,
    adultsCount,
    childrenCount,
    infantsCount,
    petsCount,
    deferredWhere,
    setDate,
    setAdultsCount,
    setChildrenCount,
    setInfantsCount,
    setPetsCount,
    activeModal,
    setActiveModal,
  } = useSearchForm();

  return (
    <div className="search__wrapper">
      <div className="search">
        <Swiper
          modules={[Navigation]}
          navigation
          slidesPerView={4}
          breakpoints={{
            900: {
              slidesPerView: 4,
            },
            734: {
              slidesPerView: 3,
            },
            0: {
              slidesPerView: 1,
            },
          }}
        >
          <SwiperSlide
            onClick={handleClick}
            className={activeMenuIndex === 0 ? "swiperSlideActive" : undefined}
          >
            <div className="search__item">
              <div className="search__item-name">Where</div>
              <input
                ref={inputRef}
                value={search}
                onChange={event => setSearch(event.target.value)}
                type="text"
                className="search__item-sub"
                placeholder=" Search destination"
              />
            </div>
          </SwiperSlide>

          <SwiperSlide
            onClick={() => setActiveMenuIndex(prev => (prev === 1 ? null : 1))}
            className={activeMenuIndex === 1 ? "swiperSlideActive" : undefined}
          >
            <div className="search__item">
              <div className="search__item-name">Check in</div>
              <div className="search__item-sub">
                {date[0] ? date[0].format("D MMMM") : "Add dates"}
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide
            onClick={() => setActiveMenuIndex(prev => (prev === 2 ? null : 2))}
            className={activeMenuIndex === 2 ? "swiperSlideActive" : undefined}
          >
            <div className="search__item">
              <div className="search__item-name">Check out</div>
              <div className="search__item-sub">
                {date[1] ? date[1].format("D MMMM") : "Add dates"}
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide
            onClick={() => setActiveMenuIndex(prev => (prev === 3 ? null : 3))}
            className={activeMenuIndex === 3 ? "swiperSlideActive" : undefined}
          >
            <div className="search__item">
              <div className="search__item-name">Who</div>
              <div className="search__item-sub">
                {adultsCount + childrenCount + infantsCount + petsCount === 0
                  ? "Add guests"
                  : `${adultsCount + childrenCount + infantsCount + petsCount} guests`}
              </div>
            </div>
          </SwiperSlide>
        </Swiper>

        <div
          data-dropdown
          className={clsx("search__dropdown-menu", {
            ["right"]: activeMenuIndex === 3,
            ["center"]: activeMenuIndex === 1 || activeMenuIndex === 2,
            ["active"]: activeMenuIndex !== null,
            ["no-border"]: activeMenuIndex === 0 && !!!deferredWhere.length,
          })}
        >
          {activeMenuIndex === 0 && !!deferredWhere.length && (
            <div className="search__dropdown-menu__body-destination">
              <ul className="search__dropdown-menu__destination-list">
                {deferredWhere.slice(0, 5).map(where => (
                  <li
                    className="search__dropdown-menu__destination-list-item"
                    key={where}
                    onClick={() => {
                      dropdownMenuClick2();
                      setSearch(where);
                      setActiveMenuIndex(null);
                    }}
                  >
                    {ICONS.geolocation_menu()} <span>{where}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div
            className="search__dropdown-menu__body-date"
            style={activeMenuIndex !== 2 && activeMenuIndex !== 1 ? { display: "none" } : undefined}
          >
            <DateRangeCalendar
              // @ts-ignore
              value={date}
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
                  <div className="search__dropdown-menu__guests-list-item-sub">
                    Ages 18 or above
                  </div>
                </div>
                <Counter setGuestsCount={setAdultsCount} guestsCount={adultsCount} />
              </li>
              <li className="search__dropdown-menu__guests-list-item">
                <div className="search__dropdown-menu__guests-list-item-text">
                  <div className="search__dropdown-menu__guests-list-item-title">Children</div>
                  <div className="search__dropdown-menu__guests-list-item-sub">Ages 2–17</div>
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
        <button className="search__icon" onClick={handlerSubmit}>
          {ICONS.search()}
        </button>
      </div>
      <AssistanceAnimals activeModal={activeModal} setActiveModal={setActiveModal} />
    </div>
  );
};
