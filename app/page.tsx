"use client";

import { useEffect } from "react";
import { Navigation } from "./components/Navigation";
import { HeroPanel } from "./components/HeroPanel";
import { AboutPanel } from "./components/AboutPanel";
import { ServicesPanel } from "./components/ServicesPanel";
import { WorkPanel } from "./components/WorkPanel";
import MyWorksPanel from "./components/MyWorksPanel";
import { ContactPanel } from "./components/ContactPanel";
import { useCustomCursor } from "../lib/hooks/useCustomCursor";

export default function Home() {
  useCustomCursor();

  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      <Navigation />
      <HeroPanel />
      <AboutPanel />
      <ServicesPanel />
      <WorkPanel />
      <MyWorksPanel />
      <ContactPanel />
    </main>
  );
}
