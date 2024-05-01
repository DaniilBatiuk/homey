import clsx from "clsx";
import dayjs, { Dayjs } from "dayjs";
import { useContext, useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { Counter } from "@/components";

import { ICONS } from "@/constants";

import { whereContext } from "@/context";

import { LINKS } from "@/config/pages-url.config";

import { DateRange } from "@mui/x-date-pickers-pro";
import { DateRangeCalendar } from "@mui/x-date-pickers-pro/DateRangeCalendar";

import "./SearchForm.scss";
import { AssistanceAnimals } from "./components/AssistanceAnimals/AssistanceAnimals";
import { filterCards } from "./components/helpers/filterCards";

import { dropdownMenuClick2 } from "../Layout/helpers/dropdownMenuClick";

export const SearchForm: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [activeMenuIndex, setActiveMenuIndex] = useState<number | null>(null);

  const [adultsCount, setAdultsCount] = useState<number>(0);
  const [childrenCount, setChildrenCount] = useState<number>(0);
  const [infantsCount, setInfantsCount] = useState<number>(0);
  const [petsCount, setPetsCount] = useState<number>(0);

  const [activeModal, setActiveModal] = useState(false);
  const [date, setDate] = useState<DateRange<Dayjs> | []>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const where = useContext(whereContext);
  const [search, setSearch] = useState<string>("");

  const sortedQuizzes = useMemo(() => {
    return filterCards(search, where);
  }, [where, search]);

  const deferredWhere = useDeferredValue(sortedQuizzes) as string[];

  const handleClick = () => {
    setActiveMenuIndex(prev => (prev === 0 ? null : 0));

    if (!inputRef.current) return;
    inputRef.current.focus();
  };

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

  useEffect(() => {
    if (location.pathname !== LINKS.HOME) {
      const where = queryParams.get("address");
      const dateStart = queryParams.get("from");
      const dateEnd = queryParams.get("to");

      const adultsCount = queryParams.get("adult") ?? 0;
      const childrenCount = queryParams.get("childs") ?? 0;
      const infantsCount = queryParams.get("infants") ?? 0;
      const petsCount = queryParams.get("pets") ?? 0;

      dateStart && dateEnd ? setDate([dayjs(dateStart), dayjs(dateEnd)]) : setDate([]);
      setAdultsCount(+adultsCount);
      setChildrenCount(+childrenCount);
      setInfantsCount(+infantsCount);
      setPetsCount(+petsCount);

      setSearch(where ?? "");
    }
  }, []);

  const handlerSubmit = () => {
    navigate(
      `${LINKS.SEARCH}?address=${inputRef.current?.value}&from=${date[0] ?? ""}&to=${date[1] ? date[1] : date[0] ? date[0].add(1, "day") : ""}&adult=${adultsCount}&childs=${childrenCount}&infants=${infantsCount}&pets=${petsCount}`,
      { replace: true },
    );
  };

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
                    {ICONS.geolocation()} <span>{where}</span>
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
