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
  Zap,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

const acts = [
  {
    id: "predev",
    kicker: "Act I",
    title: "Pre-Development",
    subtitle: "The moment every gigawatt AI factory is quietly won or lost",
    icon: Eye,
    color: "from-sky-500 to-cyan-500",
    intro:
      "You sit down with a shortlist of sites and a pro forma that feels optimistic. Utility queues, soil conditions, water rights, fiber latency, labor pools — every variable carries hidden risk. In the old world you rely on spreadsheets and gut feel. What lands on your desk with Axiom is something different: an instant, policy-grounded risk oracle that already knows the exact deviation patterns that derailed three identical projects in this ISO. You see the invisible constraints before the first meeting.",
    items: [
      {
        title: "Instant Site Intelligence",
        detail:
          "Public packet-gold datasets (LBNL queues, EIA forecasts, USGS flood layers) are automatically correlated with your Vision Agent overlays. Policy Domains 01–04 surface the precise risks that matter to your specific load and geography.",
      },
      {
        title: "Pro Forma That Remembers",
        detail:
          "An independent baseline appears in seconds — not a static spreadsheet, but a living forecast that already incorporates the long-lead delays and commissioning realities from every comparable campus built before yours.",
      },
      {
        title: "Permitting & Team Strategy",
        detail:
          "You receive a clear roadmap of AHJ timelines and team-assembly recommendations drawn from institutional memory, not guesswork. The unknowns become known before you commit capital.",
      },
    ],
  },
  {
    id: "design",
    kicker: "Act II",
    title: "Design & Procurement",
    subtitle: "Where assumptions meet reality — and where the best operators stay ahead",
    icon: Factory,
    color: "from-emerald-500 to-teal-500",
    intro:
      "Design documents arrive in waves. MEP coordination is complex. Long-lead items have lead times measured in years. In the old world you chase answers across email threads and vendor calls. With Axiom the governed reasoning engine reviews every drawing against your 16 policy domains and the growing corpus. What you now have at your fingertips is the collective experience of every similar AI factory: the exact value-engineering moves that preserved technical integrity while unlocking millions, and the precise procurement triggers that avoid 14-month slips.",
    items: [
      {
        title: "Live Design Memory",
        detail:
          "Every submittal and drawing is cross-checked against policy and prior outcomes. You see the patterns — false economies versus genuine optimizations — before they become field problems.",
      },
      {
        title: "Long-Lead Oracle",
        detail:
          "A dynamic procurement schedule integrates public benchmarks with your own project signals. You know exactly when to authorize early purchases and why.",
      },
      {
        title: "Coordination Clarity",
        detail:
          "Structural, MEP, and IT interdependencies are surfaced and resolved in the model. The open-issues log is no longer a list of questions — it is a traceable map of decisions already informed by institutional memory.",
      },
    ],
  },
  {
    id: "construction",
    kicker: "Act III",
    title: "Construction",
    subtitle: "The shift from vendor-managed to owner-led",
    icon: Hammer,
    color: "from-amber-500 to-orange-500",
    intro:
      "Schedules slip silently. Change orders accumulate. 2 a.m. alarms reach you on Monday morning. In the old world the GC's story is the only story. Axiom changes the information asymmetry. AISentry edge agents (Packet, DC, Vision) feed real-time OT signals directly into the platform. What appears on your screen every morning is an independent view — not the contractor's narrative — but the actual state of the project, cross-referenced against the entire corpus of similar builds. You see the critical path before anyone else does.",
    items: [
      {
        title: "Independent Schedule & Cost View",
        detail:
          "A living forecast that updates continuously. Delay signals arrive with historical context and remediation paths drawn from real outcomes, not theory.",
      },
      {
        title: "Site Health at a Glance",
        detail:
          "Vision Agent progress overlays, Packet Agent OT health scores, and DC Agent correlation give you a single source of truth about subcontractor performance and system readiness.",
      },
      {
        title: "Morning Intelligence Briefing",
        detail:
          "One concise, policy-grounded summary that tells you exactly where the project stands, what requires your attention, and what the team is already handling. No more 20 meetings to piece together the picture.",
      },
    ],
  },
  {
    id: "commissioning",
    kicker: "Act IV",
    title: "Commissioning & Acceptance",
    subtitle: "The phase that defines credibility with hyperscalers",
    icon: Zap,
    color: "from-fuchsia-500 to-violet-500",
    intro:
      "Commissioning is no longer a final checklist — it is the moment of truth for a billion-dollar asset. Cx plans have hidden gaps. Failure modes surface at the worst possible time. In the old world you hope the team catches everything. With Axiom the DC Agent correlation engine and Packet Agent protocol monitoring watch every test in real time. What you now hold is the institutional memory of every prior commissioning sequence: the exact failure modes that appeared on the last three identical builds and the precise remediation that worked. The hyperscaler acceptance team arrives to a facility that already knows itself.",
    items: [
      {
        title: "Policy-Grounded Cx Oversight",
        detail:
          "Every test plan is reviewed against Domains 13–15. Missing scenarios are surfaced before testing begins.",
      },
      {
        title: "Live Failure Memory",
        detail:
          "Root-cause analysis is automatic and traceable. You see the pattern match instantly — and the solution that worked before.",
      },
      {
        title: "Acceptance Without Surprise",
        detail:
          "The platform prepares the exact evidence package the tenant expects. Commissioning becomes a confirmation, not a discovery.",
      },
    ],
  },
  {
    id: "axiom",
    kicker: "Act V",
    title: "Axiom Intelligence Layer",
    subtitle: "The operating memory of an entire asset class — now at your command",
    icon: Brain,
    color: "from-indigo-500 to-blue-500",
    intro:
      "This is the destination. The Owner's Rep playbook is replaced by something far more powerful: a governed intelligence platform that continuously ingests every signal — from your AISentry edge agents, from public datasets, and from anonymized peer projects — and returns it as actionable institutional memory. What lands on your desk every single morning is the compressed learning curve of the entire AI infrastructure era. You no longer manage in isolation. You operate with the collective experience of every gigawatt-scale factory built before yours.",
    items: [
      {
        title: "Daily CEO Briefing",
        detail:
          "A single, honest, policy-traceable summary that surfaces only the signals that matter. Everything else is already being handled — with full visibility into why.",
      },
      {
        title: "Compounding Corpus",
        detail:
          "Every decision, delay, substitution, and outcome you observe becomes part of a living memory layer. Your next campus is smarter on day one than your first campus was on day 365.",
      },
      {
        title: "Strategic Optionality",
        detail:
          "Lenders, insurers, hyperscalers, and your own operations team all draw from the same governed source — each seeing the view they need, while you retain the single source of truth.",
      },
    ],
  },
];

