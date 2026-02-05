"use client";

import { useEffect } from "react";
import { Navigation } from "./components/Navigation";
import { HeroPanel } from "./components/HeroPanel";
import { AboutPanel } from "./components/AboutPanel";
import { ServicesPanel } from "./components/ServicesPanel";
import { WorkPanel } from "./components/WorkPanel";
import { ContactPanel } from "./components/ContactPanel";
import { useCustomCursor } from "../lib/hooks/useCustomCursor";
import { CMSProvider } from "../lib/cms/CMSContext";

export default function Home() {
  useCustomCursor();

  return (
    <CMSProvider>
      <main className="min-h-screen bg-[#0A0A0A]">
        <Navigation />
        <HeroPanel />
        <AboutPanel />
        <ServicesPanel />
        <WorkPanel />
        <ContactPanel />
      </main>
    </CMSProvider>
  );
}
