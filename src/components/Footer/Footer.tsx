import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { MdArrowUpward } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ICONS } from "@/constants";

import { LINKS } from "@/config/pages-url.config";

import "./Footer.scss";

export const Footer: React.FC = () => {
  // State to manage which accordion item is open, -1 means all are closed
  const [openAccordion, setOpenAccordion] = useState<number>(-1);
  const navigate = useNavigate();
  // Toggle function to open/close accordion items
  const toggleAccordion = (index: number) => {
    if (openAccordion === index) {
      // If clicked again on the same item, close it
      setOpenAccordion(-1);
    } else {
      // Open the clicked item
      setOpenAccordion(index);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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
                    <div>
                      {ICONS.logoImage()}
                    </div>
                    <div className="text">
                      Homey
                    </div>
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
                      <a href="#">FAQ`s</a>
                    </li>
                    <li className="footer__categories-li">
                      <a href="#">Contact Us</a>
                    </li>
                    <li className="footer__categories-li">
                      <a href="#">Return Policy</a>
                    </li>
                    <li className="footer__categories-li">
                      <a href="#">My Account</a>
                    </li>
                  </ul>
                </div>
                <div className="footer__section-social-section">
                  <p className="footer__categories">Social</p>
                  <ul>
                    <li className="footer__categories-li">
                      <a href="#">Facebook</a>
                    </li>
                    <li className="footer__categories-li">
                      <a href="#">Instagram</a>
                    </li>
                    <li className="footer__categories-li">
                      <a href="#">Pinterest</a>
                    </li>
                    <li className="footer__categories-li">
                      <a href="#">YouTube</a>
                    </li>
                  </ul>
                </div>
                <div className="footer__section-legal-section">
                  <p className="footer__categories">Legal</p>
                  <ul>
                    <li className="footer__categories-li">
                      <a href="#">Privacy Policy</a>
                    </li>
                    <li className="footer__categories-li">
                      <a href="#">Terms of Use</a>
                    </li>
                    <li className="footer__categories-li">
                      <a href="#">Frequently Asked Questions</a>
                    </li>
                    <li className="footer__categories-li">
                      <a href="#">Cancellation Policy</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="footer__accordion-sections">
              <div className="footer__accordion-item">
                <div className="footer__accordion-title" onClick={() => toggleAccordion(1)}>
                  <p className="footer__categories">Categories</p>
                  {openAccordion === 1 ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </div>
                {openAccordion === 1 && (
                  <div className="footer__accordion-content">
                    <ul>
                      <li className="footer__categories-li">
                        <a href="#">Houses</a>
                      </li>
                      <li className="footer__categories-li">
                        <a href="#">Flats</a>
                      </li>
                      <li className="footer__categories-li">
                        <a href="#">Hotels</a>
                      </li>
                      <li className="footer__categories-li">
                        <a href="#">Hostels</a>
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              <div className="footer__accordion-item">
                <div className="footer__accordion-title" onClick={() => toggleAccordion(2)}>
                  <p className="footer__categories">Support</p>
                  {openAccordion === 2 ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </div>
                {openAccordion === 2 && (
                  <div className="footer__accordion-content">
                    <ul>
                      <li className="footer__categories-li">
                        <a href="#">FAQ`s</a>
                      </li>
                      <li className="footer__categories-li">
                        <a href="#">Contact Us</a>
                      </li>
                      <li className="footer__categories-li">
                        <a href="#">Return Policy</a>
                      </li>
                      <li className="footer__categories-li">
                        <a href="#">My Account</a>
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              <div className="footer__accordion-item">
                <div className="footer__accordion-title" onClick={() => toggleAccordion(3)}>
                  <p className="footer__categories">Social</p>
                  {openAccordion === 3 ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </div>
                {openAccordion === 3 && (
                  <div className="footer__accordion-content">
                    <ul>
                      <li className="footer__categories-li">
                        <a href="#">Facebook</a>
                      </li>
                      <li className="footer__categories-li">
                        <a href="#">Instagram</a>
                      </li>
                      <li className="footer__categories-li">
                        <a href="#">Pinterest</a>
                      </li>
                      <li className="footer__categories-li">
                        <a href="#">YouTube</a>
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              <div className="footer__accordion-item">
                <div className="footer__accordion-title" onClick={() => toggleAccordion(4)}>
                  <p className="footer__categories">Legal</p>
                  {openAccordion === 4 ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </div>
                {openAccordion === 4 && (
                  <div className="footer__accordion-content">
                    <ul>
                      <li className="footer__categories-li">
                        <a href="#">Privacy Policy</a>
                      </li>
                      <li className="footer__categories-li">
                        <a href="#">Terms of Use</a>
                      </li>
                      <li className="footer__categories-li">
                        <a href="#">Frequently Asked Questions</a>
                      </li>
                      <li className="footer__categories-li">
                        <a href="#">Cancellation Policy</a>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
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