const progression = ["Pre-Development", "Design", "Construction", "Commissioning", "Intelligence Layer"];

function ArchitectureMap() {
  const architectureNodes = [
    { id: "edge", label: "AISentry Edge Agents", x: 12, y: 18, icon: Radar },
    { id: "gold", label: "Public Packet-Gold Data", x: 12, y: 48, icon: Database },
    { id: "policy", label: "16 Policy Domains", x: 32, y: 33, icon: ScrollText },
    { id: "corpus", label: "Compounding Corpus", x: 52, y: 18, icon: Layers3 },
    { id: "reasoning", label: "Governed Reasoning Engine", x: 52, y: 48, icon: Brain },
    { id: "briefing", label: "CEO Morning Intelligence", x: 78, y: 33, icon: Activity },
  ];

  const connections = [
    ["edge", "policy", "solid"],
    ["gold", "policy", "solid"],
    ["policy", "corpus", "solid"],
    ["corpus", "reasoning", "solid"],
    ["reasoning", "briefing", "solid"],
    ["edge", "corpus", "dashed"],
    ["gold", "corpus", "dashed"],
  ];

  const nodeLookup = useMemo(() => Object.fromEntries(architectureNodes.map((n) => [n.id, n])), []);

  return (
    <div className="relative h-[520px] w-full overflow-hidden rounded-3xl border bg-white/80 backdrop-blur dark:bg-zinc-950/70">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.1),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(14,165,233,0.1),transparent_50%)]" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {connections.map(([from, to, style], i) => {
          const a = nodeLookup[from];
          const b = nodeLookup[to];
          return (
            <motion.line
              key={i}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke="#64748b"
              strokeWidth="0.8"
              strokeDasharray={style === "dashed" ? "3 2" : "0"}
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 1.2, delay: i * 0.08 }}
              viewport={{ once: true }}
            />
          );
        })}
      </svg>

      {architectureNodes.map((node, i) => {
        const Icon = node.icon;
        return (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            viewport={{ once: true }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
          >
            <div className="w-48 rounded-3xl border bg-white p-4 shadow-md dark:bg-zinc-900">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-zinc-100 p-2 dark:bg-zinc-800">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="text-sm font-semibold leading-tight">{node.label}</div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function AxiomIntelligenceVisionForCEO() {
  const [activeAct, setActiveAct] = useState(acts[0].id);
  const selectedAct = acts.find((act) => act.id === activeAct) || acts[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 via-white to-zinc-100 text-zinc-900 dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-900 dark:text-zinc-100">
      {/* HERO — Visionary framing */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-end"
        >
          <div>
            <Badge className="rounded-full px-5 py-1 text-sm">The new operating reality for AI infrastructure</Badge>
            <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-tighter leading-none sm:text-6xl lg:text-7xl">
              Every gigawatt AI factory you build is a new category of infrastructure.<br />
              <span className="bg-gradient-to-r from-indigo-600 via-cyan-500 to-teal-400 bg-clip-text text-transparent">
                Axiom is the memory it has never had — until now.
              </span>
            </h1>
            <p className="mt-8 max-w-2xl text-xl text-zinc-600 dark:text-zinc-300">
              What you will have at your fingertips each morning is the compressed experience of every project like yours.
              The old playbook required 20 meetings to assemble a picture. The new layer delivers one clear, policy-grounded briefing that grows smarter with every campus you touch.
            </p>
          </div>

          <Card className="rounded-3xl border-0 bg-white shadow-2xl dark:bg-zinc-900">
            <CardContent className="p-8">
              <div className="text-sm uppercase tracking-widest text-teal-500">What changes</div>
              <h3 className="mt-3 text-3xl font-semibold tracking-tight">
                From information overload to institutional memory
              </h3>
              <p className="mt-6 text-zinc-600 dark:text-zinc-400">
                The creative tension is real: the speed of AI infrastructure has outrun every traditional method of oversight.
                Axiom closes that gap — not by adding more tools, but by giving you the one layer that remembers everything the industry is still learning.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* FIVE-ACT STORY */}
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        <div className="mb-8">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">Five acts of transformation</p>
          <h2 className="mt-2 text-4xl font-semibold tracking-tighter">
            From the daily grind you know to the intelligence layer you will lead with
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          {/* Act selector */}
          <div className="space-y-4">
            {acts.map((act) => {
              const Icon = act.icon;
              const active = act.id === activeAct;
              return (
                <button
                  key={act.id}
                  onClick={() => setActiveAct(act.id)}
                  className={`group w-full rounded-3xl border p-6 text-left transition-all ${
                    active
                      ? "border-zinc-900 bg-zinc-900 text-white dark:border-white dark:bg-white dark:text-zinc-900"
                      : "hover:border-zinc-300 bg-white/70 dark:bg-zinc-900/70"
                  }`}
                >
                  <div className="flex items-start gap-5">
                    <div className={`rounded-2xl bg-gradient-to-br ${act.color} p-4 text-white`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs uppercase tracking-widest opacity-70">{act.kicker}</div>
                      <div className="mt-1 text-2xl font-semibold tracking-tight">{act.title}</div>
                      <p className={`mt-3 text-base ${active ? "text-zinc-200" : "text-zinc-600 dark:text-zinc-400"}`}>
                        {act.subtitle}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected act detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedAct.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
            >
              <Card className="h-full rounded-3xl border-0 bg-gradient-to-br from-white to-zinc-100 shadow-2xl dark:from-zinc-900 dark:to-zinc-950">
                <CardContent className="p-10">
                  <div className="flex items-center gap-5">
                    <div className={`rounded-3xl bg-gradient-to-br ${selectedAct.color} p-5 text-white`}>
                      <selectedAct.icon className="h-10 w-10" />
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-widest text-zinc-400">{selectedAct.kicker}</div>
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
                        transition={{ delay: i * 0.12 }}
                        className="rounded-3xl border bg-white/80 p-6 shadow-sm dark:bg-zinc-900/70"
                      >
                        <Sparkles className="h-5 w-5 text-teal-400" />
                        <div className="mt-4 font-semibold">{item.title}</div>
                        <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-300">{item.detail}</p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ARCHITECTURE DIAGRAM — the visual strategy artifact */}
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        <div className="mb-8">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">What you will actually see every day</p>
          <h2 className="mt-2 text-4xl font-semibold tracking-tighter">The Axiom Intelligence Layer</h2>
          <p className="mt-3 max-w-2xl text-lg text-zinc-600 dark:text-zinc-300">
            Signals flow in continuously. Memory compounds. A single, governed briefing lands on your screen — giving you and your team the institutional memory the entire industry is still building.
          </p>
        </div>
        <ArchitectureMap />
      </section>

      {/* CLOSING VISION — thought-leadership frame */}
      <section className="mx-auto max-w-7xl px-6 pb-24 pt-8 lg:px-10">
        <Card className="rounded-3xl border-0 bg-zinc-900 text-white shadow-2xl">
          <CardContent className="p-12 text-center">
            <Brain className="mx-auto h-14 w-14 text-cyan-400" />
            <h2 className="mt-6 text-4xl font-semibold tracking-tighter">
              This is no longer a technology conversation.<br />
              It is a leadership conversation.
            </h2>
            <p className="mx-auto mt-8 max-w-xl text-xl text-zinc-300">
              The speed of AI infrastructure has created a new category of asset. The operators who thrive will be the ones who treat memory as infrastructure — not as an afterthought.
            </p>
            <p className="mt-10 text-sm uppercase tracking-widest text-zinc-400">
              Share this with your team. Let it become the story of how your operation moved from reacting to leading.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
