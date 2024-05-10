import { Suspense } from "react";
import { BrowserRouter, Routes as ReactRoutes, Route } from "react-router-dom";

import { Layout } from "@/components";

import { CircularProgress } from "@mui/material";

import {
  About,
  Bookings,
  Discounts,
  Home,
  HouseDetail,
  Loyalty,
  MyHouses,
  NotFound,
  Profile,
  Renting,
  Saved,
  Search,
  SignIn,
  SignUp,
} from "./pages";

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
