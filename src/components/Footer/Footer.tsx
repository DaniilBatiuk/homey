import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { MdArrowUpward } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { animated, useSpring } from "react-spring";
import { toast } from "react-toastify";

import { ICONS } from "@/constants";

import { LINKS } from "@/config/pages-url.config";

import "./Footer.scss";

const Footer: React.FC = () => {
  // State to manage which accordion item is open, -1 means all are closed
  const [openAccordion, setOpenAccordion] = useState<number>(-1);
  const navigate = useNavigate();
  //Toggle function to open/close accordion items
  const toggleAccordion = (index: number) => {
    setOpenAccordion(prevIndex => (prevIndex === index ? -1 : index));
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Розрахунок анімації для кожного розділу
  const animation = useSpring({
    height: openAccordion !== -1 ? "150px" : "0px", // Припустимо, що контент має висоту 150px
    opacity: openAccordion !== -1 ? 1 : 0,
    overflow: "hidden",
  });

  const handleNavigation = (url: string) => {
    navigate(url, { replace: true });
    scrollToTop();
  };

  const accordionData = {
    Categories: [
      { name: "Houses", onClick: () => handleNavigation(`${LINKS.SEARCH}?category=Houses`) },
      { name: "Flats", onClick: () => handleNavigation(`${LINKS.SEARCH}?category=Flat`) },
      { name: "Hotels", onClick: () => handleNavigation(`${LINKS.SEARCH}?category=Hotel`) },
      { name: "Hostels", onClick: () => handleNavigation(`${LINKS.SEARCH}?category=Hostel`) },
    ],
    Support: [
      { name: "FAQ's", onClick: () => handleNavigation(LINKS.INPROGRESS) },
      { name: "Contact Us", onClick: () => handleNavigation(LINKS.INPROGRESS) },
      { name: "Return Policy", onClick: () => handleNavigation(LINKS.INPROGRESS) },
      { name: "My Account", onClick: () => handleNavigation(LINKS.INPROGRESS) },
    ],
    Social: [
      { name: "Facebook", onClick: () => handleNavigation(LINKS.INPROGRESS) },
      { name: "Instagram", onClick: () => handleNavigation(LINKS.INPROGRESS) },
      { name: "Pinterest", onClick: () => handleNavigation(LINKS.INPROGRESS) },
      { name: "YouTube", onClick: () => handleNavigation(LINKS.INPROGRESS) },
    ],
    Legal: [
      { name: "Privacy Policy", onClick: () => handleNavigation(LINKS.INPROGRESS) },
      { name: "Terms of Use", onClick: () => handleNavigation(LINKS.INPROGRESS) },
      { name: "Frequently Asked Questions", onClick: () => handleNavigation(LINKS.INPROGRESS) },
      { name: "Cancellation Policy", onClick: () => handleNavigation(LINKS.INPROGRESS) },
    ],
  };

  return (
    <footer className="footer__main">
      <div className="footer__background-one">
        <div className="home__container" style={{ paddingInline: "0px" }}>
          <div className="footer__newsletter">
            <p>Sign up to receive the most interesting and favourable rental offers every week!</p>
            <form className="footer__newsletter-input-group">
              <input type="email" placeholder="Enter your Email" />
              <button
                type="button"
                onClick={() => toast.success("You have successfully subscribe")}
              >
                <span>Subscribe</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="footer__background-two">
        <div className="home__container" style={{ paddingInline: "0px" }}>
          <div className="footer__content">
            <div className="footer__button-return">
              <button className="round-arrow-button" onClick={scrollToTop}>
                <MdArrowUpward />
              </button>
            </div>
            <div className="footer__content-part-one">
              <div className="footer__content-section-one">
                <div className="footer__logo-div">
                  <Link to={LINKS.HOME} className="footer__logo">
                    <div>{ICONS.logoImage()}</div>
                    <div className="text">Homey</div>
                  </Link>
                </div>
                <div className="footer__logo-info-div">
                  <p className="footer__text-info">Technical support</p>
                  <p className="footer__text-tel">0 800 300 501</p>
                  <p className="footer__text-info">Email:</p>
                  <p className="footer__text-info">info@homey.com</p>
                </div>
              </div>

              <div className="footer__content-section-two">
                <div className="footer__section-categories-section">
                  <p className="footer__categories">Categories</p>
                  <ul>
                    <li className="footer__categories-li">
                      <div
                        onClick={() => {
                          navigate(`${LINKS.SEARCH}?category=Houses`, { replace: true });
                          scrollToTop();
                        }}
                      >
                        Houses
                      </div>
                    </li>
                    <li className="footer__categories-li">
                      <div
                        onClick={() => {
                          navigate(`${LINKS.SEARCH}?category=Flat`, { replace: true });
                          scrollToTop();
                        }}
                      >
                        Flats
                      </div>
                    </li>
                    <li className="footer__categories-li">
                      <div
                        onClick={() => {
                          navigate(`${LINKS.SEARCH}?category=Hotel`, { replace: true });
                          scrollToTop();
                        }}
                      >
                        Hotels
                      </div>
                    </li>
                    <li className="footer__categories-li">
                      <div
                        onClick={() => {
                          navigate(`${LINKS.SEARCH}?category=Hostel`, { replace: true });
                          scrollToTop();
                        }}
                      >
                        Hostels
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="footer__section-support-section">
                  <p className="footer__categories">Support</p>
                  <ul>
                    <li className="footer__categories-li">
                      <Link to={LINKS.INPROGRESS}>FAQ`s</Link>
                    </li>
                    <li className="footer__categories-li">
                      <Link to={LINKS.INPROGRESS}>Contact Us</Link>
                    </li>
                    <li className="footer__categories-li">
                      <Link to={LINKS.INPROGRESS}>Return Policy</Link>
                    </li>
                    <li className="footer__categories-li">
                      <Link to={LINKS.INPROGRESS}>My Account</Link>
                    </li>
                  </ul>
                </div>
                <div className="footer__section-social-section">
                  <p className="footer__categories">Social</p>
                  <ul>
                    <li className="footer__categories-li">
                      <Link to={LINKS.INPROGRESS}>Facebook</Link>
                    </li>
                    <li className="footer__categories-li">
                      <Link to={LINKS.INPROGRESS}>Instagram</Link>
                    </li>
                    <li className="footer__categories-li">
                      <Link to={LINKS.INPROGRESS}>Pinterest</Link>
                    </li>
                    <li className="footer__categories-li">
                      <Link to={LINKS.INPROGRESS}>YouTube</Link>
                    </li>
                  </ul>
                </div>
                <div className="footer__section-legal-section">
                  <p className="footer__categories">Legal</p>
                  <ul>
                    <li className="footer__categories-li">
                      <Link to={LINKS.INPROGRESS}>Privacy Policy</Link>
                    </li>
                    <li className="footer__categories-li">
                      <Link to={LINKS.INPROGRESS}>Terms of Use</Link>
                    </li>
                    <li className="footer__categories-li">
                      <Link to={LINKS.INPROGRESS}>Frequently Asked Questions</Link>
                    </li>
                    <li className="footer__categories-li">
                      <Link to={LINKS.INPROGRESS}>Cancellation Policy</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="footer__accordion-sections">
              {Object.entries(accordionData).map(([key, values], index) => (
                <div key={key} className="footer__accordion-item">
                  <div
                    className="footer__accordion-title"
                    onClick={() => toggleAccordion(index + 1)}
                  >
                    <p className="footer__categories">{key}</p>
                    {openAccordion === index + 1 ? <IoIosArrowUp /> : <IoIosArrowDown />}
                  </div>
                  {openAccordion === index + 1 && (
                    <animated.div style={animation} className="footer__accordion-content">
                      <ul>
                        {values.map(item => (
                          <li
                            key={item.name}
                            className="footer__categories-li"
                            onClick={item.onClick}
                          >
                            {item.name}
                          </li>
                        ))}
                      </ul>
                    </animated.div>
                  )}
                </div>
              ))}
            </div>

            <div className="footer__newsletter_mobil">
              <p className="footer__categories">Service:</p>
              <p id="tel" className="footer__categories">
                0 800 300 501
              </p>
            </div>

            <div className="footer__newsletter-info-mobil">
              <p className="footer__text-info">Email</p>
              <p id="email" className="footer__text-info">
                info@homey.com
              </p>
            </div>

            <div className="footer__content_part_two_main">
              <div className="footer__content-part-two">
                <p id="page" className="footer__text-info">
                  &copy;2024 Homey.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
