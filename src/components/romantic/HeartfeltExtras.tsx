import confetti from "canvas-confetti";
import { AnimatePresence, motion } from "framer-motion";
import { Gift, Heart, Lock, Sparkles, Stars } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const RELATIONSHIP_START = new Date("2018-03-17T00:00:45+05:30");

const wishes = [
  "May every dream in your heart find its way to you, my queen.",
  "You deserve soft mornings, beautiful surprises, and a lifetime of reasons to smile.",
  "My favourite place will always be wherever I get to love you.",
  "Happy birthday to the girl who made eight years feel like the beginning of forever.",
  "I hope you always see yourself through my eyes: precious, beautiful, and completely unforgettable.",
];

function getDuration(now: Date) {
  let years = now.getFullYear() - RELATIONSHIP_START.getFullYear();
  let months = now.getMonth() - RELATIONSHIP_START.getMonth();
  let anchor = new Date(RELATIONSHIP_START);
  anchor.setFullYear(anchor.getFullYear() + years);
  anchor.setMonth(anchor.getMonth() + months);

  if (anchor > now) {
    months -= 1;
    anchor = new Date(RELATIONSHIP_START);
    anchor.setFullYear(anchor.getFullYear() + years);
    anchor.setMonth(anchor.getMonth() + months);
  }

  const remaining = now.getTime() - anchor.getTime();
  return {
    years,
    months,
    days: Math.floor(remaining / 86400000),
    hours: Math.floor((remaining / 3600000) % 24),
    minutes: Math.floor((remaining / 60000) % 60),
    seconds: Math.floor((remaining / 1000) % 60),
  };
}

function Counter() {
  const [now, setNow] = useState(() => new Date());
  const duration = useMemo(() => getDuration(now), [now]);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const units = [
    ["Years", duration.years],
    ["Months", duration.months],
    ["Days", duration.days],
    ["Hours", duration.hours],
    ["Minutes", duration.minutes],
    ["Seconds", duration.seconds],
  ];

  return (
    <div className="mt-10 grid grid-cols-3 gap-3 sm:grid-cols-6">
      {units.map(([label, value]) => (
        <div key={label} className="rounded-2xl bg-card/75 px-2 py-4 shadow-soft backdrop-blur-sm">
          <p className="font-serif text-2xl font-semibold text-burgundy sm:text-3xl">{String(value).padStart(2, "0")}</p>
          <p className="mt-1 text-[9px] uppercase tracking-[0.22em] text-dusty">{label}</p>
        </div>
      ))}
    </div>
  );
}

