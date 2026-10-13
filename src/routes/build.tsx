import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { AppShell } from "@/components/edc/AppShell";
// import { NeuralBackground } from "@/components/edc/NeuralBackground";
// import { ScrollReveal } from "@/components/edc/ScrollReveal";
import { Input } from "@/components/ui/input";
import { useUser, useSaved } from "@/lib/edc/store";
import {
  Rocket,
  Trophy,
  Wrench,
  Handshake,
  Search,
  CheckCircle2,
  Circle,
  Layers,
  Sparkles,
  Bookmark,
  Flame,
  Plus,
  X,
  Pencil,
  Users,
  Quote,
  Check,
  Smartphone,
  AlertTriangle,
  ListChecks,
  ExternalLink,
  type LucideIcon,
} from "lucide-react";
import { competitions } from "@/lib/edc/data";
import { addToTracker, isTracked } from "@/lib/edc/tracker-store";

export const Route = createFileRoute("/build")({
  head: () => ({ meta: [{ title: "Build — eDC Knowledge Base" }] }),
  component: BuildPage,
});

// ── kind → icon tile ─────────────────────────────────────────────────────────
type Kind = "Competition" | "Tool";
const KIND: Record<Kind, { Icon: LucideIcon; tile: string; cta: string }> = {
  Competition: { Icon: Trophy, tile: "bg-accent/10 border-accent/20 text-accent", cta: "View" },
  Tool: { Icon: Wrench, tile: "bg-sky-500/10 border-sky-500/20 text-sky-300", cta: "Open" },
};

interface Item {
  id: string;
  kind: Kind;
  title: string;
  sub: string;
  meta?: string;
  badge?: string;
  category?: string;
  url?: string;
}

// real tools from Sections 6 (Cloud Credits) and 12 (Operating Toolkit) of the eDC guide
const TOOLS: {
  id: string;
  title: string;
  sub: string;
  category: string;
  badge?: string;
  url?: string;
}[] = [
  // Section 6 — Cloud credits and corporate programmes
  {
    id: "t1",
    title: "AWS Activate",
    sub: "Service credits from USD 1K (Founders) up to USD 200K (Portfolio tier). Prior credits affect eligibility.",
    category: "Cloud Credits",
    url: "https://aws.amazon.com/startups/credits/",
  },
  {
    id: "t2",
    title: "Google for Startups Cloud",
    sub: "USD 2K pre-funded; up to USD 200K early-funded; up to USD 350K for AI-first startups. Conditional service credits.",
    category: "Cloud Credits",
    url: "https://cloud.google.com/startup",
  },
  {
    id: "t3",
    title: "Microsoft for Startups",
    sub: "Up to USD 150K in Azure and developer credits plus business support. Check entry route and allowed usage.",
    category: "Cloud Credits",
    url: "https://www.microsoft.com/en-us/startups",
  },
  {
    id: "t4",
    title: "NVIDIA Inception",
    sub: "AI startup programme with technical benefits and ecosystem access. Not a guaranteed GPU allocation or fixed cash.",
    category: "Cloud Credits",
    url: "https://www.nvidia.com/en-us/startups/",
  },
  {
    id: "t5",
    title: "Google Startups Accelerator India",
    sub: "Technical mentoring cohort for India-based technology startups. Separate from the Cloud Program.",
    category: "Cloud Credits",
    badge: "India",
    url: "https://startup.google.com/programs/accelerator/india/",
  },
  // Section 12 — Company formation and operating toolkit
  {
    id: "t6",
    title: "Figma",
    sub: "Design and prototype your UI before writing code. Use a clickable prototype to test workflows with real users.",
    category: "Design & Prototyping",
    url: "https://www.figma.com/",
  },
  {
    id: "t7",
    title: "Canva",
    sub: "Design tool for presentations, one-pagers and simple brand assets. Polished visuals should follow a clear message.",
    category: "Design & Prototyping",
    url: "https://www.canva.com/",
  },
  {
    id: "t8",
    title: "Notion for Startups",
    sub: "Up to 6 months of Business plan with Notion AI. Set up a compact operating wiki before migrating all company info.",
    category: "Productivity",
    url: "https://www.notion.com/startups",
  },
  {
    id: "t9",
    title: "HubSpot for Startups",
    sub: "CRM and related operating tools with startup discounts. Check renewal cost before building dependent workflows.",
    category: "Productivity",
    url: "https://www.hubspot.com/startups",
  },
  {
    id: "t10",
    title: "Razorpay",
    sub: "Payment infrastructure for India — cards, UPI, wallets. Activation and fees require current provider review.",
    category: "Payments & Ops",
    url: "https://razorpay.com/",
  },
  {
    id: "t11",
    title: "Zoho",
    sub: "Business apps spanning email, CRM, finance. Start with the few tools needed; compare exports and renewal cost.",
    category: "Payments & Ops",
    url: "https://www.zoho.com/",
  },
  {
    id: "t12",
    title: "GitHub Student Dev Pack",
    sub: "Student developer benefits from GitHub and partners. Personal benefits may not transfer to an incorporated startup.",
    category: "Dev Tools",
    badge: "Students",
    url: "https://education.github.com/pack",
  },
  {
    id: "t13",
    title: "IP India",
    sub: "Official IP information and patent/trademark application gateway. Clarify ownership with FITT before disclosing.",
    category: "Legal & Entity",
    url: "https://www.ipindia.gov.in/",
  },
  {
    id: "t14",
    title: "Ministry of Corporate Affairs",
    sub: "Official company and LLP administration. Incorporation, DPIIT recognition and Udyam registration are different.",
    category: "Legal & Entity",
    url: "https://www.mca.gov.in/",
  },
  {
    id: "t15",
    title: "Plug and Play",
    sub: "Corporate innovation ecosystem. Distinguish programme participation, a commercial pilot and a separate investment.",
    category: "Corporate Access",
    url: "https://www.plugandplaytechcenter.com/",
  },
];

