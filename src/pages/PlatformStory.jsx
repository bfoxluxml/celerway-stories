import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  Shield,
  Server,
  Building2,
  Brain,
  Database,
  Zap,
  Users,
  CheckCircle2,
  ArrowRight,
  Briefcase,
  Factory,
  Landmark,
  Globe,
  Lock,
  Network,
  Radio,
  Activity,
  Share2,
} from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

// ─────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────

const stages = [
  {
    id: "vision",
    num: "01",
    label: "Vision Agent",
    sub: "Visible. Intuitive. Everyone gets it.",
    Icon: Eye,
    color: "from-sky-500 to-cyan-400",
    accent: "sky",
    accentHex: "#0EA5E9",
    lightBg: "bg-sky-50",
    lightBorder: "border-sky-200",
    dotColor: "bg-sky-500",
    summary:
      "Computer vision at the edge, watching construction sites and critical spaces for PPE compliance, zone violations, and worker safety. The same platform that powers network security also watches the physical world — policies govern zones, edge agents do the sensing, the AI briefs the safety officer.",
    bullets: [
      "YOLOv8 inference runs on commodity edge hardware",
      "Zone-specific policies — different rules per area",
      "Every violation: timestamped, tagged, auditable",
      "AI-generated shift briefings for safety teams",
      "The MWC demo everyone understood immediately",
    ],
  },
  {
    id: "ot",
    num: "02",
    label: "Packet + OT Agent",
    sub: "Explainable protection. East-west visibility.",
    Icon: Shield,
    color: "from-emerald-500 to-teal-400",
    accent: "emerald",
    accentHex: "#10B981",
    lightBg: "bg-emerald-50",
    lightBorder: "border-emerald-200",
    dotColor: "bg-emerald-500",
    summary:
      "Deep packet inspection at the access point — not port detection, but protocol-aware understanding of what is actually happening. The agent knows why it blocks something and can explain the dependencies downstream. Palo Alto is blind inside the OT field. This is the visibility they cannot provide.",
    bullets: [
      "15+ OT and IT protocols parsed to function-code level",
      "CISA KEV + AlienVault OTX threat context on every event",
      "East-west (lateral) movement — what north-south tools miss",
      "Auto-discovery of every device off an access point",
      "Knows why it blocks — not just that it blocked",
      "Autonomous at the edge when connectivity drops",
      "Controlled RL learning toward future autonomy",
    ],
  },
  {
    id: "dc",
    num: "03",
    label: "Data Center Agent",
    sub: "300 alarms. One top domino.",
    Icon: Network,
    color: "from-amber-500 to-orange-400",
    accent: "amber",
    accentHex: "#F59E0B",
    lightBg: "bg-amber-50",
    lightBorder: "border-amber-200",
    dotColor: "bg-amber-500",
    summary:
      "Two modes, one codebase. The OT agent watches the facilities VLAN — power, cooling, BMS. The OOB agent watches the management network — every baseboard controller your SOC has never been able to monitor. A correlation engine connects signals across both domains and the physical layer. When 300 alarms fire simultaneously, the AI tells you which one to touch first.",
    bullets: [
      "Facilities network: UPS, PDU, CRAC, BMS — classified by name not IP",
      "Out-of-band: every BMC, iDRAC, iLO — hardware-level visibility",
      "Cross-domain correlation: physical + OT + OOB events together",
      "Proactive shift briefing: top domino before the fire starts",
      "Human-in-the-loop: operator approves, platform executes and can revert",
      "Every security event feeds Palo Alto Cortex XSOAR",
      "90 seconds from power-on to first asset discovery",
    ],
  },
  {
    id: "axiom",
    num: "04",
    label: "Axiom Intelligence",
    sub: "The intelligence layer for an asset class.",
    Icon: Building2,
    color: "from-violet-500 to-fuchsia-500",
    accent: "violet",
    accentHex: "#8B5CF6",
    lightBg: "bg-violet-50",
    lightBorder: "border-violet-200",
    dotColor: "bg-violet-500",
    summary:
      "Nobody has built the intelligence layer for gigawatt AI factory development. The same governed policy engine that monitors a construction site now spans site selection, design-build, commissioning, capital deployment, and exit timing. The owner's rep is the entry point — but the platform is the data moat for an entire asset class.",
    bullets: [
      "16 policies across site, build, commission, capital, and exit",
      "Every signal traces to a policy ID and a corpus citation",
      "Trained on actual project decisions — not templates",
      "Same corpus, stakeholder-specific policy views",
      "Institutional memory with compounding network effects",
      "CoStar for commercial real estate — this for AI infrastructure",
    ],
  },
];

