import { motion, useScroll, useTransform } from "framer-motion";
import { Heart } from "lucide-react";
import { useRef } from "react";
import { EditableText } from "@/lib/personalize";
import { site } from "@/content/site";
import finaleSunset from "@/assets/finale-sunset.jpg";

/** Forever Yours: the dreamy pink sunset closing. */
export function Finale() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-12%", "0%"]);
  const glow = useTransform(scrollYProgress, [0, 0.6], [0.2, 1]);

  return (
    <section ref={ref} id="finale" className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-32">
      <motion.img
        src={finaleSunset}
        alt=""
        aria-hidden
        style={{ y: bgY }}
        className="absolute inset-0 h-[124%] w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-transparent to-[oklch(0.295_0.055_357/0.45)]" />

      {/* twinkling particles */}
      {Array.from({ length: 18 }, (_, i) => (
        <span
          key={i}
          className="animate-twinkle absolute h-1.5 w-1.5 rounded-full bg-cream/90"
          style={{
            left: `${(i * 53) % 96 + 2}%`,
            top: `${(i * 37) % 88 + 4}%`,
            animationDelay: `${(i % 6) * 0.55}s`,
            boxShadow: "0 0 8px 2px oklch(0.94 0.03 345 / 0.8)",
          }}
          aria-hidden
        />
      ))}

      <motion.div style={{ opacity: glow }} className="relative z-10 mx-auto max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-cream/15 backdrop-blur-sm"
        >
          <Heart className="animate-heartbeat h-8 w-8 fill-cream text-cream" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.15 }}
          className="font-serif text-4xl font-semibold leading-tight text-cream drop-shadow-[0_2px_18px_oklch(0.362_0.083_357/0.5)] sm:text-5xl md:text-6xl"
        >
          <EditableText id="finale-heading" fallback={site.finale.heading} />
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-6 text-base font-light leading-relaxed text-cream/90 sm:text-lg"
        >
          <EditableText id="finale-sub" fallback={site.finale.sub} />
        </motion.p>

        <motion.p
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.1, delay: 0.75 }}
          className="mt-12 font-script text-5xl text-cream drop-shadow-[0_2px_16px_oklch(0.362_0.083_357/0.6)] sm:text-6xl"
        >
          <EditableText id="finale-sign" fallback={site.finale.sign} />
          <Heart className="ml-2 inline h-6 w-6 fill-rose text-rose align-middle" />
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1.1 }}
          className="mt-14 text-[10px] font-light uppercase tracking-[0.4em] text-cream/60"
        >
          <EditableText id="finale-footer" fallback={site.finale.footer} />
        </motion.p>
      </motion.div>
    </section>
  );
}
