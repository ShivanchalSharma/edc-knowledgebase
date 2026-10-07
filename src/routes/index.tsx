import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { LatestBlogs } from "@/components/edc/LatestBlogs";
import { Button } from "@/components/ui/button";
import { AuthDialog } from "@/components/edc/AuthDialog";
import { CookieBanner } from "@/components/edc/CookieBanner";
import { NewsAndEvents } from "@/components/edc/NewsAndEvents";
import { FooterTagline } from "@/components/edc/FooterTagline";
import {
  ArrowRight,
  House,
  Info,
  Mail,
  ShieldCheck,
  Cookie,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Knowledgebase — eDC IIT Delhi" },
      {
        name: "description",
        content:
          "A resource library on startups and entrepreneurship, by eDC IIT Delhi, for students.",
      },
      { property: "og:title", content: "knowledgebase — eDC IIT Delhi" },
      {
        property: "og:description",
        content:
          "A resource library on startups and entrepreneurship, by eDC IIT Delhi, for students.",
      },
    ],
  }),
  component: Index,
});

const sections = [
  {
    to: "/discover",
    title: "Discover",
    desc: "Books, courses, podcasts and reports to learn how startups work.",
  },
  {
    to: "/build",
    title: "Build",
    desc: "Tools, competitions and communities for turning an idea into something real.",
  },
  {
    to: "/raise",
    title: "Raise",
    desc: "Grants, government schemes, accelerators and investors.",
  },
];

function Index() {
  const [authOpen, setAuthOpen] = useState(false);
  const [mode, setMode] = useState<"signup" | "signin">("signup");
  const open = (m: "signup" | "signin") => {
    setMode(m);
    setAuthOpen(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar — full width, wordmark left, buttons right */}
      <header className="border-b border-border">
        <div className="h-16 px-6 md:px-12 flex items-center justify-between">
          <Link
  to="/"
  className="flex items-center gap-3 text-xl font-semibold tracking-tight"
  style={{
    fontFamily: "'Source Serif 4 Variable', Georgia, serif",
  }}
>
  <img
    src="/edc-logo.png"
    alt="eDC IIT Delhi"
    className="h-8 w-8 object-contain"
  />
  <span>Knowledgebase</span>
</Link>
          <div className="flex items-center gap-1">
            <Button variant="ghost" onClick={() => open("signin")}>
              Sign in
            </Button>
            <Button variant="outline" onClick={() => open("signup")}>
              Sign up
            </Button>
          </div>
        </div>
      </header>

      {/* Split layout: text left, photo right */}
      <main className="grid lg:grid-cols-2 lg:min-h-[calc(100vh-4rem)]">
        <div className="flex flex-col justify-center px-6 md:px-12 py-12 lg:py-16">
          <p className="text-sm text-muted-foreground mb-4">eDC IIT Delhi</p>
          <h1 className="text-3xl md:text-5xl leading-tight mb-5 max-w-xl">
            Learn about startups and entrepreneurship.
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mb-10">
            A resource library by the entrepreneurship club at IIT Delhi, put together for students
            who want to understand how startups are built and funded.
          </p>

          <ul className="border-b border-border max-w-xl">
            {sections.map((s) => (
              <li key={s.title} className="border-t border-border">
                <Link
                  to={s.to}
                  className="group grid grid-cols-[5.5rem_1fr_auto] items-baseline gap-4 py-5 -mx-3 px-3 hover:bg-muted/60 transition-colors"
                >
                  <h2 className="text-xl">{s.title}</h2>
                  <p className="text-muted-foreground">{s.desc}</p>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-8 text-muted-foreground max-w-xl">
            Create an account to save resources and keep your preferences.{" "}
            <button
              onClick={() => open("signup")}
              className="text-foreground underline underline-offset-4 hover:text-primary"
            >
              Sign up
            </button>
          </p>
        </div>

        {/* Photo — sits above the text on mobile, to the right on large screens */}
        <div className="order-first lg:order-none h-56 lg:h-auto bg-muted">
          <img
            src="/hero.jpg"
            alt="eDC IIT Delhi"
            className="h-full w-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>
      </main>

      <LatestBlogs />
      <NewsAndEvents />

{/* Footer */}
<footer className="border-t border-border mt-16">
  <div className="px-6 md:px-12 py-8">
    {/* Quick Access Heading */}
    <h3
      className="text-sm font-bold tracking-widest mb-7"
      style={{
        fontFamily: "'Source Serif 4 Variable', Georgia, serif",
      }}
    >
      QUICK ACCESS
    </h3>

    {/* Quick Access Links */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-5">
      <Link
        to="/"
        className="flex items-center gap-3 text-base text-muted-foreground hover:text-foreground transition-colors"
      >
        <House className="w-5 h-5" />
        <span>Home</span>
      </Link>

      <Link
        to="/about"
        className="flex items-center gap-3 text-base text-muted-foreground hover:text-foreground transition-colors"
      >
        <Info className="w-5 h-5" />
        <span>About eDC</span>
      </Link>

      <Link
        to="/contact"
        className="flex items-center gap-3 text-base text-muted-foreground hover:text-foreground transition-colors"
      >
        <Mail className="w-5 h-5" />
        <span>Contact</span>
      </Link>

      <Link
        to="/privacy"
        className="flex items-center gap-3 text-base text-muted-foreground hover:text-foreground transition-colors"
      >
        <ShieldCheck className="w-5 h-5" />
        <span>Privacy Policy</span>
      </Link>

      <Link
        to="/cookies"
        className="flex items-center gap-3 text-base text-muted-foreground hover:text-foreground transition-colors"
      >
        <Cookie className="w-5 h-5" />
        <span>Cookie Policy</span>
      </Link>
    </div>
  </div>

  {/* Footer Tagline */}
  <FooterTagline />
</footer>

      <AuthDialog open={authOpen} onOpenChange={setAuthOpen} mode={mode} onSwitchMode={setMode} />
      <CookieBanner />
    </div>
  );
}
