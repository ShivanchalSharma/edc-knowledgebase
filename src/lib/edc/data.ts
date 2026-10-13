export type Category = "FUNDING" | "EVENT" | "REPORT" | "DEADLINE" | "LEARN" | "MENTOR";

export interface Resource {
  id: string;
  title: string;
  description: string;
  category: Category;
  tags: string[];
  date?: string;
  deadlineDays?: number;
  emoji: string;
  isNew?: boolean;
  link?: string;
}

export const whatsNew: Resource[] = [
  { id: "n1", title: "YC Startup School — Free curriculum open", description: "Weekly execution course on ideas, users, products and growth. Join alongside customer conversations.", category: "LEARN", tags: ["Free", "Global"], date: "Ongoing", emoji: "🎓", isNew: true, link: "https://www.startupschool.org/" },
  { id: "n2", title: "NIDHI PRAYAS 2.0 — Prototype grants up to ₹40L", description: "DST prototype support through PRAYAS Centres for technology innovators.", category: "FUNDING", tags: ["Grant", "DeepTech"], date: "Check intake", emoji: "🔬", isNew: true, link: "https://nidhi.dst.gov.in/prayas2-0/" },
  { id: "n3", title: "eDC IIT Delhi — Student programmes open", description: "Campus gateway for founder peers, Venture Studio and Thesis to Venture.", category: "EVENT", tags: ["IITD Exclusive", "Free"], date: "Check intake", emoji: "🚀", isNew: true, link: "https://www.edciitd.com/" },
  { id: "n4", title: "BIRAC BIG Grant — up to ₹50L for biotech", description: "Grant-in-aid for biotech innovators pursuing commercial proof of concept.", category: "FUNDING", tags: ["Grant", "Biotech"], date: "Check intake", emoji: "💰", isNew: true, link: "https://www.birac.nic.in/desc_new.php?id=275" },
  { id: "n5", title: "Accel Atoms — Pre-seed programme open", description: "Pre-seed scaling programme for Indian and Indian-origin founders.", category: "FUNDING", tags: ["Accelerator", "India"], date: "Check intake", emoji: "⚡", isNew: true, link: "https://atoms.accel.com/" },
];

export const pickedForYou: Resource[] = [
  { id: "p1", title: "FITT IIT Delhi — Incubation", description: "Incubation, mentoring and links to IIT Delhi technology transfer and innovation facilities.", category: "MENTOR", tags: ["IITD Exclusive", "Free"], emoji: "🏛️", link: "https://www.fitt-iitd.in/web/incubation" },
  { id: "p2", title: "IHFC IIT Delhi — Deep Tech Funding", description: "Pre-seed, incubation and acceleration for deep technology and robotics-related ventures.", category: "FUNDING", tags: ["DeepTech", "Pre-seed"], emoji: "🔬", link: "https://www.ihfc.co.in/startup-incubation/" },
  { id: "p3", title: "The Mom Test (Book)", description: "How to learn from customers through concrete past behaviour rather than compliments.", category: "LEARN", tags: ["Validation", "Must-read"], emoji: "📖", link: "https://www.momtestbook.com/" },
  { id: "p4", title: "Startup India Seed Fund — up to ₹50L", description: "Validation grants up to ₹20L and commercialisation instruments up to ₹50L for DPIIT-recognised startups.", category: "FUNDING", tags: ["Grant", "Government"], emoji: "💰", link: "https://www.fitt-iitd.in/web/sisfs" },
  { id: "p5", title: "Y Combinator — $500K deal", description: "USD 125K for 7% plus USD 375K uncapped MFN SAFE. In-person San Francisco batch.", category: "FUNDING", tags: ["Accelerator", "Global"], emoji: "🌱", link: "https://www.ycombinator.com/deal" },
  { id: "p6", title: "Sequoia Business Plan Guide", description: "Concise guide for explaining company purpose, problem, solution, market, competition and team.", category: "LEARN", tags: ["Free", "Pitch"], emoji: "🎯", link: "https://sequoiacap.com/article/writing-a-business-plan/" },
];

