import { AnimatePresence, motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useState } from "react";
import { EditableText } from "@/lib/personalize";
import { site } from "@/content/site";
import letterPaper from "@/assets/letter-paper.jpg";
import floralCorner from "@/assets/floral-corner.png";

/** A Letter From My Heart: interactive envelope. */
export function Letter() {
  const [open, setOpen] = useState(false);

  return (
    <section id="letter" className="relative overflow-hidden bg-gradient-to-b from-cream via-blush/60 to-cream px-6 py-28">
      <div className="mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9 }}
        >
          <p className="text-xs font-light uppercase tracking-[0.4em] text-dusty">Something to read slowly</p>
          <h2 className="mt-4 font-serif text-4xl font-semibold text-burgundy sm:text-5xl">
            <EditableText id="letter-heading" fallback={site.letter.heading} />
          </h2>
        </motion.div>

        {/* envelope */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1, delay: 0.15 }}
          className="relative mx-auto mt-16"
          style={{ perspective: 1200 }}
        >
          <div className={`relative mx-auto w-full max-w-md transition-all duration-700 ${open ? "h-24 scale-75 opacity-90" : "h-64"}`}>
            {/* envelope body */}
            <div className="absolute inset-x-0 bottom-0 top-10 overflow-hidden rounded-2xl bg-gradient-to-br from-rose to-dusty shadow-petal">
              {/* inner shading */}
              <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_49.5%,oklch(0.796_0.078_356/0.55)_49.5%,transparent_60%),linear-gradient(245deg,transparent_49.5%,oklch(0.796_0.078_356/0.55)_49.5%,transparent_60%)]" />
            </div>
            {/* letter peeking */}
            <motion.div
              className="absolute inset-x-8 top-0 rounded-lg bg-cream shadow-soft"
              animate={{ y: open ? -110 : 40, opacity: open ? 0 : 1 }}
              transition={{ delay: open ? 0.45 : 0, duration: 0.7, ease: "easeInOut" }}
              style={{ height: "70%" }}
            />
            {/* flap */}
            <motion.div
              className="absolute inset-x-0 top-0 z-20 h-40 origin-top rounded-t-2xl bg-gradient-to-b from-blush to-rose"
              style={{
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                backfaceVisibility: "hidden",
                boxShadow: "0 6px 18px oklch(0.362 0.083 357 / 0.15)",
              }}
              animate={{ rotateX: open ? -175 : 0 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
            >
              <div className="absolute left-1/2 top-[52%] -translate-x-1/2">
                <motion.div
                  animate={open ? { opacity: 0 } : { opacity: 1 }}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-rosedeep shadow-petal"
                >
                  <Heart className="h-5 w-5 fill-cream text-cream" />
                </motion.div>
              </div>
            </motion.div>
            {/* seal label */}
            <AnimatePresence>
              {!open && (
                <motion.p
                  exit={{ opacity: 0 }}
                  className="absolute -bottom-9 left-0 right-0 text-xs font-light tracking-[0.3em] text-burgundy/70"
                >
                  <EditableText id="letter-seal" fallback={site.letter.seal} />
                </motion.p>
              )}
            </AnimatePresence>
            {/* click surface */}
            {!open && (
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="absolute inset-x-0 top-0 z-30 h-64 cursor-pointer rounded-2xl"
                aria-label="Open the letter"
              />
            )}
          </div>
        </motion.div>

        {/* the letter */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 80, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ delay: 0.9, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="relative mx-auto mt-6 max-w-xl"
            >
              <img src={floralCorner} alt="" aria-hidden className="pointer-events-none absolute -right-10 -top-10 z-10 w-28 opacity-90" />
              <div
                className="relative rounded-xl p-8 shadow-petal sm:p-12"
                style={{
                  backgroundImage: `url(${letterPaper})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="font-serif italic leading-loose text-burgundy">
                  <EditableText id="letter-body" fallback={site.letter.body} multiline />
                  <p className="mt-8 text-right font-script text-3xl not-italic text-rosedeep">
                    <EditableText id="letter-signature" fallback={site.letter.signature} />
                  </p>
                  <p className="mt-1 text-right text-lg text-rosedeep">
                    <Heart className="ml-auto h-4 w-4 fill-rosedeep text-rosedeep" />
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="mt-8 text-xs font-light tracking-[0.3em] text-dusty underline-offset-4 transition-colors hover:text-rosedeep hover:underline"
              >
                CLOSE THE LETTER
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {!open && (
          <p className="mt-14 animate-glow-pulse text-xs font-light tracking-[0.35em] text-burgundy/60">
            TAP THE ENVELOPE TO OPEN IT
          </p>
        )}
      </div>
    </section>
  );
}
