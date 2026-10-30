import { AnimatePresence, motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Trail = { id: number; x: number; y: number; size: number; tilt: number };

/** A trail of tiny hearts that follows the cursor on desktop. */
export function HeartCursor() {
  const [trail, setTrail] = useState<Trail[]>([]);
  const idRef = useRef(0);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    let last = 0;
    let raf = 0;
    const pending: { x: number; y: number }[] = [];

    const onMove = (e: MouseEvent) => {
      pending.push({ x: e.clientX, y: e.clientY });
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const now = performance.now();
        for (const p of pending.splice(0)) {
          if (now - last < 70) continue;
          last = now;
          const id = ++idRef.current;
          setTrail((cur) => [
            ...cur.slice(-14),
            { id, x: p.x + (Math.random() - 0.5) * 10, y: p.y - 6, size: 9 + Math.random() * 8, tilt: (Math.random() - 0.5) * 40 },
          ]);
        }
      });
    };

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // prune old hearts
  useEffect(() => {
    if (!trail.length) return;
    const t = setTimeout(() => setTrail((cur) => cur.slice(1)), 900);
    return () => clearTimeout(t);
  }, [trail]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[95] hidden md:block" aria-hidden>
      <AnimatePresence>
        {trail.map((h) => (
          <motion.div
            key={h.id}
            className="absolute"
            style={{ left: h.x, top: h.y }}
            initial={{ opacity: 0.9, scale: 0.4, y: 0 }}
            animate={{ opacity: 0, scale: 1.15, y: -46, rotate: h.tilt }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <Heart
              className="fill-rose text-rose"
              style={{ width: h.size, height: h.size, filter: "drop-shadow(0 0 6px oklch(0.879 0.057 350 / 0.6))" }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
