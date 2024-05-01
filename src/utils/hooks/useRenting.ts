import { useEffect } from "react";
import { SubmitHandler, UseFormGetValues, UseFormSetError } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { LINKS } from "@/config/pages-url.config";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { fieldsMessageError } from "../../pages/Renting/constants";
import { cardService } from "../services/card.service";

type useRentingProp = {
  currentStepIndex: number;
  isLastStep: boolean;
  next: () => void;
  category: string;
  accomodationType: string;
  beds: number;
  childBeds: number;
  babyCribs: number;
  pets: number;
  bathrooms: number;
  tags: string[];
  photos: { id: string; file: File }[];
  isFinish: number;
  setIsFinish: React.Dispatch<React.SetStateAction<number>>;
  setActiveModal: React.Dispatch<React.SetStateAction<boolean>>;
  activeModal: boolean;
  getValues: UseFormGetValues<ICreateHouse>;
  setError: UseFormSetError<ICreateHouse>;
  selectedPosition: [number, number] | null;
  setSelectedPosition: React.Dispatch<React.SetStateAction<[number, number] | null>>;
};

export const useRenting = ({
  currentStepIndex,
  isLastStep,
  next,
  category,
  accomodationType,
  beds,
  childBeds,
  babyCribs,
  pets,
  bathrooms,
  tags,
  photos,
  isFinish,
  setIsFinish,
  setActiveModal,
  activeModal,
  getValues,
  setError,
  selectedPosition,
}: useRentingProp) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data: FormData) => cardService.createHouse(data),
    onSuccess() {
      toast.success("You have successfully create house");
      queryClient.refetchQueries({
        queryKey: ["where"],
        type: "active",
        exact: true,
      });
    },
    onError() {
      toast.error("Something went wrong!");
    },
  });

  const createHouse: SubmitHandler<ICreateHouse> = async data => {
    const formData = new FormData();
    photos.forEach(photo => formData.append("images", photo.file));
    formData.append("address[country]", data.address.country);
    formData.append("address[city]", data.address.city);
    formData.append("address[addressLabel]", data.address.addressLabel);
    formData.append("address[formattedAddress]", "1");
    formData.append(
      "address[latitude]",
      selectedPosition !== null ? selectedPosition[0].toString() : "1",
    );
    formData.append(
      "address[longitude]",
      selectedPosition !== null ? selectedPosition[1].toString() : "3",
    );

    // Додаємо решту полів
    formData.append("category", category);
    formData.append("accomodationType", accomodationType);
    formData.append("beds", String(beds));
    formData.append("childBeds", String(childBeds));
    formData.append("babyCribs", String(babyCribs));
    formData.append("pets", String(pets));
    formData.append("bathrooms", String(bathrooms));
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", String(data.price));
    formData.append("mainImage", String(0));

    tags.forEach((tag, index) => {
      formData.append(`tags[${index}]`, tag);
    });

    setIsFinish(1);
    setActiveModal(true);
    mutate(formData);
  };

  const nextHandler = () => {
    let errorMessage: string = "";
    switch (currentStepIndex) {
      case 0:
        if (category === "") errorMessage = "You have to choose category";
        break;
      case 1:
        if (accomodationType === "") errorMessage = "You have to choose accommodation type";
        break;
      case 2:
        if (!selectedPosition) errorMessage = "You have to choose coordinates";
        break;
      case 3:
        let errorExist: boolean = false;
        fieldsMessageError.forEach(field => {
          if (!!!getValues(field.name)) {
            errorExist = true;
            setError(field.name, { type: "custom", message: field.message });
          }
        });
        if (errorExist) return;
        break;
      case 4:
        if (beds <= 0) errorMessage = "You have to choose at least 1 adult";
        break;
      case 5:
        if (!!!tags.length) errorMessage = "You have to choose at least 1 tag";
        break;
      case 6:
        if (photos.length < 5) errorMessage = "You have to choose at least 5 images";
        break;
      case 7:
        if (!!!getValues("name")) {
          setError("name", { type: "custom", message: "Name is not required" });
          return;
        }
        break;
      case 8:
        if (!!!getValues("description")) {
          setError("description", { type: "custom", message: "Description is not required" });
          return;
        }
        break;
      case 9:
        if (!!!getValues("price")) {
          setError("price", { type: "custom", message: "Price is required" });
          errorMessage = "Price is required";
        }
        if (isNaN(getValues("price"))) {
          setError("price", { type: "custom", message: "Price is not a number" });
          errorMessage = "Price is not a number";
        }
        break;
    }
    if (!!errorMessage) {
      toast.error(errorMessage);
      return;
    }
    if (isLastStep && isFinish === 0) {
      setIsFinish(1);
      return;
    }
    next();
  };

  useEffect(() => {
    if (isFinish === 1 && !activeModal) {
      navigate(LINKS.HOME);
    }
  }, [activeModal]);

  return {
    createHouse,
    nextHandler,
  };
};
