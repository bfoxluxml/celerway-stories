import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  ArrowRight,
  Brain,
  Building2,
  CheckCircle2,
  ChevronRight,
  Clock,
  Database,
  Eye,
  Factory,
  Hammer,
  Layers3,
  Radar,
  ScrollText,
  Server,
  Shield,
  Sparkles,
  Users,
  Wrench,
  Briefcase,
  Zap,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";

const acts = [
  {
    id: "predev",
    kicker: "Act I",
    title: "The Pre-Development Grind",
    subtitle: "Where most AI factories are won or lost — and where CEOs lose the most sleep.",
    icon: Eye,
    color: "from-sky-500 to-cyan-500",
    intro:
      "You’re staring at 6–8 sites. Utility queues are opaque. Pro formas hide $20M+ surprises. Every owner archetype (developer, PE fund, utility pivot) is time-compressed and information-starved. Traditional owner’s reps drown in 20 meetings a day. Axiom starts here — by turning public packet-gold data + your live signals into an instant risk oracle.",
    items: [
      {
        title: "Site Evaluation & Selection",
        detail:
          "LBNL queue + EIA + USGS flood + BLS labor data ingested automatically. Vision Agent overlays satellite imagery. Policy 01–04 flags the exact deviation pattern that killed 3 prior projects in this ISO.",
      },
      {
        title: "Pro Forma Challenge",
        detail:
          "Independent cost & schedule baseline generated in <60 seconds. The system already knows which long-lead items will slip 14 months and why.",
      },
      {
        title: "Team & Permitting Strategy",
        detail:
          "Contracts, AHJ timelines, and contingency plans assembled from corpus memory. No more guessing which jurisdiction runs 9 weeks late.",
      },
    ],
  },
  {
    id: "design",
    kicker: "Act II",
    title: "Design & Procurement",
    subtitle: "Value engineering without false economies. Long-lead items locked before the shovel hits dirt.",
    icon: Factory,
    color: "from-emerald-500 to-teal-500",
    intro:
      "Design documents pour in. MEP coordination is chaos. Transformers have 52–80 week leads. The CEO is reacting, not leading. Axiom inverts this: the governed reasoning engine reviews every drawing against 16 policy domains and your live corpus, surfacing the exact substitutions that saved $18M on the last three identical campuses.",
    items: [
      {
        title: "Design Management + VE",
        detail:
          "Every drawing reviewed in real time. False economies are flagged; true savings are recommended with traceable policy evidence.",
      },
      {
        title: "Long-Lead Oracle",
        detail:
          "Procurement schedule auto-generated and integrated. Public benchmarks + your corpus tell you exactly when to authorize early buys.",
      },
      {
        title: "Coordination & Risk Log",
        detail:
          "Structural/MEP/IT clashes resolved in the model, not the field. Open issues log is policy-grounded and visible to every stakeholder.",
      },
    ],
  },
  {
    id: "construction",
    kicker: "Act III",
    title: "Construction Execution",
    subtitle: "You finally get an independent view of the schedule and cost — not the GC’s story.",
    icon: Hammer,
    color: "from-amber-500 to-orange-500",
    intro:
      "GCs mask problems. Change orders are opportunistic. 2 a.m. cooling alarms arrive on Monday morning. The CEO is vendor-managed instead of owner-led. Axiom changes that forever: AISentry Packet + DC Agents feed real-time OT signals directly into the platform. The independent schedule and cost oracle updates every morning before you open your eyes.",
    items: [
      {
        title: "Independent Schedule & Cost Oracle",
        detail:
          "Critical-path deviations flagged the moment they appear. Delay warnings come with exact remediation steps and historical cost impact.",
      },
      {
        title: "Quality & Subcontractor Health",
        detail:
          "Vision Agent monitors site progress. Packet Agent scores subcontractor OT health 0–100. No more surprises when the electrical sub falls behind.",
      },
      {
        title: "Weekly CEO Briefing",
        detail:
          "One 90-second read. Honest. Actionable. Policy-traceable. Lenders and equity partners get branded draw packages in the same click.",
      },
    ],
  },
  {
    id: "commissioning",
    kicker: "Act IV",
    title: "Commissioning & Acceptance",
    subtitle: "The phase that kills relationships and budgets — now de-risked before the hyperscaler team arrives.",
    icon: Zap,
    color: "from-fuchsia-500 to-violet-500",
    intro:
      "Commissioning is not a formality — it is the $10–30M moment. Cx plans have gaps. Failure modes are missed. Tenant acceptance testing finds problems that should have been caught weeks earlier. Axiom’s DC Agent (CORR-001/002/003) + Packet Agent watch every test in real time. The platform already knows which sequence failed on the last three identical 100 MW builds and exactly how to fix it.",
    items: [
      {
        title: "Cx Plan Review & Gap Analysis",
        detail:
          "Policy 13–15 instantly surfaces missing failure modes. Test sequence optimized against the master schedule.",
      },
      {
        title: "Live Functional Performance Testing",
        detail:
          "Every failover, UPS transfer, and cooling test monitored at protocol level. Root-cause analysis is automatic and traceable.",
      },
      {
        title: "Tenant Acceptance Coordination",
        detail:
          "Hyperscaler team arrives to zero surprises. Sign-off package generated in real time. Commissioning corpus updated for the next project.",
      },
    ],
  },
  {
    id: "axiom",
    kicker: "Act V",
    title: "Axiom Intelligence Platform",
    subtitle: "The Owner’s Rep grind disappears. The CEO gets the memory of an entire asset class.",
    icon: Brain,
    color: "from-indigo-500 to-blue-500",
    intro:
      "This is the destination. No more 20 meetings a day. No more vendor-managed chaos. A single subscription gives the Data Center CEO a governed intelligence layer that sucks in every signal — AISentry edge agents, public packet-gold datasets, and anonymized peer projects — and turns it into a 90-second morning briefing that gets smarter every single day. The corpus is the moat. Every new campus makes every other campus safer, faster, and cheaper.",
    items: [
      {
        title: "Daily CEO Morning Briefing",
        detail:
          "Auto-generated. Policy-grounded. Honest about risks. Only the 3 things that need your judgment are escalated.",
      },
      {
        title: "Corpus Flywheel",
        detail:
          "Every decision, delay, substitution, and commissioning outcome compounds. Your second 200 MW campus learns from 19 others before the first shovel moves.",
      },
      {
        title: "Stakeholder Spokes (zero extra work)",
        detail:
          "Lenders get draw packages, insurers get risk scores, hyperscalers get readiness benchmarks — all from the same governed memory.",
      },
      {
        title: "80%+ Net Margins Reality",
        detail:
          "Self-serve onboarding (<90s zero-touch), automatic signal ingestion, AI-first support. The platform scales like Zscaler while you sleep.",
      },
    ],
  },
];