const ALL: Item[] = [
  ...competitions.map((c) => ({
    id: c.id,
    kind: "Competition" as const,
    title: c.title,
    sub: c.prize,
    meta: `${c.deadline}d left`,
    url: c.url,
  })),
  ...TOOLS.map((t) => ({
    id: t.id,
    kind: "Tool" as const,
    title: t.title,
    sub: t.sub,
    category: t.category,
    badge: t.badge,
    url: t.url,
  })),
];

// ── MVP essentials checklist — ordered, interactive, shared across sessions ─
const MVP_STEPS: { id: string; title: string; desc: string }[] = [
  {
    id: "m1",
    title: "Validate the problem",
    desc: "Talk to 10+ potential users before writing any code — confirm the pain is real.",
  },
  {
    id: "m2",
    title: "Define one core user flow",
    desc: "Pick the single path a user takes to get value. Cut everything that isn't that.",
  },
  {
    id: "m3",
    title: "Build the smallest working version",
    desc: "Ugly is fine. It just needs to work end-to-end for that one flow.",
  },
  {
    id: "m4",
    title: "Add auth — don't build it yourself",
    desc: "Use Supabase Auth, Clerk, or similar. Rolling your own costs weeks you don't have.",
  },
  {
    id: "m5",
    title: "Wire up basic analytics",
    desc: "Know what users actually do from day one — Mixpanel or PostHog, five minutes to set up.",
  },
  {
    id: "m6",
    title: "Set up a feedback channel",
    desc: "A form, an email, a Discord — anywhere users can tell you what's broken.",
  },
  {
    id: "m7",
    title: "Ship it publicly",
    desc: "A live link beats a perfect prototype. Get it in front of real users.",
  },
];

// ── Stack recommender — curated, real tool combos per product type ──────────
interface StackOption {
  id: string;
  label: string;
  Icon: LucideIcon;
  combo: string[];
  why: string;
}
const STACKS: StackOption[] = [
  {
    id: "web",
    label: "Web App / SaaS",
    Icon: Rocket,
    combo: ["Next.js", "Supabase", "Vercel", "Tailwind CSS"],
    why: "The fastest path from idea to a live, scalable product — most of this is free to start on.",
  },
  {
    id: "mobile",
    label: "Mobile App",
    Icon: Smartphone,
    combo: ["React Native", "Supabase", "Expo", "Firebase Analytics"],
    why: "Ship to iOS and Android from one codebase without hiring two separate mobile teams.",
  },
  {
    id: "ai",
    label: "AI Product",
    Icon: Sparkles,
    combo: ["Claude / OpenAI API", "Next.js", "Supabase", "Vercel"],
    why: "Wrap a strong model in a simple product shell — the model does the hardest part for you.",
  },
  {
    id: "nocode",
    label: "No-Code MVP",
    Icon: Layers,
    combo: ["Bubble", "Glide", "Airtable", "Zapier"],
    why: "Validate real demand before writing a single line of code.",
  },
];

