import { motion } from "framer-motion";
import { Pause, Play, Music } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const ENTER_EVENT = "puja:enter";

/** Floating play/pause control for the soft instrumental theme. */
export function MusicControl() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const audio = new Audio("/audio/romantic-theme.mp3");
    audio.loop = true;
    audio.volume = 0.45;
    audioRef.current = audio;

    const tryPlay = () => {
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => {
          // browser wants an explicit tap, and the button is right there
        });
    };

    // music starts once she opens the surprise (a real user interaction)
    window.addEventListener(ENTER_EVENT, tryPlay, { once: true });
    // fallback: first tap anywhere
    window.addEventListener("pointerdown", tryPlay, { once: true });
    setVisible(true);

    return () => {
      window.removeEventListener(ENTER_EVENT, tryPlay);
      window.removeEventListener("pointerdown", tryPlay);
      audio.pause();
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => undefined);
    }
  };

  return (
    <motion.button
      type="button"
      onClick={toggle}
      initial={{ opacity: 0, y: 24 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 1.2, duration: 0.6 }}
      aria-label={playing ? "Pause the music" : "Play the music"}
      className="glass fixed bottom-5 right-5 z-[90] flex h-12 w-12 items-center justify-center rounded-full text-burgundy shadow-petal transition-transform hover:scale-105 active:scale-95"
    >
      {playing ? (
        <span className="relative flex items-center justify-center">
          <Music className="h-5 w-5" />
          <span className="animate-glow-pulse absolute -inset-1.5 rounded-full bg-rose/30" />
        </span>
      ) : (
        <Play className="h-5 w-5" />
      )}
      {playing && <Pause className="hidden" />}
      {playing ? (
        <span className="sr-only">Pause</span>
      ) : (
        <span className="sr-only">Play</span>
      )}
      {!playing && <Pause className="sr-only" />}
    </motion.button>
  );
}
