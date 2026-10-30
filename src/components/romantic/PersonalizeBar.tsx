import { Pencil, RotateCcw, X } from "lucide-react";
import { motion } from "framer-motion";
import { usePersonalize } from "@/lib/personalize";

/** Floating personalise control for editing every text and photo on this device. */
export function PersonalizeBar() {
  const { edit, setEdit, reset } = usePersonalize();

  return (
    <div className="fixed bottom-5 left-5 z-[90]">
      {edit ? (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass flex max-w-[calc(100vw-2.5rem)] items-center gap-3 rounded-full py-2 pl-4 pr-2"
        >
          <span className="text-xs font-light leading-tight text-burgundy sm:text-sm">
            Personalising. Tap any text or photo.
            <span className="hidden sm:inline"> Changes save on this device.</span>
          </span>
          <button
            type="button"
            onClick={reset}
            aria-label="Reset all personal changes"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blush text-burgundy transition-colors hover:bg-rose"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setEdit(false)}
            className="flex h-8 items-center gap-1.5 shrink-0 rounded-full bg-rosedeep px-3 text-xs font-medium text-cream transition-transform hover:scale-105"
          >
            <X className="h-3.5 w-3.5" /> Done
          </button>
        </motion.div>
      ) : (
        <motion.button
          type="button"
          onClick={() => setEdit(true)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
          className="glass flex h-11 items-center gap-2 rounded-full px-4 text-xs font-medium tracking-wide text-burgundy shadow-soft transition-transform hover:scale-105"
          aria-label="Personalise the website"
        >
          <Pencil className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Personalise</span>
        </motion.button>
      )}
    </div>
  );
}