const platformPillars = [
  {
    Icon: Zap,
    color: "from-sky-500 to-indigo-500",
    title: "Proactive AI",
    body: "Not a chatbot you query. When a shift starts, the AI has already analyzed the event history, generated a briefing, and identified the top domino. It acts before you ask.",
  },
  {
    Icon: Database,
    color: "from-emerald-500 to-sky-500",
    title: "Event-driven database",
    body: "Everything is temporal. The AI queries live data through function calls — not a static knowledge base. Time-series correlations across millions of events from every agent.",
  },
  {
    Icon: CheckCircle2,
    color: "from-violet-500 to-fuchsia-500",
    title: "Policy engine",
    body: "Policies govern what every edge agent does. Every detection fires a policy ID. Every action has an audit trail. From a PPE zone rule to a commissioning readiness check — same engine.",
  },
  {
    Icon: Users,
    color: "from-amber-500 to-red-400",
    title: "Human-in-the-loop",
    body: "The AI recommends autonomous actions — block a device, change a VPN profile, quarantine a node. The operator approves with one click. One more click reverts it. Every action is traceable.",
  },
  {
    Icon: Lock,
    color: "from-red-500 to-violet-500",
    title: "Air-gapped by design",
    body: "Monitoring traffic never touches the management interface. 5G cellular carries only heartbeats and events outbound. No inbound ports on any agent. Zero attack surface.",
  },
  {
    Icon: Share2,
    color: "from-cyan-500 to-emerald-500",
    title: "Palo Alto partnership",
    body: "Every security event feeds Cortex XSOAR. Celerway Nimbus executes configuration changes on approval. AISentry™ sees east-west movement inside the OT field that Palo Alto cannot.",
  },
];

const verticals = [
  { label: "Data Center",       color: "text-sky-700",     bg: "bg-sky-50",     border: "border-sky-200",   live: true  },
  { label: "Construction",      color: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-200", live: true },
  { label: "Oil & Gas Pipeline",color: "text-amber-700",   bg: "bg-amber-50",   border: "border-amber-200"              },
  { label: "Maritime",          color: "text-blue-700",    bg: "bg-blue-50",    border: "border-blue-200"               },
  { label: "Medical / HIPAA",   color: "text-red-700",     bg: "bg-red-50",     border: "border-red-200"                },
  { label: "Building BMS",      color: "text-indigo-700",  bg: "bg-indigo-50",  border: "border-indigo-200"             },
  { label: "Fleet / Vehicle",   color: "text-violet-700",  bg: "bg-violet-50",  border: "border-violet-200"             },
  { label: "Enterprise Print",  color: "text-slate-700",   bg: "bg-slate-50",   border: "border-slate-200"              },
  { label: "Public Safety",     color: "text-pink-700",    bg: "bg-pink-50",    border: "border-pink-200"               },
  { label: "Modular DC",        color: "text-cyan-700",    bg: "bg-cyan-50",    border: "border-cyan-200"               },
  { label: "Sovereign Edge",    color: "text-orange-700",  bg: "bg-orange-50",  border: "border-orange-200"             },
];

const stakeholders = [
  {
    Icon: Briefcase,
    color: "text-amber-600",
    bg: "bg-amber-50",
    iconBorder: "border-amber-200",
    label: "Owner's Rep",
    blurb: "Entry point with immediate revenue. Replaces spreadsheets with governed AI across site, build, commission, and exit.",
  },
  {
    Icon: Factory,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    iconBorder: "border-emerald-200",
    label: "Developers",
    blurb: "De-risk site selection and build execution. The AI knows more than any individual consultant because it was trained on actual decisions.",
  },
  {
    Icon: Landmark,
    color: "text-violet-600",
    bg: "bg-violet-50",
    iconBorder: "border-violet-200",
    label: "Infrastructure Funds",
    blurb: "Benchmark portfolios, time exits, evaluate development partners. Same corpus, different policy views.",
  },
  {
    Icon: Server,
    color: "text-sky-600",
    bg: "bg-sky-50",
    iconBorder: "border-sky-200",
    label: "Hyperscalers",
    blurb: "Evaluate development partners, monitor supply chains, track gigawatt campus progress against benchmarks.",
  },
  {
    Icon: Shield,
    color: "text-red-600",
    bg: "bg-red-50",
    iconBorder: "border-red-200",
    label: "Lenders + Insurers",
    blurb: "Underwrite construction and operational risk from governed signals — not spreadsheet snapshots.",
  },
  {
    Icon: Globe,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    iconBorder: "border-indigo-200",
    label: "Governments",
    blurb: "Assess AI infrastructure quality and readiness with standardized policy views over institutional memory.",
  },
];

const lifecycleTags = [
  "Site selection",
  "Power + water OTAs",
  "Integrator management",
  "Rack, stack, turn-up",
  "Commissioning",
  "Capital deployment",
  "Exit timing",
];

// ─────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────

function SectionLabel({ index, children }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400 mb-2">
      {String(index).padStart(2, "0")} / {children}
    </p>
  );
}

