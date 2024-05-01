import clsx from "clsx";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { Card, SearchForm } from "@/components";

import { ICONS } from "@/constants";

import { cardService } from "@/services";

import Rectangle12 from "@/assets/images/Rectangle12.png";

import { LINKS } from "@/config/pages-url.config";

import { CircularProgress, Slider } from "@mui/material";

import "./Search.scss";

const Search: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [cards, setCards] = useState<ICard[] | null>(null);
  const [cardsAvailable, setCardsAvailable] = useState<ICard[] | null>(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [tagsActive, setTagsActive] = useState<boolean>(false);
  const [tagsList, setTagsList] = useState<string[]>([]);
  const [price, setPrice] = useState<number[]>([0, 0]);

  const changePrice = (event: Event, newValue: number | number[], activeThumb: number) => {
    const a = event.target;
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setPrice([Math.min(newValue[0], price[1] - 50), price[1]]);
    } else {
      setPrice([price[0], Math.max(newValue[1], price[0] + 50)]);
    }
  };

  useEffect(() => {
    const scrollContainer = document.getElementById("scrollContainer") as HTMLDivElement;
    if (scrollContainer) {
      scrollContainer.addEventListener("wheel", e => {
        e.preventDefault();
        scrollContainer.scrollLeft += e.deltaY;
      });
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await cardService.getFilterCards({
          address: queryParams.get("address") ?? "",
          from: queryParams.get("from") ?? "",
          to: queryParams.get("to") ?? "",
          adult: Number(queryParams.get("adult")) ?? 0,
          childs: Number(queryParams.get("childs")) ?? 0,
          infants: Number(queryParams.get("infants")) ?? 0,
          pets: Number(queryParams.get("pets")) ?? 0,
        });

        setCards(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [location.search]);

  useEffect(() => {
    if (location.pathname !== LINKS.HOME) {
      const category = queryParams.get("category") ?? "All";
      setActiveCategory(category);
    }
  }, [queryParams.get("category")]);

  useEffect(() => {
    if (!cards) {
      return;
    }
    activeCategory === "All"
      ? setCardsAvailable(
          cards
            .filter(card => tagsList.every(tag => card.tags.some(obj => obj.name === tag)))
            .filter(card => card.price >= price[0] && card.price <= price[1]),
        )
      : setCardsAvailable(
          cards
            .filter(card => card.category.name === activeCategory)
            .filter(card => tagsList.every(tag => card.tags.some(obj => obj.name === tag)))
            .filter(card => card.price >= price[0] && card.price <= price[1]),
        );
  }, [activeCategory, cards, tagsList, price]);

  useEffect(() => {
    if (!cards) {
      return;
    }
    setPrice([
      cards.reduce((prev, current) => (prev.price < current.price ? prev : current)).price,
      cards.reduce((prev, current) => (prev.price > current.price ? prev : current)).price,
    ]);
  }, [cards]);

  return (
    <div className="filter">
      <div className="filter__header">
        <div className="filter__header-main">
          <img src={Rectangle12} alt="Main Photo" className="filter__img" />
          <div className="filter__text">Find a place where you feel at home</div>
        </div>
        <SearchForm />
      </div>
      <div className="filter__container">
        <div className="filter__list" id="scrollContainer">
          <div
            onClick={() => setActiveCategory("All")}
            className={clsx("filter__list-item", {
              ["active"]: activeCategory === "All",
            })}
          >
            All({cards?.length})
          </div>
          <div
            onClick={() => setActiveCategory("Houses")}
            className={clsx("filter__list-item", {
              ["active"]: activeCategory === "Houses",
            })}
          >
            Houses({cards?.filter(card => card.category.name === "Houses").length})
          </div>
          <div
            onClick={() => setActiveCategory("Flat")}
            className={clsx("filter__list-item", {
              ["active"]: activeCategory === "Flat",
            })}
          >
            Flats({cards?.filter(card => card.category.name === "Flat").length})
          </div>
          <div
            onClick={() => setActiveCategory("Hotel")}
            className={clsx("filter__list-item", {
              ["active"]: activeCategory === "Hotel",
            })}
          >
            Hotels({cards?.filter(card => card.category.name === "Hotel").length})
          </div>
          <div
            onClick={() => setActiveCategory("Hostel")}
            className={clsx("filter__list-item", {
              ["active"]: activeCategory === "Hostel",
            })}
          >
            Hostels({cards?.filter(card => card.category.name === "Hostel").length})
          </div>
          <div
            onClick={() => setActiveCategory("Guesthouse")}
            className={clsx("filter__list-item", {
              ["active"]: activeCategory === "Guesthouse",
            })}
          >
            Guesthouses({cards?.filter(card => card.category.name === "Guesthouse").length})
          </div>
          <div
            onClick={() => setActiveCategory("Aparthotel")}
            className={clsx("filter__list-item", {
              ["active"]: activeCategory === "Aparthotel",
            })}
          >
            Aparthotel({cards?.filter(card => card.category.name === "Aparthotel").length})
          </div>
          <div
            onClick={() => setTagsActive(prev => !prev)}
            className="filter__list-item filter__list-item-dark"
          >
            {ICONS.settings()}
            Filters
          </div>
        </div>

        {tagsActive && cards && (
          <div className="filter__tags">
            <h1 className="filter__tags-title">Price range</h1>
            <div className="filter__price">
              <Slider
                sx={{ width: 320 }}
                getAriaLabel={() => "Minimum distance"}
                value={price}
                onChange={changePrice}
                valueLabelDisplay="auto"
                disableSwap
                min={
                  cards.reduce((prev, current) => (prev.price < current.price ? prev : current))
                    .price
                }
                max={
                  cards.reduce((prev, current) => (prev.price > current.price ? prev : current))
                    .price
                }
              />
              <div className="filter__prices">
                <div className="filter__prices-item">
                  <div>Minimum</div> <div style={{ fontWeight: 700 }}>${price[0]}</div>
                </div>
                <div className="filter__prices-item">
                  <div>Maximum</div> <div style={{ fontWeight: 700 }}>${price[1]}</div>
                </div>
              </div>
            </div>
            <h1 className="filter__tags-title">Amenities</h1>
            <div className="filter__tags-list">
              <div
                onClick={() =>
                  setTagsList(prev => {
                    if (prev.includes("TV")) return prev.filter(tag => tag !== "TV");
                    return [...prev, "TV"];
                  })
                }
                className={clsx("filter__tags-item", {
                  ["active"]: tagsList.includes("TV"),
                })}
              >
                TV
              </div>
              <div
                onClick={() =>
                  setTagsList(prev => {
                    if (prev.includes("Wi-Fi")) return prev.filter(tag => tag !== "Wi-Fi");
                    return [...prev, "Wi-Fi"];
                  })
                }
                className={clsx("filter__tags-item", {
                  ["active"]: tagsList.includes("Wi-Fi"),
                })}
              >
                Wi-Fi
              </div>
              <div
                onClick={() =>
                  setTagsList(prev => {
                    if (prev.includes("Kitchen")) return prev.filter(tag => tag !== "Kitchen");
                    return [...prev, "Kitchen"];
                  })
                }
                className={clsx("filter__tags-item", {
                  ["active"]: tagsList.includes("Kitchen"),
                })}
              >
                Kitchen
              </div>
              <div
                onClick={() =>
                  setTagsList(prev => {
                    if (prev.includes("Cradle")) return prev.filter(tag => tag !== "Cradle");
                    return [...prev, "Cradle"];
                  })
                }
                className={clsx("filter__tags-item", {
                  ["active"]: tagsList.includes("Cradle"),
                })}
              >
                Cradle
              </div>
              <div
                onClick={() =>
                  setTagsList(prev => {
                    if (prev.includes("Fridge")) return prev.filter(tag => tag !== "Fridge");
                    return [...prev, "Fridge"];
                  })
                }
                className={clsx("filter__tags-item", {
                  ["active"]: tagsList.includes("Fridge"),
                })}
              >
                Fridge
              </div>
              <div
                onClick={() =>
                  setTagsList(prev => {
                    if (prev.includes("Shower")) return prev.filter(tag => tag !== "Shower");
                    return [...prev, "Shower"];
                  })
                }
                className={clsx("filter__tags-item", {
                  ["active"]: tagsList.includes("Shower"),
                })}
              >
                Shower
              </div>
              <div
                onClick={() =>
                  setTagsList(prev => {
                    if (prev.includes("Wardrobe")) return prev.filter(tag => tag !== "Wardrobe");
                    return [...prev, "Wardrobe"];
                  })
                }
                className={clsx("filter__tags-item", {
                  ["active"]: tagsList.includes("Wardrobe"),
                })}
              >
                Wardrobe
              </div>
              <div
                onClick={() =>
                  setTagsList(prev => {
                    if (prev.includes("Washer")) return prev.filter(tag => tag !== "Washer");
                    return [...prev, "Washer"];
                  })
                }
                className={clsx("filter__tags-item", {
                  ["active"]: tagsList.includes("Washer"),
                })}
              >
                Washer
              </div>
              <div
                onClick={() =>
                  setTagsList(prev => {
                    if (prev.includes("Free car parking"))
                      return prev.filter(tag => tag !== "Free car parking");
                    return [...prev, "Free car parking"];
                  })
                }
                className={clsx("filter__tags-item", {
                  ["active"]: tagsList.includes("Free car parking"),
                })}
              >
                Free car parking
              </div>
              <div
                onClick={() =>
                  setTagsList(prev => {
                    if (prev.includes("Air conditioner"))
                      return prev.filter(tag => tag !== "Air conditioner");
                    return [...prev, "Air conditioner"];
                  })
                }
                className={clsx("filter__tags-item", {
                  ["active"]: tagsList.includes("Air conditioner"),
                })}
              >
                Air conditioner
              </div>
              <div
                onClick={() =>
                  setTagsList(prev => {
                    if (prev.includes("Central heating"))
                      return prev.filter(tag => tag !== "Central heating");
                    return [...prev, "Central heating"];
                  })
                }
                className={clsx("filter__tags-item", {
                  ["active"]: tagsList.includes("Central heating"),
                })}
              >
                Central heating
              </div>
              <div
                onClick={() =>
                  setTagsList(prev => {
                    if (prev.includes("Carbon monoxide sensor"))
                      return prev.filter(tag => tag !== "Carbon monoxide sensor");
                    return [...prev, "Carbon monoxide sensor"];
                  })
                }
                className={clsx("filter__tags-item", {
                  ["active"]: tagsList.includes("Carbon monoxide sensor"),
                })}
              >
                Carbon monoxide sensor
              </div>
            </div>
          </div>
        )}

        {!isLoading ? (
          !!cardsAvailable?.length ? (
            <div className="filter__list-card">
              {cardsAvailable.map(card => (
                <Card key={card.id} card={card} />
              ))}
            </div>
          ) : (
            <div className="no-data-yet">No data yet</div>
          )
        ) : (
          <div className="no-data-yet">
            <CircularProgress />
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