// ── Section 13: Books for practical founder problems (EDC129–EDC142) ──────────
export const books = [
  { id: "b1",  title: "The Mom Test",                          author: "Rob Fitzpatrick",                       url: "https://www.momtestbook.com/",                                                              desc: "Learn from customers through concrete past behaviour rather than compliments or hypothetical purchase intent." },
  { id: "b2",  title: "The Lean Startup",                      author: "Eric Ries",                             url: "https://theleanstartup.com/",                                                               desc: "Explains experimentation, minimum viable products and learning loops." },
  { id: "b3",  title: "Disciplined Entrepreneurship",          author: "Bill Aulet",                            url: "https://www.disciplinedentrepreneurship.com/",                                               desc: "A step-based approach to choosing customers, defining value and developing a business." },
  { id: "b4",  title: "Founding Sales",                        author: "Pete Kazanjy",                          url: "https://www.foundingsales.com/",                                                             desc: "A practical founder-led sales handbook covering targeting, messaging, outreach and repeatable process." },
  { id: "b5",  title: "Obviously Awesome",                     author: "April Dunford",                         url: "https://www.aprildunford.com/books",                                                         desc: "Positioning framework for clarifying competitive alternatives and the customers who value them." },
  { id: "b6",  title: "Sprint",                                author: "Jake Knapp, John Zeratsky & Braden Kowitz", url: "https://www.thesprintbook.com/",                                                     desc: "Structured design sprint method for prototyping and learning quickly." },
  { id: "b7",  title: "Venture Deals",                         author: "Brad Feld & Jason Mendelson",           url: "https://www.venturedeals.com/",                                                              desc: "Explains venture financing mechanics and term sheet concepts." },
  { id: "b8",  title: "The Hard Thing About Hard Things",      author: "Ben Horowitz",                          url: "https://a16z.com/book/the-hard-thing-about-hard-things/",                                    desc: "Founder and CEO lessons about managing under pressure." },
  { id: "b9",  title: "Zero to One",                           author: "Peter Thiel & Blake Masters",           url: "https://www.penguinrandomhouse.com/search/?q=Zero%20to%20One",                               desc: "Explores creating distinctive businesses and durable advantages." },
  { id: "b10", title: "Traction",                              author: "Gabriel Weinberg & Justin Mares",       url: "https://www.penguinrandomhouse.com/search/?q=Traction%20Gabriel%20Weinberg",                  desc: "A framework for comparing and testing customer acquisition channels." },
  { id: "b11", title: "The Cold Start Problem",                author: "Andrew Chen",                           url: "https://www.coldstart.com/",                                                                 desc: "Explores how networks start and expand — essential for marketplace founders." },
  { id: "b12", title: "High Output Management",               author: "Andrew Grove",                          url: "https://www.penguinrandomhouse.com/search/?q=High%20Output%20Management",                    desc: "Management classic on operating processes, managerial output and organisational effectiveness." },
  { id: "b13", title: "Rework",                                author: "Jason Fried & David Heinemeier Hansson", url: "https://37signals.com/books/",                                                              desc: "Essays on building and running a focused business. Useful for bootstrapped teams." },
  { id: "b14", title: "The Founder's Dilemmas",               author: "Noam Wasserman",                        url: "https://press.princeton.edu/search?keyword=The%20Founder%27s%20Dilemmas",                    desc: "Examines recurring choices and tensions in founding teams around ownership and control." },
  { id: "b15", title: "The Almanack of Naval Ravikant",        author: "Eric Jorgenson",                        url: "https://www.navalmanack.com/",                                                               desc: "A collection of perspectives on wealth, judgment and personal decision making." },
];

