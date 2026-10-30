import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";

import { CakeSection } from "@/components/romantic/CakeSection";
import { Finale } from "@/components/romantic/Finale";
import { FloatingPetals } from "@/components/romantic/FloatingPetals";
import { Gallery } from "@/components/romantic/Gallery";
import { HeartfeltExtras } from "@/components/romantic/HeartfeltExtras";
import { HeartCursor } from "@/components/romantic/HeartCursor";
import { Hero } from "@/components/romantic/Hero";
import { Letter } from "@/components/romantic/Letter";
import { LoveStory } from "@/components/romantic/LoveStory";
import { MusicControl } from "@/components/romantic/MusicControl";
import { OpeningScreen } from "@/components/romantic/OpeningScreen";
import { Preloader } from "@/components/romantic/Preloader";
import { Reasons } from "@/components/romantic/Reasons";
import { PersonalizeProvider } from "@/lib/personalize";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [entered, setEntered] = useState(false);

  return (
    <PersonalizeProvider>
      <Preloader />
      <AnimatePresence mode="wait">
        {!entered && <OpeningScreen onEnter={() => setEntered(true)} />}
      </AnimatePresence>

      <main>
        <FloatingPetals />
        <HeartCursor />
        <MusicControl />
        <Hero />
        <LoveStory />
        <Letter />
        <HeartfeltExtras />
        <Reasons />
        <Gallery />
        <CakeSection />
        <Finale />
      </main>
    </PersonalizeProvider>
  );
}
