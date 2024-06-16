import Lock from "@/assets/images/Lock.png";

import "./Card.scss";

import { getBenefitIcon } from "../IconsCard";

type CardProps = {
  title: string;
  status: string;
  description: string;
  benefits: string[];
  showLock: boolean;
  imgSrc: string;
};

export const Card: React.FC<CardProps> = ({
  title,
  status,
  description,
  benefits,
  showLock,
  imgSrc,
}) => {
  return (
    <div className="card__loyalty">
      <div className="card__image">
        <img src={imgSrc} alt="card" loading="lazy" />
        {showLock && <img src={Lock} alt="lock" className="card-lock-icon" loading="lazy" />}
      </div>
      <div className="card__info">
        <p className="title">{title}</p>
        <div className="status">{status}</div>
        <p className="title-under">Obtaining a card:</p>
        <div className="description">{description}</div>
        <p className="title-under">Benefits:</p>
        <ul className="benefits">
          {benefits.map((benefit, index) => (
            <li key={index} className="card-benefit-item">
              {getBenefitIcon(benefit)}
              <span className="card-benefit-item-text">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
