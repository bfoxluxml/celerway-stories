import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  ArrowRight,
  Brain,
  Building2,
  CheckCircle2,
  ChevronRight,
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
  Award,
} from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
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
      "You sit down with a shortlist of sites and a pro forma that feels optimistic. Utility queues, soil conditions, water rights, fiber latency, labor pools — every variable carries hidden risk. With Axiom you receive an instant, policy-grounded risk oracle that already knows the exact deviation patterns from prior projects.",
    items: [
      { title: "Instant Site Intelligence", detail: "Public packet-gold datasets and Vision Agent overlays surface precise risks before the first meeting." },
      { title: "Pro Forma That Remembers", detail: "An independent baseline that incorporates real long-lead and commissioning realities from comparable campuses." },
      { title: "Permitting & Team Strategy", detail: "A clear roadmap drawn from institutional memory instead of guesswork." },
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
      "Design documents arrive in waves. Long-lead items have lead times measured in years. The governed reasoning engine reviews every drawing against your 16 policy domains and the growing corpus.",
    items: [
      { title: "Live Design Memory", detail: "False economies versus genuine optimizations become visible immediately." },
      { title: "Long-Lead Oracle", detail: "Dynamic procurement schedule that tells you exactly when to act." },
      { title: "Coordination Clarity", detail: "Interdependencies are resolved in the model, not in the field." },
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
      "AISentry edge agents feed real-time OT signals directly into the platform. Every morning you see an independent view of the project — not the contractor’s narrative.",
    items: [
      { title: "Independent Schedule & Cost View", detail: "Living forecast with delay signals and remediation paths drawn from real outcomes." },
      { title: "Site Health at a Glance", detail: "Vision Agent progress and Packet Agent OT health scores give you a single source of truth." },
      { title: "Morning Intelligence Briefing", detail: "One concise, policy-grounded summary that surfaces only what requires your attention." },
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
      "The DC Agent and Packet Agent watch every test in real time. You now hold the institutional memory of every prior commissioning sequence.",
    items: [
      { title: "Policy-Grounded Cx Oversight", detail: "Missing failure modes are surfaced before testing begins." },
      { title: "Live Failure Memory", detail: "Root-cause analysis is automatic and traceable." },
      { title: "Acceptance Without Surprise", detail: "The platform prepares the exact evidence the tenant expects." },
    ],
  },
  {
    id: "turnover",
    kicker: "Act V",
    title: "Turnover & Operations",
    subtitle: "Closing the loop and feeding the next generation of intelligence",
    icon: Award,
    color: "from-violet-500 to-purple-500",
    intro:
      "As-built drawings, O&M manuals, warranty claims, and ongoing OT alarms flow into the system. Axiom captures lessons learned and contributes them anonymously to the corpus, ensuring your next project benefits from this one.",
    items: [
      { title: "Close-Out & Operations Readiness", detail: "Complete documentation and trained team delivered with institutional memory embedded." },
      { title: "Warranty & Latent Defect Tracking", detail: "Ongoing monitoring catches issues early using the same DC and Packet Agents." },
      { title: "Corpus Contribution", detail: "Every outcome strengthens the platform for the entire industry — including your future campuses." },
    ],
  },
  {
    id: "axiom",
    kicker: "Act VI",
    title: "Axiom Intelligence Layer",
    subtitle: "The operating memory of an entire asset class — now at your command",
    icon: Brain,
    color: "from-indigo-500 to-blue-500",
    intro:
      "This is the destination. A governed intelligence platform that continuously ingests every signal and returns it as actionable institutional memory. Every morning you receive the compressed learning curve of the entire AI infrastructure era.",
    items: [
      { title: "Daily CEO Briefing", detail: "A single, honest, policy-traceable summary that surfaces only the signals that matter." },
      { title: "Compounding Corpus", detail: "Every decision, delay, and outcome makes the next campus smarter from day one." },
      { title: "Strategic Optionality", detail: "All stakeholders draw from the same governed source while you retain the single source of truth." },
    ],
  },
];

const progression = ["Pre-Development", "Design", "Construction", "Commissioning", "Turnover", "Intelligence Layer"];

function ArchitectureMap() {
  const nodes = [
    { id: "edge", label: "AISentry Edge Agents", x: 12, y: 22, icon: Radar },
    { id: "gold", label: "Public Packet-Gold Data", x: 12, y: 55, icon: Database },
    { id: "policy", label: "16 Policy Domains", x: 48, y: 38, icon: ScrollText },
    { id: "corpus", label: "Compounding Corpus", x: 72, y: 22, icon: Layers3 },
    { id: "reasoning", label: "Governed Reasoning Engine", x: 72, y: 55, icon: Brain },
    { id: "briefing", label: "CEO Morning Intelligence", x: 90, y: 38, icon: Activity },
  ];

  const connections = [
    ["edge", "policy", "solid"],
    ["gold", "policy", "solid"],
    ["policy", "corpus", "solid"],
    ["policy", "reasoning", "solid"],
    ["corpus", "reasoning", "solid"],
    ["reasoning", "briefing", "solid"],
    ["edge", "corpus", "dashed"],
    ["gold", "corpus", "dashed"],
  ];

  const nodeLookup = useMemo(() => Object.fromEntries(nodes.map((n) => [n.id, n])), []);

  return (
    <div className="relative h-[560px] w-full overflow-hidden rounded-3xl border bg-white/80 backdrop-blur dark:bg-zinc-950/70">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(99,102,241,0.08),transparent_65%),radial-gradient(circle_at_70%_70%,rgba(14,165,233,0.08),transparent_65%)]" />

      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {connections.map(([from, to, style], i) => {
          const a = nodeLookup[from];
          const b = nodeLookup[to];
          return (
            <motion.line
              key={i}
              x1={a.x} y1={a.y}
              x2={b.x} y2={b.y}
              stroke="#64748b"
              strokeWidth="0.85"
              strokeDasharray={style === "dashed" ? "3 2" : "0"}
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 1.2, delay: i * 0.08 }}
              viewport={{ once: true }}
            />
          );
        })}
      </svg>

      {nodes.map((node, i) => {
        const Icon = node.icon;
        const isCentral = node.id === "policy";

        return (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: i * 0.1 }}
            viewport={{ once: true }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
          >
            <div className={`w-56 rounded-3xl border bg-white p-5 shadow-md transition-all hover:shadow-xl dark:bg-zinc-900 ${isCentral ? "ring-2 ring-indigo-400" : ""}`}>
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-zinc-100 p-3 dark:bg-zinc-800">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold leading-tight">{node.label}</div>
                  {isCentral && <div className="text-xs text-indigo-500 mt-1">Governance across full lifecycle</div>}
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}

      {/* Fanned-out stakeholder bubbles from central policy node */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1.0 }}
        className="absolute left-1/2 top-[41%] -translate-x-1/2 flex flex-wrap justify-center gap-3 w-[460px]"
      >
        {["Hyperscalers", "Lenders", "Insurers", "Developers", "Funds"].map((label, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 25, scale: 0.85 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 1.2 + i * 0.06 }}
            className="rounded-2xl border bg-white px-5 py-2 text-sm shadow-sm dark:bg-zinc-900 whitespace-nowrap"
          >
            {label}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default function AxiomOwnerRepStoryForCEO_V2() {
  const [activeAct, setActiveAct] = useState(acts[0].id);
  const selectedAct = acts.find((act) => act.id === activeAct) || acts[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 via-white to-zinc-100 text-zinc-900 dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-900 dark:text-zinc-100">
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
          <div>
            <Badge className="rounded-full px-5 py-1 text-sm">The new operating reality for AI infrastructure</Badge>
            <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-tighter leading-none sm:text-6xl lg:text-7xl">
              Every gigawatt AI factory you build is a new category of infrastructure.<br />
              <span className="bg-gradient-to-r from-indigo-600 via-cyan-500 to-teal-400 bg-clip-text text-transparent">Axiom is the memory it has never had — until now.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-xl text-zinc-600 dark:text-zinc-300">
              What you will have at your fingertips each morning is the compressed experience of every project like yours.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Five-Act Story */}
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        <div className="mb-8">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">Six acts of transformation</p>
          <h2 className="mt-2 text-4xl font-semibold tracking-tighter">
            From the daily grind you know to the intelligence layer you will lead with
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
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

      {/* Enhanced Architecture Map */}
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        <div className="mb-8">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">What you will actually see every day</p>
          <h2 className="mt-2 text-4xl font-semibold tracking-tighter">The Axiom Intelligence Layer</h2>
          <p className="mt-3 max-w-2xl text-lg text-zinc-600 dark:text-zinc-300">
            Signals flow in continuously. The 16 policy domains govern the reasoning. Memory compounds. A single briefing lands on your screen.
          </p>
        </div>
        <ArchitectureMap />
      </section>

      {/* Closing Vision */}
      <section className="mx-auto max-w-7xl px-6 pb-24 pt-8 lg:px-10">
        <Card className="rounded-3xl border-0 bg-zinc-900 text-white shadow-2xl">
          <CardContent className="p-12 text-center">
            <Brain className="mx-auto h-14 w-14 text-cyan-400" />
            <h2 className="mt-6 text-4xl font-semibold tracking-tighter">
              This is no longer a technology conversation.<br />
              It is a leadership conversation.
            </h2>
            <p className="mx-auto mt-8 max-w-xl text-xl text-zinc-300">
              Share this with your team as the story of how your operation moved from reacting to leading with institutional memory.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
