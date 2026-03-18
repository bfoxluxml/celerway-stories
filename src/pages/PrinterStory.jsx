import React from "react";
import { motion } from "framer-motion";
import {
  Wifi,
  WifiOff,
  CheckCircle2,
  Building2,
} from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

// ─────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────


const verticals = [
  { label: "Enterprise Managed Print" },
  { label: "Healthcare / HIPAA" },
  { label: "Retail & POS" },
  { label: "Distributed Branch Networks" },
  { label: "Education & Campus" },
  { label: "Government Fleets" },
  { label: "ATMs & Kiosks" },
  { label: "Financial Services" },
];

const connectBullets = [
  "Private LTE cellular — no dependency on customer network",
  "Zero-touch deployment — plug in, device reports in 60 seconds",
  "Continuous meter reads, toner telemetry, usage reporting",
  "Remote diagnostics and firmware management restored",
  "Bring your own SIM or use Celerway fixed-rate data",
  "Fleet management portal: real-time status across every site",
  "36-month contract, hardware included, no CAPEX",
];

// ─────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────

function SectionLabel({ children }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400 mb-2">
      {children}
    </p>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN EXPORT
// ─────────────────────────────────────────────────────────────

export default function PrinterFleetStory() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 via-white to-zinc-100 text-zinc-900">
      <div className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">

        {/* ── HERO ─────────────────────────────────────────────── */}
        <section className="py-16 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-6 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide bg-emerald-100 text-emerald-800 border-0">
                Celerway Secure Edge Connect — printer fleet connectivity
              </Badge>
              <h1 className="text-5xl font-bold leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl">
                <span className="whitespace-nowrap">Your printers work.</span>
                <br />
                <span className="text-zinc-400 whitespace-nowrap">They just can't phone home.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-500">
                The printers are fine. It's the customer's firewall, the
                reconfigured VLAN, the Wi-Fi that went down in April. Every dark
                device is lost toner revenue, broken SLA tracking, and a security
                liability nobody is monitoring.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <div className="rounded-[28px] bg-zinc-900 text-white shadow-2xl p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 mb-6">
                  The problem
                </p>
                <p className="text-base font-semibold leading-7 text-white mb-4">
                  You don't control the networks where your devices live.
                </p>
                <p className="text-sm leading-7 text-zinc-400 mb-6">
                  Every facility has its own IT team, its own firewall rules,
                  its own approval process. Some take months. Some never
                  cooperate.
                </p>
                <div className="border-t border-zinc-800 pt-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-500 mb-3">
                    The fix
                  </p>
                  <p className="text-sm leading-7 text-zinc-300">
                    Private LTE cellular from the device directly to your
                    cloud. Customer IT never involved. Online in 60 seconds.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── COST OF DARK DEVICES ──────────────────────────────── */}
        <section className="py-10 lg:py-14">
          <SectionLabel>01 / The Cost of Going Dark</SectionLabel>
          <h2 className="text-3xl font-bold tracking-tight mb-3">
            A dark printer isn't a support ticket. It's a revenue leak.
          </h2>
          <p className="mb-10 max-w-lg text-base leading-7 text-zinc-500">
            Every device that can't phone home breaks toner automation, kills
            usage metering, and creates SLA exposure. The math compounds fast
            across a large fleet.
          </p>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="rounded-[28px] border border-red-100 bg-red-50 shadow-sm">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="rounded-2xl bg-gradient-to-br from-red-500 to-rose-400 p-2.5 text-white shadow-md">
                    <WifiOff className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-red-800">Why devices go dark</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Customer IT changed a firewall rule — nobody told the OEM",
                    "Wi-Fi credentials rotated during a building refresh",
                    "VLAN reconfigured after an office move",
                    "Proxy or certificate expired on the site network",
                    "IT team won't open exceptions — approval process takes months",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-red-900">
                      <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-xs text-red-700 font-medium">
                  The device works perfectly. It just can't phone home.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-[28px] border border-emerald-100 bg-emerald-50 shadow-sm">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-400 p-2.5 text-white shadow-md">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-emerald-800">What restores immediately</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Continuous meter reads and usage reporting resume",
                    "Toner auto-replenishment triggers correctly",
                    "Remote diagnostics and firmware management restored",
                    "SLA compliance tracking accurate again",
                    "Fleet analytics and predictive maintenance active",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-emerald-900">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-xs text-emerald-700 font-medium">
                  In under 60 seconds from plugging in the node.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ── THE SOLUTION ──────────────────────────────────────── */}
        <section className="py-10 lg:py-14">
          <SectionLabel>02 / The Solution</SectionLabel>
          <h2 className="text-3xl font-bold tracking-tight mb-3">
            Celerway Secure Edge Connect — private LTE for your fleet.
          </h2>
          <p className="mb-10 max-w-lg text-base leading-7 text-zinc-500">
            A Celerway edge node ships pre-configured to the site. The printer
            connects via Ethernet. The node opens a private LTE cellular tunnel
            directly to your fleet management cloud. The customer's firewall,
            Wi-Fi, and IT team are completely out of the picture.
          </p>

          <div className="grid lg:grid-cols-2 gap-8 lg:items-stretch">
            {/* Image */}
            <div className="rounded-[28px] overflow-hidden bg-zinc-100 shadow-sm border border-zinc-100 min-h-[360px]">
              <img
                src="/images/printer-celerway-back-wide.jpg"
                alt="Celerway edge node attached to printer — private LTE cellular connectivity"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Bullets */}
            <Card className="rounded-[28px] border-0 bg-gradient-to-br from-white to-zinc-50 shadow-xl">
              <CardContent className="p-8 lg:p-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-400 p-4 text-white shadow-xl">
                    <Wifi className="h-8 w-8" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                      Celerway Secure Edge Connect
                    </p>
                    <h3 className="mt-1 text-xl font-bold tracking-tight text-zinc-900">
                      Private LTE for your print fleet
                    </h3>
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {connectBullets.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4"
                    >
                      <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
                      <p className="text-sm leading-relaxed text-zinc-700">{item}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ── HOW WE WORK WITH OEMs ─────────────────────────────── */}
        <section className="py-10 lg:py-14">
          <SectionLabel>03 / How We Work With OEMs</SectionLabel>
          <h2 className="text-3xl font-bold tracking-tight mb-3">
            Zero integration lift. Online in 60 seconds.
          </h2>
          <p className="mb-10 max-w-xl text-base leading-7 text-zinc-500">
            We work directly with OEM service and operations teams. Hardware ships
            pre-configured. No professional services engagement required on site.
            Your field technician plugs it in. Your cloud sees the device within
            60 seconds. We handle the connectivity layer so your team never has
            to touch customer IT again.
          </p>

          {/* NHS proof point */}
          <Card className="rounded-[28px] border border-sky-100 bg-sky-50 shadow-sm">
            <CardContent className="p-8 flex items-start gap-6">
              <div className="rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-400 p-3 text-white shadow-lg shrink-0">
                <Building2 className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-sky-600 mb-2">
                  Proof point — NHS National Health Service
                </p>
                <p className="text-sm leading-7 text-sky-900 font-medium mb-1">
                  A Celerway node with Palo Alto SASE and a network-segmented cellular connection — deployed to a printer in a hospital radiology department.
                </p>
                <p className="text-sm leading-7 text-sky-800">
                  The hospital's network is marked "NO ACCESS — ISOLATED." The device never touches it. Telemetry flows to the OEM cloud through an encrypted tunnel. PHI-secure and compliant with UK Department of Health data protection standards. Same architecture works for any compliance-sensitive environment: government facilities, financial services, legal, education.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* ── VERTICALS ─────────────────────────────────────────── */}
        <section className="py-10 lg:py-14">
          <SectionLabel>04 / Where It Delivers Value</SectionLabel>
          <h2 className="text-3xl font-bold tracking-tight mb-3">
            Any device that needs to phone home.
          </h2>
          <p className="mb-8 max-w-lg text-base leading-7 text-zinc-500">
            The architecture is identical whether it's a printer, an ATM, a
            point-of-sale terminal, a kiosk, or a medical imaging device. One
            node. Private LTE. Customer IT never involved.
          </p>

          <div className="flex flex-wrap gap-2">
            {verticals.map((v) => (
              <span
                key={v.label}
                className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm"
              >
                {v.label}
              </span>
            ))}
          </div>
        </section>


      </div>
    </div>
  );
}
