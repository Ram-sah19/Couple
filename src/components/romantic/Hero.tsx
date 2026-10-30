import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Heart } from "lucide-react";
import { useRef } from "react";
import { EditableText, PhotoSlot } from "@/lib/personalize";
import { site } from "@/content/site";
import heroFloral from "@/assets/hero-floral.jpg";
import floralCorner from "@/assets/floral-corner.png";

/** Hero: the birthday girl's moment. */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const frameY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} id="hero" className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24">
      {/* floral backdrop with parallax */}
      <motion.img
        src={heroFloral}
        alt=""
        aria-hidden
        style={{ y: bgY }}
        className="absolute inset-0 h-[120%] w-full object-cover object-top"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-cream/10 via-cream/55 to-cream" />

      {/* floating heart particles */}
      {[
        { l: "8%", t: "22%", d: 0, s: 20 },
        { l: "16%", t: "64%", d: 1.4, s: 14 },
        { l: "86%", t: "18%", d: 0.7, s: 22 },
        { l: "78%", t: "58%", d: 2.1, s: 15 },
        { l: "50%", t: "12%", d: 2.8, s: 13 },
      ].map((p, i) => (
        <motion.span
          key={i}
          className="animate-floaty absolute z-[1]"
          style={{ left: p.l, top: p.t, animationDelay: `${p.d}s` }}
          aria-hidden
        >
          <Heart className="fill-rose text-rose drop-shadow-[0_0_10px_oklch(0.879_0.057_350/0.6)]" style={{ width: p.s, height: p.s }} />
        </motion.span>
      ))}

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9 }}
          className="glass-rose rounded-full px-5 py-2 text-xs font-light tracking-[0.35em] text-burgundy"
        >
          <EditableText id="hero-eyebrow" fallback={site.hero.eyebrow} />
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 1 }}
          className="mt-7 font-serif text-5xl font-semibold leading-[1.08] text-burgundy sm:text-6xl md:text-7xl"
        >
          <EditableText id="hero-heading" fallback={site.hero.heading} />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 1 }}
          className="mt-6 max-w-xl text-base font-light leading-relaxed text-muted-foreground sm:text-lg"
        >
          <EditableText id="hero-sub" fallback={site.hero.sub} />
        </motion.p>

        {/* the photograph */}
        <motion.div style={{ y: frameY }} className="relative mt-12">
          <motion.div
            initial={{ opacity: 0, y: 40, rotate: -2 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ delay: 1.1, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="rounded-t-[999px] rounded-b-3xl bg-card p-3 pb-14 shadow-petal">
              <PhotoSlot
                id="hero-photo"
                defaultSrc="/images/WhatsApp Image 2026-02-01 at 11.30.53 PM.jpeg"
                eager
                className="h-[300px] w-[230px] rounded-t-[999px] rounded-b-2xl sm:h-[380px] sm:w-[290px]"
                alt="Puja"
                fallback={
                  <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-b from-blush to-rose">
                    <span className="font-script text-6xl text-burgundy/70">P</span>
                    <Heart className="h-5 w-5 fill-rosedeep text-rosedeep" />
                    <span className="px-6 text-center text-[11px] font-light tracking-wide text-burgundy/70">
                      <EditableText id="hero-photo-hint" fallback={site.hero.photoHint} />
                    </span>
                  </div>
                }
              />
              <p className="absolute bottom-4 left-0 right-0 font-script text-2xl text-burgundy/80">
                <EditableText id="hero-frame-label" fallback="my puja" />
              </p>
            </div>
            <img
              src={floralCorner}
              alt=""
              aria-hidden
              className="pointer-events-none absolute -right-14 -top-12 w-32 rotate-12 sm:w-40"
            />
            <img
              src={floralCorner}
              alt=""
              aria-hidden
              className="pointer-events-none absolute -bottom-10 -left-14 w-32 -rotate-[100deg] sm:w-40"
            />
          </motion.div>
        </motion.div>

        {/* scroll indicator */}
        <motion.a
          href="#story"
          style={{ opacity: fade }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mt-14 flex flex-col items-center gap-2 text-burgundy/70 transition-colors hover:text-burgundy"
          aria-label="Scroll to our story"
        >
          <span className="text-[11px] font-light tracking-[0.4em]">SCROLL</span>
          <motion.span animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
            <ChevronDown className="h-5 w-5" />
          </motion.span>
        </motion.a>
      </div>
    </section>
  );
}
