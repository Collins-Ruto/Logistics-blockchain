import React from "react";
import { Footer } from "../components/Footer";
import DonorsNav from "../components/Navigation";
import HeroCarousel from "../components/carousel";

export default function donors() {
  return (
    <>
      <DonorsNav />
      <HeroCarousel />
      <Footer />
    </>
  );
}