// ── Common build mistakes — rotates daily, warm-card style ──────────────────
const BUILD_MISTAKES = [
  "Building in private for months before showing anyone — the guide says a useful session ends with a customer conversation, not another planning doc.",
  "Treating the MVP as a final product instead of a question you're asking users. Build the smallest version that tests the central assumption.",
  "Applying for money that would force the team into a project it would not otherwise pursue. Start with the experiment budget first.",
  "Polishing a feature nobody asked for while your core flow is still broken. Do things that do not scale — find the pain manually first.",
  "Copying a large company's process without context. The eDC guide: choose measures that reflect real customer value, not benchmarks designed for bigger teams.",
];

// ── goals (build checklist) ─────────────────────────────────────────────────
interface Goal {
  id: string;
  text: string;
  done: boolean;
}
const DEFAULT_WEEK: Goal[] = [
  { id: "w1", text: "Sketch the MVP scope on paper", done: false },
  { id: "w2", text: "Book a Makerspace slot", done: false },
];
const DEFAULT_MONTH: Goal[] = [
  { id: "m1", text: "Ship a working v1 to 5 users", done: false },
  { id: "m2", text: "Apply to one campus competition", done: false },
];

function useGoals(key: string, fallback: Goal[]) {
  const [goals, setGoals] = useState<Goal[]>(fallback);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      setGoals(raw ? JSON.parse(raw) : fallback);
    } catch {
      setGoals(fallback);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  const persist = (next: Goal[]) => {
    setGoals(next);
    try {
      localStorage.setItem(key, JSON.stringify(next));
    } catch {}
  };
  return {
    goals,
    toggle: (id: string) => persist(goals.map((g) => (g.id === id ? { ...g, done: !g.done } : g))),
    add: (text: string) => persist([...goals, { id: crypto.randomUUID(), text, done: false }]),
    edit: (id: string, text: string) =>
      persist(goals.map((g) => (g.id === id ? { ...g, text } : g))),
    remove: (id: string) => persist(goals.filter((g) => g.id !== id)),
  };
}

function GoalRow({
  goal,
  onToggle,
  onEdit,
  onRemove,
}: {
  goal: Goal;
  onToggle: () => void;
  onEdit: (t: string) => void;
  onRemove: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(goal.text);
  if (editing) {
    return (
      <li className="flex items-center gap-3 rounded-xl border border-accent/40 bg-background p-3">
        <Input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && draft.trim()) {
              onEdit(draft.trim());
              setEditing(false);
            }
            if (e.key === "Escape") {
              setDraft(goal.text);
              setEditing(false);
            }
          }}
          autoFocus
          className="flex-1"
        />
        <button
          onClick={() => {
            if (draft.trim()) onEdit(draft.trim());
            setEditing(false);
          }}
          className="text-xs font-semibold text-accent shrink-0"
        >
          Save
        </button>
        <button
          onClick={() => {
            setDraft(goal.text);
            setEditing(false);
          }}
          className="text-muted-foreground shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </li>
    );
  }
  return (
    <li
      onClick={onToggle}
      className={`group flex items-center gap-3 rounded-xl border p-3 cursor-pointer transition-all ${goal.done ? "bg-accent/[0.06] border-accent/30" : "bg-background border-border hover:border-accent/30"}`}
    >
      {goal.done ? (
        <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
      ) : (
        <Circle className="w-5 h-5 text-muted-foreground shrink-0" />
      )}
      <span className={`text-sm flex-1 ${goal.done ? "text-muted-foreground" : "text-foreground"}`}>
        {goal.text}
      </span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setEditing(true);
        }}
        className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-foreground shrink-0 transition-opacity"
      >
        <Pencil className="w-3.5 h-3.5" />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-red-400 shrink-0 transition-opacity"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </li>
  );
}

