import { useContext } from "react";

import { Card } from "@/components";

import { ICONS } from "@/constants";

import { userContext } from "@/context";

import "../Saved/Saved.scss";

const MyHouses: React.FC = () => {
  const user = useContext(userContext);

  return (
    <div className="saved">
      <div className="saved__container" style={{ paddingInline: "0px" }}>
        <section className="saved__loyalty-programme-discounts-section">
          <div className="saved__text">My listings</div>
        </section>
      </div>
      {user?.houses && !!user.houses.length ? (
        <div className="sms__container">
          <div className="filter__list-card">
            {user.houses.reverse().map(card => (
              <Card key={card.id} card={card} />
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="saved__container" style={{ paddingInline: "30px 30px" }}>
            <section className="saved__icon-container">
              <div className="saved__icon">{ICONS.myRentsBig()}</div>
              <div className="saved__icon-mob">{ICONS.myRentsMob()}</div>
            </section>
          </div>

          <div className="saved__container" style={{ paddingInline: "30px 30px" }}>
            <section className="saved__text-container">
              <div className="text-info">
                <p className="saved__text-info">
                  You do not have any listings at this time. When you make a listing, you will see
                  it here. It to easily come back to it later. All your listings will be displayed
                  in this section.
                </p>
              </div>
            </section>
          </div>
        </>
      )}
    </div>
  );
};

export default MyHouses;
