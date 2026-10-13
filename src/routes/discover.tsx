import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { AppShell } from "@/components/edc/AppShell";
// import { NeuralBackground } from "@/components/edc/NeuralBackground";
// import { ScrollReveal } from "@/components/edc/ScrollReveal";
import { Input } from "@/components/ui/input";
import { useUser, useSaved } from "@/lib/edc/store";
import {
  BookOpen,
  GraduationCap,
  Rss,
  Search,
  CheckCircle2,
  Circle,
  Clock,
  Layers,
  Sparkles,
  Lightbulb,
  Bookmark,
  Flame,
  Plus,
  X,
  Pencil,
  Quote,
  Newspaper,
  Users,
  Globe,
  TrendingUp,
  Mic,
  ExternalLink,
  type LucideIcon,
} from "lucide-react";
import { books, courses, reports } from "@/lib/edc/data";

export const Route = createFileRoute("/discover")({
  head: () => ({ meta: [{ title: "Discover — eDC Knowledge Base" }] }),
  component: DiscoverPage,
});

// ── format → icon tile ──────────────────────────────────────────────────────
type Fmt = "Book" | "Course" | "Report";
const FMT: Record<Fmt, { Icon: LucideIcon; tile: string; cta: string; hours: number }> = {
  Book: {
    Icon: BookOpen,
    tile: "bg-purple-500/10 border-purple-500/20 text-purple-300",
    cta: "Read",
    hours: 5,
  },
  Course: {
    Icon: GraduationCap,
    tile: "bg-sky-500/10 border-sky-500/20 text-sky-300",
    cta: "Visit",
    hours: 4,
  },
  Report: {
    Icon: Rss,
    tile: "bg-emerald-500/10 border-emerald-500/20 text-emerald-300",
    cta: "Follow",
    hours: 1,
  },
};

type Item = { id: string; title: string; sub: string; fmt: Fmt; url?: string };
const ALL: Record<string, Item> = {};
books.forEach(
  (b) => (ALL[b.id] = { id: b.id, title: b.title, sub: b.author, fmt: "Book", url: b.url }),
);
courses.forEach(
  (c) => (ALL[c.id] = { id: c.id, title: c.title, sub: c.desc, fmt: "Course", url: c.url }),
);
reports.forEach(
  (r) => (ALL[r.id] = { id: r.id, title: r.title, sub: r.year, fmt: "Report", url: r.url }),
);

// ── Curated Web Resources — real websites from the eDC guide (Section 1 & 15)
type GemCategory = "Validation" | "Community" | "India Ecosystem" | "Investor Research" | "Podcast";
interface Gem {
  id: string;
  title: string;
  url: string;
  desc: string;
  category: GemCategory;
}

const GEM_CATEGORY: Record<GemCategory, { Icon: LucideIcon; tile: string }> = {
  Validation: { Icon: Sparkles, tile: "bg-purple-500/10 border-purple-500/20 text-purple-300" },
  Community: { Icon: Users, tile: "bg-accent/10 border-accent/20 text-accent" },
  "India Ecosystem": {
    Icon: Newspaper,
    tile: "bg-emerald-500/10 border-emerald-500/20 text-emerald-300",
  },
  "Investor Research": { Icon: TrendingUp, tile: "bg-primary/10 border-primary/20 text-primary" },
  Podcast: { Icon: Mic, tile: "bg-sky-500/10 border-sky-500/20 text-sky-300" },
};

