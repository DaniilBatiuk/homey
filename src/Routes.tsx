import React, { Suspense } from "react";
import { BrowserRouter, Routes as ReactRoutes, Route } from "react-router-dom";

import { Layout } from "@/components";

import { CircularProgress } from "@mui/material";

import { Profile } from "./pages";

const SignUp = React.lazy(() => import("./pages/SignUp/SignUp"));
const SignIn = React.lazy(() => import("./pages/SignIn/SignIn"));
const Search = React.lazy(() => import("./pages/Search/Search"));
const Saved = React.lazy(() => import("./pages/Saved/Saved"));
const Renting = React.lazy(() => import("./pages/Renting/Renting"));
const Loyalty = React.lazy(() => import("./pages/Loyalty/Loyalty"));
const HouseDetail = React.lazy(() => import("./pages/HouseDetail/HouseDetail"));
const Home = React.lazy(() => import("./pages/Home/Home"));
const Discounts = React.lazy(() => import("./pages/Discounts/Discounts"));
const Bookings = React.lazy(() => import("./pages/Bookings/Bookings"));
const About = React.lazy(() => import("./pages/About/About"));
const MyHouses = React.lazy(() => import("./pages/MyHouses/MyHouses"));
const NotFound = React.lazy(() => import("./pages/NotFound/NotFound"));

export function Routes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<CircularProgress />}>
        <ReactRoutes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="Profile" element={<Profile />} />
            <Route path="About" element={<About />} />
            <Route path="SignIn" element={<SignIn />} />
            <Route path="SignUp" element={<SignUp />} />
            <Route path="Discounts" element={<Discounts />} />
            <Route path="Bookings" element={<Bookings />} />
            <Route path="Saved" element={<Saved />} />
            <Route path="Loyalty" element={<Loyalty />} />
            <Route path="Search" element={<Search />} />
            <Route path="Renting" element={<Renting />} />
            <Route path="MyRents" element={<MyHouses />} />
            <Route path="house/:id" element={<HouseDetail />} />
            <Route path="/InProgress" element={<NotFound type="In progress" />} />
            <Route path="/*" element={<NotFound type="Not found" />} />
          </Route>
        </ReactRoutes>
      </Suspense>
    </BrowserRouter>
  );
}
