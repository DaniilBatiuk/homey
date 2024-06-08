import clsx from "clsx";
import React, { useContext, useLayoutEffect, useState } from "react";

import { ICONS } from "@/constants";

import { userContext } from "@/context";

import PersonalDataPhoto from "@/assets/images/PersonalData.png";

import "./Profile.scss";
import { Payment } from "./components/Payment/Payment";
import { PersonalData } from "./components/PersonalData/PersonalData";
import { Avatar } from "./components/PersonalData/components/Avatar/Avatar";
import { Security } from "./components/Security/Security";

const Profile: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<number>(0);
  const [activeMenuMobile, setActiveMenuMobile] = useState<boolean>(false);
  const [isLittleWidth, setIsLittleWidth] = useState<boolean>(false);
  const user = useContext(userContext);
  useLayoutEffect(() => {
    const wrapperElement = document.getElementById("wrapper");

    if (wrapperElement !== null) {
      const width = wrapperElement.getBoundingClientRect().width;
      setIsLittleWidth(width < 990);
    }
  }, []);

  return (
    <div className="profile">
      <div className="profile__container">
        <div className="profile__main">
          <div className="profile__left">
            <div className="profile__list" style={activeMenuMobile ? { display: "none" } : {}}>
              <div
                className={clsx("profile__list-item", {
                  ["active"]: activeMenu === 0 && !isLittleWidth,
                })}
                onClick={() => {
                  setActiveMenu(0);
                  isLittleWidth ? setActiveMenuMobile(true) : setActiveMenuMobile(false);
                }}
              >
                <div className="-item-icon">{ICONS.personalData()}</div> Personal data
              </div>
              <div
                className={clsx("profile__list-item", {
                  ["active"]: activeMenu === 1 && !isLittleWidth,
                })}
                onClick={() => {
                  setActiveMenu(1);
                  isLittleWidth ? setActiveMenuMobile(true) : setActiveMenuMobile(false);
                }}
              >
                <div className="profile__list-item-icon">{ICONS.security()}</div> Security
              </div>
              <div
                className={clsx("profile__list-item", {
                  ["active"]: activeMenu === 2 && !isLittleWidth,
                })}
                onClick={() => {
                  setActiveMenu(2);
                  isLittleWidth ? setActiveMenuMobile(true) : setActiveMenuMobile(false);
                }}
              >
                <div className="profile__list-item-icon">{ICONS.paymentData()}</div> Payment data
              </div>
            </div>
          </div>
          <div className="profile__right">
            <img src={PersonalDataPhoto} alt="photo" />
            <div className="profile__right-title">
              {!activeMenuMobile && isLittleWidth
                ? "Account management"
                : activeMenu === 0
                  ? "Personal data"
                  : activeMenu === 1
                    ? "Security"
                    : "Payment data"}
            </div>
            {activeMenuMobile && isLittleWidth ? (
              ICONS.arrowLeft2({ onClick: () => setActiveMenuMobile(false) })
            ) : isLittleWidth ? (
              <div
                className={clsx("personal", {
                  ["little"]: isLittleWidth,
                })}
              >
                <div
                  className="personal__left"
                  style={isLittleWidth && activeMenuMobile ? { display: "none" } : {}}
                >
                  <div
                    className="personal__card"
                    style={isLittleWidth ? { marginInline: "20px" } : {}}
                  >
                    <div className="personal__card-info-main">
                      <Avatar />
                      <div className="personal__card__name">
                        {user?.firstName || user?.surname
                          ? `${user?.firstName} ${user?.surname}`
                          : "User"}
                      </div>
                      <div className="personal__card__status">Guest</div>
                    </div>
                    <div className="personal__card__data">
                      <div className="personal__card__list">
                        <div className="personal__card__list-item">
                          <div className="personal__card__list-item-text">
                            Comments <span>0</span>
                          </div>
                        </div>
                        <div className="personal__card__list-item">
                          <div className="personal__card__list-item-text">
                            Active renting <span>0</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}

            <div style={activeMenu === 0 ? { display: "block" } : { display: "none" }}>
              <PersonalData isLittleWidth={isLittleWidth} activeMenuMobile={activeMenuMobile} />
            </div>

            <div style={activeMenu === 1 ? { display: "block" } : { display: "none" }}>
              <Security isLittleWidth={isLittleWidth} activeMenuMobile={activeMenuMobile} />
            </div>
            <div style={activeMenu === 2 ? { display: "block" } : { display: "none" }}>
              <Payment isLittleWidth={isLittleWidth} activeMenuMobile={activeMenuMobile} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
