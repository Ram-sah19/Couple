import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { EditableText, PhotoSlot } from "@/lib/personalize";
import { site } from "@/content/site";

/** Our Little Love Story: romantic scrapbook timeline. */
export function LoveStory() {
  return (
    <section id="story" className="relative overflow-hidden px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9 }}
          className="text-center"
        >
          <p className="text-xs font-light uppercase tracking-[0.4em] text-dusty">Our Little Love Story</p>
          <h2 className="mt-4 font-serif text-4xl font-semibold leading-snug text-burgundy sm:text-5xl">
            <EditableText id="story-heading" fallback={site.story.heading} />
          </h2>
          <div className="mx-auto mt-6 flex items-center justify-center gap-3">
            <span className="h-px w-16 bg-dusty/60" />
            <Heart className="h-4 w-4 fill-rosedeep text-rosedeep" />
            <span className="h-px w-16 bg-dusty/60" />
          </div>
        </motion.div>

        <div className="relative mt-20">
          {/* the thread */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-dusty/50 to-transparent md:block" />
          <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-transparent via-dusty/50 to-transparent md:hidden" />

          <div className="space-y-16 md:space-y-24">
            {site.story.entries.map((entry, i) => {
              const left = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className={`relative flex md:w-1/2 ${
                    left ? "md:pr-14" : "md:ml-auto md:pl-14"
                  } pl-14 md:pl-0 ${left ? "" : "md:pl-14"}`}
                >
                  {/* heart knot on the thread */}
                  <span
                    className={`absolute top-8 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-card shadow-soft left-4 md:left-auto ${
                      left ? "md:-right-[18px]" : "md:-left-[18px]"
                    }`}
                  >
                    <Heart className="h-4 w-4 fill-rosedeep text-rosedeep" />
                  </span>

                  {/* polaroid */}
                  <div
                    className={`polaroid-tape relative w-full max-w-sm rounded-sm bg-card p-3 pb-12 shadow-petal transition-transform duration-500 hover:rotate-0 ${
                      left ? "-rotate-2" : "rotate-2"
                    }`}
                  >
                    <PhotoSlot
                      id={`story-${i}`}
                      defaultSrc={entry.image}
                      className="aspect-[4/3] w-full rounded-[2px]"
                      alt={entry.title}
                      fallback={
                        <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-blush via-rose to-dusty/70">
                          <span className="font-serif text-4xl italic text-burgundy/60">{String(i + 1).padStart(2, "0")}</span>
                          <Heart className="h-4 w-4 fill-cream text-cream/90" />
                          <span className="text-[10px] font-light tracking-[0.25em] text-cream/90">OUR PHOTO</span>
                        </div>
                      }
                    />
                    <div className="mt-4 text-center">
                      <p className="text-[10px] font-light uppercase tracking-[0.3em] text-dusty">
                        <EditableText id={`story-${i}-date`} fallback={entry.date} />
                      </p>
                      <h3 className="mt-1.5 font-serif text-2xl font-semibold text-burgundy">
                        <EditableText id={`story-${i}-title`} fallback={entry.title} />
                      </h3>
                      <p className="mt-2 text-sm font-light leading-relaxed text-muted-foreground">
                        <EditableText id={`story-${i}-text`} fallback={entry.text} multiline />
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
