import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Zap,
  Users,
  CheckCircle2,
  ArrowRight,
  Activity,
  Heart,
  Stethoscope,
  Server,
  Lock,
  Radio,
} from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

// ─────────────────────────────────────────────────────────────
// DATA — MEDICAL STORY
// ─────────────────────────────────────────────────────────────

const stages = [
  {
    id: "connect",
    num: "01",
    label: "Secure Edge Connect",
    sub: "Your device phones home. The hospital network never knows.",
    Icon: Radio,
    color: "from-sky-500 to-cyan-400",
    accent: "sky",
    accentHex: "#0EA5E9",
    lightBg: "bg-sky-50",
    lightBorder: "border-sky-200",
    dotColor: "bg-sky-500",
    summary:
      "The Celerway edge node creates a private cellular tunnel. Your medical device connects locally via Ethernet or Wi-Fi. The node tunnels telemetry, diagnostics, updates, and usage data directly to your cloud over private LTE/5G — completely bypassing the facility’s LAN, firewall, and IT department.",
    bullets: [
      "Zero-touch deployment — online in 60 seconds",
      "Private LTE/5G tunnel with IPSec encryption",
      "No firewall rules, no IT tickets, no VPN configuration",
      "Facility IT network never touched — network segmentation",
      "Supports Bring Your Own SIM or fixed-rate data",
      "Hardware (Celerway GO) included — zero CAPEX",
    ],
  },
  {
    id: "sovereign",
    num: "02",
    label: "Sovereign AI Edge",
    sub: "Deep visibility and autonomous protection inside the network segment gap.",
    Icon: Shield,
    color: "from-emerald-500 to-teal-400",
    accent: "emerald",
    accentHex: "#10B981",
    lightBg: "bg-emerald-50",
    lightBorder: "border-emerald-200",
    dotColor: "bg-emerald-500",
    summary:
      "Everything from Secure Edge Connect plus an on-device autonomous security agent. Deep packet inspection for medical protocols (DICOM, HL7, SNMP, etc.), passive asset discovery, threat intelligence, and policy enforcement — all running locally even when connectivity is lost.",
    bullets: [
      "DPI across 15+ protocols including DICOM PDU types and HL7",
      "Passive discovery + role inference for every connected device",
      "CISA KEV + AlienVault OTX threat feeds with medical filtering",
      "Policy engine with protocol-aware enforcement",
      "Risk scoring 0–100 per asset",
      "Azure private instance LLM analytics with natural language queries",
      "Palo Alto Prisma SASE included",
      "Hardware (Celerway Xm) included — zero CAPEX",
    ],
  },
  {
    id: "fleet",
    num: "03",
    label: "Fleet Intelligence",
    sub: "One dashboard. Every device. Every site. Always visible.",
    Icon: Activity,
    color: "from-amber-500 to-orange-400",
    accent: "amber",
    accentHex: "#F59E0B",
    lightBg: "bg-amber-50",
    lightBorder: "border-amber-200",
    dotColor: "bg-amber-500",
    summary:
      "Central fleet management portal shows real-time connectivity, diagnostics, remote access, and security posture for every device across thousands of sites. AI generates proactive briefings and surfaces at-risk devices before service revenue is impacted.",
    bullets: [
      "Real-time device status and connectivity health",
      "Remote diagnostics and predictive maintenance telemetry",
      "Usage reporting and compliance data always flowing",
      "Automated alerts when a device goes dark",
      "Spare hardware pre-positioned for fast RMA swaps",
      "Full audit trail for HIPAA and service contract requirements",
    ],
  },
];

const platformPillars = [
  {
    Icon: Lock,
    color: "from-sky-500 to-indigo-500",
    title: "Private Cellular Tunnel",
    body: "Your device never touches the facility LAN. Private LTE/5G tunnel bypasses firewalls and eliminates IT dependency.",
  },
  {
    Icon: Zap,
    color: "from-amber-500 to-red-400",
    title: "Zero-Touch Deployment",
    body: "Plug in, power on, online in 60 seconds. No professional services. No site visits required.",
  },
  {
    Icon: CheckCircle2,
    color: "from-cyan-500 to-emerald-500",
    title: "HIPAA-Ready by Design",
    body: "Encrypted tunnels, network-segmented architecture, full audit trails, and zero inbound ports ensure compliance from day one.",
  },
];