// ── Section 1: Learn & Validate — online learning resources (EDC001–EDC009) ──
export const courses = [
  { id: "c1", title: "YC Startup School",       desc: "Free startup curriculum covering ideas, users, products and growth. Use it as a weekly execution course.", url: "https://www.startupschool.org/" },
  { id: "c2", title: "YC Startup Library",      desc: "Talks and essays on product, sales, fundraising and company building. Search for the immediate problem you face.", url: "https://www.ycombinator.com/library/search" },
  { id: "c3", title: "MIT OpenCourseWare",      desc: "Free university course materials. Search for entrepreneurship, new enterprises and product design.", url: "https://ocw.mit.edu/" },
  { id: "c4", title: "NPTEL and SWAYAM",        desc: "Indian platform for entrepreneurship, innovation and business model courses with certificates.", url: "https://onlinecourses.nptel.ac.in/" },
  { id: "c5", title: "Startup India Learning",  desc: "Government learning resources for business planning and understanding the Indian startup support ecosystem.", url: "https://www.startupindia.gov.in/content/sih/en/learning-and-development_v2.html" },
  { id: "c6", title: "Paul Graham Essays",      desc: "Start with 'How to Get Startup Ideas', 'Do Things That Do Not Scale' and 'Default Alive or Default Dead'.", url: "https://paulgraham.com/articles.html" },
  { id: "c7", title: "Strategyzer Canvas",      desc: "One-page framework for customers, value propositions, channels, revenues and costs. Treat every box as a hypothesis.", url: "https://www.strategyzer.com/library/the-business-model-canvas" },
  { id: "c8", title: "YC Co-Founder Matching",  desc: "Founder matching platform for solo founders seeking complementary collaborators. Run a trial project first.", url: "https://www.ycombinator.com/cofounder-matching" },
];

// ── Section 14: Blogs, Newsletters & Podcasts (EDC143–EDC151) ────────────────
export const reports = [
  { id: "rp1",  title: "First Round Review",       year: "Blog",       url: "https://review.firstround.com/",       desc: "Detailed company-building articles on hiring, product, customer discovery and leadership." },
  { id: "rp2",  title: "Lenny's Newsletter",       year: "Newsletter", url: "https://www.lennysnewsletter.com/",    desc: "Operator interviews and product growth analysis. Some material is subscription-based." },
  { id: "rp3",  title: "SaaStr",                   year: "Blog",       url: "https://www.saastr.com/",              desc: "Content and community around software business growth — sales, customer success, revenue ops." },
  { id: "rp4",  title: "Acquired",                 year: "Podcast",    url: "https://www.acquired.fm/",             desc: "Long-form company histories and strategy discussions. Recognise business model patterns." },
  { id: "rp5",  title: "20VC",                     year: "Podcast",    url: "https://www.thetwentyminutevc.com/",   desc: "Interviews about venture investing, products and company building." },
  { id: "rp6",  title: "Founders Podcast",         year: "Podcast",    url: "https://www.founderspodcast.com/",     desc: "Biography-based founder lessons. Use for reflection and historical context." },
  { id: "rp7",  title: "Inc42",                    year: "News",       url: "https://inc42.com/",                   desc: "Indian technology and startup news, analysis and research for the Indian ecosystem." },
  { id: "rp8",  title: "YourStory",                year: "News",       url: "https://yourstory.com/",               desc: "Founder stories and startup reporting from across India." },
  { id: "rp9",  title: "Entrackr",                 year: "News",       url: "https://entrackr.com/",                desc: "Startup and technology reporting, including business and funding coverage." },
];

// ── Section 11: Competitions & Student Opportunities (EDC112–EDC116) ─────────
export const competitions = [
  { id: "co1", title: "Smart India Hackathon",       deadline: 60,  prize: "Prizes per problem statement",   url: "https://www.sih.gov.in/",               desc: "National challenge-based student initiative. Coordinate with your institution and choose a problem you can validate with a user." },
  { id: "co2", title: "Hult Prize",                  deadline: 90,  prize: "USD 1M seed for the winner",      url: "https://www.hultprize.org/",            desc: "Competition for student businesses addressing substantial problems. Read current eligibility before applying." },
  { id: "co3", title: "Eureka — IIT Bombay",         deadline: 45,  prize: "Check current edition",           url: "https://www.ecell.in/eureka/",          desc: "Business model competition from IIT Bombay's E-Cell. Read the current rulebook and match the relevant track." },
  { id: "co4", title: "Campus Fund Grand Challenge", deadline: 30,  prize: "Cash award + investor access",    url: "https://yourcampusfund.com/grand-challange/", desc: "Competition and discovery route for student-led startups. Check current eligibility and graduation conditions." },
  { id: "co5", title: "MIT 100K",                    deadline: 120, prize: "USD 100K+ across categories",     url: "https://www.mit100k.org/",              desc: "University entrepreneurship competition with Pitch, Accelerate and Launch contests. Check affiliation rules before applying." },
];

