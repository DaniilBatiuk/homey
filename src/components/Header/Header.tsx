import clsx from "clsx";
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { ICONS } from "@/constants";

import { userContext } from "@/context";

import { authService } from "@/services";

import Apartments from "@/assets/images/Apartment_category.png";
import Flats from "@/assets/images/Flats_category.png";
import Logo from "@/assets/images/Group.png";
import Guesthouses from "@/assets/images/Guesthouses_category.png";
import Hostels from "@/assets/images/Hostels_category.png";
import Hotels from "@/assets/images/Hotels_category.png";
import Houses from "@/assets/images/Houses_category.png";

import { LINKS } from "@/config/pages-url.config";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import "./Header.scss";

import { dropdownMenuClick2 } from "../Layout/helpers/dropdownMenuClick";

export const Header: React.FC = () => {
  const [menuActive, setMenuActive] = useState<boolean>(false);
  const [menuItemActive, setMenuItemActive] = useState<number>(0);
  const [rerender, setRerender] = useState<number>(0);
  const queryClient = useQueryClient();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const user = useContext(userContext);

  const { mutate } = useMutation({
    mutationFn: () => authService.logout(),
    onSuccess() {
      queryClient.refetchQueries({
        queryKey: ["user"],
        type: "active",
        exact: true,
      });
      navigate(LINKS.HOME);
      toast.success("You have successfully logged out");
    },
  });

  const menuOpen = () => {
    setMenuActive(prev => !prev);
    setMenuItemActive(0);
  };

  return (
    <header className="header">
      <div className="header__container">
        <Link to={LINKS.HOME} className="header__logo">
          <div>
            <img src={Logo} alt="Group.png" />
          </div>
          <div className="text">Homey</div>
        </Link>
        <nav className="header__nav">
          <div className="header__nav-list">
            {user && (
              <div tabIndex={0} className="header__item">
                <Link
                  to={LINKS.RENTING}
                  className={clsx("header__text", {
                    ["active"]: location.pathname === LINKS.RENTING,
                  })}
                >
                  Renting a home
                </Link>
              </div>
            )}
            <div tabIndex={1} className="header__item header__no-position" data-dropdown>
              <div className="header__text" data-dropdown-button>
                Categories
              </div>
              {ICONS.arrow({ "data-dropdown-button": true })}
              <div className="dropdown-menu full-width">
                <ul className="dropdown-menu__categories">
                  <Swiper modules={[Navigation]} navigation slidesPerView={4} spaceBetween={30}>
                    <SwiperSlide>
                      <li
                        className="dropdown-menu__item-category"
                        onClick={() => {
                          navigate(`${LINKS.SEARCH}?category=Houses`, { replace: true });
                          dropdownMenuClick2();
                        }}
                      >
                        <img src={Houses} alt="flag" />
                        Houses
                      </li>
                    </SwiperSlide>
                    <SwiperSlide>
                      <li
                        className="dropdown-menu__item-category"
                        onClick={() => {
                          navigate(`${LINKS.SEARCH}?category=Flat`, { replace: true });
                          dropdownMenuClick2();
                        }}
                      >
                        <img src={Flats} alt="flag" />
                        Flats
                      </li>
                    </SwiperSlide>
                    <SwiperSlide>
                      <li
                        className="dropdown-menu__item-category"
                        onClick={() => {
                          navigate(`${LINKS.SEARCH}?category=Hotel`, { replace: true });
                          dropdownMenuClick2();
                        }}
                      >
                        <img src={Hotels} alt="flag" />
                        Hotels
                      </li>
                    </SwiperSlide>
                    <SwiperSlide>
                      <li
                        className="dropdown-menu__item-category"
                        onClick={() => {
                          navigate(`${LINKS.SEARCH}?category=Hostel`, { replace: true });
                          dropdownMenuClick2();
                        }}
                      >
                        <img src={Hostels} alt="flag" />
                        Hostels
                      </li>
                    </SwiperSlide>
                    <SwiperSlide>
                      <li
                        className="dropdown-menu__item-category"
                        onClick={() => {
                          navigate(`${LINKS.SEARCH}?category=Guesthouse`, { replace: true });
                          dropdownMenuClick2();
                        }}
                      >
                        <img src={Guesthouses} alt="flag" />
                        Guesthouses
                      </li>
                    </SwiperSlide>
                    <SwiperSlide>
                      <li
                        className="dropdown-menu__item-category"
                        onClick={() => {
                          navigate(`${LINKS.SEARCH}?category=Aparthotel`, { replace: true });
                          dropdownMenuClick2();
                        }}
                      >
                        <img src={Apartments} alt="flag" />
                        Aparthotel
                      </li>
                    </SwiperSlide>
                  </Swiper>
                </ul>
              </div>
            </div>
            <div tabIndex={2} className="header__item">
              <Link
                to={LINKS.ABOUT}
                className={clsx("header__text", {
                  ["active"]: location.pathname === LINKS.ABOUT,
                })}
              >
                About us
              </Link>
            </div>
          </div>
          {/* <div tabIndex={3} className="header__item" data-dropdown>
            <div className="header__text" data-dropdown-button>
              EN
            </div>
            {ICONS.arrow({ "data-dropdown-button": true })}
            <div className="dropdown-menu">
              <ul className="dropdown-menu__list">
                <li className="dropdown-menu__item">
                  UA
                  <img src={Rectangle} alt="flag" />
                </li>
                <li className="dropdown-menu__item">
                  ES
                  <img src={Rectangle} alt="flag" />
                </li>
                <li className="dropdown-menu__item">
                  ZH
                  <img src={Rectangle} alt="flag" />
                </li>
                <li className="dropdown-menu__item">
                  AR
                  <img src={Rectangle} alt="flag" />
                </li>
              </ul>
            </div>
          </div> */}
          {/* <div tabIndex={4} className="header__item" data-dropdown>
            <div className="header__text" data-dropdown-button>
              USD
            </div>
            {ICONS.arrow({ "data-dropdown-button": true })}
            <div className="dropdown-menu">
              <ul className="dropdown-menu__list">
                <li className="dropdown-menu__item">
                  USD<span>$</span>
                </li>
                <li className="dropdown-menu__item">
                  UAN<span>₴</span>
                </li>
                <li className="dropdown-menu__item">
                  EUR<span>€</span>
                </li>
                <li className="dropdown-menu__item">
                  CNY<span>¥</span>
                </li>
              </ul>
            </div>
          </div> */}
          {user ? (
            <div tabIndex={3} className="header__item" data-dropdown>
              <div className="header__text" data-dropdown-button>
                {ICONS.account({ className: "svg-account", "data-dropdown-button": true })}
              </div>
              <div className="dropdown-menu left-auto-right-0">
                <ul className="dropdown-menu__list">
                  <Link to={LINKS.PROFILE} className="dropdown-menu__item">
                    {ICONS.accountManagement()}
                    Account management
                  </Link>
                  <Link to={LINKS.LOYALTY} className="dropdown-menu__item">
                    {ICONS.loyaltyProgramme()}
                    Loyalty programme
                  </Link>
                  <Link to={LINKS.DISCOUNTS} className="dropdown-menu__item">
                    {ICONS.discountsAndBonuses()}
                    Discounts and bonuses
                  </Link>
                  <Link to={LINKS.BOOKINGS} className="dropdown-menu__item">
                    {ICONS.bookings()}
                    Bookings
                  </Link>
                  <Link to={LINKS.SAVED} className="dropdown-menu__item">
                    {ICONS.saved()}
                    Saved
                  </Link>
                  {/* <li className="dropdown-menu__item">
                    {ICONS.chat()}
                    Chat
                  </li> */}
                  <li className="dropdown-menu__item" onClick={() => mutate()}>
                    {ICONS.signOut()}
                    Sign out
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <Link to={LINKS.SIGNIN}>{ICONS.account({ className: "svg-account" })}</Link>
          )}
        </nav>
        <button className="icon-menu" type="button" onClick={menuOpen}>
          {menuActive ? ICONS.menuClose() : ICONS.menuOpen({ className: "svg-open" })}
        </button>
        <div className={menuActive ? "menu-open active" : "menu-open"}>
          <div className="section">
            <div className="section__title">More</div>
            <div className="section__list">
              <div className="section__item" onClick={() => setMenuItemActive(1)}>
                {ICONS.categories()}Categories
              </div>
              {/* <div className="section__item" onClick={() => setMenuItemActive(2)}>
                <img src={Rectangle} alt="flag" />
                English (UK)
              </div>
              <div className="section__item" onClick={() => setMenuItemActive(3)}>
                <span>USD</span>
                United States dollar
              </div> */}
              <div className="section__item">
                <span>{ICONS.loyalty()}</span>
                Loyalty programme
              </div>
            </div>
          </div>
          <div className="section">
            <div className="section__title">Help and support</div>
            <div className="section__list">
              <div className="section__item">{ICONS.contact()}Contact the сustomer service</div>
              <div className="section__item">{ICONS.partnership()}Partnership dispute</div>
            </div>
          </div>
          <div className="section">
            <div className="section__title">Settings and legal</div>
            <div className="section__list">
              <div className="section__item">{ICONS.about()}About us</div>
              <div className="section__item">{ICONS.partner()}Become a partner</div>
              <div className="section__item">{ICONS.privacy()}Privacy and files cookie</div>
              <div className="section__item">{ICONS.conditions()}Conditions of use</div>
              <div className="section__item">{ICONS.legal()}Legal</div>
            </div>
          </div>
        </div>
        <div className={menuItemActive === 1 ? "menu-item-open active" : "menu-item-open"}>
          <div className="menu-item-open__title">Categories</div>
          <div className="menu-item-open__list">
            <div
              className="menu-item-open__list-item"
              onClick={() => {
                navigate(`${LINKS.SEARCH}?category=Houses`, { replace: true });
                menuOpen();
              }}
            >
              Houses {ICONS.arrowRight()}
            </div>
            <div
              className="menu-item-open__list-item"
              onClick={() => {
                navigate(`${LINKS.SEARCH}?category=Flats`, { replace: true });
                menuOpen();
              }}
            >
              Flats {ICONS.arrowRight()}
            </div>
            <div
              className="menu-item-open__list-item"
              onClick={() => {
                navigate(`${LINKS.SEARCH}?category=Hotels`, { replace: true });
                menuOpen();
              }}
            >
              Hotels {ICONS.arrowRight()}
            </div>
            <div
              className="menu-item-open__list-item"
              onClick={() => {
                navigate(`${LINKS.SEARCH}?category=Hostels`, { replace: true });
                menuOpen();
              }}
            >
              Hostels {ICONS.arrowRight()}
            </div>
            <div
              className="menu-item-open__list-item"
              onClick={() => {
                navigate(`${LINKS.SEARCH}?category=Guesthouses`, { replace: true });
                menuOpen();
              }}
            >
              Guesthouses {ICONS.arrowRight()}
            </div>
            <div
              className="menu-item-open__list-item"
              onClick={() => {
                navigate(`${LINKS.SEARCH}?category=Aparthotel`, { replace: true });
                menuOpen();
              }}
            >
              Aparthotel {ICONS.arrowRight()}
            </div>
          </div>
        </div>
        {/* <div className={menuItemActive === 2 ? "menu-item-open active" : "menu-item-open"}>
          <div className="menu-item-open__title">Select your language</div>
          <div className="menu-item-open__list">
            <div className="menu-item-open__list-item">
              <div className="menu-item-open__list-item-text">
                <div>
                  <img src={Rectangle} alt="flag" />
                  EN
                </div>
                <span>English (United Kingdom)</span>
              </div>
              {ICONS.tick()}
            </div>
            <div className="menu-item-open__list-item">
              <div className="menu-item-open__list-item-text">
                <div>
                  <img src={Rectangle} alt="flag" />
                  UA
                </div>
                <span>Ukrainian</span>
              </div>
            </div>
            <div className="menu-item-open__list-item">
              <div className="menu-item-open__list-item-text">
                <div>
                  <img src={Rectangle} alt="flag" />
                  ES
                </div>
                <span>Spanish</span>
              </div>
            </div>
            <div className="menu-item-open__list-item">
              <div className="menu-item-open__list-item-text">
                <div>
                  <img src={Rectangle} alt="flag" />
                  ZH
                </div>
                <span>Chinese</span>
              </div>
            </div>
            <div className="menu-item-open__list-item">
              <div className="menu-item-open__list-item-text">
                <div>
                  <img src={Rectangle} alt="flag" />
                  PT
                </div>
                <span>Portuguese</span>
              </div>
            </div>
          </div>
        </div>
        <div className={menuItemActive === 3 ? "menu-item-open active" : "menu-item-open"}>
          <div className="menu-item-open__title">Select currency</div>
          <div className="menu-item-open__list">
            <div className="menu-item-open__list-item">
              <div className="menu-item-open__list-item-text">
                <div>
                  <span>$</span>
                  USD
                </div>
                <span>United States Dollar</span>
              </div>
              {ICONS.tick()}
            </div>
            <div className="menu-item-open__list-item">
              <div className="menu-item-open__list-item-text">
                <div>
                  <span>₴</span>
                  UAN
                </div>
                <span>Ukrainian Hryvnia</span>
              </div>
            </div>
            <div className="menu-item-open__list-item">
              <div className="menu-item-open__list-item-text">
                <div>
                  <span>€</span>
                  EUR
                </div>
                <span>Euro</span>
              </div>
            </div>
            <div className="menu-item-open__list-item">
              <div className="menu-item-open__list-item-text">
                <div>
                  <span>¥</span>
                  CNY
                </div>
                <span>ChiNese Yuan</span>
              </div>
            </div>
            <div className="menu-item-open__list-item">
              <div className="menu-item-open__list-item-text">
                <div>
                  <span>₱</span>
                  ARS
                </div>
                <span>Argentine Peso</span>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </header>
  );
};