function GoalPanel({
  title,
  storageKey,
  fallback,
}: {
  title: string;
  storageKey: string;
  fallback: Goal[];
}) {
  const { goals, toggle, add, edit, remove } = useGoals(storageKey, fallback);
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState("");
  const done = goals.filter((g) => g.done).length;
  const pct = goals.length ? Math.round((done / goals.length) * 100) : 0;
  const submitAdd = () => {
    if (draft.trim()) add(draft.trim());
    setDraft("");
    setAdding(false);
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold">{title}</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            {done} of {goals.length} complete
          </p>
        </div>
        <div className="text-xl font-bold text-accent tabular-nums">{pct}%</div>
      </div>
      <div className="h-1.5 rounded-full bg-secondary overflow-hidden mb-4">
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <ul className="space-y-2.5 flex-1">
        {goals.map((g) => (
          <GoalRow
            key={g.id}
            goal={g}
            onToggle={() => toggle(g.id)}
            onEdit={(t) => edit(g.id, t)}
            onRemove={() => remove(g.id)}
          />
        ))}
        {goals.length === 0 && !adding && (
          <li className="text-sm text-muted-foreground text-center py-6">
            No goals yet — add one below.
          </li>
        )}
      </ul>
      {adding ? (
        <div className="flex items-center gap-2 mt-3">
          <Input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") submitAdd();
              if (e.key === "Escape") {
                setDraft("");
                setAdding(false);
              }
            }}
            placeholder="New goal…"
            autoFocus
            className="flex-1"
          />
          <button onClick={submitAdd} className="text-xs font-semibold text-accent shrink-0">
            Add
          </button>
        </div>
      ) : (
        <button
          onClick={() => setAdding(true)}
          className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline"
        >
          <Plus className="w-3.5 h-3.5" /> Add a goal
        </button>
      )}
    </div>
  );
}

