import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import { ICONS } from "@/constants";

import { userContext } from "@/context";

import { cardService } from "@/services";

import Rectangle3 from "@/assets/images/Rectangle3.png";

import { LINKS } from "@/config/pages-url.config";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import "./Card.scss";

type CardProp = {
  card: ICard;
};
export const Card: React.FC<CardProp> = ({ card }: CardProp) => {
  const queryClient = useQueryClient();
  const user = useContext(userContext);
  const location = useLocation();

  const { mutate } = useMutation({
    mutationFn: () => cardService.addLikeHouse(card.id),
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
    mutationFn: () => cardService.deleteLikeHouse(card.id),
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

  const { mutate: deleteHouse } = useMutation({
    mutationFn: () => cardService.deleteHouse(card.id),
    onSuccess() {
      toast.success("You have successfully deleted house");
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

  return (
    <Link to={`/house/${card.id}`} className="card">
      <div className="card__under-center"></div>

      <img
        src={card.images.find(image => image.isMain === true)?.path ?? Rectangle3}
        alt="Card Photo"
        className="card__img background-gray"
        loading="lazy"
      />

      <div className="card__main">
        <div className="card__top">
          <div className="card__icons">
            {!!card.pets && ICONS.pets()} {!!card.babyCribs && ICONS.baby_bed()}
          </div>
          {location.pathname !== LINKS.MYRENTS
            ? ICONS.like({
                onClick: (e: React.MouseEvent<HTMLOrSVGElement, MouseEvent>) => {
                  e.preventDefault(),
                    user
                      ? user?.favoriteHouses &&
                        user.favoriteHouses.find(current => current.id === card.id)
                        ? deleteFormFavorite()
                        : mutate()
                      : toast.error("You have to login to add in saved");
                },
                className: `${user?.favoriteHouses && user.favoriteHouses.find(current => current.id === card.id) && "icon-liked"}`,
              })
            : ICONS.garbage({
                onClick: (e: React.MouseEvent<HTMLOrSVGElement, MouseEvent>) => {
                  e.preventDefault();
                  deleteHouse();
                },
              })}
        </div>
        <div className="card__center">
          <div className="card__name-price">
            <div className="card__name">{card?.name ?? ""}</div>
            <div className="card__price">$ {card?.price ?? ""}</div>
          </div>
          <div className="card__under-main">
            <div className="card__geolocation">
              {ICONS.geolocation()}
              <span>
                {card?.address?.country ?? ""}, {card?.address?.city ?? ""}
              </span>
            </div>
            <div className="card__arrow">{ICONS.cardArrow()}</div>
          </div>
        </div>
      </div>
      <div className="card__footer">
        <div className="card__text">
          {card.tags.map((tag, index) => {
            if (index === card.tags.length - 1) return `${tag.name} `;
            return `${tag.name}, `;
          })}
        </div>
        <div className="card__star">
          {ICONS.star_main()} {!card.rating || card.rating === 0 ? "0.0" : card.rating}
        </div>
      </div>
    </Link>
  );
};
