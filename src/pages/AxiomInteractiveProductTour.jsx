import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Brain,
  Building2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Database,
  Eye,
  Factory,
  Globe,
  Landmark,
  Radar,
  ScrollText,
  Server,
  Shield,
  ShieldCheck,
  Wrench,
  Users,
  Zap,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";

const tourSteps = [
  {
    id: "edge",
    label: "Step 1",
    title: "Start with a visible edge signal",
    subtitle: "Begin where the story is easiest to understand.",
    icon: Eye,
    color: "from-sky-500 to-cyan-500",
    body:
      "The tour starts with the Vision Agent because people immediately understand PPE, zones, audit trails, and reports. It is concrete, demos beautifully, and credible.",
    bullets: [
      "PPE compliance by zone",
      "Immediate visual proof point",
      "Audit trail and reporting",
      "Entry into policy-driven operations",
    ],
    callout: "This is the wedge that makes the rest of the platform legible.",
  },
  {
    id: "triage",
    label: "Step 2",
    title: "Show that the system is proactive, not conversational",
    subtitle: "Events become priorities, not chat responses.",
    icon: Brain,
    color: "from-emerald-500 to-teal-500",
    body:
      "AISentry™ consumes temporal events, correlates patterns across time, and creates operator briefings. The point is not conversation. The point is triage, ranking, and action under policy control.",
    bullets: [
      "Event-driven PostgreSQL",
      "Temporal correlation",
      "Operator briefings",
      "Top-domino prioritization",
    ],
    callout: "The platform tells the operator what matters first and why.",
  },
  {
    id: "architecture",
    label: "Step 3",
    title: "Reveal the governed architecture",
    subtitle: "Reasoning, policy, tools, and action loops work together.",
    icon: Database,
    color: "from-amber-500 to-orange-500",
    body:
      "Once people understand the behavior, show the architecture: Azure hosted, private LLM, event-driven Postgres, FastAPI, UI, policy engine, function-calling tools, edge agents, operator approval, and external action loops like Cortex.",
    bullets: [
      "Azure hosted AI reasoning layer",
      "Policy engine over the corpus",
      "Edge agents and approval loop",
      "External action and feedback systems",
    ],
    callout: "This is governed intelligence, not an unbounded assistant.",
  },
  {
    id: "expansion",
    label: "Step 4",
    title: "Expand through repeated operating patterns",
    subtitle: "One platform, many domains.",
    icon: Radar,
    color: "from-fuchsia-500 to-violet-500",
    body:
      "The same pattern scales to OT, healthcare, protected devices, out-of-band monitoring, and data center operations because the platform is standardized through policies rather than bespoke workflows.",
    bullets: [
      "OT east-west visibility",
      "Healthcare and regulated environments",
      "Protected devices and secure tunnels",
      "Data center operations and alarm triage",
    ],
    callout: "The pattern scales because the policy model scales.",
  },
  {
    id: "axiom",
    label: "Step 5",
    title: "Land the strategic payoff: Axiom",
    subtitle: "The owner’s rep is the entry point. The platform is the prize.",
    icon: Building2,
    color: "from-indigo-500 to-blue-500",
    body:
      "Axiom is the institutional intelligence layer for AI infrastructure. The same corpus serves different buyers through different policy lenses and acts as a horizontal enabling layer. That turns project history into an enduring operating memory for an entire asset class.",
    bullets: [
      "Site, build, commission, capital, exit",
      "Corpus-based moat",
      "Stakeholder-specific policy views",
      "Network effects across projects",
    ],
    callout: "What starts as a PPE check becomes decision advantage at asset-class scale.",
  },
];

const stakeholders = [
  { title: "Owner’s Rep", icon: Building2, text: "Beachhead buyer and immediate revenue path." },
  { title: "Developers", icon: Factory, text: "Execution intelligence and delay risk control." },
  { title: "Funds", icon: Landmark, text: "Portfolio benchmarking and exit timing." },
  { title: "Hyperscalers", icon: Server, text: "Partner evaluation and readiness visibility." },
  { title: "Lenders + Insurers", icon: Shield, text: "Underwriting from governed evidence." },
  { title: "Governments", icon: Globe, text: "Standardized policy views for strategic infrastructure." },
];

const architectureBlocks = [
  { title: "React UI", icon: Users },
  { title: "FastAPI", icon: Zap },
  { title: "Azure hosted LLM", icon: Brain },
  { title: "Event-driven Postgres", icon: Database },
  { title: "Policy Engine", icon: ScrollText },
  { title: "Function Tools", icon: Wrench },
  { title: "Edge Agents", icon: Radar },
  { title: "Operator Loop", icon: CheckCircle2 },
  { title: "Cortex / Actions", icon: ShieldCheck },
];

