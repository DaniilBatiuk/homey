import { useContext } from "react";

import { Card } from "@/components";

import { ICONS } from "@/constants";

import { userContext } from "@/context";

import "./Saved.scss";

const Saved: React.FC = () => {
  const user = useContext(userContext);

  return (
    <div className="saved">
      <div className="saved__container" style={{ paddingInline: "0px" }}>
        <section className="saved__loyalty-programme-discounts-section">
          <div className="saved__text">Saved</div>
        </section>
      </div>
      {user?.favoriteHouses && !!user.favoriteHouses.length ? (
        <div className="sms__container">
          <div className="filter__list-card">
            {user.favoriteHouses.reverse().map(card => (
              <Card key={card.id} card={card} />
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="saved__container" style={{ paddingInline: "30px 30px" }}>
            <section className="saved__icon-container">
              <div className="saved__icon">{ICONS.saved_menu()}</div>
              <div className="saved__icon-mob">{ICONS.saved_menu_mob()}</div>
            </section>
          </div>

          <div className="saved__container" style={{ paddingInline: "30px 30px" }}>
            <section className="saved__text-container">
              <div className="text-info">
                <p className="saved__text-info">
                  You do not have any saved properties at this time. When you find an accommodation
                  you like, you can save it to easily come back to it later. All your saved
                  properties will be displayed in this section.
                </p>
              </div>
            </section>
          </div>
        </>
      )}
    </div>
  );
};

export default Saved;
