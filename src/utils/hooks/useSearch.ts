import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { LINKS } from "@/config/pages-url.config";

import { cardService } from "../services/card.service";

export const useSearch = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [cards, setCards] = useState<ICard[] | null>(null);
  const [cardsAvailable, setCardsAvailable] = useState<ICard[]>([]);
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
    if (!cards || !!!cards.length) {
      setCardsAvailable([]);
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
    if (!cards || !!!cards.length) {
      return;
    }
    setPrice([
      cards.reduce((prev, current) => (prev.price < current.price ? prev : current)).price,
      cards.reduce((prev, current) => (prev.price > current.price ? prev : current)).price,
    ]);
  }, [cards]);

  return {
    setActiveCategory,
    activeCategory,
    cards,
    setTagsActive,
    tagsActive,
    price,
    changePrice,
    setTagsList,
    tagsList,
    isLoading,
    cardsAvailable,
  };
};