const GEMS: Gem[] = [
  {
    id: "g1",
    title: "Strategyzer Canvas",
    url: "https://www.strategyzer.com/library/the-business-model-canvas",
    desc: "One-page framework for customers, value propositions, channels, revenues and costs. Treat every box as a hypothesis until tested.",
    category: "Validation",
  },
  {
    id: "g2",
    title: "Paul Graham Essays",
    url: "https://paulgraham.com/articles.html",
    desc: "Start with 'How to Get Startup Ideas', 'Do Things That Do Not Scale' and 'Default Alive or Default Dead'. Essential founder reading.",
    category: "Validation",
  },
  {
    id: "g3",
    title: "YC Co-Founder Matching",
    url: "https://www.ycombinator.com/cofounder-matching",
    desc: "Find complementary co-founders with compatible commitment and working habits. Follow up with a trial project before committing.",
    category: "Community",
  },
  {
    id: "g4",
    title: "Indie Hackers",
    url: "https://www.indiehackers.com/",
    desc: "Community focused on building profitable online businesses. Compare small business models and distribution experiments outside the VC path.",
    category: "Community",
  },
  {
    id: "g5",
    title: "Inc42",
    url: "https://inc42.com/",
    desc: "Indian technology and startup news, analysis and research. Useful for discovering companies, sectors and financing announcements.",
    category: "India Ecosystem",
  },
  {
    id: "g6",
    title: "YourStory",
    url: "https://yourstory.com/",
    desc: "Founder stories and startup reporting. Useful for case studies and discovering regional entrepreneurship activity.",
    category: "India Ecosystem",
  },
  {
    id: "g7",
    title: "OpenVC",
    url: "https://www.openvc.app/",
    desc: "Investor discovery and fundraising workflow platform. Filter by geography, stage and thesis, then verify each investor on their own site.",
    category: "Investor Research",
  },
  {
    id: "g8",
    title: "Crunchbase",
    url: "https://www.crunchbase.com/",
    desc: "Company and investment database. Use funding records to discover comparable companies and investors — corroborate with primary sources.",
    category: "Investor Research",
  },
  {
    id: "g9",
    title: "Acquired Podcast",
    url: "https://www.acquired.fm/",
    desc: "Long-form company histories and strategy discussions. Recognise business model patterns — but hindsight can make outcomes look inevitable.",
    category: "Podcast",
  },
  {
    id: "g10",
    title: "Founders Podcast",
    url: "https://www.founderspodcast.com/",
    desc: "Biography-based founder lessons. Use for reflection and historical context. Compare contrasting founders rather than copying a single biography.",
    category: "Podcast",
  },
  {
    id: "g11",
    title: "First Round Review",
    url: "https://review.firstround.com/",
    desc: "Detailed company-building articles on hiring, product, customer discovery and leadership. Search for the immediate operating problem.",
    category: "Community",
  },
  {
    id: "g12",
    title: "Tracxn",
    url: "https://tracxn.com/",
    desc: "Private market research platform for sector maps and company discovery. Use as a research aid, not a source of guaranteed current investor terms.",
    category: "Investor Research",
  },
];

