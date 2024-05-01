import React, { useContext, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Footer, Header } from "@/components";

import { LINKS } from "@/config/pages-url.config";

import { userContext } from "../context/UserContext";
import { getRefreshToken } from "../services/auth.token.service";

const Home = React.lazy(() => import("../../pages/Home/Home"));

export const withAuth =
  (Component: React.ComponentType): React.FC =>
  props => {
    const user = useContext(userContext);
    const navigate = useNavigate();

    useLayoutEffect(() => {
      if (getRefreshToken()) {
        navigate(LINKS.HOME);
        toast.error("You are already signed in");
      }
    }, []);

    if (!user) {
      return <Component {...props} />;
    } else {
      return (
        <>
          <Header />
          <Home />
          <Footer />
        </>
      );
    }
  };
