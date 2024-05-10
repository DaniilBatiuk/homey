import clsx from "clsx";
import { Controller } from "react-hook-form";
import InputMask from "react-input-mask";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { ButtonConfirm, Modal } from "@/components";

import { ICONS } from "@/constants";

import { useHouseDetail } from "@/hooks";

import { CircularProgress, TextField } from "@mui/material";
import { DateField } from "@mui/x-date-pickers";

import "./HouseDetail.scss";
import { BookingCard } from "./components/BookingCard/BookingCard";
import { HouseInfo } from "./components/HouseInfo/HouseInfo";

const HouseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const {
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
  } = useHouseDetail({ id });

  if (isFetching) {
    return (
      <div className="loader">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="house-detail">
      <form className="house-detail__container" onSubmit={handleSubmit(bookHouse)}>
        {!confirmActive ? (
          <div className="house-detail__header">
            <h1 className="house-detail__title">{house?.name}</h1>
            {ICONS.like({
              onClick: (e: React.MouseEvent<HTMLOrSVGElement, MouseEvent>) => {
                e.preventDefault(),
                  user && id
                    ? user?.favoriteHouses &&
                      user.favoriteHouses.find(current => current.id === +id)
                      ? deleteFormFavorite()
                      : mutate()
                    : toast.error("You have to login to add in saved");
              },
              className: `${user?.favoriteHouses && id && user.favoriteHouses.find(current => current.id === +id) && "icon-liked"}`,
            })}
          </div>
        ) : (
          <div className="house-detail__header-confirm">
            {ICONS.bigArrowLeft({ onClick: () => setConfirmActive(false) })}
            <h1 className="house-detail__title">Confirm and pay</h1>
          </div>
        )}
        <section
          className={clsx("house-detail__main", {
            ["house-detail__confirm-dash"]: confirmActive,
          })}
        >
          <div className="house-detail__images" style={confirmActive ? { display: "none" } : {}}>
            <Swiper
              style={{
                // @ts-ignore
                "--swiper-navigation-color": "#fff",
                "--swiper-pagination-color": "#fff",
              }}
              spaceBetween={10}
              navigation={true}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper2"
            >
              {house &&
                house.images.map(image => (
                  <SwiperSlide key={image.id}>
                    <img src={image.path} alt="Main Photo" className="main__img" />
                  </SwiperSlide>
                ))}
            </Swiper>
            <Swiper
              // @ts-ignore
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper"
              breakpoints={{
                840: {
                  slidesPerView: 4,
                },
                0: {
                  slidesPerView: 3,
                },
              }}
            >
              {house &&
                house.images.map(image => (
                  <SwiperSlide key={image.id}>
                    <img src={image.path} alt="Main Photo" className="main__img" />
                  </SwiperSlide>
                ))}
            </Swiper>
            <div className="house-detail__under-image">
              <div className="house-detail__under-image-text">
                <div className="house-detail__under-image-title">
                  {house?.category.name}, {house?.address.country}, {house?.address.city}
                </div>
                <div className="house-detail__under-image-subtitle">
                  {house?.beds} beds, {house?.childBeds} childBeds, {house?.babyCribs} babyCribs,{" "}
                  {house?.pets} pets
                </div>
              </div>
              <div className="house-detail__under-image-icon">
                {ICONS.star()}{" "}
                <span>{!house?.rating || house?.rating === 0 ? "0.0" : house?.rating}</span>
              </div>
            </div>
          </div>

          <div className="house-detail__left" style={!confirmActive ? { display: "none" } : {}}>
            <h1 className="house-detail__confirm-title">Payment methods</h1>
            <div className="house-detail__confirm-list">
              <InputMask
                mask="9999 9999 9999 9999"
                maskChar=" "
                className="house-detail__card"
                {...register("cardNumber")}
              >
                {
                  ((inputProps: any) => {
                    return (
                      <TextField
                        {...register("cardNumber")}
                        error={Boolean(errors.cardNumber?.message)}
                        helperText={errors.cardNumber?.message ? errors.cardNumber.message : ""}
                        {...inputProps}
                        label="Card number"
                        className="payment__field-card"
                        fullWidth
                      />
                    );
                  }) as any
                }
              </InputMask>
              <div className="house-detail__confirm-fields">
                <Controller
                  name="expireDate"
                  control={control}
                  render={({ field }) => (
                    <DateField
                      {...field}
                      label="Expiration"
                      // @ts-ignore
                      error={Boolean(errors.expireDate?.message)}
                      helperText={errors.expireDate?.message ? errors.expireDate.message : ""}
                      format="MM/YYYY"
                      className="payment__expiration"
                      onChange={date => field.onChange(date)}
                    />
                  )}
                />

                <TextField
                  error={Boolean(errors.cvv?.message)}
                  helperText={errors.cvv?.message ? errors.cvv.message : ""}
                  {...register("cvv")}
                  inputProps={{ maxLength: 3 }}
                  label="CVV"
                  className="payment__cvv"
                />
              </div>
            </div>
            <div className="booking-card__line"></div>
            <h1 className="house-detail__confirm-title">Cancellation rules</h1>
            <div className="house-detail__confirm-text">
              Free cancellation before May 4 If you cancel before arrival scheduled for May 5, you
              will receive a partial refund
            </div>
            <div className="booking-card__line"></div>
            <h1 className="house-detail__confirm-title">Basic rules</h1>
            <div className="house-detail__confirm-text">
              1. Quiet: No noise between 22:00 and 8:00.
              <br /> <br />
              2. Damage: Report any damage or malfunctions to the landlord.
              <br /> <br />
              3. House Rules: Follow established house rules and regulations.
            </div>
            <div className="booking-card__line"></div>
            <div className="house-detail__text-little">
              By clicking the button below, I accept the terms and conditions (House Rules set by
              the host, Ground Rules for guests, Homey's policy on re-booking and refunds) and agree
              that Homey may charge my payment method if the damage is my responsibility. I agree to
              pay this amount if the host accepts the booking request.
            </div>
            <ButtonConfirm text="Book" type="submit" style={{ background: "#9A041F" }} />
          </div>

          {house && (
            <BookingCard
              user={user}
              house={house}
              confirmActive={confirmActive}
              setConfirmActive={setConfirmActive}
              setDate={setDate}
              date={date}
              setAdultsCount={setAdultsCount}
              childrenCount={childrenCount}
              setChildrenCount={setChildrenCount}
              infantsCount={infantsCount}
              setInfantsCount={setInfantsCount}
              petsCount={petsCount}
              setPetsCount={setPetsCount}
              adultsCount={adultsCount}
            />
          )}
        </section>
        {house && !confirmActive && <HouseInfo house={house} />}
      </form>
      <Modal active={activeModal} setActive={setActiveModal} maxDivWidth="650px">
        <div className="modal-support">
          <div className="modal-support__title" style={{ marginTop: "20px" }}>
            Booking and payment confirmed!
          </div>
          <div className="modal-support__text" style={{ marginBottom: "20px" }}>
            We are pleased to inform you that your booking and payment was successful. Your
            accommodation is waiting for you! Should you have any questions or need assistance
            before or during your stay, we are always at your service. We look forward to seeing you
            again and wish you a pleasant holiday!
          </div>

          <ButtonConfirm
            text="Back to Home"
            onClick={() => setActiveModal(false)}
            style={{ background: "#9A041F" }}
          />
        </div>
      </Modal>
    </div>
  );
};

export default HouseDetail;