export function HeartfeltExtras() {
  const [secretOpen, setSecretOpen] = useState(false);
  const [wishIndex, setWishIndex] = useState(0);

  const celebrate = () => {
    confetti({
      particleCount: 180,
      spread: 120,
      startVelocity: 42,
      origin: { y: 0.62 },
      colors: ["#F8BBD0", "#E8A1B5", "#C75B7A", "#FCE4EC", "#702D45"],
    });
    window.setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 90,
        startVelocity: 28,
        origin: { x: 0.15, y: 0.7 },
        colors: ["#F8BBD0", "#C75B7A", "#FCE4EC"],
      });
      confetti({
        particleCount: 100,
        spread: 90,
        startVelocity: 28,
        origin: { x: 0.85, y: 0.7 },
        colors: ["#F8BBD0", "#C75B7A", "#FCE4EC"],
      });
    }, 250);
  };

  return (
    <section id="forever" className="relative overflow-hidden bg-gradient-to-b from-blush/50 via-cream to-blush/40 px-6 py-28">
      <div className="pointer-events-none absolute left-1/2 top-24 h-80 w-80 -translate-x-1/2 rounded-full bg-rose/25 blur-3xl" />
      <div className="relative mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center"
        >
          <p className="text-xs font-light uppercase tracking-[0.4em] text-dusty">Our forever chapter</p>
          <h2 className="mt-4 font-serif text-4xl font-semibold text-burgundy sm:text-5xl">Eight years, and I still choose you.</h2>
          <p className="mx-auto mt-5 max-w-2xl font-light leading-relaxed text-muted-foreground">
            Every second with you is a little piece of forever that I never want to lose.
          </p>
          <Counter />
        </motion.div>

        <div className="mt-20 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl bg-gradient-to-br from-blush to-rose/70 p-7 shadow-soft sm:p-9">
            <div className="flex items-center gap-3 text-burgundy">
              <Stars className="h-5 w-5" />
              <p className="text-xs uppercase tracking-[0.3em]">What you are to me</p>
            </div>
            <div className="mt-7 grid grid-cols-2 gap-3">
              {["My Queen", "My Princess", "My Wifey", "My Love", "My Cutie", "My Forever"].map((name) => (
                <div key={name} className="rounded-2xl bg-card/65 px-4 py-4 text-center font-serif text-lg italic text-burgundy">
                  {name}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-card p-7 shadow-soft sm:p-9">
            <div className="flex items-center gap-3 text-rosedeep">
              <Heart className="h-5 w-5 fill-rose" />
              <p className="text-xs uppercase tracking-[0.3em]">The life I want with you</p>
            </div>
            <p className="mt-7 font-serif text-xl italic leading-relaxed text-burgundy">
              I want slow mornings with you, silly little adventures, a home full of laughter, and a lifetime of choosing you as my wife.
            </p>
            <p className="mt-5 text-sm font-light leading-relaxed text-muted-foreground">
              Whatever the future brings, I want to meet it with your hand in mine.
            </p>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-burgundy to-plum p-7 text-cream shadow-soft sm:p-9">
            <div className="flex items-center gap-3">
              <Lock className="h-5 w-5 text-rose" />
              <p className="text-xs uppercase tracking-[0.3em] text-rose">A secret from your Buna</p>
            </div>
            <AnimatePresence mode="wait">
              {secretOpen ? (
                <motion.div key="open" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-7">
                  <p className="font-serif text-2xl italic leading-relaxed">
                    One day, I will call you my wife. Until then, I will love you more deeply every single day.
                  </p>
                  <p className="mt-5 text-sm text-cream/70">You are not just my favourite person. You are my favourite future.</p>
                </motion.div>
              ) : (
                <motion.div key="closed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-7">
                  <p className="font-serif text-2xl italic leading-relaxed">There is something only my queen should read.</p>
                  <button
                    type="button"
                    onClick={() => setSecretOpen(true)}
                    className="mt-7 inline-flex items-center gap-2 rounded-full bg-rose px-5 py-3 text-sm font-medium text-burgundy transition-transform hover:scale-105"
                  >
                    <Lock className="h-4 w-4" /> Open my secret
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="rounded-3xl bg-card p-7 shadow-soft sm:p-9">
            <div className="flex items-center gap-3 text-rosedeep">
              <Gift className="h-5 w-5" />
              <p className="text-xs uppercase tracking-[0.3em]">A birthday wish for you</p>
            </div>
            <AnimatePresence mode="wait">
              <motion.p
                key={wishIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-7 min-h-24 font-serif text-2xl italic leading-relaxed text-burgundy"
              >
                {wishes[wishIndex]}
              </motion.p>
            </AnimatePresence>
            <button
              type="button"
              onClick={() => setWishIndex((index) => (index + 1) % wishes.length)}
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-dusty/50 px-5 py-2.5 text-xs font-medium tracking-wide text-burgundy transition-colors hover:border-rosedeep hover:text-rosedeep"
            >
              <Sparkles className="h-4 w-4" /> Give me another wish
            </button>
          </div>
        </div>

        <div className="mt-16 text-center">
          <button
            type="button"
            onClick={celebrate}
            className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-dusty to-rosedeep px-8 py-4 text-base font-medium text-cream shadow-petal transition-transform hover:scale-105 active:scale-95"
          >
            <Sparkles className="h-5 w-5" />
            Celebrate our love
            <Heart className="h-5 w-5 fill-rose text-rose" />
          </button>
        </div>
      </div>
    </section>
  );
}
