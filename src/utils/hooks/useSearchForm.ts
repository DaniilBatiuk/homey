import dayjs, { Dayjs } from "dayjs";
import { useContext, useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { LINKS } from "@/config/pages-url.config";

import { DateRange } from "@mui/x-date-pickers-pro";

import { filterCards } from "../../components/SearchForm/components/helpers/filterCards";
import { whereContext } from "../context/WhereContext";

export const useSearchForm = () => {
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

  const deferredWhere = useDeferredValue(sortedQuizzes);

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

  return {
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
  };
};
