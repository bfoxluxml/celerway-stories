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
  Globe,
  Landmark,
  Layers3,
  Radar,
  ScrollText,
  Server,
  Shield,
  ShieldCheck,
  Sparkles,
  Users,
  Wrench,
  Briefcase,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";

const acts = [
  {
    id: "edge",
    kicker: "Act I",
    title: "The Physical Edge",
    subtitle: "Start with a visible, intuitive use case people immediately understand.",
    icon: Eye,
    color: "from-sky-500 to-cyan-500",
    intro:
      "The story begins at the edge: PPE vision, device awareness, secure connectivity, and practical trust anchors for real-world operations.",
    items: [
      {
        title: "Vision Agent",
        detail:
          "Monitors PPE, zone compliance, and worksite conditions; creates audit trails, reports, and a simple first proof point.",
      },
      {
        title: "Trusted Edge Device",
        detail:
          "A modular device foundation that can start simple, then layer in SASE, OT inspection, AI autonomy, and policy enforcement.",
      },
      {
        title: "Protected Endpoints",
        detail:
          "Printers, ATMs, POS systems, and other non-traditional devices can receive secure connectivity and policy-aware protection.",
      },
    ],
  },
  {
    id: "core",
    kicker: "Act II",
    title: "Platform Core",
    subtitle: "The system is proactive, temporal, event-driven, and designed for triage rather than chat.",
    icon: Database,
    color: "from-emerald-500 to-teal-500",
    intro:
      "This is not a conversational assistant. It consumes events, correlates them over time, prioritizes what matters first, and creates operator briefings.",
    items: [
      {
        title: "Private LLM Reasoning Layer",
        detail:
          "Hosted in Azure and applied as a governed reasoning engine over operational data, policies, and large knowledge corpora.",
      },
      {
        title: "Event-Driven PostgreSQL",
        detail:
          "Temporal database design allows millions of events to be interpreted as evolving signals instead of disconnected alerts.",
      },
      {
        title: "FastAPI + React/Tailwind",
        detail:
          "High-speed service layers and operator UI make the system responsive, explainable, and usable during real operations.",
      },
      {
        title: "Tooling + Policy Engine",
        detail:
          "Function-calling tools interact with systems of record while the policy engine standardizes how signals are interpreted and acted on.",
      },
    ],
  },
  {
    id: "autonomy",
    kicker: "Act III",
    title: "Intelligence + Autonomy",
    subtitle: "Every agent works the same way: triage, explain, recommend, act, and learn.",
    icon: Brain,
    color: "from-amber-500 to-orange-500",
    intro:
      "The platform creates prioritized briefings, identifies the top domino, supports human-in-the-loop execution, and can move toward controlled autonomy when allowed.",
    items: [
      {
        title: "Explainable OT Protection",
        detail:
          "Unlike a generic firewall, the agent knows why it is blocking something and can surface dependencies, blast radius, and operator impact.",
      },
      {
        title: "Threat Intelligence at the Edge",
        detail:
          "Threat libraries such as CISA and OTX are pushed into packet and OT workflows, where agents can continue operating even with intermittent connectivity.",
      },
      {
        title: "Human-in-the-Loop Execution",
        detail:
          "Operators can approve, execute, and revert actions with an easy-button experience while the platform records the reasoning chain.",
      },
      {
        title: "Future RL-Assisted Autonomy",
        detail:
          "Jetson-class edge ML and reinforcement learning increase autonomy over time, but remain governed by policy and operational tolerance.",
      },
    ],
  },
  {
    id: "verticals",
    kicker: "Act IV",
    title: "Vertical Expansion",
    subtitle: "The same pattern scales across domains because the platform is governed by policies, not hard-coded workflows.",
    icon: Layers3,
    color: "from-fuchsia-500 to-violet-500",
    intro:
      "What starts as a PPE demonstration expands into OT, healthcare, non-reporting devices, data center operations, and infrastructure development.",
    items: [
      {
        title: "OT + East-West Visibility",
        detail:
          "Auto-discovery and lateral-movement awareness extend visibility beyond the perimeter and inside operational environments.",
      },
      {
        title: "Healthcare + Compliance",
        detail:
          "Secure tunnels, SASE, and policy-aware endpoint protection support regulated medical and operational environments.",
      },
      {
        title: "Data Center Monitoring",
        detail:
          "Out-of-band visibility, alarm triage, root-cause prioritization, and response guidance help operators manage cascading risk.",
      },
      {
        title: "Design-Build Oversight",
        detail:
          "The same engine can monitor site selection, utility readiness, rack/stack/turn-up, commissioning risk, and delay patterns.",
      },
    ],
  },
  {
    id: "axiom",
    kicker: "Act V",
    title: "Axiom Intelligence Platform",
    subtitle: "The owner’s rep is the entry point. The destination is intelligence for an entire asset class.",
    icon: Building2,
    color: "from-indigo-500 to-blue-500",
    intro:
      "Axiom sits inside AISentry™ today as governed intelligence: the same corpus, different policy views, and compounding institutional memory across the capital stack.",
    items: [
      {
        title: "16 Policy Domains",
        detail:
          "Signals are grounded in policy sets spanning site, build, commission, capital, and exit, each tied to real project history.",
      },
      {
        title: "Corpus-Based Moat",
        detail:
          "Project decisions, rejections, failures, substitutions, and outcomes become reusable intelligence that outperforms any single consultant.",
      },
      {
        title: "Stakeholder-Specific Views",
        detail:
          "Developers, funds, hyperscalers, lenders, insurers, and governments draw from the same corpus but use different policy lenses.",
      },
      {
        title: "Network Effects",
        detail:
          "Each new project improves the intelligence layer, strengthening the platform as the authoritative operating memory for AI infrastructure.",
      },
    ],
  },
];