// ── library card ─────────────────────────────────────────────────────────────
function BuildCard({ item }: { item: Item }) {
  const k = KIND[item.kind];
  const { saved, toggle } = useSaved();
  const isSaved = saved.includes(item.id);
  const [tracked, setTracked] = useState(false);

  useEffect(() => {
    if (item.kind === "Competition") setTracked(isTracked(item.title));
  }, [item.title, item.kind]);

  const handleCta = () => {
    if (item.kind === "Tool" && item.url) {
      window.open(item.url, "_blank", "noopener,noreferrer");
      return;
    }
    if (item.kind !== "Competition") return;
    const added = addToTracker({ title: item.title, type: "competition", deadline: item.meta });
    if (added) setTracked(true);
  };

  const handleOpen = () => {
    if (item.url) window.open(item.url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="card-lift bg-card border border-border rounded-2xl p-5 flex flex-col gap-3 h-full">
      <div className="flex items-start justify-between">
        <div
          className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 ${k.tile}`}
        >
          <k.Icon className="w-5 h-5" />
        </div>
        <div className="flex items-center gap-2">
          {item.category && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-500/10 text-sky-300 border border-sky-500/25">
              {item.category}
            </span>
          )}
          {item.badge && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-accent/15 text-accent border border-accent/30">
              {item.badge}
            </span>
          )}
          <button onClick={() => toggle(item.id)} aria-label="Save">
            <Bookmark
              className={`w-4 h-4 ${isSaved ? "fill-accent text-accent" : "text-muted-foreground hover:text-foreground"}`}
            />
          </button>
        </div>
      </div>
      <div className="flex-1">
        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          {item.kind}
        </span>
        <h4 className="font-semibold leading-snug mt-1">{item.title}</h4>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{item.sub}</p>
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <span className="text-xs text-muted-foreground">{item.meta || ""}</span>
        {item.kind === "Competition" ? (
          <div className="flex items-center gap-3">
            <button
              onClick={handleCta}
              disabled={tracked}
              className={`text-xs font-semibold hover:underline inline-flex items-center gap-1 ${tracked ? "text-emerald-400 cursor-default" : "text-accent"}`}
            >
              {tracked ? (
                <>
                  <Check className="w-3 h-3" /> Tracked
                </>
              ) : (
                "Track"
              )}
            </button>
            <button
              onClick={handleOpen}
              className="text-xs font-semibold text-accent hover:underline inline-flex items-center gap-1"
            >
              Open <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        ) : (
          <button
            onClick={handleCta}
            className="text-xs font-semibold text-accent hover:underline inline-flex items-center gap-1"
          >
            {k.cta} <ExternalLink className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  );
}

function useCountUp(target: number, ms = 900) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / ms, 1);
      setV(Math.round((1 - Math.pow(1 - t, 3)) * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, ms]);
  return v;
}

function BuildPage() {
  const { user } = useUser();
  const [hydrated, setHydrated] = useState(false);
  const [query, setQuery] = useState("");
  const [mvpChecked, setMvpChecked] = useState<string[]>([]);
  const [selectedStack, setSelectedStack] = useState<string | null>(null);

  useEffect(() => {
    setHydrated(true);
    try {
      setMvpChecked(JSON.parse(localStorage.getItem("edc:build:mvp") || "[]"));
    } catch {
      setMvpChecked([]);
    }
  }, []);
  const nItems = useCountUp(ALL.length);

  if (!hydrated) return null;
  if (!user) return <Navigate to="/" />;

  const toggleMvp = (id: string) => {
    setMvpChecked((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      try {
        localStorage.setItem("edc:build:mvp", JSON.stringify(next));
      } catch {}
      return next;
    });
  };
  const mvpPct = Math.round((mvpChecked.length / MVP_STEPS.length) * 100);
  const mistakeOfDay = BUILD_MISTAKES[new Date().getDate() % BUILD_MISTAKES.length];
  const activeStack = STACKS.find((s) => s.id === selectedStack);

  const match = (t: string) => t.toLowerCase().includes(query.toLowerCase());
  const filtered = ALL.filter((i) => match(i.title) || match(i.sub));

  // Flattened on purpose — splitting tools into 7 category-headed sections
  // was confusing to scan. Competitions stays its own group; every tool now
  // sits in one searchable grid, with its category shown as a small badge
  // on the card itself instead of a section header.
  const toolCategories = Array.from(new Set(TOOLS.map((t) => t.category)));
  const groups: { label: string; items: Item[] }[] = [
    { label: "Competitions", items: filtered.filter((i) => i.kind === "Competition") },
    { label: "Tools & Platforms", items: filtered.filter((i) => i.kind === "Tool") },
  ];

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-12">
        {/* Hero */}
        <section className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 md:p-8">
          {/* <NeuralBackground className="opacity-50" /> */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent/15 via-transparent to-primary/10 pointer-events-none" />
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center gap-6 justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-10 h-10 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center">
                  <Rocket className="w-5 h-5 text-accent" />
                </span>
                <h1 className="text-3xl md:text-4xl font-bold">Build</h1>
              </div>
              <p className="text-muted-foreground max-w-2xl">
                Turn ideas into something real. Set what you're shipping this week and this month,
                then tap into the tools, platforms, and competitions that get you there faster.
              </p>
              <div className="grid grid-cols-3 gap-3 mt-6 max-w-lg">
                <div className="bg-card/60 backdrop-blur border border-border rounded-2xl p-4">
                  <Layers className="w-4 h-4 text-accent mb-2.5" />
                  <div className="text-2xl font-bold leading-none">{nItems}</div>
                  <div className="text-xs text-muted-foreground mt-1.5">ways to build listed</div>
                </div>
                <div className="bg-card/60 backdrop-blur border border-border rounded-2xl p-4">
                  <Users className="w-4 h-4 text-accent mb-2.5" />
                  <div className="text-2xl font-bold leading-none">99+</div>
                  <div className="text-xs text-muted-foreground mt-1.5">founders building now</div>
                </div>
                <div className="bg-card/60 backdrop-blur border border-border rounded-2xl p-4">
                  <Sparkles className="w-4 h-4 text-accent mb-2.5" />
                  <div className="text-2xl font-bold leading-none">{toolCategories.length}</div>
                  <div className="text-xs text-muted-foreground mt-1.5">tool categories</div>
                </div>
              </div>
            </div>

            {/* right-side: motivational quote, fills the space */}
            <div className="hidden lg:flex w-[380px] shrink-0 flex-col justify-center bg-card/50 backdrop-blur border border-accent/20 rounded-2xl p-7">
              <Quote className="w-7 h-7 text-accent/60 mb-3" />
              <p className="text-xl font-semibold leading-snug">
                "Done is better than perfect. Ship the ugly version — you can't improve what doesn't
                exist yet."
              </p>
              <p className="text-sm text-muted-foreground mt-3">— Founder wisdom</p>
            </div>
          </div>
        </section>

        {/* Weekly + Monthly build goals */}
        {/* <ScrollReveal> */}
        <div className="grid md:grid-cols-2 gap-6">
          <GoalPanel
            title="This week's build goals"
            storageKey="edc:build:goals:week"
            fallback={DEFAULT_WEEK}
          />
          <GoalPanel
            title="This month's build goals"
            storageKey="edc:build:goals:month"
            fallback={DEFAULT_MONTH}
          />
        </div>
        {/* </ScrollReveal> */}

        {/* MVP Essentials Checklist */}
        {/* <ScrollReveal> */}
        <section className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
                <ListChecks className="w-4 h-4 text-accent" />
              </span>
              <div>
                <h2 className="text-xl font-bold">MVP essentials</h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {mvpChecked.length} of {MVP_STEPS.length} done — what a real MVP actually needs,
                  in order
                </p>
              </div>
            </div>
            <div className="text-2xl font-bold text-accent tabular-nums">{mvpPct}%</div>
          </div>
          <div className="h-1.5 rounded-full bg-secondary overflow-hidden mb-6">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
              style={{ width: `${mvpPct}%` }}
            />
          </div>
          <div className="space-y-2.5">
            {MVP_STEPS.map((step, i) => {
              const done = mvpChecked.includes(step.id);
              return (
                <button
                  key={step.id}
                  onClick={() => toggleMvp(step.id)}
                  className={`w-full flex items-start gap-4 text-left rounded-xl border p-4 transition-all ${done ? "bg-accent/[0.05] border-accent/30" : "bg-background border-border hover:border-accent/30"}`}
                >
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${done ? "bg-accent text-accent-foreground" : "bg-secondary text-muted-foreground"}`}
                  >
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p
                      className={`text-sm font-semibold ${done ? "text-muted-foreground" : "text-foreground"}`}
                    >
                      {step.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">{step.desc}</p>
                  </div>
                  {done ? (
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                  ) : (
                    <Circle className="w-5 h-5 text-muted-foreground shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </section>
        {/* </ScrollReveal> */}

        {/* Stack Recommender */}
        {/* <ScrollReveal> */}
        <section className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center gap-2.5 mb-2">
            <span className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Layers className="w-4 h-4 text-primary" />
            </span>
            <h2 className="text-xl font-bold">What should I build with?</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-5 ml-[42px]">
            Pick what you're building — get a real, curated stack, not a wall of every tool that
            exists.
          </p>

          <div className="flex flex-wrap gap-2 mb-5">
            {STACKS.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedStack(s.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-colors ${
                  selectedStack === s.id
                    ? "bg-accent/15 border-accent/40 text-accent"
                    : "bg-background border-border text-muted-foreground hover:border-accent/30 hover:text-foreground"
                }`}
              >
                <s.Icon className="w-4 h-4" /> {s.label}
              </button>
            ))}
          </div>

          {activeStack && (
            <div className="rounded-xl border border-accent/30 bg-accent/[0.05] p-5">
              <p className="text-xs text-muted-foreground mb-3">{activeStack.why}</p>
              <div className="flex flex-wrap gap-2">
                {activeStack.combo.map((tool) => (
                  <span
                    key={tool}
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-card border border-border"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>
        {/* </ScrollReveal> */}

        {/* Warm row */}
        {/* <ScrollReveal> */}
        <div className="grid md:grid-cols-2 gap-5">
          <div className="rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/12 to-primary/8 p-6 flex items-start gap-4">
            <span className="w-10 h-10 rounded-xl bg-accent/15 border border-accent/25 flex items-center justify-center shrink-0">
              <Flame className="w-5 h-5 text-accent" />
            </span>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-accent mb-1.5">
                eDC guide highlight
              </p>
              <p className="text-base font-semibold">Cloud credits ≠ cash</p>
              <p className="text-xs text-muted-foreground mt-1">
                Credits and discounts reduce eligible bills — they do not pay salaries or turn into
                cash. Compare expiry, exclusions and cost after credits end.
              </p>
            </div>
          </div>
          <div className="rounded-2xl border border-red-500/20 bg-gradient-to-br from-red-500/10 to-primary/8 p-6 flex items-start gap-4">
            <span className="w-10 h-10 rounded-xl bg-red-500/15 border border-red-500/25 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5 text-red-300" />
            </span>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-red-300 mb-1.5">
                Common mistake to avoid
              </p>
              <p className="text-sm font-medium leading-relaxed">{mistakeOfDay}</p>
            </div>
          </div>
        </div>
        {/* </ScrollReveal> */}

        {/* Browse */}
        {/* <ScrollReveal> */}
        <section>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <h2 className="text-xl font-bold">Competitions &amp; your toolkit</h2>
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search competitions, tools…"
                className="pl-9"
              />
            </div>
          </div>

          {groups
            .filter((g) => g.items.length > 0)
            .map((group) => (
              <div key={group.label} className="mb-8">
                <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
                  {group.label}
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {group.items.map((item) => (
                    <BuildCard key={item.id} item={item} />
                  ))}
                </div>
              </div>
            ))}

          {filtered.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-12">
              No matches for "{query}".
            </p>
          )}
        </section>
        {/* </ScrollReveal> */}
      </div>
    </AppShell>
  );
}