// ── Section 3: Indian Public Funding & Support (EDC026–EDC038) ───────────────
export const funders = [
  { id: "fu1",  title: "Startup India Seed Fund (SISFS)", amount: "Up to ₹50L",      stage: "DPIIT-recognised startups, ≤2 yrs old", deadline: "Rolling via incubators", url: "https://www.fitt-iitd.in/web/sisfs",                                                          desc: "Validation grant up to ₹20L; commercialisation instrument up to ₹50L. Different instruments, not a combined guarantee." },
  { id: "fu2",  title: "NIDHI PRAYAS 2.0",              amount: "Up to ₹40L",      stage: "Technology prototype innovators",        deadline: "Check centre calls",    url: "https://nidhi.dst.gov.in/prayas2-0/",                                                          desc: "DST prototype support — up to ₹20L through PRAYAS Centres, up to ₹40L through Advance PRAYAS Centres." },
  { id: "fu3",  title: "NIDHI Entrepreneur in Residence",amount: "₹10K–₹30K/month", stage: "Aspiring full-time tech entrepreneurs",  deadline: "Check intake",          url: "https://www.nidhi-eir.in/program.php",                                                         desc: "12-month stipend. Cannot run concurrently with an education programme or paid assignment." },
  { id: "fu4",  title: "BIRAC BIG Grant",                amount: "Up to ₹50L",      stage: "Biotech — commercial proof of concept",  deadline: "Check call",            url: "https://www.birac.nic.in/desc_new.php?id=275",                                                 desc: "Grant-in-aid for translation and commercialisation potential, not unrestricted basic research." },
  { id: "fu5",  title: "MeitY TIDE 2.0",                 amount: "Check centre",    stage: "Technology ventures in scheme themes",   deadline: "Check implementing centre", url: "https://msh.meity.gov.in/schemes/tide",                                                     desc: "Incubation and support routed through selected centres. Do not merge with NIDHI or GENESIS." },
  { id: "fu6",  title: "iDEX Defence Innovation",        amount: "Up to ₹25Cr (ADITI)", stage: "Defence and dual-use technology teams",  deadline: "Per challenge",     url: "https://www.idex.gov.in/how_to_apply",                                                         desc: "Challenge-based pathway. ADITI ceiling is for advanced challenges only — not a standard award." },
  { id: "fu7",  title: "IN SPACe Seed Fund",             amount: "Check announcement", stage: "Indian space technology ventures",    deadline: "Per call",              url: "https://www.inspace.gov.in/inspace?id=kb_article&sysparm_article=KB0010016",                 desc: "Seed support for space sector. Keep funding separate from authorisation to undertake regulated space activities." },
  { id: "fu8",  title: "MUDRA PMMY",                     amount: "Up to ₹20L (Tarun+)", stage: "Micro enterprises seeking credit",  deadline: "Lender assessment",     url: "https://www.financialservices.gov.in/pradhan-mantri-mudra-yojana-pmmy",                       desc: "A loan route, not venture funding. Tarun Plus is for entrepreneurs who repaid earlier Tarun loans." },
  { id: "fu9",  title: "Credit Guarantee (CGSS)",        amount: "Up to ₹20Cr guarantee", stage: "DPIIT-recognised startups",       deadline: "Via lender",            url: "https://www.startupindia.gov.in/content/sih/en/credit-guarantee-scheme-for-startups.html",  desc: "Partial risk cover for lender — not a direct grant. Borrower's repayment obligation remains." },
  { id: "fu10", title: "Startup India / DPIIT Recognition", amount: "Status — not cash", stage: "Eligible Indian startup entities",  deadline: "Rolling",               url: "https://www.startupindia.gov.in/",                                                              desc: "Official recognition relevant to scheme eligibility. Does not automatically confer every tax benefit." },
];