const progression = ["Vision", "OT", "DC", "Axiom"];

const architectureNodes = [
  { id: "ui", label: "React UI", x: 10, y: 28, icon: Users },
  { id: "api", label: "FastAPI Service Layer", x: 25, y: 28, icon: Activity },
  { id: "llm", label: "Private LLM Instance Azure Hosted", x: 43, y: 16, icon: Brain },
  { id: "pg", label: "Event-driven Postgres", x: 43, y: 42, icon: Database },
  { id: "tools", label: "Function-calling Tools", x: 43, y: 68, icon: Wrench },
  { id: "policy", label: "Policy Engine", x: 61, y: 28, icon: ScrollText },
  { id: "agents", label: "Edge Agents", x: 78, y: 16, icon: Radar },
  { id: "operator", label: "Operator Approve / Revert", x: 78, y: 42, icon: CheckCircle2 },
  { id: "cortex", label: "Palo Alto Cortex / XSOAR", x: 78, y: 68, icon: ShieldCheck },
];

const connections = [
  ["ui", "api", "solid"],
  ["api", "llm", "solid"],
  ["api", "pg", "solid"],
  ["api", "tools", "solid"],
  ["pg", "llm", "solid"],
  ["tools", "pg", "solid"],
  ["llm", "policy", "solid"],
  ["policy", "agents", "solid"],
  ["policy", "operator", "solid"],
  ["operator", "agents", "dashed"],
  ["agents", "cortex", "dashed"],
  ["agents", "pg", "dashed"],
  ["policy", "cortex", "dashed"],
];

