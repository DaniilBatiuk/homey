import clsx from "clsx";

import "./Preferences.scss";

type PreferencesProp = {
  isLittleWidth: boolean;
  activeMenuMobile: boolean;
};
export const Preferences: React.FC<PreferencesProp> = ({
  isLittleWidth,
  activeMenuMobile,
}: PreferencesProp) => {
  return (
    <div
      className={clsx("preferences", {
        ["little"]: isLittleWidth,
      })}
      style={!isLittleWidth ? {} : activeMenuMobile ? {} : { display: "none" }}
    >
      <h1 className="preferences__title">
        Change your language, currency and accessibility requirements
      </h1>
      <div
        className="preference__content"
        style={!isLittleWidth ? {} : { marginBottom: "0px" }}
      ></div>
    </div>
  );
};