// ── Section 4: Microgrants & Founder Fellowships (EDC039–EDC051) ─────────────
export const microgrants = [
  { id: "mg1",  title: "Kothari Fellowship",         amount: "₹25K–₹25L",         eligibility: "Indian builders under 25",          status: "Rolling",              url: "https://www.kotharifellowship.com/",                    desc: "Grants, mentoring and a fellow community. The range is not an entitlement to the maximum." },
  { id: "mg2",  title: "Emergent Ventures",          amount: "Project-dependent",  eligibility: "Independent thinkers, age 13+",     status: "Application visible",  url: "https://www.mercatus.org/emergent-ventures",            desc: "Worldwide grant with India tranche. AI-written applications disallowed except for proofreading." },
  { id: "mg3",  title: "Bagel Fund",                 amount: "USD 100–500",        eligibility: "Young ambitious builders",           status: "Application visible",  url: "https://bagel.fund/",                                   desc: "Non-dilutive ideation capital for a concrete prototype or experiment." },
  { id: "mg4",  title: "Inflection Grants",          amount: "Up to USD 2,000",    eligibility: "Under 25 at an inflection point",   status: "Application visible",  url: "https://www.inflectiongrants.com/",                     desc: "Grants for building, research, skills, art or personal growth — broader than startup incorporation." },
  { id: "mg5",  title: "evm capital",                amount: "USD 100–1,000 avg",  eligibility: "Idea or early project stage",        status: "Application visible",  url: "https://www.evm.capital/",                              desc: "FAQ states average cheques of USD 100–600, sometimes up to USD 1,000. Welcomes across ages." },
  { id: "mg6",  title: "Thiel Fellowship",           amount: "USD 250,000",        eligibility: "Age ≤22, willing to leave school",   status: "Eligibility restricted", url: "https://thielfellowship.org/faq",                     desc: "Two-year fellowship with no equity. Requires leaving school to accept — major educational commitment." },
  { id: "mg7",  title: "Magnificent Grants",         amount: "USD 10,000+",        eligibility: "Unconventional builders under 25",   status: "Check intake",         url: "https://www.magnificentgrants.com/",                    desc: "Two-year support programme without taking company equity. Aimed at outlier projects." },
  { id: "mg8",  title: "Biswas Fast Grants",         amount: "USD 25K–100K",       eligibility: "Institution-affiliated AI+health researchers", status: "Upcoming cycle", url: "https://www.biswasfamilyfoundation.org/science/fast-grants", desc: "Undergrads need faculty sponsorship and can access only USD 25K tier. For-profit companies excluded." },
  { id: "mg9",  title: "Unitary Foundation",         amount: "Microgrants",        eligibility: "Open-source quantum tech contributors", status: "Check intake",      url: "https://unitary.foundation/grants/",                    desc: "International microgrant activity for open-source quantum technology contributors." },
  { id: "mg10", title: "1517 Medici Project",        amount: "Min USD 1,000",      eligibility: "North America-based students/builders", status: "Geography restricted", url: "https://www.1517fund.com/medici",                   desc: "Cannot issue grants to teams based outside North America. India-based teams contact for community support only." },
];

// ── Section 12: Pitch & Operating Resources (EDC121–EDC128) ──────────────────
export const pitchResources = [
  { id: "pr1", title: "YC SAFE Documents",           url: "https://www.ycombinator.com/documents",                          desc: "Official SAFE documents and explanations. A SAFE is a financing instrument, not a grant." },
  { id: "pr2", title: "Sequoia Business Plan Guide", url: "https://sequoiacap.com/article/writing-a-business-plan/",        desc: "Concise guide for explaining company purpose, problem, solution, market, competition and team." },
  { id: "pr3", title: "100X iSAFE Explainer",        url: "https://www.100x.vc/isafe",                                      desc: "Provider explanation of India SAFE structures — conversion, valuation, ownership and investor rights." },
  { id: "pr4", title: "Stripe Atlas Guides",          url: "https://stripe.com/atlas/guides",                                desc: "Guides on startup operations and company formation. US incorporation is a separate strategic choice." },
];

