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
  const queryClient = useQueryClient();
  const location = useLocation();
  const navigate = useNavigate();

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
                  Create a new listing
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
          {user ? (
            <div tabIndex={3} className="header__item" data-dropdown>
              <div className="header__text" data-dropdown-button>
                {ICONS.account({ className: "svg-account" })}
              </div>
              <div className="dropdown-menu left-auto-right-0">
                <ul className="dropdown-menu__list">
                  <Link
                    to={LINKS.PROFILE}
                    className="dropdown-menu__item"
                    onClick={dropdownMenuClick2}
                  >
                    {ICONS.accountManagement()}
                    Account management
                  </Link>
                  <Link
                    to={LINKS.LOYALTY}
                    className="dropdown-menu__item"
                    onClick={dropdownMenuClick2}
                  >
                    {ICONS.loyaltyProgramme()}
                    Loyalty programme
                  </Link>
                  <Link
                    to={LINKS.DISCOUNTS}
                    className="dropdown-menu__item"
                    onClick={dropdownMenuClick2}
                  >
                    {ICONS.discountsAndBonuses()}
                    Discounts and bonuses
                  </Link>
                  <Link
                    to={LINKS.BOOKINGS}
                    className="dropdown-menu__item"
                    onClick={dropdownMenuClick2}
                  >
                    {ICONS.bookings()}
                    Bookings
                  </Link>
                  <Link
                    to={LINKS.SAVED}
                    className="dropdown-menu__item"
                    onClick={dropdownMenuClick2}
                  >
                    {ICONS.saved()}
                    Saved
                  </Link>
                  <Link
                    to={LINKS.MYRENTS}
                    className="dropdown-menu__item"
                    onClick={dropdownMenuClick2}
                  >
                    {ICONS.myRents()}
                    My listings
                  </Link>
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
              <Link to={LINKS.LOYALTY}>
                <div className="section__item" onClick={() => setMenuActive(prev => !prev)}>
                  <span>{ICONS.loyalty()}</span>
                  Loyalty programme
                </div>
              </Link>
            </div>
          </div>
          <div className="section">
            <div className="section__title">Help and support</div>
            <div className="section__list">
              <Link to={LINKS.INPROGRESS} onClick={() => setMenuActive(prev => !prev)}>
                <div className="section__item">{ICONS.contact()}Contact the сustomer service</div>
              </Link>
              <Link to={LINKS.INPROGRESS} onClick={() => setMenuActive(prev => !prev)}>
                <div className="section__item">{ICONS.partnership()}Partnership dispute</div>
              </Link>
            </div>
          </div>
          <div className="section">
            <div className="section__title">Settings and legal</div>
            <div className="section__list">
              <Link to={LINKS.ABOUT}>
                <div className="section__item" onClick={() => setMenuActive(prev => !prev)}>
                  {ICONS.about()}About us
                </div>
              </Link>
              <Link to={LINKS.INPROGRESS} onClick={() => setMenuActive(prev => !prev)}>
                <div className="section__item">{ICONS.partner()}Become a partner</div>
              </Link>
              <Link to={LINKS.INPROGRESS} onClick={() => setMenuActive(prev => !prev)}>
                <div className="section__item">{ICONS.privacy()}Privacy and files cookie</div>
              </Link>
              <Link to={LINKS.INPROGRESS} onClick={() => setMenuActive(prev => !prev)}>
                <div className="section__item">{ICONS.conditions()}Conditions of use</div>
              </Link>
              <Link to={LINKS.INPROGRESS} onClick={() => setMenuActive(prev => !prev)}>
                <div className="section__item">{ICONS.legal()}Legal</div>
              </Link>
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
                navigate(`${LINKS.SEARCH}?category=Flat`, { replace: true });
                menuOpen();
              }}
            >
              Flats {ICONS.arrowRight()}
            </div>
            <div
              className="menu-item-open__list-item"
              onClick={() => {
                navigate(`${LINKS.SEARCH}?category=Hotel`, { replace: true });
                menuOpen();
              }}
            >
              Hotels {ICONS.arrowRight()}
            </div>
            <div
              className="menu-item-open__list-item"
              onClick={() => {
                navigate(`${LINKS.SEARCH}?category=Hostel`, { replace: true });
                menuOpen();
              }}
            >
              Hostels {ICONS.arrowRight()}
            </div>
            <div
              className="menu-item-open__list-item"
              onClick={() => {
                navigate(`${LINKS.SEARCH}?category=Guesthouse`, { replace: true });
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
      </div>
    </header>
  );
};