const stakeholders = [
  {
    title: "Owner’s Rep",
    icon: Briefcase,
    blurb:
      "The beachhead buyer: immediate revenue, governed oversight, and a simpler way to explain the platform’s value.",
    policies: ["Site", "Build", "Commission"],
    value:
      "Shortens decision cycles, standardizes oversight, and turns experience into reusable operating policy.",
  },
  {
    title: "Developers",
    icon: Factory,
    blurb:
      "Use project memory to de-risk execution, compare vendors, and detect patterns behind delay and commissioning failure.",
    policies: ["Build", "Commission", "Capital"],
    value:
      "Improves execution discipline, surfaces substitution risk, and reduces expensive delay patterns.",
  },
  {
    title: "Funds",
    icon: Landmark,
    blurb:
      "Benchmark portfolios, evaluate development partners, and time exits using the same governed institutional corpus.",
    policies: ["Capital", "Exit", "Portfolio"],
    value:
      "Creates portfolio comparability and improves timing around deployment, risk, and exits.",
  },
  {
    title: "Hyperscalers",
    icon: Server,
    blurb:
      "Assess build readiness, supply-chain risk, and partner performance across large-scale AI infrastructure portfolios.",
    policies: ["Supply Chain", "Build", "Commission"],
    value:
      "Provides a governed view into readiness, partner performance, and development bottlenecks.",
  },
  {
    title: "Lenders + Insurers",
    icon: Shield,
    blurb:
      "Underwrite construction and operational risk from signals and policy evidence instead of spreadsheet snapshots.",
    policies: ["Construction Risk", "Operational Risk", "Exit"],
    value:
      "Improves underwriting quality with policy-grounded evidence instead of static summary decks.",
  },
  {
    title: "Governments",
    icon: Globe,
    blurb:
      "Evaluate strategic AI infrastructure development through standardized policy views over the same asset-class knowledge base.",
    policies: ["Site", "Infrastructure", "Strategic Review"],
    value:
      "Creates a transparent and repeatable framework for evaluating strategic infrastructure development.",
  },
];