// ── Section 15: Communities (EDC152–EDC156) ───────────────────────────────────
export const communities = [
  { id: "cm1", title: "TiE",            url: "https://tie.org/",                  desc: "Entrepreneurship network with local chapters. Choose a chapter matching a concrete need." },
  { id: "cm2", title: "Headstart",      url: "https://www.headstart.in/",         desc: "Startup community with events and founder support. Useful for local learning and introductions." },
  { id: "cm3", title: "Startup Grind",  url: "https://www.startupgrind.com/",     desc: "Event and founder community platform. Validate chapter activity and event dates." },
  { id: "cm4", title: "eChai Ventures", url: "https://echai.ventures/",           desc: "Founder network and city-based events. Arrive with a specific learning goal." },
  { id: "cm5", title: "Indie Hackers",  url: "https://www.indiehackers.com/",     desc: "Community focused on building profitable online businesses outside the VC path." },
];

export const mentors = [
  { id: "m1", name: "Rohan Mehta",  expertise: ["DeepTech", "Fundraising"], status: "Available this week",   initials: "RM" },
  { id: "m2", name: "Aisha Khan",   expertise: ["Consumer", "Growth"],      status: "Booking 2 weeks out",   initials: "AK" },
  { id: "m3", name: "Vikram Iyer",  expertise: ["SaaS", "GTM"],             status: "Available this week",   initials: "VI" },
];

export const deadlines = [
  { id: "d1", title: "FITT Incubation (IITD)", days: 14 },
  { id: "d2", title: "Smart India Hackathon",  days: 60 },
  { id: "d3", title: "BIRAC BIG Grant",        days: 28 },
  { id: "d4", title: "Accel Atoms",            days: 21 },
];

export function getPersonalizedPicks(prefs: import("@/lib/edc/store").Preferences): Resource[] {
  const { stage, domains = [] } = prefs;

  const stageMap: Record<string, string[]> = {
    explorer: ["p3", "p1", "p6"],
    validator: ["p3", "p6", "p1"],
    builder:   ["p1", "p2", "p4"],
    raiser:    ["p4", "p5", "p6"],
    follower:  ["p3", "p6", "p2"],
  };

  const priority = stageMap[stage || "explorer"] || [];
  const base = [...pickedForYou].sort((a, b) => {
    const ai = priority.indexOf(a.id);
    const bi = priority.indexOf(b.id);
    if (ai === -1 && bi === -1) return 0;
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });

  if (domains.length > 0) {
    return base.sort((a, b) => {
      const am = a.tags.some(t => domains.some(d => t.toLowerCase().includes(d.toLowerCase()))) ? -1 : 0;
      const bm = b.tags.some(t => domains.some(d => t.toLowerCase().includes(d.toLowerCase()))) ? -1 : 0;
      return am - bm;
    });
  }

  return base;
}

export function getDefaultTab(prefs: import("@/lib/edc/store").Preferences): string {
  const { stage, needs = [] } = prefs;
  if (needs.includes("funding") || stage === "raiser") return "raise";
  if (needs.includes("labs") || needs.includes("compete") || stage === "builder") return "startup";
  return "learn";
}

export function getPersonalizedMentors(prefs: import("@/lib/edc/store").Preferences) {
  const { domains = [] } = prefs;
  if (domains.length === 0) return mentors;
  return [...mentors].sort((a, b) => {
    const am = a.expertise.some(e => domains.some(d => e.toLowerCase().includes(d.toLowerCase()))) ? -1 : 0;
    const bm = b.expertise.some(e => domains.some(d => e.toLowerCase().includes(d.toLowerCase()))) ? -1 : 0;
    return am - bm;
  });
}

export function getPersonalizedFunders(prefs: import("@/lib/edc/store").Preferences) {
  const { stage } = prefs;
  const stageOrder: Record<string, string[]> = {
    explorer: ["fu10", "fu1"],
    validator: ["fu10", "fu1", "fu2"],
    builder:   ["fu1",  "fu2", "fu4"],
    raiser:    ["fu1",  "fu4", "fu6", "fu2"],
    follower:  [],
  };
  const priority = stageOrder[stage || ""] || [];
  return [...funders].sort((a, b) => {
    const ai = priority.indexOf(a.id);
    const bi = priority.indexOf(b.id);
    if (ai === -1 && bi === -1) return 0;
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });
}