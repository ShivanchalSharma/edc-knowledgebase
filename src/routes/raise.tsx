import { createFileRoute, Navigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { AppShell } from "@/components/edc/AppShell";
// import { NeuralBackground } from "@/components/edc/NeuralBackground";
// import { ScrollReveal } from "@/components/edc/ScrollReveal";
import { Input } from "@/components/ui/input";
import { useUser, useSaved } from "@/lib/edc/store";
import {
  TrendingUp,
  Landmark,
  FileText,
  Search,
  CheckCircle2,
  Circle,
  Layers,
  Sparkles,
  Lightbulb,
  Bookmark,
  Flame,
  Plus,
  X,
  Pencil,
  ArrowRight,
  CheckSquare,
  Quote,
  Check,
  Users,
  Building2,
  Handshake,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { funders, pitchResources } from "@/lib/edc/data";
import { addToTracker, isTracked } from "@/lib/edc/tracker-store";

export const Route = createFileRoute("/raise")({
  head: () => ({ meta: [{ title: "Raise — eDC Knowledge Base" }] }),
  component: RaisePage,
});

// ── Who's Backing Founders — from the eDC IIT Delhi Startup Resource guide (Oct 2026)
// Sections 7 (Student capital), 8 (India VC), 9 (Consumer/Growth), 10 (Global)
// and 2 (Incubators) + 6 (Corporate programmes). Always confirm current terms on
// the programme's own site before advising anyone to apply.
type BackerCategory = "Student Capital" | "VCs" | "Incubators" | "Corporate Programmes";
interface Backer {
  id: string;
  name: string;
  desc: string;
  highlight: string;
  category: BackerCategory;
  url: string;
}

const BACKER_CATEGORY: Record<BackerCategory, { Icon: LucideIcon; tile: string }> = {
  "Student Capital": { Icon: Users, tile: "bg-rose-500/10 border-rose-500/20 text-rose-300" },
  VCs: { Icon: TrendingUp, tile: "bg-primary/10 border-primary/20 text-primary" },
  Incubators: { Icon: Building2, tile: "bg-emerald-500/10 border-emerald-500/20 text-emerald-300" },
  "Corporate Programmes": {
    Icon: Handshake,
    tile: "bg-orange-500/10 border-orange-500/20 text-orange-300",
  },
};

const BACKERS: Backer[] = [
  // Student capital and early investors (Section 7, EDC080–EDC087)
  {
    id: "a1",
    name: "Campus Fund",
    desc: "Venture investor focused on student founders and eligible recent graduates. Use when building a company, not seeking a small personal project grant.",
    highlight: "Student-led ventures",
    category: "Student Capital",
    url: "https://yourcampusfund.com/",
  },
  {
    id: "a2",
    name: "First Cheque",
    desc: "Early venture investment and founder support. A clear first customer insight matters more than an oversized market slide.",
    highlight: "First institutional cheque",
    category: "Student Capital",
    url: "https://www.firstcheque.vc/",
  },
  {
    id: "a3",
    name: "100X.VC",
    desc: "Venture fund using India SAFE (iSAFE) structures. Capital is an investment, not a grant. Read the current economics before signing.",
    highlight: "iSAFE structures",
    category: "Student Capital",
    url: "https://www.100x.vc/about",
  },
  {
    id: "a4",
    name: "Gemba Capital",
    desc: "The fund emphasises early founder conviction and scalable ideas. Published historical cheque sizes are not a guaranteed offer.",
    highlight: "Early conviction investors",
    category: "Student Capital",
    url: "https://gembacapital.in/",
  },
  {
    id: "a5",
    name: "Indian Angel Network",
    desc: "Network of investors evaluating early companies. Angels and network-managed funds can have different decision processes and terms.",
    highlight: "Angel network",
    category: "Student Capital",
    url: "https://www.indianangelnetwork.com/about",
  },
  {
    id: "a6",
    name: "LetsVenture / LVX",
    desc: "Investment platform and fundraising infrastructure. Treat as an investment process, not a grant provider. Review founder onboarding terms.",
    highlight: "Angel syndication platform",
    category: "Student Capital",
    url: "https://www.letsventure.com/",
  },

  // India venture capital (Section 8, EDC088–EDC100)
  {
    id: "v1",
    name: "Peak XV Partners",
    desc: "Multi-stage venture platform — Surge is separately listed as a founder programme. Use current sector portfolio and team pages to find fit.",
    highlight: "Seed through pre-IPO",
    category: "VCs",
    url: "https://www.peakxv.com/",
  },
  {
    id: "v2",
    name: "Accel",
    desc: "Venture investor; Accel Atoms is a separate early founder programme. Inspect relevant investments and partner focus before reaching out.",
    highlight: "Technology, large-scale",
    category: "VCs",
    url: "https://www.accel.com/",
  },
  {
    id: "v3",
    name: "Blume Ventures",
    desc: "Early-stage investment platform. Current website should determine investment fit — do not reuse historical micro-VC descriptions.",
    highlight: "Early Indian companies",
    category: "VCs",
    url: "https://blume.vc/",
  },
  {
    id: "v4",
    name: "Nexus Venture Partners",
    desc: "Backs founders from pre-seed through Series B. Useful for companies with a technical product and market insight that can scale.",
    highlight: "Product-first, AI founders",
    category: "VCs",
    url: "https://www.nexusvp.com/",
  },
  {
    id: "v5",
    name: "Elevation Capital",
    desc: "Invests across consumer, fintech, enterprise and frontier technology. Use relevant sector pages to test whether your stage matches.",
    highlight: "Multi-sector India VC",
    category: "VCs",
    url: "https://www.elevationcapital.com/",
  },
  {
    id: "v6",
    name: "Stellaris Venture Partners",
    desc: "Explicitly backs founders at ideation and early revenue stages. Useful if you have strong insight but limited revenue history.",
    highlight: "Ideation to early revenue",
    category: "VCs",
    url: "https://www.stellarisvp.com/",
  },
  {
    id: "v7",
    name: "3one4 Capital",
    desc: "Early-stage, involved investment approach for companies building for the Indian economy.",
    highlight: "Early Indian economy",
    category: "VCs",
    url: "https://www.3one4capital.com/",
  },
  {
    id: "v8",
    name: "Ankur Capital",
    desc: "Technology-driven ventures with substantial real-world applications. Use its current thesis and portfolio to test fit.",
    highlight: "Deep tech, real-world use",
    category: "VCs",
    url: "https://www.ankurcapital.com/",
  },

  // IIT Delhi and Indian incubators (Section 2, EDC010–EDC025)
  {
    id: "i1",
    name: "FITT — IIT Delhi",
    desc: "Incubation, mentoring and links to IIT Delhi technology transfer and innovation facilities. Strong first contact for campus technology ventures.",
    highlight: "IIT Delhi's own incubator",
    category: "Incubators",
    url: "https://www.fitt-iitd.in/web/incubation",
  },
  {
    id: "i2",
    name: "IHFC — IIT Delhi",
    desc: "IIT Delhi technology innovation hub with pre-seed, incubation and acceleration pathways for deep technology and robotics ventures.",
    highlight: "Deep tech & robotics",
    category: "Incubators",
    url: "https://www.ihfc.co.in/startup-incubation/",
  },
  {
    id: "i3",
    name: "NSRCEL — IIM Bangalore",
    desc: "Programme directory covering idea-stage through growth-stage. Cohort duration, cost and student eligibility are not uniform across NSRCEL programmes.",
    highlight: "Idea to growth stage",
    category: "Incubators",
    url: "https://nsrcel.org/programs/",
  },
  {
    id: "i4",
    name: "IIMA Ventures",
    desc: "Formerly IIMA CIIE, offering incubation, acceleration and funding pathways. Some programmes take equity; workspace is not automatically free.",
    highlight: "Incubation & acceleration",
    category: "Incubators",
    url: "https://iimaventures.com/incubation/",
  },
  {
    id: "i5",
    name: "SINE — IIT Bombay",
    desc: "Academic incubation with physical or virtual support. Appropriate for founders needing a technical ecosystem.",
    highlight: "Deep tech & hardware",
    category: "Incubators",
    url: "https://www.sineiitb.org/",
  },
  {
    id: "i6",
    name: "Villgro",
    desc: "Social enterprise support ecosystem. Useful for founders who can define both a paying customer and a measurable social or environmental outcome.",
    highlight: "Social enterprise",
    category: "Incubators",
    url: "https://villgro.org/",
  },

  // Cloud credits and corporate programmes (Section 6, EDC071–EDC079)
  {
    id: "c1",
    name: "Google for Startups Cloud",
    desc: "USD 2K for pre-funded MVP; up to USD 200K for early-funded; up to USD 350K for AI-first startups. Conditional service credits.",
    highlight: "Up to USD 350K credits",
    category: "Corporate Programmes",
    url: "https://cloud.google.com/startup",
  },
  {
    id: "c2",
    name: "Microsoft for Startups",
    desc: "Up to USD 150K in Azure and developer credits plus business support. Check the current entry route and allowed credit usage.",
    highlight: "Up to USD 150K, 0% equity",
    category: "Corporate Programmes",
    url: "https://www.microsoft.com/en-us/startups",
  },
  {
    id: "c3",
    name: "NVIDIA Inception",
    desc: "Startup programme with technical and ecosystem benefits. Access to discounts is not a guaranteed GPU allocation or fixed cash equivalent.",
    highlight: "AI & accelerated computing",
    category: "Corporate Programmes",
    url: "https://www.nvidia.com/en-us/startups/",
  },
  {
    id: "c4",
    name: "AWS Activate",
    desc: "Credits from USD 1K (Founders) up to USD 200K (Portfolio). Select the right tier, obtain a legitimate provider Org ID and set billing alerts.",
    highlight: "Up to USD 200K in credits",
    category: "Corporate Programmes",
    url: "https://aws.amazon.com/startups/credits/",
  },
  {
    id: "c5",
    name: "Plug and Play",
    desc: "Corporate innovation and investment ecosystem. Distinguish programme participation, a commercial pilot and a separate investment.",
    highlight: "Corporate pilots & access",
    category: "Corporate Programmes",
    url: "https://www.plugandplaytechcenter.com/",
  },
  {
    id: "c6",
    name: "Google Startups Accel. India",
    desc: "Technical mentoring and startup support through a cohort programme. Separate from the Cloud Program — joining one does not grant benefits of the other.",
    highlight: "India cohort mentoring",
    category: "Corporate Programmes",
    url: "https://startup.google.com/programs/accelerator/india/",
  },
];

// ── kind → icon tile ─────────────────────────────────────────────────────────
type Kind = "Funder" | "Pitch";
const KIND: Record<Kind, { Icon: LucideIcon; tile: string; cta: string }> = {
  Funder: {
    Icon: Landmark,
    tile: "bg-emerald-500/10 border-emerald-500/20 text-emerald-300",
    cta: "Apply",
  },
  Pitch: { Icon: FileText, tile: "bg-primary/10 border-primary/20 text-primary", cta: "Download" },
};

interface Item {
  id: string;
  kind: Kind;
  title: string;
  sub: string;
  meta?: string;
  footer?: string;
}
const ALL: Item[] = [
  ...funders.map((f) => ({
    id: f.id,
    kind: "Funder" as const,
    title: f.title,
    sub: f.stage,
    meta: f.amount,
    footer: f.deadline,
  })),
  ...pitchResources.map((p) => ({
    id: p.id,
    kind: "Pitch" as const,
    title: p.title,
    sub: "Free download",
  })),
];

// ── funding-readiness checklist (goals, on-topic for Raise) ─────────────────
interface Goal {
  id: string;
  text: string;
  done: boolean;
}
const DEFAULT_WEEK: Goal[] = [
  { id: "w1", text: "Update the pitch deck with latest traction", done: false },
  { id: "w2", text: "Shortlist 5 investors to reach out to", done: false },
];
const DEFAULT_MONTH: Goal[] = [
  { id: "m1", text: "Send 20 investor emails", done: false },
  { id: "m2", text: "Apply to one grant or accelerator", done: false },
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
function RaiseCard({ item }: { item: Item }) {
  const k = KIND[item.kind];
  const { saved, toggle } = useSaved();
  const isSaved = saved.includes(item.id);
  const [tracked, setTracked] = useState(false);

  useEffect(() => {
    if (item.kind === "Funder") setTracked(isTracked(item.title));
  }, [item.title, item.kind]);

  const handleCta = () => {
    if (item.kind !== "Funder") return; // pitch resources are downloads, not applications
    const added = addToTracker({
      title: item.title,
      type: "grant",
      amount: item.meta,
      deadline: item.footer,
    });
    if (added) setTracked(true);
  };

  return (
    <div className="card-lift bg-card border border-border rounded-2xl p-5 flex flex-col gap-3 h-full">
      <div className="flex items-start justify-between">
        <div
          className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 ${k.tile}`}
        >
          <k.Icon className="w-5 h-5" />
        </div>
        <button onClick={() => toggle(item.id)} aria-label="Save">
          <Bookmark
            className={`w-4 h-4 ${isSaved ? "fill-accent text-accent" : "text-muted-foreground hover:text-foreground"}`}
          />
        </button>
      </div>
      <div className="flex-1">
        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          {item.kind}
        </span>
        <h4 className="font-semibold leading-snug mt-1">{item.title}</h4>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{item.sub}</p>
        {item.meta && <p className="text-sm font-bold text-accent mt-2">{item.meta}</p>}
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <span className="text-xs text-muted-foreground">{item.footer || ""}</span>
        {item.kind === "Funder" ? (
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
              k.cta
            )}
          </button>
        ) : (
          <button className="text-xs font-semibold text-accent hover:underline">{k.cta}</button>
        )}
      </div>
    </div>
  );
}

function BackerCard({ b }: { b: Backer }) {
  const c = BACKER_CATEGORY[b.category];
  return (
    <div className="card-lift bg-card border border-border rounded-2xl p-5 flex flex-col gap-3 h-full">
      <div className="flex items-start justify-between">
        <div
          className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 ${c.tile}`}
        >
          <c.Icon className="w-5 h-5" />
        </div>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border bg-secondary text-secondary-foreground border-border">
          {b.category}
        </span>
      </div>
      <div className="flex-1">
        <h4 className="font-semibold leading-snug">{b.name}</h4>
        <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{b.desc}</p>
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <p className="text-xs font-bold text-accent">{b.highlight}</p>
        <button
          onClick={() => window.open(b.url, "_blank", "noopener,noreferrer")}
          className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:underline shrink-0"
        >
          Visit <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
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

function RaisePage() {
  const { user } = useUser();
  const [hydrated, setHydrated] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => setHydrated(true), []);
  const nFunders = useCountUp(funders.length);

  if (!hydrated) return null;
  if (!user) return <Navigate to="/" />;

  const match = (t: string) => t.toLowerCase().includes(query.toLowerCase());
  const filtered = ALL.filter((i) => match(i.title) || match(i.sub));
  const groups: { label: string; items: Item[] }[] = [
    { label: "Funders, Grants & Accelerators", items: filtered.filter((i) => i.kind === "Funder") },
    { label: "Pitch Resources", items: filtered.filter((i) => i.kind === "Pitch") },
  ];

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-12">
        {/* Hero */}
        <section className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 md:p-8">
          {/* <NeuralBackground className="opacity-50" /> */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/15 via-transparent to-primary/10 pointer-events-none" />
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center gap-6 justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-emerald-300" />
                </span>
                <h1 className="text-3xl md:text-4xl font-bold">Raise</h1>
              </div>
              <p className="text-muted-foreground max-w-2xl">
                Funding is a numbers game and a story game. Set your outreach goals, track them
                here, then work the list of grants, accelerators, and investors that fit where you
                are.
              </p>
              <div className="grid grid-cols-3 gap-3 mt-6 max-w-lg">
                <div className="bg-card/60 backdrop-blur border border-border rounded-2xl p-4">
                  <Layers className="w-4 h-4 text-accent mb-2.5" />
                  <div className="text-2xl font-bold leading-none">{nFunders}</div>
                  <div className="text-xs text-muted-foreground mt-1.5">funding paths listed</div>
                </div>
                <div className="bg-card/60 backdrop-blur border border-border rounded-2xl p-4">
                  <Sparkles className="w-4 h-4 text-accent mb-2.5" />
                  <div className="text-2xl font-bold leading-none">₹2Cr+</div>
                  <div className="text-xs text-muted-foreground mt-1.5">total grants available</div>
                </div>
                <div className="bg-card/60 backdrop-blur border border-border rounded-2xl p-4">
                  <Flame className="w-4 h-4 text-accent mb-2.5" />
                  <div className="text-2xl font-bold leading-none">30%</div>
                  <div className="text-xs text-muted-foreground mt-1.5">rise in applications</div>
                </div>
              </div>
            </div>

            {/* right-side: motivational quote, fills the space */}
            <div className="hidden lg:flex w-[380px] shrink-0 flex-col justify-center bg-card/50 backdrop-blur border border-emerald-500/20 rounded-2xl p-7">
              <Quote className="w-7 h-7 text-emerald-300/60 mb-3" />
              <p className="text-xl font-semibold leading-snug">
                "Fundraising is a full-time job. The founders who raise are the ones who never stop
                asking."
              </p>
              <p className="text-sm text-muted-foreground mt-3">— YC partner wisdom</p>
            </div>
          </div>
        </section>

        {/* Weekly + Monthly raise goals */}
        {/* <ScrollReveal> */}
        <div className="grid md:grid-cols-2 gap-6">
          <GoalPanel
            title="This week's raise goals"
            storageKey="edc:raise:goals:week"
            fallback={DEFAULT_WEEK}
          />
          <GoalPanel
            title="This month's raise goals"
            storageKey="edc:raise:goals:month"
            fallback={DEFAULT_MONTH}
          />
        </div>
        {/* </ScrollReveal> */}

        {/* Who's Backing Founders — Angels, VCs, Incubators, Corporate Programmes */}
        {/* <ScrollReveal> */}
        <section>
          <div className="flex items-center gap-2.5 mb-2">
            <span className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
              <Handshake className="w-4 h-4 text-accent" />
            </span>
            <h2 className="text-xl font-bold">Who's Backing Founders</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-5 ml-[42px]">
            Student capital, VCs, incubators and corporate programmes from the eDC guide (Oct 2026
            edition). Confirm current terms on the programme's own site before applying.
          </p>

          {(
            ["Student Capital", "VCs", "Incubators", "Corporate Programmes"] as BackerCategory[]
          ).map((cat) => (
            <div key={cat} className="mb-8 last:mb-0">
              <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
                {cat}
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {BACKERS.filter((b) => b.category === cat).map((b) => (
                  <BackerCard key={b.id} b={b} />
                ))}
              </div>
            </div>
          ))}
        </section>
        {/* </ScrollReveal> */}

        {/* Tracker teaser */}
        {/* <ScrollReveal> */}
        <Link
          to="/tracker"
          className="group flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-5 hover:border-accent/40 transition-colors"
        >
          <div className="flex items-center gap-4">
            <span className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
              <CheckSquare className="w-5 h-5 text-primary" />
            </span>
            <div>
              <p className="font-semibold">Tracking applications already?</p>
              <p className="text-sm text-muted-foreground">
                Manage every grant, accelerator and competition in one board.
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent shrink-0 group-hover:gap-2.5 transition-all">
            Open tracker <ArrowRight className="w-4 h-4" />
          </span>
        </Link>
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
                eDC guide principle
              </p>
              <p className="text-base font-semibold">
                Choose grant, debt or equity — then shortlist
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                The amount advertised is only one part of a funding decision. Ask what problem the
                support solves, what you give in return, and what happens if the venture takes
                longer than expected.
              </p>
            </div>
          </div>
          <div className="rounded-2xl border border-sky-500/20 bg-gradient-to-br from-sky-500/12 to-primary/8 p-6 flex items-start gap-4">
            <span className="w-10 h-10 rounded-xl bg-sky-500/15 border border-sky-500/25 flex items-center justify-center shrink-0">
              <Lightbulb className="w-5 h-5 text-sky-300" />
            </span>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-sky-300 mb-1.5">
                Raise smarter
              </p>
              <p className="text-sm font-medium leading-relaxed">
                Prioritise investor fit over volume. Check sector, stage, geography, comparable
                investments and potential conflicts before outreach.
              </p>
            </div>
          </div>
        </div>
        {/* </ScrollReveal> */}

        {/* Browse */}
        {/* <ScrollReveal> */}
        <section>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <h2 className="text-xl font-bold">Explore funding & pitch resources</h2>
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search funders, resources…"
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
                    <RaiseCard key={item.id} item={item} />
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
