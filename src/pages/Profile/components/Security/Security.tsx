import clsx from "clsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { removeFromStorage, userService } from "@/services";

import { LINKS } from "@/config/pages-url.config";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import "./Security.scss";
import { ChangePassword } from "./components/ChangePassword/ChangePassword";

type SecurityProp = {
  isLittleWidth: boolean;
  activeMenuMobile: boolean;
};
export const Security: React.FC<SecurityProp> = ({
  isLittleWidth,
  activeMenuMobile,
}: SecurityProp) => {
  const [activeModal, setActiveModal] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: () => userService.deleteUser(),
    onSuccess() {
      toast.success("changes was saved successfully.");
      navigate(LINKS.HOME);
      queryClient.refetchQueries({
        queryKey: ["user"],
        type: "active",
        exact: true,
      });
      removeFromStorage();
    },
    onError() {
      toast.error("Something went wrong!");
    },
  });

  return (
    <div
      className={clsx("security", {
        ["little"]: isLittleWidth,
      })}
      style={!isLittleWidth ? {} : activeMenuMobile ? {} : { display: "none" }}
    >
      <h1 className="security__title">Change your security settings or delete your account</h1>
      <div className="security__list" style={!isLittleWidth ? {} : { marginBottom: "0px" }}>
        <div className="security__list-item">
          <div className="security__list-item-text">
            <div className="security__list-item-title">Password</div>
            <div className="security__list-item-subtitle">
              To change your password, you will need write current and new password.
            </div>
          </div>
          <button onClick={() => setActiveModal(true)}>Change password</button>
        </div>
        <div className="security__list-item">
          <div className="security__list-item-text">
            <div className="security__list-item-title">Account deletion</div>
            <div className="security__list-item-subtitle">
              Delete your Homey.com account permanently.
            </div>
          </div>
          <button onClick={() => mutate()}>Delete account</button>
        </div>
      </div>
      <ChangePassword activeModal={activeModal} setActiveModal={setActiveModal} />
    </div>
  );
};
