import { useContext } from "react";

import { Card } from "@/components";

import { ICONS } from "@/constants";

import { userContext } from "@/context";

import "./Bookings.scss";

const Bookings: React.FC = () => {
  const user = useContext(userContext);
  return (
    <div className="bookings">
      <div className="bookings__container" style={{ paddingInline: "0px" }}>
        <section className="bookings__loyalty-programme-discounts-section">
          <div className="bookings__text">Bookings</div>
        </section>
      </div>
      {user?.rents && !!user.rents.length ? (
        <div className="sms__container">
          <div className="filter__list-card">
            {user.rents.map((card, index) => (
              <Card key={index} card={card.house} />
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="bookings__container" style={{ paddingInline: "30px 30px" }}>
            <section className="bookings__icon-container">
              <div className="bookings__icon">{ICONS.book_ings()}</div>
              <div className="bookings__icon-mob">{ICONS.book_ings_mob()}</div>
            </section>
          </div>

          <div className="bookings__container" style={{ paddingInline: "30px 30px" }}>
            <section className="bookings__text-container">
              <div className="text-info">
                <p className="bookings__text-info">
                  You currently have no active bookings. All your future bookings will be displayed
                  in this section. If you have made a booking and it is not displayed here, please
                  contact our support team for assistance.
                </p>
              </div>
            </section>
          </div>
        </>
      )}
    </div>
  );
};

export default Bookings;