function StepVisual({ step }) {
  if (step.id === "architecture") {
    return (
      <div className="grid gap-3 sm:grid-cols-3">
        {architectureBlocks.map((block, index) => {
          const Icon = block.icon;
          return (
            <motion.div
              key={block.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: index * 0.03 }}
              className="rounded-3xl border bg-white/80 p-4 shadow-sm dark:bg-zinc-900/70"
            >
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800">
                <Icon className="h-5 w-5" />
              </div>
              <div className="text-sm font-semibold">{block.title}</div>
            </motion.div>
          );
        })}
      </div>
    );
  }

  if (step.id === "axiom") {
    return (
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stakeholders.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: index * 0.04 }}
              className="rounded-3xl border bg-white/80 p-4 shadow-sm dark:bg-zinc-900/70"
            >
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800">
                <Icon className="h-5 w-5" />
              </div>
              <div className="text-sm font-semibold">{item.title}</div>
              <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">{item.text}</p>
            </motion.div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {step.bullets.map((bullet, index) => (
        <motion.div
          key={bullet}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: index * 0.04 }}
          className="rounded-3xl border bg-white/80 p-5 shadow-sm dark:bg-zinc-900/70"
        >
          <div className="flex items-start gap-3">
            <div className={`mt-1 h-2.5 w-2.5 rounded-full bg-gradient-to-r ${step.color}`} />
            <p className="text-sm leading-7 text-zinc-700 dark:text-zinc-300">{bullet}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default function AxiomInteractiveProductTour() {
  const [stepIndex, setStepIndex] = useState(0);
  const step = useMemo(() => tourSteps[stepIndex], [stepIndex]);
  const StepIcon = step.icon;
  const progress = ((stepIndex + 1) / tourSteps.length) * 100;

  const nextStep = () => setStepIndex((s) => Math.min(s + 1, tourSteps.length - 1));
  const prevStep = () => setStepIndex((s) => Math.max(s - 1, 0));

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 via-white to-zinc-100 text-zinc-900 dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-900 dark:text-zinc-100">
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <Badge className="rounded-full px-4 py-1 text-sm">Interactive product tour</Badge>
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Walk the audience from the first edge signal to the Axiom platform payoff
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-zinc-600 dark:text-zinc-300 sm:text-lg">
              This version is built like a guided tour. It is optimized for demos, executive walkthroughs, and product storytelling inside the app.
            </p>
          </div>

          <Card className="rounded-[30px] border-0 bg-zinc-900 text-white shadow-2xl dark:bg-zinc-900">
            <CardHeader>
              <CardTitle className="text-xl">Tour framing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-6 text-zinc-300">
              <p>
                The audience should not have to reverse-engineer the product. This tour reveals the story in sequence.
              </p>
              <p>
                Each step answers a specific question: what it is, why it matters, how it works, where it expands, and why the platform becomes strategically important.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-6 lg:px-10 lg:py-8">
        <Card className="rounded-[32px] border-0 bg-gradient-to-br from-white to-zinc-100 shadow-2xl dark:from-zinc-900 dark:to-zinc-950">
          <CardContent className="p-6 lg:p-8">
            <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="text-sm uppercase tracking-[0.2em] text-zinc-500">{step.label}</div>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight">{step.title}</h2>
                <p className="mt-2 text-base leading-7 text-zinc-600 dark:text-zinc-300">{step.subtitle}</p>
              </div>

              <div className="min-w-[280px]">
                <div className="mb-2 flex items-center justify-between text-sm text-zinc-500">
                  <span>Tour progress</span>
                  <span>{stepIndex + 1} / {tourSteps.length}</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            </div>

            <div className="mb-8 flex flex-wrap gap-3">
              {tourSteps.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => setStepIndex(index)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                    index === stepIndex
                      ? "border-zinc-900 bg-zinc-900 text-white dark:border-white dark:bg-white dark:text-zinc-900"
                      : "bg-white hover:border-zinc-400 dark:bg-zinc-900"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]"
              >
                <Card className="rounded-[28px] border bg-zinc-900 text-white shadow-xl dark:bg-zinc-900">
                  <CardContent className="p-6 lg:p-8">
                    <div className={`mb-5 inline-flex rounded-3xl bg-gradient-to-br ${step.color} p-4 text-white shadow-lg`}>
                      <StepIcon className="h-8 w-8" />
                    </div>
                    <div className="text-sm uppercase tracking-[0.2em] text-zinc-400">Narrative</div>
                    <p className="mt-4 text-base leading-7 text-zinc-300">{step.body}</p>

                    <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-5">
                      <div className="text-sm uppercase tracking-[0.2em] text-zinc-400">Key takeaway</div>
                      <p className="mt-3 text-base leading-7 text-white">{step.callout}</p>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid gap-6">
                  <StepVisual step={step} />

                  <div className="flex flex-wrap items-center justify-between gap-4 rounded-[28px] border bg-white/80 p-5 shadow-sm dark:bg-zinc-900/70">
                    <Button onClick={prevStep} variant="outline" className="rounded-2xl px-5" disabled={stepIndex === 0}>
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      Previous
                    </Button>

                    <div className="flex items-center gap-2 text-sm text-zinc-500">
                      <span>{tourSteps[Math.max(stepIndex - 1, 0)]?.title}</span>
                      <ArrowRight className="h-4 w-4" />
                      <span className="font-semibold text-zinc-900 dark:text-zinc-100">{step.title}</span>
                    </div>

                    <Button onClick={nextStep} className="rounded-2xl px-5" disabled={stepIndex === tourSteps.length - 1}>
                      Next
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </CardContent>
        </Card>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16 pt-8 lg:px-10 lg:pb-24">
        <Card className="rounded-[32px] border-0 bg-gradient-to-r from-zinc-900 to-zinc-800 text-white shadow-2xl">
          <CardContent className="p-8 lg:p-10">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-400">Closing frame</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">
              This tour is designed to make the platform impossible to misunderstand.
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-300">
              It starts with a concrete proof point, explains the governed architecture, and lands on the strategic payoff: a platform that compounds institutional intelligence over time.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
