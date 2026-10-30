import { AnimatePresence, motion } from "framer-motion";
import { Flame } from "lucide-react";
import { useMemo, useState } from "react";
import confetti from "canvas-confetti";
import { EditableText } from "@/lib/personalize";
import { site } from "@/content/site";

const CANDLES = site.age; // 22

/** Birthday cake with 22 candles she can blow out. */
export function CakeSection() {
  const [blown, setBlown] = useState(false);

  const heartConfetti = useMemo(() => {
    const heart = confetti.shapeFromText({ text: "❤", scalar: 2.4 });
    const petal = confetti.shapeFromText({ text: "❀", scalar: 1.8 });
    return { heart, petal };
  }, []);

  const blow = () => {
    setBlown(true);
    const fire = (particleRatio: number, opts: confetti.Options) => {
      confetti({
        origin: { y: 0.6 },
        colors: ["#F8BBD0", "#E8A1B5", "#C75B7A", "#FCE4EC", "#702D45"],
        shapes: [heartConfetti.heart, heartConfetti.petal],
        scalar: 1.6,
        ticks: 220,
        gravity: 0.7,
        decay: 0.93,
        spread: 100,
        ...opts,
        particleCount: Math.floor(240 * particleRatio),
      });
    };
    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 2 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  };

  return (
    <section id="cake" className="relative overflow-hidden px-6 py-28">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose/25 blur-3xl" />

      <div className="relative mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9 }}
        >
          <p className="text-xs font-light uppercase tracking-[0.4em] text-dusty">Time to celebrate</p>
          <h2 className="mt-4 font-serif text-4xl font-semibold text-burgundy sm:text-5xl">
            <EditableText id="cake-heading" fallback={site.cake.heading} />
          </h2>
        </motion.div>

        {/* cake */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mt-16 w-full max-w-md"
        >
          {/* candles */}
          <div className="flex flex-wrap items-end justify-center gap-x-[7px] gap-y-2 px-4">
            {Array.from({ length: CANDLES }, (_, i) => (
              <div key={i} className="relative flex flex-col items-center">
                <motion.div
                  className="relative"
                  animate={blown ? { scale: 0, opacity: 0, y: -6 } : { scale: 1, opacity: 1, y: 0 }}
                  transition={{ delay: blown ? i * 0.055 : 0, duration: 0.35 }}
                  style={{ transformOrigin: "bottom center" }}
                >
                  <span
                    className="animate-flame block h-3.5 w-2 rounded-full bg-gradient-to-t from-rosedeep via-goldglow to-cream"
                    style={{ animationDelay: `${(i % 5) * 0.13}s`, boxShadow: "0 0 10px 2px oklch(0.83 0.12 85 / 0.65)" }}
                  />
                  {blown && (
                    <motion.span
                      initial={{ opacity: 0.7, scale: 0.4, y: 0 }}
                      animate={{ opacity: 0, scale: 1.6, y: -14 }}
                      transition={{ delay: i * 0.055, duration: 0.9 }}
                      className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-muted-foreground/40 blur-[2px]"
                    />
                  )}
                </motion.div>
                <span
                  className="block h-7 w-[7px] rounded-[3px]"
                  style={{
                    background: "repeating-linear-gradient(45deg, oklch(0.995 0.003 20) 0 3px, oklch(0.879 0.057 350) 3px 6px)",
                    boxShadow: "inset 0 -2px 3px oklch(0.362 0.083 357 / 0.15)",
                  }}
                />
              </div>
            ))}
          </div>

          {/* tiers */}
          <div className="relative mx-auto mt-1 w-full max-w-md">
            <div className="relative mx-auto h-16 w-64 rounded-t-xl rounded-b-md bg-gradient-to-b from-blush to-rose shadow-soft">
              <div
                className="absolute inset-x-0 top-0 h-4"
                style={{ background: "radial-gradient(circle 8px at 8px 0, oklch(0.944 0.026 345) 96%, transparent 100%)", backgroundSize: "16px 16px", backgroundRepeat: "repeat-x" }}
              />
            </div>
            <div className="relative mx-auto -mt-1 h-20 w-80 max-w-full rounded-t-xl rounded-b-md bg-gradient-to-b from-rose to-dusty shadow-soft">
              <div
                className="absolute inset-x-0 top-0 h-5"
                style={{ background: "radial-gradient(circle 10px at 10px 0, oklch(0.879 0.057 350) 96%, transparent 100%)", backgroundSize: "20px 20px", backgroundRepeat: "repeat-x" }}
              />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-script text-3xl text-cream drop-shadow-sm">
                <EditableText id="cake-label" fallback="Happy 22nd, My Sweetheart" />
              </div>
            </div>
            <div className="relative mx-auto -mt-1 h-24 w-[22rem] max-w-full rounded-t-xl rounded-b-lg bg-gradient-to-b from-dusty to-rosedeep shadow-petal">
              <div
                className="absolute inset-x-0 top-0 h-6"
                style={{ background: "radial-gradient(circle 12px at 12px 0, oklch(0.796 0.078 356) 96%, transparent 100%)", backgroundSize: "24px 24px", backgroundRepeat: "repeat-x" }}
              />
              <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 text-cream">
                <Flame className="h-4 w-4" />
                <span className="font-serif text-lg italic">for My Sweetheart</span>
              </div>
            </div>
            {/* plate */}
            <div className="mx-auto -mt-1 h-4 w-[26rem] max-w-full rounded-[50%] bg-card shadow-soft" />
          </div>
        </motion.div>

        {/* interaction */}
        <div className="mt-14">
          <AnimatePresence mode="wait">
            {!blown ? (
              <motion.button
                key="blow"
                type="button"
                onClick={blow}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                exit={{ opacity: 0, y: -14, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="rounded-full bg-gradient-to-r from-dusty to-rosedeep px-9 py-4 text-base font-medium tracking-wide text-cream shadow-petal transition-transform hover:scale-[1.04] active:scale-95"
              >
                <EditableText id="cake-button" fallback={site.cake.button} />
              </motion.button>
            ) : (
              <motion.div
                key="wish"
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.9, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="mx-auto max-w-xl"
              >
                <div className="glass rounded-3xl px-8 py-8">
                  <p className="font-serif text-xl italic leading-relaxed text-burgundy sm:text-2xl">
                    <EditableText id="cake-message" fallback={site.cake.message} multiline />
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setBlown(false)}
                  className="mt-6 text-xs font-light tracking-[0.3em] text-dusty underline-offset-4 transition-colors hover:text-rosedeep hover:underline"
                >
                  <EditableText id="cake-relight" fallback={site.cake.relight} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
