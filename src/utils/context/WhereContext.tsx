import { createContext } from "react";

import { useQuery } from "@tanstack/react-query";

import { cardService } from "../services/card.service";

export const whereContext = createContext<string[]>([]);

const extractCitiesAndCountries = (cards: ICard[]): string[] => {
  const cities: string[] = [];
  const countries: string[] = [];
  const mergedLocations: string[] = [];

  cards.forEach(card => {
    const { city, country } = card.address;

    mergedLocations.push(`${country}, ${city}`);
  });

  const uniqueLocations = [...new Set(mergedLocations)];
  return uniqueLocations;
};

export const WhereContext = ({ children }: { children: React.ReactNode }) => {
  const {
    data: where,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ["where"],
    queryFn: () =>
      cardService.getFilterCards({
        address: "",
        from: "",
        to: "",
        adult: 0,
        childs: 0,
        infants: 0,
        pets: 0,
      }),
    retry: 3,
  });

  return (
    <whereContext.Provider
      value={where?.data && !isError ? extractCitiesAndCountries(where.data) : []}
    >
      {children}
    </whereContext.Provider>
  );
};
