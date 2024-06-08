import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { UserContext, WhereContext } from "@/context";

import { LINKS } from "@/config/pages-url.config";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { dropdownMenuClick } from "./helpers/dropdownMenuClick";

import "../../pages/Home/components/Support/Support.scss";
import "../../pages/Profile/components/PersonalData/PersonalData.scss";
import "../../pages/Search/Search.scss";
import "../../pages/SignIn/SignIn.scss";

const Header = React.lazy(() => import("../Header/Header"));
const Footer = React.lazy(() => import("../Footer/Footer"));

export const Layout: React.FC = () => {
  const location = useLocation();

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <GoogleOAuthProvider clientId="200263048027-f4cjlbktjt9ih63pd05rnlov269kit5v.apps.googleusercontent.com">
      <QueryClientProvider client={queryClient}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <UserContext>
            <WhereContext>
              <div className="wrapper" id="wrapper" onClick={dropdownMenuClick}>
                {location.pathname !== LINKS.SIGNIN &&
                  location.pathname !== LINKS.SIGNUP &&
                  location.pathname !== LINKS.RENTING && <Header />}
                <main>
                  <Outlet />
                </main>
                {location.pathname !== LINKS.SIGNIN &&
                  location.pathname !== LINKS.SIGNUP &&
                  location.pathname !== LINKS.RENTING && <Footer />}
              </div>
            </WhereContext>
          </UserContext>
        </LocalizationProvider>
        <ToastContainer />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
};