const useCases = [
  { label: "High-End Imaging (MRI, CT, PET)", color: "text-sky-700", bg: "bg-sky-50", border: "border-sky-200", live: true },
  { label: "Diagnostic Analyzers", color: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-200", live: true },
  { label: "Surgical Robotics & Navigation", color: "text-amber-700", bg: "bg-amber-50", border: "border-amber-200" },
  { label: "Infusion & Monitoring Systems", color: "text-blue-700", bg: "bg-blue-50", border: "border-blue-200" },
  { label: "Ultrasound & Portable Devices", color: "text-violet-700", bg: "bg-violet-50", border: "border-violet-200" },
  { label: "Laboratory Equipment", color: "text-red-700", bg: "bg-red-50", border: "border-red-200" },
  { label: "Dental & Veterinary Imaging", color: "text-indigo-700", bg: "bg-indigo-50", border: "border-indigo-200" },
];

const stakeholders = [
  {
    Icon: Stethoscope,
    color: "text-sky-600",
    bg: "bg-sky-50",
    iconBorder: "border-sky-200",
    label: "Medical Device OEMs",
    blurb: "Protect service revenue. Ensure telemetry, updates, and usage data always flow — regardless of hospital IT.",
  },
  {
    Icon: Heart,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    iconBorder: "border-emerald-200",
    label: "Hospital & Clinic IT",
    blurb: "Eliminate firewall negotiations and security reviews. Devices connect without touching your network.",
  },
  {
    Icon: Server,
    color: "text-amber-600",
    bg: "bg-amber-50",
    iconBorder: "border-amber-200",
    label: "Service & Field Teams",
    blurb: "Remote diagnostics and predictive maintenance work everywhere. No more dark devices.",
  },
  {
    Icon: Users,
    color: "text-violet-600",
    bg: "bg-violet-50",
    iconBorder: "border-violet-200",
    label: "Compliance & Risk Teams",
    blurb: "Day-one HIPAA-ready architecture with full audit trails and zero-trust connectivity.",
  },
];

const deploymentSteps = [
  "Ship pre-configured node",
  "Facility staff plugs device into node + powers on",
  "Node establishes private cellular tunnel",
  "Device appears in your cloud within 60–90 seconds",
  "Telemetry, diagnostics, and updates flow securely",
];

// ─────────────────────────────────────────────────────────────
// SUB-COMPONENTS (reused from PlatformStory)
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
          <div className={`shrink-0 rounded-2xl bg-gradient-to-br ${stage.color} p-3 text-white shadow-lg`}>
            <Icon className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className={`text-[10px] font-semibold uppercase tracking-[0.18em] ${isActive ? "opacity-50" : "text-zinc-400"}`}>
                  {stage.num}
                </div>
                <div className="mt-0.5 text-[17px] font-semibold leading-tight">{stage.label}</div>
              </div>
              <ArrowRight className={`h-4 w-4 shrink-0 transition-transform duration-200 ${isActive ? "translate-x-1 opacity-60" : "opacity-30"}`} />
            </div>
            <p className={`mt-1.5 text-sm leading-relaxed ${isActive ? "text-zinc-300 dark:text-zinc-600" : "text-zinc-500"}`}>
              {stage.sub}
            </p>
          </div>
        </div>
      </button>
      {showConnector && <div className="ml-[30px] h-5 w-px bg-zinc-200 dark:bg-zinc-700" />}
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
            <div className="mb-6 flex items-center gap-4">
              <div className={`rounded-3xl bg-gradient-to-br ${stage.color} p-4 text-white shadow-xl`}>
                <Icon className="h-8 w-8" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">Stage {stage.num}</p>
                <h3 className="mt-1 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">{stage.label}</h3>
              </div>
            </div>

            <p className="mb-8 text-sm leading-7 text-zinc-600 dark:text-zinc-300">{stage.summary}</p>

            <div className="grid gap-3 sm:grid-cols-2">
              {stage.bullets.map((item) => (
                <div key={item} className={`flex items-start gap-3 rounded-2xl border ${stage.lightBorder} ${stage.lightBg} p-4 dark:border-zinc-800 dark:bg-zinc-900/50`}>
                  <div className={`mt-1 h-2 w-2 shrink-0 rounded-full ${stage.dotColor}`} />
                  <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{item}</p>
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

export default function MedicalStory() {
  const [activeStage, setActiveStage] = useState(stages[0]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 via-white to-zinc-100 text-zinc-900 dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-900 dark:text-zinc-100">
      <div className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">

        {/* HERO */}
        <section className="py-16 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Badge className="mb-6 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide">
                Your devices. Your cloud. Zero hospital network dependency.
              </Badge>
              <h1 className="text-5xl font-bold leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl">
                Celerway — Secure Edge Connect
                <br />
                <span className="text-zinc-400">for Medical Devices</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-500 dark:text-zinc-400">
                Medical devices stop reporting when they depend on hospital networks.
Celerway lets them phone home directly.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}>
              <Card className="rounded-[28px] border-0 bg-zinc-900 text-white shadow-2xl">
                <CardContent className="p-5">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">Core Thesis</p>
                  <p className="text-sm leading-6 text-zinc-300">
                    Hospitals control their networks. You control your devices and service revenue. Celerway creates a private cellular tunnel so your devices phone home directly — no IT tickets, no delays, no lost revenue.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* PROBLEM → SOLUTION */}
        <section className="py-10 lg:py-14">
          <div className="grid gap-6 lg:grid-cols-2">

            {/* Problem */}
            <Card className="rounded-[28px] border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <CardContent className="p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-500 mb-2">
                  The Problem
                </p>
                <h3 className="text-xl font-bold mb-3">
                  Medical devices stop reporting
                </h3>
                <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  OEM service platforms depend on telemetry for diagnostics,
                  predictive maintenance, and updates. But devices sit behind
                  hospital networks the OEM does not control.
                </p>

                <ul className="mt-5 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                  <li>- Network changes break connectivity</li>
                  <li>- IT work orders take weeks or months</li>
                  <li>- Devices go dark</li>
                  <li>- Service teams lose visibility</li>
                </ul>
              </CardContent>
            </Card>

            {/* Solution */}
            <Card className="rounded-[28px] border border-emerald-200 bg-emerald-50 shadow-sm dark:border-emerald-900 dark:bg-emerald-950/30">
              <CardContent className="p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600 mb-2">
                  The Solution
                </p>
                <h3 className="text-xl font-bold mb-3">
                  Devices phone home directly
                </h3>
                <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  Celerway provides a private cellular edge connection so medical
                  devices communicate directly with the OEM cloud.
                </p>

                <ul className="mt-5 space-y-2 text-sm text-zinc-700 dark:text-zinc-400">
                  <li>- No dependency on hospital LAN</li>
                  <li>- No firewall negotiations</li>
                  <li>- No IT work orders</li>
                  <li>- Device online in ~60 seconds</li>
                </ul>
              </CardContent>
            </Card>

          </div>
        </section>

        {/* PLATFORM PILLARS */}
        <section className="py-10 lg:py-14">
          <div className="mb-10">
            <SectionLabel index={2}>Platform Architecture</SectionLabel>
            <h2 className="text-3xl font-bold tracking-tight">Built for medical reality.</h2>
            <p className="mt-3 max-w-lg text-base leading-7 text-zinc-500 dark:text-zinc-400">
              One secure edge node. Private cellular. Zero trust by design.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
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
                      <div className={`mb-5 inline-flex rounded-2xl bg-gradient-to-br ${pillar.color} p-3 text-white shadow-lg`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="mb-2 text-base font-bold text-zinc-900 dark:text-zinc-100">{pillar.title}</h3>
                      <p className="text-sm leading-7 text-zinc-500 dark:text-zinc-400">{pillar.body}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* USE CASES */}
        <section className="py-10 lg:py-14">
          <div className="mb-10">
            <SectionLabel index={3}>Use Cases</SectionLabel>
            <h2 className="text-3xl font-bold tracking-tight">One solution. Every medical device.</h2>
            <p className="mt-3 max-w-lg text-base leading-7 text-zinc-500 dark:text-zinc-400">
              From fixed imaging suites to portable equipment — anywhere your devices need reliable, secure cloud connectivity.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {useCases.map((v) => (
              <span
                key={v.label}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold ${v.color} ${v.bg} ${v.border}`}
              >
                {v.live && <span className={`h-1.5 w-1.5 rounded-full ${v.color.replace("text-", "bg-")}`} />}
                {v.label}
                {v.live && <span className="ml-0.5 text-[10px] font-bold opacity-60">LIVE</span>}
              </span>
            ))}
          </div>
        </section>

        {/* REAL-WORLD DEPLOYMENT VISUAL - Using your selected photo */}
        <section className="py-12 bg-white dark:bg-zinc-900 border-y border-zinc-100 dark:border-zinc-800">
          <div className="mx-auto max-w-6xl px-6">
            <SectionLabel>Proven in Real Clinical Environments</SectionLabel>

            <div className="grid lg:grid-cols-2 gap-10 items-center">
              {/* Your selected image */}
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-zinc-200 dark:border-zinc-700 max-w-md mx-auto lg:mx-0">
                <img
                  src="/images/ultrasound-celerway.jpg?v=2"
                  alt="Ultrasound machine with discreet Celerway GO mounted low"
                  className="w-full h-auto"
                />
              </div>

              {/* Benefits text */}
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 dark:bg-emerald-900/60 px-5 py-2 text-emerald-700 dark:text-emerald-300 text-sm font-medium">
                  UK Department of Health Approved - PHI Secure
                </div>

                <div>
                  <h3 className="text-2xl font-semibold mb-3">Zero footprint. Zero friction.</h3>
                  <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                    The Celerway GO mounts discreetly and stays out of the way.
                    No extra space, no IT tickets, no changes to the medical device.
                    Your equipment works exactly as designed — now with reliable private cellular connectivity.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 text-sm">
                  <div className="bg-zinc-50 dark:bg-zinc-800 rounded-2xl p-5">
                    <div className="font-semibold text-emerald-600 mb-1">60-Second Deployment</div>
                    <div className="text-zinc-500">Plug in → Power on → Secure cloud connection</div>
                  </div>
                  <div className="bg-zinc-50 dark:bg-zinc-800 rounded-2xl p-5">
                    <div className="font-semibold text-emerald-600 mb-1">Completely Invisible to Hospital IT</div>
                    <div className="text-zinc-500">Facility LAN is fully bypassed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HOW WE WORK WITH OEMs */}
        <section className="py-10 lg:py-14">
          <div className="mb-10">
            <SectionLabel index={4}>How We Work With OEMs</SectionLabel>
            <h2 className="text-3xl font-bold tracking-tight">Zero integration lift. Online in 60 seconds.</h2>
            <p className="mt-3 max-w-xl text-base leading-7 text-zinc-500 dark:text-zinc-400">
              We work directly with OEM service and operations teams. Hardware ships
              pre-configured. No professional services engagement required on site.
              Your field technician plugs it in. Your cloud sees the device within
              60 seconds. We handle the connectivity layer so your team never has
              to touch hospital IT again.
            </p>
          </div>
        </section>

        {/* STAKEHOLDERS */}
        <section className="py-10 lg:py-14">
          <div className="mb-10">
            <SectionLabel index={5}>Who It Serves</SectionLabel>
            <h2 className="text-3xl font-bold tracking-tight">Everyone wins when devices stay online.</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                  <Card className="h-full rounded-[28px] border border-zinc-100 bg-white shadow-sm hover:border-zinc-200 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/70">
                    <CardContent className="p-6">
                      <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border ${item.iconBorder} ${item.bg} ${item.color}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <h4 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">{item.label}</h4>
                      <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">{item.blurb}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* DEPLOYMENT */}
        <section className="py-10 lg:py-14">
          <div className="mb-10">
            <SectionLabel index={6}>How It Works</SectionLabel>
            <h2 className="text-3xl font-bold tracking-tight">From box to online in under two minutes.</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-5">
            {deploymentSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="rounded-3xl bg-white p-6 shadow-sm dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800"
              >
                <div className="mb-3 text-4xl font-bold text-zinc-200 dark:text-zinc-700">{String(i + 1).padStart(2, "0")}</div>
                <p className="text-zinc-600 dark:text-zinc-300">{step}</p>
              </motion.div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