const progression = ["Pre-Dev", "Design", "Construction", "Commissioning", "Axiom"];

export default function AxiomOwnerRepStoryForCEO() {
  const [activeAct, setActiveAct] = useState(acts[0].id);

  const selectedAct = acts.find((act) => act.id === activeAct) || acts[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 via-white to-zinc-100 text-zinc-900 dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-900 dark:text-zinc-100">
      {/* HERO */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end"
        >
          <div>
            <Badge className="rounded-full px-4 py-1 text-sm bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300">
              From Owner’s Rep grind to CEO intelligence layer
            </Badge>
            <h1 className="mt-5 max-w-5xl text-4xl font-semibold tracking-tighter sm:text-5xl lg:text-6xl">
              Your data center is being built at a speed the old playbook can’t handle.<br />
              <span className="bg-gradient-to-r from-indigo-500 to-cyan-400 bg-clip-text text-transparent">Axiom gives you the new one.</span>
            </h1>
            <p className="mt-6 max-w-3xl text-xl leading-tight text-zinc-600 dark:text-zinc-300">
              No more 20 meetings a day. No more vendor-managed chaos. One governed intelligence platform that remembers every project on earth — and turns that memory into your daily decision advantage.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              {progression.map((step, i) => (
                <div key={step} className="flex items-center gap-3">
                  <div className="rounded-2xl border bg-white px-5 py-2.5 text-sm font-semibold shadow-sm dark:bg-zinc-900">
                    {step}
                  </div>
                  {i < progression.length - 1 && <ArrowRight className="h-4 w-4 text-zinc-400" />}
                </div>
              ))}
            </div>
          </div>

          <Card className="rounded-3xl border-0 bg-zinc-900 text-white shadow-2xl">
            <CardContent className="p-8">
              <div className="flex items-center gap-3">
                <Brain className="h-9 w-9 text-cyan-400" />
                <div>
                  <div className="text-xs font-medium uppercase tracking-widest text-cyan-300">CEO Reality Check</div>
                  <CardTitle className="text-2xl">30-day delay = $10–30M</CardTitle>
                </div>
              </div>
              <p className="mt-6 text-lg leading-tight">
                Every gigawatt AI factory you build is a new category of infrastructure. The market has no institutional memory yet.<br />
                <span className="font-semibold">Axiom becomes that memory — for you, today.</span>
              </p>
              <Button size="lg" className="mt-8 w-full rounded-2xl text-base font-semibold">
                Get your first morning briefing demo
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* INTERACTIVE STORY VIEW */}
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">The Five-Act Transformation</p>
            <h2 className="mt-2 text-4xl font-semibold tracking-tight">From daily grind to daily intelligence</h2>
          </div>
          <Button variant="outline" className="rounded-2xl" onClick={() => window.location.reload()}>
            Restart story
          </Button>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          {/* ACT SELECTOR */}
          <div className="space-y-4">
            {acts.map((act) => {
              const Icon = act.icon;
              const active = act.id === activeAct;
              return (
                <button
                  key={act.id}
                  onClick={() => setActiveAct(act.id)}
                  className={`group w-full rounded-3xl border p-6 text-left transition-all duration-200 ${
                    active
                      ? "border-zinc-900 bg-zinc-900 text-white shadow-2xl dark:border-white dark:bg-white dark:text-zinc-900"
                      : "bg-white/70 hover:border-zinc-300 hover:bg-white dark:bg-zinc-900/70 dark:hover:border-zinc-700"
                  }`}
                >
                  <div className="flex items-start gap-5">
                    <div
                      className={`rounded-2xl bg-gradient-to-br ${act.color} p-3.5 text-white shadow-inner transition-transform group-hover:scale-110`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-baseline justify-between">
                        <div>
                          <div className="text-xs uppercase tracking-[0.2em] opacity-70">{act.kicker}</div>
                          <div className="mt-1 text-2xl font-semibold tracking-tight">{act.title}</div>
                        </div>
                        <ChevronRight
                          className={`h-6 w-6 transition-transform ${active ? "translate-x-1" : "group-hover:translate-x-0.5"}`}
                        />
                      </div>
                      <p className={`mt-3 text-base leading-6 ${active ? "text-zinc-200" : "text-zinc-600 dark:text-zinc-400"}`}>
                        {act.subtitle}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* SELECTED ACT DETAIL */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedAct.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="h-full rounded-3xl border-0 bg-gradient-to-br from-white to-zinc-100 shadow-2xl dark:from-zinc-900 dark:to-zinc-950">
                <CardContent className="p-10">
                  <div className="flex items-center gap-5">
                    <div className={`rounded-3xl bg-gradient-to-br ${selectedAct.color} p-5 text-white shadow-xl`}>
                      <selectedAct.icon className="h-10 w-10" />
                    </div>
                    <div>
                      <div className="text-xs font-medium uppercase tracking-widest text-zinc-400">{selectedAct.kicker}</div>
                      <h3 className="text-4xl font-semibold tracking-tighter">{selectedAct.title}</h3>
                    </div>
                  </div>

                  <p className="mt-8 text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
                    {selectedAct.intro}
                  </p>

                  <div className="mt-10 grid gap-6 sm:grid-cols-2">
                    {selectedAct.items.map((item, i) => (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="rounded-3xl border bg-white/80 p-6 shadow-sm dark:bg-zinc-900/70"
                      >
                        <div className="flex gap-4">
                          <Sparkles className="mt-1 h-5 w-5 shrink-0 text-amber-400" />
                          <div>
                            <div className="font-semibold text-base">{item.title}</div>
                            <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-300">{item.detail}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA inside every act */}
                  {selectedAct.id === "axiom" && (
                    <div className="mt-12 rounded-3xl bg-gradient-to-r from-indigo-500 to-cyan-400 p-8 text-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium">Ready for your first briefing?</div>
                          <div className="text-2xl font-semibold">Zero meetings. Real-time memory. Immediate ROI.</div>
                        </div>
                        <Button size="lg" variant="secondary" className="rounded-2xl bg-white text-zinc-900 hover:bg-amber-100">
                          Schedule your live demo now
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* FINAL CLOSING FRAME */}
      <section className="mx-auto max-w-7xl px-6 pb-20 pt-8 lg:px-10">
        <Card className="rounded-3xl border-0 bg-zinc-900 text-white shadow-2xl">
          <CardContent className="p-12 text-center">
            <div className="mx-auto max-w-2xl">
              <Brain className="mx-auto h-16 w-16 text-cyan-400" />
              <h2 className="mt-6 text-4xl font-semibold tracking-tight">
                The Owner’s Rep playbook just became obsolete.
              </h2>
              <p className="mt-4 text-xl text-zinc-300">
                Axiom Intelligence Platform is the governed memory layer every Data Center CEO needs right now.<br />
                Signals in. Intelligence out. Every project smarter than the last.
              </p>
              <Button size="xl" className="mt-10 rounded-3xl px-10 text-lg font-semibold shadow-inner">
                Claim your first month free — see the briefing that changes everything
              </Button>
              <p className="mt-6 text-xs text-zinc-400">Self-serve onboarding in &lt;90 seconds • 80%+ net margins • Corpus compounds daily</p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
