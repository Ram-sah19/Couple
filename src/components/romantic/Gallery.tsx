import { AnimatePresence, motion } from "framer-motion";
import { Camera, Heart, Pencil, Trash2, X } from "lucide-react";
import { useRef, useState } from "react";
import { EditableText, usePersonalize } from "@/lib/personalize";
import { site } from "@/content/site";

type Item = { src: string | null; caption: string };

/** Our Memories Gallery: polaroid wall with a lightbox. */
export function Gallery() {
  const { edit, setEdit, galleryPhotos, setGalleryPhotos } = usePersonalize();
  const [lightbox, setLightbox] = useState<Item | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const stored = galleryPhotos;
  const items: Item[] = stored
    ? stored.map((p) => ({ src: p.src, caption: p.caption }))
    : site.gallery.captions.map((c) => ({ src: null, caption: c }));

  const addPhotos = (files: FileList | null) => {
    if (!files || !files.length) return;
    const readers = Array.from(files).map(
      (file) =>
        new Promise<string>((resolve) => {
          const r = new FileReader();
          r.onload = () => resolve(String(r.result));
          r.readAsDataURL(file);
        })
    );
    Promise.all(readers).then((srcs) => {
      const existing = stored ?? [];
      const next = [...existing, ...srcs.map((src) => ({ src, caption: "" }))];
      setGalleryPhotos(next);
    });
  };

  const removePhoto = (idx: number) => {
    if (!stored) return;
    setGalleryPhotos(stored.filter((_, i) => i !== idx));
  };

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
          <button
            type="button"
            onClick={() => setEdit(true)}
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-dusty/50 bg-card/70 px-5 py-2.5 text-xs font-medium tracking-wide text-burgundy shadow-soft transition-all hover:-translate-y-0.5 hover:border-rosedeep hover:text-rosedeep"
          >
            <Pencil className="h-3.5 w-3.5" />
            {edit ? "Gallery personalization is on" : "Personalize this gallery"}
          </button>
        </motion.div>

        {edit && (
          <div className="mx-auto mt-8 flex max-w-md flex-col items-center gap-3 rounded-2xl glass p-5 text-center">
            <p className="text-sm font-light text-burgundy">Add your real photographs. They appear as polaroids here.</p>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => {
                addPhotos(e.target.files);
                e.target.value = "";
              }}
            />
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="inline-flex items-center gap-2 rounded-full bg-rosedeep px-5 py-2.5 text-sm font-medium text-cream transition-transform hover:scale-105"
            >
              <Camera className="h-4 w-4" /> Choose photos
            </button>
            {stored && <p className="text-xs font-light text-muted-foreground">{stored.length} photo(s) on this device</p>}
          </div>
        )}

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
                {edit && stored ? (
                  <input
                    value={item.caption}
                    placeholder="Add a caption…"
                    onChange={(e) => {
                      const next = stored.map((p, j) => (j === i ? { ...p, caption: e.target.value } : p));
                      setGalleryPhotos(next);
                    }}
                    className="w-full rounded border border-dashed border-dusty/60 bg-transparent px-1 py-0.5 text-center text-sm focus:outline-none"
                  />
                ) : (
                  item.caption || " "
                )}
              </p>
              {edit && stored && (
                <button
                  type="button"
                  onClick={() => removePhoto(i)}
                  aria-label="Remove this photo"
                  className="absolute right-2 top-2 inline-flex items-center gap-1.5 rounded-full bg-burgundy/85 px-2.5 py-1.5 text-[10px] font-medium tracking-wide text-cream shadow-soft transition-colors hover:bg-rosedeep"
                >
                  <Trash2 className="h-3 w-3" />
                  Remove
                </button>
              )}
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