function ArchitectureMap() {
  const nodeLookup = useMemo(
    () => Object.fromEntries(architectureNodes.map((n) => [n.id, n])),
    []
  );

  return (
    <div className="relative h-[540px] w-full overflow-hidden rounded-[32px] border bg-white/75 backdrop-blur dark:bg-zinc-950/60">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.08),transparent_25%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.08),transparent_30%)]" />
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
              stroke="currentColor"
              className="text-zinc-300 dark:text-zinc-700"
              strokeWidth="0.7"
              strokeDasharray={style === "dashed" ? "2 2" : "0"}
              initial={{ pathLength: 0, opacity: 0.4 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.9, delay: i * 0.03 }}
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
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            viewport={{ once: true }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
          >
            <div className="min-w-[150px] max-w-[180px] rounded-3xl border bg-white p-3.5 shadow-sm dark:bg-zinc-900">
              <div className="mb-2 flex items-center gap-2">
                <div className="rounded-2xl bg-zinc-100 p-2 dark:bg-zinc-800">
                  <Icon className="h-4 w-4" />
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                  Layer
                </span>
              </div>
              <div className="text-sm font-semibold leading-tight">{node.label}</div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

function StoryView({ activeAct, setActiveAct }) {
  const selectedAct = acts.find((act) => act.id === activeAct) || acts[0];

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="space-y-4">
        {acts.map((act) => {
          const Icon = act.icon;
          const active = act.id === activeAct;
          return (
            <button
              key={act.id}
              onClick={() => setActiveAct(act.id)}
              className={`w-full rounded-[28px] border p-5 text-left transition-all ${
                active
                  ? "border-zinc-900 bg-zinc-900 text-white shadow-xl dark:border-white dark:bg-white dark:text-zinc-900"
                  : "bg-white/80 hover:border-zinc-400 hover:bg-white dark:bg-zinc-900/70 dark:hover:border-zinc-700"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`rounded-2xl bg-gradient-to-br ${act.color} p-3 text-white shadow-lg`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-sm uppercase tracking-[0.2em] opacity-70">{act.kicker}</div>
                      <div className="mt-1 text-xl font-semibold">{act.title}</div>
                    </div>
                    <ChevronRight className={`h-5 w-5 transition-transform ${active ? "translate-x-1" : ""}`} />
                  </div>
                  <p
                    className={`mt-2 text-sm leading-6 ${
                      active ? "text-zinc-200 dark:text-zinc-700" : "text-zinc-600 dark:text-zinc-300"
                    }`}
                  >
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
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.28 }}
        >
          <Card className="h-full rounded-[32px] border-0 bg-gradient-to-br from-white to-zinc-100 shadow-2xl dark:from-zinc-900 dark:to-zinc-950">
            <CardContent className="p-8 lg:p-10">
              <div className="flex items-center gap-4">
                <div className={`rounded-3xl bg-gradient-to-br ${selectedAct.color} p-4 text-white shadow-xl`}>
                  <selectedAct.icon className="h-8 w-8" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">{selectedAct.kicker}</p>
                  <h3 className="mt-1 text-3xl font-semibold tracking-tight">{selectedAct.title}</h3>
                </div>
              </div>
              <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-300">
                {selectedAct.intro}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {selectedAct.items.map((item) => (
                  <div key={item.title} className="rounded-3xl border bg-white/80 p-5 shadow-sm dark:bg-zinc-900/70">
                    <div className="flex items-start gap-3">
                      <Sparkles className="mt-0.5 h-5 w-5 shrink-0" />
                      <div>
                        <div className="font-semibold">{item.title}</div>
                        <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">{item.detail}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function StakeholderView() {
  const [selectedStakeholder, setSelectedStakeholder] = useState(stakeholders[0].title);
  const current = stakeholders.find((s) => s.title === selectedStakeholder) || stakeholders[0];
  const Icon = current.icon;

  return (
    <div className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
      <Card className="rounded-[32px] border-0 bg-zinc-900 text-white shadow-2xl dark:bg-zinc-900">
        <CardContent className="p-6 lg:p-8">
          <div className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-zinc-400">Stakeholders</div>
          <div className="space-y-3">
            {stakeholders.map((item) => {
              const ActiveIcon = item.icon;
              const active = item.title === selectedStakeholder;
              return (
                <button
                  key={item.title}
                  onClick={() => setSelectedStakeholder(item.title)}
                  className={`flex w-full items-start gap-3 rounded-2xl border px-4 py-4 text-left transition-all ${
                    active ? "border-white/20 bg-white/10" : "border-white/10 bg-white/5 hover:bg-white/8"
                  }`}
                >
                  <div className="rounded-2xl bg-white/10 p-2.5">
                    <ActiveIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold">{item.title}</div>
                    <div className="mt-1 text-sm leading-6 text-zinc-300">{item.blurb}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <AnimatePresence mode="wait">
        <motion.div
          key={current.title}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="grid gap-6"
        >
          <Card className="rounded-[32px] border-0 bg-gradient-to-br from-white to-zinc-100 shadow-2xl dark:from-zinc-900 dark:to-zinc-950">
            <CardContent className="p-8 lg:p-10">
              <div className="flex items-center gap-4">
                <div className="rounded-3xl bg-zinc-900 p-4 text-white shadow-xl dark:bg-white dark:text-zinc-900">
                  <Icon className="h-8 w-8" />
                </div>
                <div>
                  <div className="text-sm uppercase tracking-[0.2em] text-zinc-500">Stakeholder view</div>
                  <h3 className="mt-1 text-3xl font-semibold tracking-tight">{current.title}</h3>
                </div>
              </div>

              <p className="mt-6 max-w-3xl text-base leading-7 text-zinc-600 dark:text-zinc-300">
                {current.value}
              </p>

              <div className="mt-8 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="rounded-3xl border bg-white/80 p-5 shadow-sm dark:bg-zinc-900/70">
                  <div className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">Policy domains</div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {current.policies.map((policy) => (
                      <Badge key={policy} className="rounded-full px-3 py-1 text-sm">
                        {policy}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl border bg-white/80 p-5 shadow-sm dark:bg-zinc-900/70">
                  <div className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
                    Why this view matters
                  </div>
                  <p className="mt-4 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                    Each buyer sees the same governed corpus through a different policy lens. That means the platform
                    scales across the capital stack without changing the underlying operating memory.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {stakeholders.map((item, i) => {
              const SmallIcon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: i * 0.04 }}
                  viewport={{ once: true }}
                >
                  <Card
                    className={`h-full rounded-[28px] border shadow-sm ${
                      item.title === current.title
                        ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                        : "bg-white/80 dark:bg-zinc-900/70"
                    }`}
                  >
                    <CardContent className="p-5">
                      <div
                        className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${
                          item.title === current.title ? "bg-white/10 dark:bg-zinc-200" : "bg-zinc-100 dark:bg-zinc-800"
                        }`}
                      >
                        <SmallIcon className="h-5 w-5" />
                      </div>
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <p
                        className={`mt-2 text-sm leading-6 ${
                          item.title === current.title
                            ? "text-zinc-200 dark:text-zinc-700"
                            : "text-zinc-600 dark:text-zinc-300"
                        }`}
                      >
                        {item.blurb}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function AxiomNarrativeMicrosite() {
  const [activeAct, setActiveAct] = useState(acts[0].id);
  const [view, setView] = useState("story");

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 via-white to-zinc-100 text-zinc-900 dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-900 dark:text-zinc-100">
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end"
        >
          <div>
            <Badge className="rounded-full px-4 py-1 text-sm">From edge signal to governed intelligence</Badge>
            <h1 className="mt-5 max-w-5xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              A five-act product story for AISentry™ and the Axiom Intelligence Platform
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-zinc-600 dark:text-zinc-300 sm:text-lg">
              Start with something visible. Expand through the same operating pattern. End with an intelligence layer
              for an entire asset class.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {progression.map((step, i) => (
                <div key={step} className="flex items-center gap-3">
                  <div className="rounded-full border bg-white px-4 py-2 text-sm font-medium shadow-sm dark:bg-zinc-900">
                    {step}
                  </div>
                  {i < progression.length - 1 && <ArrowRight className="h-4 w-4 text-zinc-400" />}
                </div>
              ))}
            </div>
          </div>

          <Card className="rounded-[30px] border-0 bg-zinc-900 text-white shadow-2xl dark:bg-zinc-900">
            <CardHeader>
              <CardTitle className="text-xl">Story thesis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-6 text-zinc-300">
              <p>
                Most AI is conversational. This platform is proactive: it triages, prioritizes, explains, informs the
                operator, and can execute or revert actions under policy control.
              </p>
              <p>
                The same architecture scales from PPE detection and OT protection to data center oversight and finally
                to governed intelligence for developers, funds, hyperscalers, lenders, insurers, and governments.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-14">
        <div className="mb-8 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">Interactive view</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">
              Switch the narrative depending on the audience
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-7 text-zinc-600 dark:text-zinc-300">
              Story View explains platform evolution. Stakeholder View explains how the same governed corpus creates
              different value for different buyers.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={() => setView("story")}
              className="rounded-2xl px-5"
              variant={view === "story" ? "default" : "outline"}
            >
              Story View
            </Button>
            <Button
              onClick={() => setView("stakeholder")}
              className="rounded-2xl px-5"
              variant={view === "stakeholder" ? "default" : "outline"}
            >
              Stakeholder View
            </Button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28 }}
          >
            {view === "story" ? (
              <StoryView activeAct={activeAct} setActiveAct={setActiveAct} />
            ) : (
              <StakeholderView />
            )}
          </motion.div>
        </AnimatePresence>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-14">
        <div className="mb-8">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">System architecture</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">
            Architecture that scales for the enterprise
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-7 text-zinc-600 dark:text-zinc-300">
            This view makes the platform easier to understand than a dense static diagram by separating core reasoning,
            temporal data, policy logic, agents, operator control, and external feedback loops.
          </p>
        </div>
        <ArchitectureMap />
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16 pt-8 lg:px-10 lg:pb-24">
        <Card className="rounded-[32px] border-0 bg-gradient-to-r from-zinc-900 to-zinc-800 text-white shadow-2xl">
          <CardContent className="grid gap-6 p-8 lg:grid-cols-[1fr] lg:items-center lg:p-10">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-400">Closing frame</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                What started as a PPE check became a governed intelligence layer for AI infrastructure.
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-300">
                That is the story to tell visually: not a chatbot, not a point solution, but a platform that turns
                signals into institutional memory and memory into decision advantage.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
