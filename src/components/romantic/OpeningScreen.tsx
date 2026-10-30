import { motion } from "framer-motion";
import { Heart, MailOpen } from "lucide-react";
import { EditableText } from "@/lib/personalize";
import { site } from "@/content/site";
import heroFloral from "@/assets/hero-floral.jpg";

export const ENTER_EVENT = "puja:enter";

/** Full screen cinematic opening: the surprise gate. */
export function OpeningScreen({ onEnter }: { onEnter: () => void }) {
  const handleEnter = () => {
    window.dispatchEvent(new Event(ENTER_EVENT));
    onEnter();
  };

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.08, filter: "blur(6px)" }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* rose garden backdrop */}
      <motion.img
        src={heroFloral}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        initial={{ scale: 1.15 }}
        animate={{ scale: 1.02 }}
        transition={{ duration: 8, ease: "easeOut" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-blush/70 via-cream/40 to-blush/70" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,oklch(0.944_0.026_345/0.5)_100%)]" />

      <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="text-sm font-light uppercase tracking-[0.35em] text-burgundy/80"
        >
          <EditableText id="opening-line1" fallback={site.opening.line1} />
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.7, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 font-serif text-5xl font-semibold leading-tight text-burgundy sm:text-6xl md:text-7xl"
        >
          <EditableText id="opening-line2" fallback={site.opening.line2} />
          <motion.span
            className="ml-2 inline-block align-middle"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut", delay: 3 }}
            initial={{ opacity: 0 }}
          >
            <Heart className="h-9 w-9 fill-rosedeep text-rosedeep drop-shadow-[0_0_14px_oklch(0.879_0.057_350/0.8)]" />
          </motion.span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 0.9 }}
          className="mt-12"
        >
          <button
            type="button"
            onClick={handleEnter}
            className="group relative inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-dusty to-rosedeep px-9 py-4 text-base font-medium tracking-wide text-cream shadow-petal transition-transform duration-300 hover:scale-[1.04] active:scale-95"
          >
            <MailOpen className="h-5 w-5 transition-transform duration-300 group-hover:-rotate-12" />
            <span>
              <EditableText id="opening-button" fallback={site.opening.button} />
            </span>
            <span className="absolute -inset-2 -z-10 rounded-full bg-rose/40 opacity-60 blur-xl transition-opacity group-hover:opacity-90" />
          </button>
          <p className="mt-5 text-xs font-light tracking-[0.25em] text-burgundy/60">
            SOMETHING IS WAITING FOR YOU INSIDE
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
