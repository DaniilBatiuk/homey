import { useState } from "react";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { Card, SearchForm } from "@/components";

import { ICONS } from "@/constants";

import { cardService } from "@/services";

import Hallo1 from "@/assets/images/Hallo1.png";
import Hallo2 from "@/assets/images/Hallo2.png";
import Hallo3 from "@/assets/images/Hallo3.png";
import Loalty_pro from "@/assets/images/Loyalty_programm.png";
import Procent from "@/assets/images/Procent.png";
import Sale from "@/assets/images/Sale.png";
import Security from "@/assets/images/Security.png";

import { LINKS } from "@/config/pages-url.config";

import { CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import "./Home.scss";
import { Support } from "./components/Support/Support";
import { breakPoints } from "./constants";

const Home: React.FC = () => {
  const [activeModal, setActiveModal] = useState(false);

  const { data: cards, isFetching } = useQuery({
    queryKey: ["mainCards"],
    queryFn: () => cardService.getMainPageInfo(),
  });

  if (isFetching && !cards) {
    return (
      <div className="loader">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="home">
      <div className="home__container" style={{ paddingInline: "0px" }}>
        <section className="home__main main">
          <div className="main__text">
            Welcome to Homey - your trusted assistant in finding the perfect holiday rental
            accommodation. Discover places that make you feel at home, anywhere in the world.
          </div>
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation
            slidesPerView={1}
            autoplay={{ delay: 5000 }}
          >
            <SwiperSlide>
              <img src={Hallo1} alt="Photo 1" className="main__img" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={Hallo2} alt="Photo 2" className="main__img" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={Hallo3} alt="Photo 3" className="main__img" />
            </SwiperSlide>
          </Swiper>
          <SearchForm />
        </section>
      </div>
      <div className="home__container">
        <section className="home__section">
          <div className="home__question">
            <div className="home__title">Popular offers</div>
            {ICONS.question({ onClick: () => setActiveModal(true) })}
          </div>
          <div className="home__card-list">
            <Swiper
              modules={[Navigation]}
              navigation
              slidesPerView={4}
              spaceBetween={30}
              breakpoints={breakPoints}
            >
              {cards?.data.theMostPopular.map(card => (
                <SwiperSlide key={card.id}>
                  <Card key={card.id} card={card} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
        <section className="home__section">
          <div className="home__question">
            <div className="home__title">Choice of guests</div>
          </div>
          <div className="home__card-list">
            <Swiper
              modules={[Navigation]}
              navigation
              slidesPerView={4}
              spaceBetween={30}
              breakpoints={breakPoints}
            >
              {cards?.data.theBest.map(card => (
                <SwiperSlide key={card.id}>
                  <Card key={card.id} card={card} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      </div>
      <div className="home__container">
        <section className="home__section">
          <div className="home__benefits">Our benefits</div>

          <div className="home__benefit-list">
            <div className="home__benefit-item">
              <div className="home__benefit-photo">
                <img src={Sale} alt="sale" />
              </div>
              <div className="home__benefit-text">
                Large selection of accommodation around the world
              </div>
            </div>
            <div className="home__benefit-item">
              <div className="home__benefit-photo">
                <img src={Procent} alt="procent" />
              </div>
              <div className="home__benefit-text">Low prices and flexible rental terms</div>
            </div>
            <div className="home__benefit-item">
              <div className="home__benefit-photo">
                <img src={Security} alt="security" />
              </div>
              <div className="home__benefit-text">Security and confidentiality of transactions</div>
            </div>
          </div>
        </section>
      </div>

      <div className="home__container" style={{ paddingInline: "0px" }}>
        <section className="home__loyalty-programme-section">
          <div className="home__loyalty-empty-div">
            <img src={Loalty_pro} alt="loyalty_pro" />
          </div>
          <div className="home__loyalty-programme-content">
            <div className="home__title">Loyalty programme</div>
            <p className="home__text">
              Phasellus ut dignissim quam, nec hendrerit augue. Duis sit amet commodo arcu. Class
              aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
            </p>
            <div className="home__actions">
              <button className="button button--login">
                <Link to={LINKS.SIGNIN}>Login</Link>
              </button>
              <button className="button button--signup">
                <Link to={LINKS.SIGNUP}>Sign up</Link>
              </button>
            </div>
          </div>
        </section>
      </div>
      <Support activeModal={activeModal} setActiveModal={setActiveModal} />
    </div>
  );
};

export default Home;
