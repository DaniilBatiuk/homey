import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { ButtonConfirm, Modal } from "@/components";

import { ICONS } from "@/constants";

import { useMultistepForm, useRenting } from "@/hooks";

import Logo from "@/assets/images/Logo_renting.png";

import { LINKS } from "@/config/pages-url.config";

import "./Renting.scss";
import { Accommodation } from "./components/Accommodation/Accommodation";
import { Address } from "./components/Address/Address";
import { Basic } from "./components/Basic/Basic";
import { ChooseCategory } from "./components/ChooseCategory/ChooseCategory";
import { Description } from "./components/Description/Description";
import { Map } from "./components/Map/Map";
import { Name } from "./components/Name/Name";
import { Photo } from "./components/Photo/Photo";
import { Price } from "./components/Price/Price";
import { Tags } from "./components/Tags/Tags";

export const Renting: React.FC = () => {
  const [category, setCategory] = useState<string>("");
  const [accomodationType, setAccomodationType] = useState("");
  const [beds, setBeds] = useState<number>(0);
  const [childBeds, setChildBeds] = useState<number>(0);
  const [babyCribs, setBabyCribs] = useState<number>(0);
  const [pets, setPets] = useState<number>(0);
  const [bathrooms, setBathroom] = useState<number>(0);
  const [tags, setTags] = useState<string[]>([]);
  const [photos, setPhotos] = useState<{ id: string; file: File }[]>([]);
  const [isFinish, setIsFinish] = useState<number>(0);
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<[number, number] | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    getValues,
    formState: { errors },
  } = useForm<ICreateHouse>({
    mode: "onSubmit",
  });

  const { currentStepIndex, step, isLastStep, back, next } = useMultistepForm([
    <ChooseCategory category={category} setCategory={setCategory} />,
    <Accommodation
      accommodationType={accomodationType}
      setAccommodationType={setAccomodationType}
    />,
    <Map selectedPosition={selectedPosition} setSelectedPosition={setSelectedPosition} />,
    <Address register={register} errors={errors} />,
    <Basic
      beds={beds}
      setBeds={setBeds}
      childBeds={childBeds}
      setChildBeds={setChildBeds}
      babyCribs={babyCribs}
      setBabyCribs={setBabyCribs}
      pets={pets}
      setPets={setPets}
      bathrooms={bathrooms}
      setBathroom={setBathroom}
    />,
    <Tags tags={tags} setTags={setTags} />,
    <Photo photos={photos} setPhotos={setPhotos} />,
    <Name register={register} errors={errors} />,
    <Description register={register} errors={errors} />,
    <Price register={register} errors={errors} />,
  ]);

  const { createHouse, nextHandler } = useRenting({
    currentStepIndex,
    isLastStep,
    next,
    photos,
    category,
    accomodationType,
    beds,
    childBeds,
    babyCribs,
    pets,
    bathrooms,
    tags,
    isFinish,
    setIsFinish,
    setActiveModal,
    activeModal,
    getValues,
    setError,
    selectedPosition,
    setSelectedPosition,
  });

  return (
    <form onSubmit={handleSubmit(createHouse)} noValidate className="renting__container">
      <section className="renting__header">
        <Link to={LINKS.HOME} className="header__logo">
          <div>
            <img src={Logo} alt="Group.png" />
          </div>
          <div className="text">Homey</div>
        </Link>
        {ICONS.menuClose({ onClick: () => navigate(LINKS.HOME) })}
      </section>
      <section className="renting__body">{step}</section>
      <section className="renting__footer">
        <button
          className="renting__footer-back"
          onClick={() => {
            setIsFinish(0);
            back();
          }}
          type="button"
        >
          Back
        </button>
        <button
          className="renting__footer-next"
          type={isLastStep && isFinish === 1 ? "submit" : "button"}
          onClick={nextHandler}
        >
          {isLastStep ? "Finish" : "Next"}
        </button>
      </section>
      <Modal active={activeModal} setActive={setActiveModal} maxDivWidth="400px">
        <div className="modal-support renting__modal">
          {ICONS.menuClose({ onClick: () => setActiveModal(false) })}
          <div className="modal-support__title">Your advert has created the listing!</div>
          <div className="modal-support__subtitle">Now you can see in in your listings.</div>
        </div>
        <ButtonConfirm
          text="Confirm"
          onClick={() => setActiveModal(false)}
          style={{ background: "#9A041F" }}
        />
      </Modal>
    </form>
  );
};
