import { ICONS } from "@/constants";

import "./Discounts.scss";

export const Discounts: React.FC = () => {
  return (
    <div className="discounts">
      <div className="discounts__container" style={{ paddingInline: "0px" }}>
        <section className="discounts__loyalty-programme-discounts-section">
          <div className="discounts__text">Discounts and bonuses</div>
          <div className="discounts__info">Save more with our bonuses and discounts!</div>
        </section>
      </div>

      <div
        className="discounts__container"
        style={{ paddingInline: "30px 30px", display: "flex", justifyContent: "center" }}
      >
        <section className="discounts__bonuses">
          <div className="discounts__bonuses-icon">{ICONS.bonuses()}</div>
          <div className="discounts__bonuses-icon-bon-mob">{ICONS.bonuses_mob()}</div>
          <div className="discounts__text-container">
            <p className="discounts__bonuses-text">
              At the moment, you don't have any active bonuses. But don't worry, here are three easy
              steps on how you can start accumulating bonuses today!
            </p>
          </div>
        </section>
      </div>

      <div className="discounts__container" style={{ paddingInline: "30px 30px" }}>
        <section>
          <div className="discounts__title">
            <p className="discounts__text-title">How to get bonuses</p>
          </div>
          <div className="discounts__points-container">
            <div className="point">
              <div className="discounts__bonuses-icon-com">{ICONS.register()}</div>
              <div className="discounts__bonuses-icon-mob">{ICONS.register_mob()}</div>
              <div className="discounts__info-container">
                <p className="title-info">Register or log in to your account</p>
                <p className="text-info">
                  Create an account or log in to your existing account to start receiving bonuses
                </p>
              </div>
            </div>
            <div className="point">
              <div className="discounts__bonuses-icon-com">{ICONS.book()}</div>
              <div className="discounts__bonuses-icon-mob">{ICONS.book_mob()}</div>
              <div className="discounts__info-container">
                <p className="title-info">Book accommodation via our website</p>
                <p className="text-info">
                  Every booking made through our website brings you closer to receiving your bonuses
                </p>
              </div>
            </div>
            <div className="point">
              <div className="discounts__bonuses-icon-com">{ICONS.leave()}</div>
              <div className="discounts__bonuses-icon-mob">{ICONS.leave_mob()}</div>
              <div className="discounts__info-container">
                <p className="title-info">Leave feedback after each stay</p>
                <p className="text-info">
                  Your feedback helps us to improve our service and helps you to get extra bonuses
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
