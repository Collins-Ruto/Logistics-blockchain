
import React from 'react';
import PublicNav from '../components/Pnav';
import HeroCarousel from '../components/carousel';
import PubAccordion from './Accordion';
import Pubgrid from './Pgrid';
import { Footer } from '../components/Footer';

export default function Public() {
  return (
    <div>
        <PublicNav />
        <HeroCarousel />
        <br/>
        <Pubgrid />
        <br/>
        <PubAccordion />
        <Footer />
    </div>
  )
}
