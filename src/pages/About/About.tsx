import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { MdArrowForward } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import AboutCompany1 from "@/assets/images/About_company1.webp";
import AboutCompany2 from "@/assets/images/About_company2.webp";
import AboutCompany3 from "@/assets/images/About_company3.webp";
import Charity1 from "@/assets/images/Charity1.webp";
import Charity2 from "@/assets/images/Charity2.webp";

import { LINKS } from "@/config/pages-url.config";

import "./About.scss";
import { cardsData, menuItems, teamMembers } from "./constants";

const About: React.FC = () => {
  const [active, setActive] = useState(false);
  const [selectedItem, setSelectedItem] = useState("About the company");

  const handleAccordionToggle = () => {
    setActive(prev => !prev);
  };

  const handleItemClick = (name: string, id: string) => {
    setSelectedItem(name);
    setActive(false); // Close the accordion

    // Scroll to the div with the specified id
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate(LINKS.INPROGRESS); // Перенаправлення на потрібний маршрут
  };

  return (
    <div className="about">
      <div className="about__container" style={{ paddingInline: "0px" }}>
        <section className="about__loyalty-programme-section">
          <div className="about__loyalty-programme-content">
            <p className="about__text">Creating cosiness where you are looking for it!</p>
          </div>
        </section>
      </div>

      <div className="about__menu">
        <div className="about__container" style={{ paddingInline: "0px" }}>
          <section className="about__links">
            <nav>
              <ul className="about__links-li active">
                <li>
                  <a href="#about-the-company" className="about__text-li">
                    About the company
                  </a>
                </li>
                <li>
                  <a href="#our-team" className="about__text-li">
                    Our team
                  </a>
                </li>
                <li>
                  <a href="#achievements-and-awards" className="about__text-li">
                    Achievements and awards
                  </a>
                </li>
                <li>
                  <a href="#charity-and-social-projects" className="about__text-li">
                    Charity and social projects
                  </a>
                </li>
                <li>
                  <a href="#how-can-you-help" className="about__text-li">
                    How can you help?
                  </a>
                </li>
              </ul>
            </nav>
          </section>
        </div>
      </div>

      <div className="about__menu-mob">
        <div className="about__container" style={{ paddingInline: "0px" }}>
          <section className="about__links-mob">
            <div className="about__text-container" onClick={handleAccordionToggle}>
              {selectedItem}
              <span className="icon-spacing">{active ? <IoIosArrowDown /> : <IoIosArrowUp />}</span>
            </div>
            {active && (
              <nav>
                <ul className="about__links-li-mob">
                  {menuItems.map(
                    item =>
                      selectedItem !== item.name && (
                        <li key={item.id}>
                          <a
                            href={`#${item.id}`}
                            className="about__text-li-mob"
                            onClick={() => handleItemClick(item.name, item.id)}
                          >
                            {item.name}
                          </a>
                        </li>
                      ),
                  )}
                </ul>
              </nav>
            )}
          </section>
        </div>
      </div>

      <div className="about__company-big" id="about-the-company">
        <div className="about__container" style={{ paddingInline: "30px 30px" }}>
          <section>
            <div className="about__title">
              <p className="about__text-title">About the Company</p>
            </div>

            <div className="about__company">
              <div className="about__company-card">
                <div className="card-text">
                  <p className="text-title">Who are we?</p>
                  <p className="text-content">
                    Homey, founded in 2010, began with a small number of city center Aparthotel.
                    Their focus on quality service and personalized experiences led to rapid
                    expansion. Known for stylish and comfortable accommodations at reasonable
                    prices, Homey continues to develop its network of properties to meet diverse
                    customer needs.
                  </p>
                </div>
              </div>
              <div className="about__company-card-foto">
                <img
                  src={AboutCompany1}
                  alt="Main Photo"
                  className="company-card-img"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="about__company">
              <div className="about__company-card-foto">
                <img
                  src={AboutCompany2}
                  alt="Main Photo"
                  className="company-card-img"
                  loading="lazy"
                />
              </div>
              <div className="about__company-card">
                <div className="card-text">
                  <p className="text-title">What are we doing?</p>
                  <p className="text-content">
                    Homey, founded in 2010, offers stylish and cozy properties at reasonable prices.
                    Their personalized approach ensures safety, convenience, and customer
                    satisfaction. They aim to be a reliable partner for global travelers, fostering
                    long-term relationships with tenants and property owners. 
                  </p>
                </div>
              </div>
            </div>

            <div className="about__company">
              <div className="about__company-card">
                <div className="card-text">
                  <p className="text-title">Why do we do this?</p>
                  <p className="text-content">
                    Our mission is to make rental housing affordable, transparent and satisfying for
                    everyone. We believe that renting is not only a way to solve a housing problem,
                    but also an opportunity to experience new places, people and cultures. We want
                    you to feel at home wherever you are. We value your time, money and trust. We
                    are committed to continuous development, innovation and improving our service.
                  </p>
                </div>
              </div>
              <div className="about__company-card-foto">
                <img
                  src={AboutCompany3}
                  alt="Main Photo"
                  className="company-card-img"
                  loading="lazy"
                />
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="about__company-mobile" id="about-the-company-mob">
        <div className="about__container" style={{ paddingInline: "30px 30px" }}>
          <section>
            <div className="about__title">
              <p className="about__text-title">About the Company</p>
            </div>

            <div className="about__company-mob">
              <div className="about__company-card-mob">
                <div className="card-text">
                  <p className="text-title">Who are we?</p>
                  <p className="text-content">
                    Homey, founded in 2010, began with a small number of city center Aparthotel.
                    Their focus on quality service and personalized experiences led to rapid
                    expansion. Known for stylish and comfortable accommodations at reasonable
                    prices, Homey continues to develop its network of properties to meet diverse
                    customer needs.
                  </p>
                </div>
              </div>
              <div className="about__company-card-foto-mob">
                <img
                  src={AboutCompany1}
                  alt="Main Photo"
                  className="company-card-img-mob"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="about__company-mob">
              <div className="about__company-card-mob">
                <div className="card-text">
                  <p className="text-title">What are we doing?</p>
                  <p className="text-content">
                    Homey, founded in 2010, offers stylish and cozy properties at reasonable prices.
                    Their personalized approach ensures safety, convenience, and customer
                    satisfaction. They aim to be a reliable partner for global travelers, fostering
                    long-term relationships with tenants and property owners. 
                  </p>
                </div>
              </div>
              <div className="about__company-card-foto-mob">
                <img
                  src={AboutCompany2}
                  alt="Main Photo"
                  className="company-card-img-mob"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="about__company-mob">
              <div className="about__company-card-mob">
                <div className="card-text">
                  <p className="text-title">Why do we do this?</p>
                  <p className="text-content">
                    Our mission is to make rental housing affordable, transparent and satisfying for
                    everyone. We believe that renting is not only a way to solve a housing problem,
                    but also an opportunity to experience new places, people and cultures. We want
                    you to feel at home wherever you are. We value your time, money and trust. We
                    are committed to continuous development, innovation and improving our service.
                  </p>
                </div>
              </div>
              <div className="about__company-card-foto-mob">
                <img
                  src={AboutCompany3}
                  alt="Main Photo"
                  className="company-card-img-mob"
                  loading="lazy"
                />
              </div>
            </div>
          </section>
        </div>
      </div>

      <div id="our-team">
        <div className="about__container" style={{ paddingInline: "30px 30px" }}>
          <section>
            <div className="about__title">
              <p className="about__text-title">Our team</p>
            </div>

            <div className="about__our-team">
              <p className="our-team-text">
                We are proud of our team of professionals who work to improve our website and app,
                customer and partner service, market and trend analysis. These are just some of our
                talented and experienced staff who make our service the best for you. Here are some
                of our key employees:
              </p>

              <div className="our-team-cardscontainer">
                {teamMembers.map(member => (
                  <div key={member.name} className="card__config">
                    <div className="team-member-card-img">
                      <img
                        src={member.imageUrl}
                        alt={member.name}
                        className="card_img"
                        loading="lazy"
                      />
                    </div>
                    <div className="card-context">
                      <div>
                        <p className="card-name">{member.name}</p>
                        <p>
                          <span className="card-description">{member.role}.</span>&nbsp;
                          <span className="card-description">{member.description}</span>
                        </p>
                      </div>

                      <div className="learn-more">
                        <a href="#learn-more" className="card-learn-more">
                          Learn more
                          <MdArrowForward className="learn-more-icon" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>

      <div id="achievements-and-awards">
        <div className="about__container" style={{ paddingInline: "30px 30px" }}>
          <section>
            <div className="about__title">
              <p className="about__text-title">Achievements and awards</p>
            </div>

            <div className="about__achievements-cardcontainer">
              {cardsData.map(card => (
                <div key={card.id} className="card__config-info">
                  <div className="achievements-card-img">
                    <img
                      src={card.imageUrl}
                      alt={card.title}
                      className="card_img_info"
                      loading="lazy"
                    />
                  </div>
                  <div className="card-description-div">
                    <p className="card-description">{card.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      <div id="charity-and-social-projects">
        <div className="about__container" style={{ paddingInline: "30px 30px" }}>
          <section>
            <div className="about__title">
              <p className="about__text-title">Charity and social projects</p>
            </div>

            <div className="about__charity">
              <p className="charity-text">
                We are not only a rental company, but also a socially responsible business. We care
                not only about our clients and partners, but also about those who need our help. We
                participate in various charitable and social projects aimed at improving the lives
                of people and animals.
              </p>

              <div className="about__charity-container">
                <div className="about__charity-card">
                  <div className="card-text">
                    <p className="text-title">Help homeless people after disasters</p>
                    <p className="text-content">
                      One of our priority areas is helping homeless people affected by natural
                      disasters such as earthquakes, floods, fires, etc. We provide them with
                      temporary accommodation, food, clothing, medical care and psychological
                      support. We also help them to restore their documents, find a job and adapt to
                      new living conditions.
                    </p>
                  </div>
                </div>
                <div className="about__charity-card-foto">
                  <img
                    src={Charity1}
                    alt="Main Photo"
                    className="charity-card-img"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="about__charity-container">
                <div className="about__charity-card-foto">
                  <img
                    src={Charity2}
                    alt="Main Photo"
                    className="charity-card-img"
                    loading="lazy"
                  />
                </div>
                <div className="about__charity-card">
                  <div className="card-text">
                    <p className="text-title">Helping our lesser brothers</p>
                    <p className="text-content">
                      Our other important project is to help our brothers of the lesser kind -
                      homeless and abandoned animals. We co-operate with various shelters,
                      volunteers and veterinarians to provide them with food, treatment, care and
                      vaccinations. We also help them find new homes and loving owners.
                    </p>
                  </div>
                </div>
              </div>

              <div className="about__charity-container-mob">
                <div className="about__charity-card-foto-mob">
                  <img
                    src={Charity1}
                    alt="Main Photo"
                    className="charity-card-img-mob"
                    loading="lazy"
                  />
                </div>
                <div className="about__charity-card-mob">
                  <div className="card-text">
                    <p className="text-title">Help homeless people after disasters</p>
                    <p className="text-content">
                      One of our priority areas is helping homeless people affected by natural
                      disasters such as earthquakes, floods, fires, etc. We provide them with
                      temporary accommodation, food, clothing, medical care and psychological
                      support. We also help them to restore their documents, find a job and adapt to
                      new living conditions.
                    </p>
                  </div>
                </div>
              </div>

              <div className="about__charity-container-mob">
                <div className="about__charity-card-foto-mob">
                  <img
                    src={Charity2}
                    alt="Main Photo"
                    className="charity-card-img-mob"
                    loading="lazy"
                  />
                </div>
                <div className="about__charity-card-mob">
                  <div className="card-text">
                    <p className="text-title">Helping our lesser brothers</p>
                    <p className="text-content">
                      Our other important project is to help our brothers of the lesser kind -
                      homeless and abandoned animals. We co-operate with various shelters,
                      volunteers and veterinarians to provide them with food, treatment, care and
                      vaccinations. We also help them find new homes and loving owners.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div>
        <div className="about__container" style={{ paddingInline: "30px 30px" }}>
          <section id="how-can-you-help">
            <div className="about__title">
              <p className="about__text-title">How can you help?</p>
            </div>

            <div className="about__how-can-you-help">
              <div className="about__how-can-you-help-content">
                <div>
                  <p className="about__how-can-you-help-text">
                    You too can join our charity and social projects and do a good deed. You can
                    make a donation to our account, give us things you don't need, or volunteer to
                    help us on the spot. You can also spread the word about our projects on your
                    social networks and invite your friends and acquaintances to take part. Together
                    we can make this world a better place!
                  </p>
                </div>
                <div>
                  <button onClick={handleButtonClick}>
                    <span>Donate</span>
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
