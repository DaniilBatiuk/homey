import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { animated, useSpring } from "react-spring";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "./Loyalty.scss";
import { Card } from "./components/CardLoyalty/Card";
import { accordionData, cardData, guidances } from "./constants";

const Loyalty: React.FC = () => {
  type OpenAccordionsType = {
    [key: number]: boolean;
  };

  // Initialize the state with this type
  const [openAccordions, setOpenAccordions] = useState<OpenAccordionsType>({});

  const toggleAccordion = (index: number) => {
    setOpenAccordions(prevState => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <div className="loyalty">
      <div className="loyalty__container" style={{ paddingInline: "0px" }}>
        <section className="loyalty__loyalty-programme-discounts-section">
          <div className="loyalty__text">
            <p className="text-title">Your bonuses for every rental!</p>
            <p className="text-info">Loyalty programme Homey.com</p>
          </div>
        </section>
      </div>

      <div
        className="loyalty__container"
        style={{ paddingInline: "30px 30px", display: "flex", justifyContent: "center" }}
      >
        <section className="loyalty__text-info">
          <p className="text-welcome">
            Welcome to our loyalty programme! We value every customer and want to make your rental
            experience even more enjoyable. Join our programme and start earning rewards today!
          </p>
        </section>
      </div>

      <div className="loyalty__container" style={{ paddingInline: "30px 30px" }}>
        <section>
          <div className="loyalty__title">
            <p className="text-title">Virtual loyalty cards</p>
          </div>
        </section>
      </div>

      <div
        className="loyalty__container"
        style={{ paddingInline: "30px 30px", display: "flex", justifyContent: "center" }}
      >
        <section className="loyalty__card">
          <div className="loyalty__cards">
            <Swiper modules={[Navigation]} navigation slidesPerView={1} centeredSlides={true}>
              {cardData.map((card, index) => (
                <SwiperSlide key={index}>
                  <Card
                    title={card.title}
                    status={card.status}
                    description={card.description}
                    benefits={card.benefits}
                    showLock={index === 1 || index === 2} //OR ANOTHER LOGIC
                    imgSrc={card.imgSrc}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      </div>

      <div className="loyalty__container" style={{ paddingInline: "30px 30px" }}>
        <section>
          <div className="loyalty__title">
            <p className="text-title">Guidance on raising the level of</p>
          </div>
        </section>
      </div>

      <div className="loyalty__container" style={{ paddingInline: "30px 30px" }}>
        <section className="loyalty__guidances">
          {guidances.map(guidance => (
            <div key={guidance.number} className="loyalty__guidance">
              <div className="loyalty__image">
                <p className="text">{guidance.number}</p>
              </div>
              <div className="loyalty__description">
                <p className="title">{guidance.title}</p>
                <p className="info">{guidance.info}</p>
              </div>
            </div>
          ))}
        </section>
      </div>

      <div className="loyalty__container" style={{ paddingInline: "30px 30px" }}>
        <section>
          <div className="loyalty__title">
            <p className="text-title">Frequently Asked Questions</p>
          </div>
        </section>
      </div>

      <div className="loyalty__questions" style={{ display: "flex", justifyContent: "center" }}>
        <section className="loyalty__section">
          <div className="loyalty__frequently">
            <div className="loyalty__frequentlies">
              {accordionData.map(item => {
                // Move the useSpring hook inside the map function
                const expand = useSpring({
                  to: {
                    height: openAccordions[item.id] ? "auto" : 0,
                    opacity: openAccordions[item.id] ? 1 : 0,
                  },
                  from: { height: 0, opacity: 0 },
                  config: { tension: 250, friction: 20 },
                });

                return (
                  <div key={item.id} className="loyalty__frequently-div">
                    <div
                      className="loyalty__accordion-title"
                      onClick={() => toggleAccordion(item.id)}
                    >
                      <p className="loyalty__question">{item.question}</p>
                      {openAccordions[item.id] ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    </div>
                    {openAccordions[item.id] && (
                      <animated.div style={expand} className="loyalty__accordion-content">
                        <p className="text">{item.answer}</p>
                      </animated.div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
export default Loyalty;
