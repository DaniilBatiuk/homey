import dayjs, { Dayjs } from "dayjs";
import { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { LINKS } from "@/config/pages-url.config";

import { zodResolver } from "@hookform/resolvers/zod";
import { DateRange } from "@mui/x-date-pickers-pro";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { calculateNightCount } from "../../pages/HouseDetail/components/BookingCard/helpers/calculateNightCount";
import { userContext } from "../context/UserContext";
import { transformDate } from "../helpers/transformDate";
import { cardService } from "../services/card.service";
import { PaymentDataFormScheme, PaymentDataType } from "../validators/payment-data-validation";

type useHouseDetailProp = {
  id: string | undefined;
};
export const useHouseDetail = ({ id }: useHouseDetailProp) => {
  const user = useContext(userContext);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [confirmActive, setConfirmActive] = useState(false);
  const [activeModal, setActiveModal] = useState(false);
  const [isFinish, setIsFinish] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [date, setDate] = useState<DateRange<Dayjs> | []>([]);

  const [adultsCount, setAdultsCount] = useState<number>(0);
  const [childrenCount, setChildrenCount] = useState<number>(0);
  const [infantsCount, setInfantsCount] = useState<number>(0);
  const [petsCount, setPetsCount] = useState<number>(0);

  const {
    data: house,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ["oneHouse"],
    queryFn: () => cardService.getOneHouse(id),
    retry: 1,
  });

  const { mutate } = useMutation({
    mutationFn: () => cardService.addLikeHouse(id),
    onSuccess() {
      toast.success("You have successfully added house in saved");
      queryClient.refetchQueries({
        queryKey: ["user"],
        type: "active",
        exact: true,
      });
    },
    onError() {
      toast.error("Something went wrong!");
    },
  });

  const { mutate: deleteFormFavorite } = useMutation({
    mutationFn: () => cardService.deleteLikeHouse(id),
    onSuccess() {
      toast.success("You have successfully deleted house from saved");
      queryClient.refetchQueries({
        queryKey: ["user"],
        type: "active",
        exact: true,
      });
    },
    onError() {
      toast.error("Something went wrong!");
    },
  });

  const { mutate: addInRent } = useMutation({
    mutationFn: (data: IRent) =>
      cardService.addInRent({
        ...data,
      }),
    onSuccess() {
      toast.success("You have successfully rented house");
      queryClient.refetchQueries({
        queryKey: ["user"],
        type: "active",
        exact: true,
      });
    },
    onError() {
      toast.error("Something went wrong!");
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        cardNumber: user.cardNumber ?? "",
        cvv: user.cvv ?? "",
        expireDate: dayjs(user.expireDate) ?? null,
      });
    }
  }, []);

  useEffect(() => {
    if (activeModal) {
      setIsFinish(true);
    } else if (!activeModal && isFinish) {
      navigate(`${LINKS.HOME}`);
    }
  }, [activeModal]);

  const {
    register,
    handleSubmit,
    control,
    setError,
    reset,
    formState: { errors },
  } = useForm<PaymentDataType>({
    resolver: zodResolver(PaymentDataFormScheme),
    mode: "onSubmit",
  });

  if (isError) {
    navigate(`${LINKS.HOME}`);
    toast.error("Something went wrong!");
  }

  const bookHouse: SubmitHandler<PaymentDataType> = async data => {
    const expireDate = transformDate(data.expireDate, true);
    if (!house) return;
    if (expireDate === "Date is incorrect" || !expireDate) {
      setError("expireDate", { type: "custom", message: "Date is not correct" });
      return;
    }
    if (!date[0] || !date[1]) {
      toast.error("You have to choose 2 dates");
      return;
    }
    if (adultsCount <= 0) {
      toast.error("You have to choose at least 1 adult");
      return;
    }
    setActiveModal(true);
    addInRent({
      ...data,
      expireDate,
      from: date[0].toString() ?? "",
      to: date[1].toString() ?? "",
      Price: 280 + 54 + house.price * calculateNightCount(date[0], date[1]),
      houseId: house.id,
    });
  };

  return {
    isFetching,
    handleSubmit,
    bookHouse,
    confirmActive,
    house,
    user,
    deleteFormFavorite,
    mutate,
    setConfirmActive,
    thumbsSwiper,
    register,
    errors,
    control,
    setDate,
    date,
    setAdultsCount,
    childrenCount,
    setChildrenCount,
    infantsCount,
    setInfantsCount,
    petsCount,
    setPetsCount,
    adultsCount,
    activeModal,
    setActiveModal,
    setThumbsSwiper,
  };
};
