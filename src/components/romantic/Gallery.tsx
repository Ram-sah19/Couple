import { AnimatePresence, motion } from "framer-motion";
import { Heart, X } from "lucide-react";
import { useState } from "react";
import { EditableText } from "@/lib/personalize";
import { site } from "@/content/site";

type Item = { src: string | null; caption: string };

/** Our Memories Gallery: polaroid wall with a lightbox. */
export function Gallery() {
  const [lightbox, setLightbox] = useState<Item | null>(null);

  const items: Item[] = site.gallery.photos;

  return (
    <section id="gallery" className="relative overflow-hidden bg-gradient-to-b from-cream via-blush/40 to-cream px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9 }}
          className="text-center"
        >
          <p className="text-xs font-light uppercase tracking-[0.4em] text-dusty">Our Memories Gallery</p>
          <h2 className="mt-4 font-serif text-4xl font-semibold text-burgundy sm:text-5xl">
            <EditableText id="gallery-heading" fallback={site.gallery.heading} />
          </h2>
        </motion.div>

        <div className="mt-16 columns-2 gap-6 sm:columns-3 [column-fill:_balance]">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.1 }}
              className={`group relative mb-6 break-inside-avoid rounded-sm bg-card p-2.5 pb-12 shadow-petal transition-transform duration-500 hover:z-10 hover:scale-[1.03] hover:rotate-0 ${
                i % 3 === 0 ? "-rotate-2" : i % 3 === 1 ? "rotate-1" : "-rotate-1"
              }`}
            >
              <button
                type="button"
                onClick={() => item.src && setLightbox(item)}
                className={`block w-full overflow-hidden rounded-[2px] ${item.src ? "cursor-zoom-in" : "cursor-default"}`}
              >
                {item.src ? (
                  <img src={item.src} alt={item.caption || "Our memory"} loading="lazy" className="w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                ) : (
                  <div className="flex aspect-[4/5] w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-rose via-blush to-dusty/60">
                    <Heart className="h-7 w-7 fill-cream/90 text-cream/90 transition-transform duration-500 group-hover:scale-125" />
                    <span className="text-[9px] font-light tracking-[0.3em] text-cream/90">OUR PHOTO</span>
                  </div>
                )}
              </button>
              <p className="mt-3 text-center font-serif text-sm italic leading-snug text-burgundy/85">
                {item.caption || " "}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-[95] flex items-center justify-center bg-burgundy/85 p-6 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="max-h-full max-w-2xl rounded-sm bg-card p-3 pb-8 shadow-petal"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={lightbox.src ?? ""} alt={lightbox.caption || "Our memory"} className="max-h-[70vh] w-full rounded-[2px] object-contain" />
              {lightbox.caption && (
                <p className="mt-4 text-center font-serif text-lg italic text-burgundy">{lightbox.caption}</p>
              )}
            </motion.div>
            <button
              type="button"
              aria-label="Close photo"
              className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-cream/20 text-cream transition-colors hover:bg-cream/30"
              onClick={() => setLightbox(null)}
            >
              <X className="h-5 w-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
