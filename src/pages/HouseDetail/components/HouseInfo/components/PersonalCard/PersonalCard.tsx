import Rectangle9 from "../../../../../../assets/images/Rectangle9.png";

type PersonalCardProp = {
  house: IHouse;
};

export const PersonalCard: React.FC<PersonalCardProp> = ({ house }: PersonalCardProp) => {
  return (
    <div className="personal__card house-detail__personal-card">
      <div className="personal__card-info-main">
        <div className="personal__card__avatar">
          <img
            src={house.user?.imagePath ? house.user.imagePath : Rectangle9}
            alt="avatar"
            loading="lazy"
          />
        </div>
        <div className="personal__card__name">
          {house.user.firstName || house.user.surname
            ? `${house.user.firstName} ${house.user.surname}`
            : "User"}
        </div>
        <div className="personal__card__status  house-detail__email">{house.user.email}</div>
        <div className="personal__card__status">Host</div>
      </div>
      <div className="personal__card__data">
        <div className="personal__card__list">
          <div className="personal__card__list-item">
            <div className="personal__card__list-item-text">
              Comments <span>{house.user.countOfComments ?? 0}</span>
            </div>
          </div>
          <div className="personal__card__list-item">
            <div className="personal__card__list-item-text">
              Active renting <span>{house.user.countOfHouses ?? 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