function StageButton({ stage, active, onClick, showConnector }) {
  const { Icon } = stage;
  const isActive = active.id === stage.id;

  return (
    <>
      <button
        onClick={() => onClick(stage)}
        className={`w-full rounded-[28px] border p-5 text-left transition-all duration-200 ${
          isActive
            ? "border-zinc-900 bg-zinc-900 text-white shadow-2xl dark:border-white dark:bg-white dark:text-zinc-900"
            : "border-zinc-200 bg-white/80 hover:border-zinc-300 hover:bg-white dark:border-zinc-800 dark:bg-zinc-900/70 dark:hover:border-zinc-600"
        }`}
      >
        <div className="flex items-start gap-4">
          <div
            className={`shrink-0 rounded-2xl bg-gradient-to-br ${stage.color} p-3 text-white shadow-lg`}
          >
            <Icon className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div
                  className={`text-[10px] font-semibold uppercase tracking-[0.18em] ${
                    isActive ? "opacity-50" : "text-zinc-400"
                  }`}
                >
                  {stage.num}
                </div>
                <div className="mt-0.5 text-[17px] font-semibold leading-tight">
                  {stage.label}
                </div>
              </div>
              <ArrowRight
                className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                  isActive ? "translate-x-1 opacity-60" : "opacity-30"
                }`}
              />
            </div>
            <p
              className={`mt-1.5 text-sm leading-relaxed ${
                isActive ? "text-zinc-300 dark:text-zinc-600" : "text-zinc-500"
              }`}
            >
              {stage.sub}
            </p>
          </div>
        </div>
      </button>
      {showConnector && (
        <div className="ml-[30px] h-5 w-px bg-zinc-200 dark:bg-zinc-700" />
      )}
    </>
  );
}

function DetailPanel({ stage }) {
  const { Icon } = stage;
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={stage.id}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.26 }}
        className="h-full"
      >
        <Card className="h-full rounded-[32px] border-0 bg-gradient-to-br from-white to-zinc-50 shadow-xl dark:from-zinc-900 dark:to-zinc-950">
          <CardContent className="p-8 lg:p-10">
            {/* Header */}
            <div className="mb-6 flex items-center gap-4">
              <div
                className={`rounded-3xl bg-gradient-to-br ${stage.color} p-4 text-white shadow-xl`}
              >
                <Icon className="h-8 w-8" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                  Stage {stage.num}
                </p>
                <h3 className="mt-1 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                  {stage.label}
                </h3>
              </div>
            </div>

            {/* Summary */}
            <p className="mb-8 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
              {stage.summary}
            </p>

            {/* Bullets */}
            <div className="grid gap-3 sm:grid-cols-2">
              {stage.bullets.map((item) => (
                <div
                  key={item}
                  className={`flex items-start gap-3 rounded-2xl border ${stage.lightBorder} ${stage.lightBg} p-4 dark:border-zinc-800 dark:bg-zinc-900/50`}
                >
                  <div
                    className={`mt-1 h-2 w-2 shrink-0 rounded-full ${stage.dotColor}`}
                  />
                  <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN EXPORT
// ─────────────────────────────────────────────────────────────

export default function PlatformStory() {
  const [activeStage, setActiveStage] = useState(stages[0]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 via-white to-zinc-100 text-zinc-900 dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-900 dark:text-zinc-100">
      <div className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">

        {/* ── HERO ─────────────────────────────────────────────── */}
        <section className="py-16 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-6 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide">
                From edge signal to governed intelligence
              </Badge>
              <h1 className="text-5xl font-bold leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl">
                <span className="whitespace-nowrap">AISentry™ —</span>{" "}
                <span className="text-zinc-400 whitespace-nowrap">one platform,</span>
                <br />
                every domain.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-500 dark:text-zinc-400">
                Start with a PPE check everyone understands. Expand through OT
                protection and data center operations to a governed intelligence
                layer for an entire asset class.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <Card className="rounded-[28px] border-0 bg-zinc-900 text-white shadow-2xl dark:bg-zinc-900">
                <CardContent className="p-8">
                  <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
                    Core thesis
                  </p>
                  <p className="mb-4 text-sm leading-7 text-zinc-300">
                    Most AI is conversational. This platform is proactive: it
                    reads millions of events, triages what matters, applies
                    policies, and informs the operator before anything breaks.
                  </p>
                  <p className="text-sm leading-7 text-zinc-300">
                    The same pattern scales from a PPE violation to a thermal
                    event in a $500M data center to exit timing for a gigawatt
                    AI campus.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* ── 01 / PROGRESSION ─────────────────────────────────── */}
        <section className="py-10 lg:py-14">
          <div className="mb-10">
            <SectionLabel index={1}>Progression</SectionLabel>
            <h2 className="text-3xl font-bold tracking-tight">
              Start small. Expand by pattern.
            </h2>
            <p className="mt-3 max-w-lg text-base leading-7 text-zinc-500 dark:text-zinc-400">
              Each agent adds a new domain. The platform core — the LLM, the
              event database, the policy engine — never changes. Only what the
              edge watches expands.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            {/* Stage selector */}
            <div>
              {stages.map((stage, idx) => (
                <StageButton
                  key={stage.id}
                  stage={stage}
                  active={activeStage}
                  onClick={setActiveStage}
                  showConnector={idx < stages.length - 1}
                />
              ))}
            </div>

            {/* Detail panel */}
            <DetailPanel stage={activeStage} />
          </div>
        </section>

        {/* ── 02 / PLATFORM ARCHITECTURE ───────────────────────── */}
        <section className="py-10 lg:py-14">
          <div className="mb-10">
            <SectionLabel index={2}>Platform Architecture</SectionLabel>
            <h2 className="text-3xl font-bold tracking-tight">
              One brain. Every agent reports to it.
            </h2>
            <p className="mt-3 max-w-lg text-base leading-7 text-zinc-500 dark:text-zinc-400">
              Azure-hosted LLM, a private instance. An event-driven
              database where everything is temporal. A policy engine that
              governs every agent at every edge.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {platformPillars.map((pillar, i) => {
              const { Icon } = pillar;
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full rounded-[28px] border border-zinc-100 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900/70">
                    <CardContent className="p-6">
                      <div
                        className={`mb-5 inline-flex rounded-2xl bg-gradient-to-br ${pillar.color} p-3 text-white shadow-lg`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="mb-2 text-base font-bold text-zinc-900 dark:text-zinc-100">
                        {pillar.title}
                      </h3>
                      <p className="text-sm leading-7 text-zinc-500 dark:text-zinc-400">
                        {pillar.body}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ── 03 / VERTICALS ───────────────────────────────────── */}
        <section className="py-10 lg:py-14">
          <div className="mb-10">
            <SectionLabel index={3}>Market Reach</SectionLabel>
            <h2 className="text-3xl font-bold tracking-tight">
              One platform, eleven verticals.
            </h2>
            <p className="mt-3 max-w-lg text-base leading-7 text-zinc-500 dark:text-zinc-400">
              The same policy engine, the same AI, the same edge architecture —
              applied wherever there are unmonitored OT devices, network blind
              spots, or physical compliance requirements.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {verticals.map((v) => (
              <span
                key={v.label}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold ${v.color} ${v.bg} ${v.border}`}
              >
                {v.live && (
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${v.color.replace("text-", "bg-")}`}
                  />
                )}
                {v.label}
                {v.live && (
                  <span className="ml-0.5 text-[10px] font-bold opacity-60">
                    LIVE
                  </span>
                )}
              </span>
            ))}
          </div>
          <div className="mt-5 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-xs text-zinc-400">
              Live = production-deployed agent + fully wired UI
            </span>
            <span className="ml-4 text-xs text-zinc-300">
              All others: UI built, same agent stack, ready to deploy
            </span>
          </div>
        </section>

        {/* ── 04 / AXIOM ───────────────────────────────────────── */}
        <section className="py-10 lg:py-14">
          <div className="mb-10">
            <SectionLabel index={4}>Axiom Intelligence Platform</SectionLabel>
            <h2 className="text-3xl font-bold tracking-tight">
              One corpus. Six stakeholders. Every deal.
            </h2>
            <p className="mt-3 max-w-lg text-base leading-7 text-zinc-500 dark:text-zinc-400">
              CoStar became the authoritative data platform for commercial real
              estate without managing a single property. This is the same play
              for AI infrastructure.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
            {/* Dark corpus card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="h-full rounded-[32px] border-0 bg-zinc-900 text-white shadow-2xl">
                <CardContent className="flex h-full flex-col justify-between p-8 lg:p-10">
                  <div>
                    <div className="mb-6 inline-flex rounded-3xl bg-gradient-to-br from-violet-500 to-fuchsia-500 p-4 text-white shadow-xl">
                      <Brain className="h-8 w-8" />
                    </div>
                    <h3 className="mb-4 text-2xl font-bold">
                      Axiom Intelligence
                    </h3>
                    <p className="mb-4 text-sm leading-7 text-zinc-300">
                      Traditional owner's rep: 1–3% of project, delivered in
                      spreadsheets, no data moat, no recurring revenue. Nobody
                      has built the intelligence layer for gigawatt AI factory
                      development.
                    </p>
                    <p className="text-sm leading-7 text-zinc-300">
                      The policy engine built for AISentry™ now governs 16
                      policies across site, build, commission, capital, and
                      exit. Every signal fires a policy ID. Every policy has a
                      corpus citation. Governed intelligence — not a chatbot.
                    </p>
                  </div>

                  {/* Lifecycle tags */}
                  <div className="mt-8 border-t border-white/10 pt-6">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                      Lifecycle coverage
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {lifecycleTags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-xl border border-white/10 bg-white/[0.07] px-3 py-1 text-xs text-zinc-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Stakeholder grid */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {stakeholders.map((item, i) => {
                const { Icon } = item;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.06 }}
                    viewport={{ once: true }}
                  >
                    <Card className="h-full rounded-[28px] border border-zinc-100 bg-white shadow-sm transition-all hover:border-zinc-200 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/70">
                      <CardContent className="p-5">
                        <div
                          className={`mb-4 flex h-11 w-11 items-center justify-center rounded-2xl border ${item.iconBorder} ${item.bg} ${item.color}`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <h4 className="mb-2 text-sm font-bold text-zinc-900 dark:text-zinc-100">
                          {item.label}
                        </h4>
                        <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                          {item.blurb}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
