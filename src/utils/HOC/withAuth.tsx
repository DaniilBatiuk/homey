import { useContext, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { LINKS } from "@/config/pages-url.config";

import { userContext } from "../context/UserContext";
import { getRefreshToken } from "../services/auth.token.service";

export const withAuth =
  (Component: React.ComponentType): React.FC =>
  props => {
    const user = useContext(userContext);
    const navigate = useNavigate();

    useLayoutEffect(() => {
      if (getRefreshToken()) {
        navigate(LINKS.HOME, { replace: true });
        toast.error("You are already signed in");
      }
    }, []);

    if (!user) {
      return <Component {...props} />;
    }
  };