// ── goals ────────────────────────────────────────────────────────────────────
interface Goal {
  id: string;
  text: string;
  done: boolean;
}
const DEFAULT_WEEK: Goal[] = [
  { id: "w1", text: "Finish reading The Mom Test", done: false },
  { id: "w2", text: "Talk to 5 potential users", done: false },
];
const DEFAULT_MONTH: Goal[] = [
  { id: "m1", text: "Complete YC Startup School module 1–3", done: false },
  { id: "m2", text: "Read one industry report end-to-end", done: false },
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
  const toggle = (id: string) =>
    persist(goals.map((g) => (g.id === id ? { ...g, done: !g.done } : g)));
  const add = (text: string) => persist([...goals, { id: crypto.randomUUID(), text, done: false }]);
  const edit = (id: string, text: string) =>
    persist(goals.map((g) => (g.id === id ? { ...g, text } : g)));
  const remove = (id: string) => persist(goals.filter((g) => g.id !== id));

  return { goals, toggle, add, edit, remove };
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
      className={`group flex items-center gap-3 rounded-xl border p-3 cursor-pointer transition-all ${
        goal.done
          ? "bg-accent/[0.06] border-accent/30"
          : "bg-background border-border hover:border-accent/30"
      }`}
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

// ── icon tile + library card ────────────────────────────────────────────────
function IconTile({ fmt }: { fmt: Fmt }) {
  const f = FMT[fmt];
  return (
    <div
      className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 ${f.tile}`}
    >
      <f.Icon className="w-5 h-5" />
    </div>
  );
}

function LibraryCard({ item }: { item: Item }) {
  const f = FMT[item.fmt];
  const { saved, toggle } = useSaved();
  const isSaved = saved.includes(item.id);
  const handleCta = () => {
    if (item.url) window.open(item.url, "_blank", "noopener,noreferrer");
  };
  return (
    <div className="card-lift bg-card border border-border rounded-2xl p-5 flex flex-col gap-3 h-full">
      <div className="flex items-start justify-between">
        <IconTile fmt={item.fmt} />
        <button onClick={() => toggle(item.id)} aria-label="Save">
          <Bookmark
            className={`w-4 h-4 ${isSaved ? "fill-accent text-accent" : "text-muted-foreground hover:text-foreground"}`}
          />
        </button>
      </div>
      <div className="flex-1">
        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          {item.fmt}
        </span>
        <h4 className="font-semibold leading-snug mt-1">{item.title}</h4>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{item.sub}</p>
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <span className="text-xs text-muted-foreground flex items-center gap-1">
          <Clock className="w-3 h-3" /> {f.hours}h
        </span>
        <button
          onClick={handleCta}
          className="text-xs font-semibold text-accent hover:underline inline-flex items-center gap-1"
        >
          {f.cta} <ExternalLink className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}

function GemCard({ gem }: { gem: Gem }) {
  const c = GEM_CATEGORY[gem.category];
  const domain = gem.url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  return (
    <a
      href={gem.url}
      target="_blank"
      rel="noopener noreferrer"
      className="card-lift group bg-card border border-border rounded-2xl p-5 flex flex-col gap-3 h-full hover:border-accent/40 transition-colors"
    >
      <div className="flex items-start justify-between">
        <div
          className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 ${c.tile}`}
        >
          <c.Icon className="w-5 h-5" />
        </div>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border bg-secondary text-secondary-foreground border-border">
          {gem.category}
        </span>
      </div>
      <div className="flex-1">
        <h4 className="font-semibold leading-snug">{gem.title}</h4>
        <p className="text-[11px] text-muted-foreground/70 mt-0.5">{domain}</p>
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{gem.desc}</p>
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <span className="text-xs text-muted-foreground">External site</span>
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-accent group-hover:gap-1.5 transition-all">
          Visit <ExternalLink className="w-3 h-3" />
        </span>
      </div>
    </a>
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

function DiscoverPage() {
  const { user } = useUser();
  const [hydrated, setHydrated] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => setHydrated(true), []);

  const totalResources = books.length + courses.length + reports.length;
  const nResources = useCountUp(totalResources);

  if (!hydrated) return null;
  if (!user) return <Navigate to="/" />;

  const match = (t: string) => t.toLowerCase().includes(query.toLowerCase());
  const fBooks = books.filter((b) => match(b.title) || match(b.author));
  const fCourses = courses.filter((c) => match(c.title) || match(c.desc));
  const fReports = reports.filter((r) => match(r.title));

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-12">
        {/* Hero — warm, no stage/domain shown */}
        <section className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 md:p-8">
          {/* <NeuralBackground className="opacity-50" /> */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/15 via-transparent to-primary/10 pointer-events-none" />
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center gap-6 justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-purple-300" />
                </span>
                <h1 className="text-3xl md:text-4xl font-bold">Discover</h1>
              </div>
              <p className="text-muted-foreground max-w-2xl">
                A quiet corner to learn, one goal at a time. Set what you want to get through this
                week and this month — we'll help you get there.
              </p>
              <div className="grid grid-cols-3 gap-3 mt-6 max-w-lg">
                <div className="bg-card/60 backdrop-blur border border-border rounded-2xl p-4">
                  <Layers className="w-4 h-4 text-accent mb-2.5" />
                  <div className="text-2xl font-bold leading-none">{nResources}</div>
                  <div className="text-xs text-muted-foreground mt-1.5">resources curated</div>
                </div>
                <div className="bg-card/60 backdrop-blur border border-border rounded-2xl p-4">
                  <Sparkles className="w-4 h-4 text-accent mb-2.5" />
                  <div className="text-2xl font-bold leading-none">15</div>
                  <div className="text-xs text-muted-foreground mt-1.5">books to read</div>
                </div>
                <div className="bg-card/60 backdrop-blur border border-border rounded-2xl p-4">
                  <Globe className="w-4 h-4 text-accent mb-2.5" />
                  <div className="text-2xl font-bold leading-none">156</div>
                  <div className="text-xs text-muted-foreground mt-1.5">directory entries</div>
                </div>
              </div>
            </div>

            {/* right-side: motivational quote, fills the space */}
            <div className="hidden lg:flex w-[380px] shrink-0 flex-col justify-center bg-card/50 backdrop-blur border border-purple-500/20 rounded-2xl p-7">
              <Quote className="w-7 h-7 text-purple-300/60 mb-3" />
              <p className="text-xl font-semibold leading-snug">
                "Read 500 pages every day. That's how knowledge works — it builds up, like compound
                interest."
              </p>
              <p className="text-sm text-muted-foreground mt-3">— Warren Buffett</p>
            </div>
          </div>
        </section>

        {/* Weekly + Monthly goals */}
        {/* <ScrollReveal> */}
        <div className="grid md:grid-cols-2 gap-6">
          <GoalPanel
            title="This week's goals"
            storageKey="edc:discover:goals:week"
            fallback={DEFAULT_WEEK}
          />
          <GoalPanel
            title="This month's goals"
            storageKey="edc:discover:goals:month"
            fallback={DEFAULT_MONTH}
          />
        </div>
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
                Start here
              </p>
              <p className="text-base font-semibold">The Mom Test — Rob Fitzpatrick</p>
              <p className="text-xs text-muted-foreground mt-1">
                Ask about the last time the problem occurred, the workaround used, and its actual
                cost.
              </p>
            </div>
          </div>
          <div className="rounded-2xl border border-sky-500/20 bg-gradient-to-br from-sky-500/12 to-primary/8 p-6 flex items-start gap-4">
            <span className="w-10 h-10 rounded-xl bg-sky-500/15 border border-sky-500/25 flex items-center justify-center shrink-0">
              <Lightbulb className="w-5 h-5 text-sky-300" />
            </span>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-sky-300 mb-1.5">
                eDC guide principle
              </p>
              <p className="text-sm font-medium leading-relaxed">
                A useful learning session ends with a customer conversation, a decision, or an
                experiment. Reading alone is not validation.
              </p>
            </div>
          </div>
        </div>
        {/* </ScrollReveal> */}

        {/* Hidden Gems — real websites worth knowing about */}
        {/* <ScrollReveal> */}
        <section>
          <div className="flex items-center gap-2.5 mb-2">
            <span className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-accent" />
            </span>
            <h2 className="text-xl font-bold">Curated Web Resources</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-5 ml-[42px]">
            Real websites from the eDC guide — validation frameworks, founder communities, India
            ecosystem news and investor research tools.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {GEMS.map((gem) => (
              <GemCard key={gem.id} gem={gem} />
            ))}
          </div>
        </section>
        {/* </ScrollReveal> */}

        {/* Browse library */}
        {/* <ScrollReveal> */}
        <section>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <h2 className="text-xl font-bold">Browse books, courses & newsletters</h2>
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search books, courses, newsletters…"
                className="pl-9"
              />
            </div>
          </div>

          {[
            { label: "Books", items: fBooks.map((b) => ALL[b.id]).filter(Boolean) },
            {
              label: "Online Courses & Frameworks",
              items: fCourses.map((c) => ALL[c.id]).filter(Boolean),
            },
            {
              label: "Blogs, Newsletters & Podcasts",
              items: fReports.map((r) => ALL[r.id]).filter(Boolean),
            },
          ]
            .filter((g) => g.items.length > 0)
            .map((group) => (
              <div key={group.label} className="mb-8">
                <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
                  {group.label}
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {group.items.map((item) => (
                    <LibraryCard key={item.id} item={item} />
                  ))}
                </div>
              </div>
            ))}

          {fBooks.length + fCourses.length + fReports.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-12">
              No resources match "{query}".
            </p>
          )}
        </section>
        {/* </ScrollReveal> */}
      </div>
    </AppShell>
  );
}
