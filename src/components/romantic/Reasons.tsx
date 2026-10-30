import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useState } from "react";
import { EditableText } from "@/lib/personalize";
import { site } from "@/content/site";

function ReasonCard({ index }: { index: number }) {
  const [flipped, setFlipped] = useState(false);
  const reason = site.reasons.items[index];
  const displayReason =
    index === 9 ? "The way you call me Buna, hayeee." : reason;

  return (
    <motion.button
      type="button"
      onClick={() => setFlipped((f) => !f)}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: (index % 8) * 0.06 }}
      whileHover={{ y: -4 }}
      className="h-40 w-full [perspective:900px]"
      aria-label={`Reason number ${index + 1}`}
    >
      <motion.div
        className="relative h-full w-full [transform-style:preserve-3d]"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* front */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-blush to-rose shadow-soft [backface-visibility:hidden]">
          <span className="font-serif text-3xl font-semibold text-burgundy">
            {String(index + 1).padStart(2, "0")}
          </span>
          <Heart className="h-4 w-4 fill-rosedeep text-rosedeep" />
          <span className="text-[9px] font-light tracking-[0.3em] text-burgundy/60">TAP ME</span>
        </div>
        {/* back */}
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-card p-4 shadow-soft [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <p className="text-center font-serif text-[15px] italic leading-snug text-burgundy">
            <EditableText id={`reason-${index}`} fallback={displayReason} multiline />
          </p>
        </div>
      </motion.div>
    </motion.button>
  );
}

/** 22 Reasons Why I Love You: flip cards. */
export function Reasons() {
  return (
    <section id="reasons" className="relative overflow-hidden px-6 py-28">
      <div className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-rose/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-1/4 h-72 w-72 rounded-full bg-blush/60 blur-3xl" />

      <div className="relative mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9 }}
          className="text-center"
        >
          <p className="text-xs font-light uppercase tracking-[0.4em] text-dusty">22 reasons, endlessly felt</p>
          <h2 className="mt-4 font-serif text-4xl font-semibold text-burgundy sm:text-5xl">
            <EditableText id="reasons-heading" fallback={site.reasons.heading} />
          </h2>
        </motion.div>

        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
          {site.reasons.items.map((_, i) => (
            <ReasonCard key={i} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
