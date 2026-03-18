// src/pages/AxiomPolicies.jsx
// AXIOM Intelligence Platform — Policy Engine
// Governed intelligence layer: Site · Build · Commission · Capital · Exit
// Mirrors AI Sentry / Security Policies architecture

import React, { useState } from 'react';

// ════════════════════════════════════════════════════════════════════════════
// POLICY DATA
// ════════════════════════════════════════════════════════════════════════════
const CATEGORIES = ['All', 'Site', 'Build', 'Commission', 'Capital', 'Exit'];

const CAT_ACCENT = (cat) => ({
  Site:       { cls: 'text-sky-400',     bg: 'bg-sky-500/15',     border: 'border-sky-500/30',     dot: 'bg-sky-400' },
  Build:      { cls: 'text-orange-400',  bg: 'bg-orange-500/15',  border: 'border-orange-500/30',  dot: 'bg-orange-400' },
  Commission: { cls: 'text-red-400',     bg: 'bg-red-500/15',     border: 'border-red-500/30',     dot: 'bg-red-400' },
  Capital:    { cls: 'text-indigo-400',  bg: 'bg-indigo-500/15',  border: 'border-indigo-500/30',  dot: 'bg-indigo-400' },
  Exit:       { cls: 'text-violet-400',  bg: 'bg-violet-500/15',  border: 'border-violet-500/30',  dot: 'bg-violet-400' },
}[cat] || { cls: 'text-slate-400', bg: 'bg-slate-500/15', border: 'border-slate-500/30', dot: 'bg-slate-400' });

const STATUS_CLS = {
  Triggered:  { label: 'Triggered',  dot: 'bg-red-400 animate-pulse', text: 'text-red-400',     bg: 'bg-red-500/10',     border: 'border-red-500/25' },
  Active:     { label: 'Active',     dot: 'bg-emerald-400',           text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/25' },
  Monitoring: { label: 'Monitoring', dot: 'bg-amber-400',             text: 'text-amber-400',   bg: 'bg-amber-500/10',   border: 'border-amber-500/25' },
  Inactive:   { label: 'Inactive',   dot: 'bg-slate-600',             text: 'text-slate-500',   bg: 'bg-slate-800/40',   border: 'border-slate-700/30' },
};

const POLICIES = [
  // ── SITE ───────────────────────────────────────────────────────────────
  {
    id: 'SITE-001',
    name: 'Grid Queue Threshold',
    category: 'Site',
    status: 'Triggered',
    description: 'Fires when utility interconnect queue exceeds corpus median by more than 20% for the substation class and jurisdiction.',
    trigger: 'Interconnect queue > corpus median + 20%',
    corpusBasis: '31 site selections across $5B portfolio — APS, PG&E, ComEd, Dominion, ERCOT substations.',
    confidenceThreshold: 80,
    recommendedAction: 'Advance utility pre-application immediately. Model alternative substations within 15-mile radius. Notify BOD of timeline risk.',
    lastFired: '3 days ago',
    lastFireProject: 'Sonoran Compute Park',
    projectsAssigned: ['Sonoran Compute Park', 'Mile High AI Hub', 'Midwest Sovereign Exchange'],
    projectsTriggered: ['Sonoran Compute Park'],
    savedValue: '$18M',
    corpusMatches: [
      { project: 'Switch PHX 1',    year: 2019, outcome: 'Same APS substation — 22-month queue, project relocated', relevance: 95 },
      { project: 'QTS Chandler',    year: 2021, outcome: 'Pre-application advanced 5 months, queue reduced to 14 months', relevance: 89 },
      { project: 'Aligned Gilbert', year: 2023, outcome: 'Alternative feed identified, saved 6 months vs primary', relevance: 83 },
    ],
  },
  {
    id: 'SITE-002',
    name: 'Latency Spec Validation',
    category: 'Site',
    status: 'Triggered',
    description: 'Validates fiber routing from site to tenant-required exchange or cloud on-ramp. Fires when measured latency exceeds tenant SLA.',
    trigger: 'Modeled latency > tenant spec threshold',
    corpusBasis: '19 financial exchange and latency-sensitive deployments. Corpus includes 6 fiber routing failures with known remediation costs.',
    confidenceThreshold: 85,
    recommendedAction: 'Model 3 fiber route options immediately. Identify dark fiber procurement path before BOD lock. Cost of resolution scales 4× after steel is set.',
    lastFired: '1 day ago',
    lastFireProject: 'Midwest Sovereign Exchange',
    projectsAssigned: ['Midwest Sovereign Exchange', 'Mile High AI Hub'],
    projectsTriggered: ['Midwest Sovereign Exchange'],
    savedValue: '$12M',
    corpusMatches: [
      { project: 'Equinix CH6',       year: 2019, outcome: 'Dark fiber resolved constraint — $2M premium vs $14M rework', relevance: 91 },
      { project: 'Iron Mountain DEN', year: 2020, outcome: 'Latency conflict — site abandoned, $6M sunk cost', relevance: 88 },
      { project: 'QTS Chicago',       year: 2022, outcome: 'Resolved at BOD via design addendum, zero impact', relevance: 86 },
    ],
  },
  {
    id: 'SITE-003',
    name: 'Water Rights Availability',
    category: 'Site',
    status: 'Active',
    description: 'Confirms adequate water rights for cooling load at projected MW capacity before site commitment. Checks aquifer, municipal, and riparian rights.',
    trigger: 'Water allocation < cooling load at projected MW + 15% buffer',
    corpusBasis: '24 site selections in water-constrained markets: Phoenix, Las Vegas, Denver, Dallas, Atlanta.',
    confidenceThreshold: 90,
    recommendedAction: 'Confirm allocation before LOI. File water rights application concurrently with utility pre-application. Competing claims monitored quarterly.',
    lastFired: '14 days ago',
    lastFireProject: 'Mile High AI Hub',
    projectsAssigned: ['Mile High AI Hub', 'Sonoran Compute Park'],
    projectsTriggered: [],
    savedValue: '$8M',
    corpusMatches: [
      { project: 'Aligned PHX 1',  year: 2021, outcome: 'Water rights secured concurrently — no delay', relevance: 93 },
      { project: 'Aligned DEN 1',  year: 2022, outcome: 'Upfront rights secured — no renegotiation at construction', relevance: 84 },
    ],
  },
  {
    id: 'SITE-004',
    name: 'Permitting Risk Scoring',
    category: 'Site',
    status: 'Monitoring',
    description: 'Scores permitting risk by jurisdiction based on corpus history of approval timelines, opposition patterns, and environmental review requirements.',
    trigger: 'Permitting risk score < 65 for target jurisdiction',
    corpusBasis: 'Permitting history across 38 jurisdictions — county, municipal, state, federal. Includes 11 permit delays with causal analysis.',
    confidenceThreshold: 75,
    recommendedAction: 'Engage local government relations 6 months before permit filing. Pre-engage opposition stakeholders. Consider alternative jurisdictions if score < 50.',
    lastFired: '22 days ago',
    lastFireProject: 'Sonoran Compute Park',
    projectsAssigned: ['Sonoran Compute Park', 'Mile High AI Hub', 'Lone Star AI Campus'],
    projectsTriggered: [],
    savedValue: '$6M avg',
    corpusMatches: [
      { project: 'CyrusOne Austin',   year: 2021, outcome: 'Opposition delay 8 months — early engagement would have prevented', relevance: 87 },
      { project: 'Aligned Garland',   year: 2023, outcome: 'Permit secured in 90 days via pre-engagement protocol', relevance: 82 },
    ],
  },

  // ── BUILD ──────────────────────────────────────────────────────────────
  {
    id: 'BILD-001',
    name: 'Vendor Lead Time Deviation',
    category: 'Build',
    status: 'Triggered',
    description: 'Monitors critical path equipment lead times vs contract. Fires when any single vendor shows >8-week deviation across the portfolio.',
    trigger: 'Equipment lead time deviation > +8 weeks vs contract',
    corpusBasis: '47 build phases across $5B portfolio. Tracks 12 critical equipment categories: UPS, switchgear, transformers, CRAC, cooling towers, generators.',
    confidenceThreshold: 87,
    recommendedAction: 'Authorize parallel procurement from secondary vendor. Confirm skid compatibility via Axiom corpus before committing. Single procurement decision can protect multiple sites simultaneously.',
    lastFired: '2 days ago',
    lastFireProject: 'Peachtree Edge Data',
    projectsAssigned: ['Lone Star AI Campus', 'Peachtree Edge Data', 'Sonoran Compute Park'],
    projectsTriggered: ['Peachtree Edge Data'],
    savedValue: '$28M (3 sites)',
    corpusMatches: [
      { project: 'Switch LAS 2022', year: 2022, outcome: 'Vertiv UPS delay — 14-week slip, $22M penalty. No parallel procurement.', relevance: 97 },
      { project: 'eBay PHX 2019',   year: 2019, outcome: 'Early detection — Eaton substitution, zero schedule impact', relevance: 94 },
      { project: 'CyrusOne ATL',    year: 2021, outcome: 'Dual-source procurement standard implemented after incident', relevance: 81 },
    ],
  },
  {
    id: 'BILD-002',
    name: 'Portfolio Equipment Pattern',
    category: 'Build',
    status: 'Triggered',
    description: 'Detects the same equipment failure, delay, or defect pattern occurring across 2+ portfolio sites simultaneously — the cross-portfolio signal that no single PM sees.',
    trigger: 'Same equipment SKU + delay signature at ≥2 active sites',
    corpusBasis: 'Cross-portfolio correlation engine trained on $5B of equipment procurement, delivery, and substitution history.',
    confidenceThreshold: 85,
    recommendedAction: 'Treat as portfolio-level emergency. Single escalation and procurement decision protects all affected sites. Notify all affected PMs simultaneously.',
    lastFired: '2 days ago',
    lastFireProject: '3 sites (Dallas, Atlanta, Seattle)',
    projectsAssigned: ['Lone Star AI Campus', 'Peachtree Edge Data'],
    projectsTriggered: ['Peachtree Edge Data'],
    savedValue: '$28M combined',
    corpusMatches: [
      { project: 'Aligned Portfolio 2022', year: 2022, outcome: 'Detected Generac generator delay across 4 sites — consolidated procurement saved 8 weeks', relevance: 94 },
      { project: 'Switch Multi-site 2021', year: 2021, outcome: 'Same Vertiv UPS SKU failure pattern — early detection enabled substitution', relevance: 90 },
    ],
  },
  {
    id: 'BILD-003',
    name: 'RFI Escalation Threshold',
    category: 'Build',
    status: 'Monitoring',
    description: 'Tracks open RFI count, age, and criticality. Fires when open P1 RFIs exceed threshold relative to phase timeline — a leading indicator of commissioning risk.',
    trigger: 'Open P1 RFIs > 25 with >14 days average age during Build phase',
    corpusBasis: '39 build phases with RFI tracking. P1 RFI count at Build 70% completion is the single strongest predictor of commissioning slip.',
    confidenceThreshold: 82,
    recommendedAction: 'Convene RFI triage session within 48 hours. Prioritize top 10 P1s for immediate resolution. Consider schedule buffer draw-down if count exceeds 40.',
    lastFired: '5 days ago',
    lastFireProject: 'Peachtree Edge Data',
    projectsAssigned: ['Peachtree Edge Data', 'Lone Star AI Campus', 'Midwest Sovereign Exchange'],
    projectsTriggered: [],
    savedValue: '$4M avg',
    corpusMatches: [
      { project: 'eBay SLC 2018',     year: 2018, outcome: '42 open P1 RFIs at Build 65% — commissioning slipped 18 days', relevance: 91 },
      { project: 'Aligned PHX Build', year: 2023, outcome: 'RFI triage at week 32 — no commissioning impact', relevance: 85 },
    ],
  },
  {
    id: 'BILD-004',
    name: 'MEP vs Schedule Variance',
    category: 'Build',
    status: 'Active',
    description: 'Monitors mechanical, electrical, and plumbing progress against milestone schedule. Flags variance before it compounds into commissioning risk.',
    trigger: 'MEP progress > 8% behind schedule milestone',
    corpusBasis: 'Schedule tracking across 31 build phases. MEP lag at the 50% build milestone has 78% correlation with commissioning slippage.',
    confidenceThreshold: 78,
    recommendedAction: 'Increase crew density on lagging MEP trades. Evaluate weekend shift authorization. MEP lag at 50% is recoverable at 2× cost — at 80% it requires schedule buffer.',
    lastFired: '8 days ago',
    lastFireProject: 'Peachtree Edge Data',
    projectsAssigned: ['Peachtree Edge Data', 'Sonoran Compute Park'],
    projectsTriggered: [],
    savedValue: '$3M avg',
    corpusMatches: [
      { project: 'Aligned Dallas Build', year: 2022, outcome: 'MEP surge crew at week 28 — 0 commissioning impact', relevance: 89 },
      { project: 'QTS Richmond',         year: 2020, outcome: 'MEP lag unaddressed — 3-week commissioning slip, $6M cost', relevance: 84 },
    ],
  },

  // ── COMMISSION ─────────────────────────────────────────────────────────
  {
    id: 'COMM-001',
    name: 'IST Sequence Conflict',
    category: 'Commission',
    status: 'Triggered',
    description: 'Detects when integrated systems testing scheduling creates mechanical conflicts — most commonly CRAC commissioning windows overlapping with electrical IST sequencing.',
    trigger: 'IST window overlap > 5 days between any two mechanical/electrical systems on critical path',
    corpusBasis: '47 commissioning sequences. IST conflicts are the #1 cause of final-mile commissioning slippage — detected in 23% of projects that didn\'t use structured sequencing.',
    confidenceThreshold: 88,
    recommendedAction: 'Authorize parallel IST tracks. Dedicate separate crews to conflicting systems. Mobilize surge capacity if SLA window is < 45 days.',
    lastFired: '1 day ago',
    lastFireProject: 'Lone Star AI Campus',
    projectsAssigned: ['Lone Star AI Campus'],
    projectsTriggered: ['Lone Star AI Campus'],
    savedValue: '$42M',
    corpusMatches: [
      { project: 'eBay Salt Lake City', year: 2018, outcome: 'Parallel IST resolved 21-day slip in 8 days via surge protocol', relevance: 98 },
      { project: 'Switch LAS 4',        year: 2020, outcome: 'CRAC/electrical conflict — 14-day slip, $28M SLA penalty', relevance: 91 },
      { project: 'Aligned PHX 2',       year: 2022, outcome: 'Surge crew protocol — 11 days recovered at $2.4M cost', relevance: 87 },
    ],
  },
  {
    id: 'COMM-002',
    name: 'P1 Punch List · SLA Window',
    category: 'Commission',
    status: 'Triggered',
    description: 'Monitors open P1 punch list items relative to remaining SLA window. Fires when projected close rate puts SLA at risk.',
    trigger: 'P1 punch close rate insufficient to clear list before SLA date at current velocity',
    corpusBasis: '41 commissioning closeouts tracked. P1 item count at T-45 days to SLA is the strongest leading indicator of SLA breach.',
    confidenceThreshold: 91,
    recommendedAction: 'Convene daily P1 war room. Assign owners to every open item. Consider parallel closure tracks. SLA breach cost is non-linear — early intervention is 10× cheaper.',
    lastFired: '1 day ago',
    lastFireProject: 'Lone Star AI Campus',
    projectsAssigned: ['Lone Star AI Campus'],
    projectsTriggered: ['Lone Star AI Campus'],
    savedValue: 'Included in COMM-001',
    corpusMatches: [
      { project: 'Aligned Dallas 2022', year: 2022, outcome: 'Daily war room at T-38 — all P1s cleared, no SLA breach', relevance: 93 },
      { project: 'CyrusOne Phoenix',    year: 2021, outcome: '41 P1s at T-30 — SLA breached by 9 days, $18M penalty', relevance: 88 },
    ],
  },
  {
    id: 'COMM-003',
    name: 'Surge Crew Authorization',
    category: 'Commission',
    status: 'Active',
    description: 'Pre-authorizes surge crew mobilization when commissioning risk score drops below threshold. Removes decision latency from the highest-cost phase.',
    trigger: 'Commission risk score < 45 AND days to SLA < 50',
    corpusBasis: 'Decision latency analysis across 19 commissioning interventions. Average time from risk detection to surge authorization: 4.2 days without pre-authorization, 0.3 days with.',
    confidenceThreshold: 90,
    recommendedAction: 'Pre-authorize surge crew to mobilize within 24 hours when both trigger conditions are met. Standing PO with 3 crews recommended for active commissioning projects.',
    lastFired: 'Not yet fired',
    lastFireProject: '—',
    projectsAssigned: ['Lone Star AI Campus'],
    projectsTriggered: [],
    savedValue: 'Decision latency: 3.9 days recovered',
    corpusMatches: [
      { project: 'eBay SLC 2018',    year: 2018, outcome: 'Pre-authorized surge crew mobilized in 6 hours — 19 days recovered', relevance: 96 },
      { project: 'Aligned PHX 2022', year: 2022, outcome: '4-day authorization delay cost 8 recoverable days', relevance: 89 },
    ],
  },

  // ── CAPITAL ────────────────────────────────────────────────────────────
  {
    id: 'CPTL-001',
    name: 'Exit Window Optimization',
    category: 'Capital',
    status: 'Active',
    description: 'Models hyperscaler capex cycles and infrastructure fund deployment windows to identify peak exit timing. Fires when optimal window opens within 12 months.',
    trigger: 'Demand cycle model scores exit window ≥ 85 AND asset governance readiness ≥ 80',
    corpusBasis: '12 comparable transactions modeled: Switch, QTS, CyrusOne, Aligned, Iron Mountain REIT. Timing premium vs off-cycle: 15-22% average.',
    confidenceThreshold: 88,
    recommendedAction: 'Initiate sale process 6 months before optimal window. Begin governance prep immediately. PUE optimization adds 2-4% to exit multiple — implement before go-to-market.',
    lastFired: '7 days ago',
    lastFireProject: 'Virginia Hyperscale Cluster',
    projectsAssigned: ['Virginia Hyperscale Cluster'],
    projectsTriggered: [],
    savedValue: '$180M+ uplift',
    corpusMatches: [
      { project: 'Switch REIT IPO',     year: 2017, outcome: '11× EBITDA — peak demand cycle exit', relevance: 96 },
      { project: 'QTS Blackstone',      year: 2021, outcome: '28× EBITDA — AI demand surge premium', relevance: 92 },
      { project: 'Aligned Blackrock',   year: 2025, outcome: '$40B — sovereign AI infrastructure premium', relevance: 89 },
    ],
  },
  {
    id: 'CPTL-002',
    name: 'PUE Optimization Opportunity',
    category: 'Capital',
    status: 'Active',
    description: 'Identifies when PUE is above corpus benchmark for asset class and cooling configuration. Quantifies exit valuation impact of optimization before go-to-market.',
    trigger: 'PUE actual > PUE corpus benchmark by > 0.04 for cooling configuration',
    corpusBasis: '28 operating assets with PUE tracking. RL thermal controls show average 0.06 PUE improvement at $380K/year savings. Pre-exit implementation adds 2-3% to transaction multiple.',
    confidenceThreshold: 85,
    recommendedAction: 'Implement RL thermal controls 6+ months before exit process. Zero downtime deployment. NPV of optimization vs cost is typically 8-12× at exit.',
    lastFired: '7 days ago',
    lastFireProject: 'Virginia Hyperscale Cluster',
    projectsAssigned: ['Virginia Hyperscale Cluster'],
    projectsTriggered: [],
    savedValue: '$2.8M exit uplift',
    corpusMatches: [
      { project: 'QTS Richmond Ops',   year: 2020, outcome: 'RL controls: PUE 1.42→1.36, $410K/yr, +2.1% transaction multiple', relevance: 92 },
      { project: 'Aligned Dallas Ops', year: 2023, outcome: 'PUE optimization 6mo before sale: +$3.1M to exit value', relevance: 89 },
    ],
  },
  {
    id: 'CPTL-003',
    name: 'Budget Variance Escalation',
    category: 'Capital',
    status: 'Monitoring',
    description: 'Escalates when project budget variance exceeds thresholds by phase. Early variance is manageable — late variance compounds. Triggers at different levels by phase.',
    trigger: 'Budget variance > +1.5% (Site/Design) | > +2.5% (Build) | > +1.0% (Commission)',
    corpusBasis: '52 project completions with budget tracking. Commission phase variance has highest NPV impact per dollar due to SLA penalty exposure. Early phase variance is nearly always recoverable.',
    confidenceThreshold: 82,
    recommendedAction: 'Convene budget review within 5 business days of trigger. Identify root cause — scope creep vs vendor variance vs change orders. Commission phase: prioritize recovery over cost control.',
    lastFired: '4 days ago',
    lastFireProject: 'Lone Star AI Campus',
    projectsAssigned: ['Lone Star AI Campus', 'Peachtree Edge Data', 'Midwest Sovereign Exchange'],
    projectsTriggered: [],
    savedValue: '$2M avg',
    corpusMatches: [
      { project: 'Aligned build portfolio', year: 2022, outcome: 'Early variance detection: 94% of projects held within 3% of budget', relevance: 88 },
    ],
  },

  // ── EXIT ───────────────────────────────────────────────────────────────
  {
    id: 'EXIT-001',
    name: 'Governance Readiness Score',
    category: 'Exit',
    status: 'Active',
    description: 'Tracks IPO and strategic transaction governance readiness: board composition, audit cleanliness, ESG reporting, financial model normalization, and legal entity structure.',
    trigger: 'Exit window within 18 months AND governance score < 80',
    corpusBasis: '9 completed exit transactions. Governance gaps discovered in due diligence add 60-90 days to close and reduce multiple by 4-8% on average.',
    confidenceThreshold: 90,
    recommendedAction: 'Begin governance prep 18 months before target exit. Prioritize: independent board seats, 3-year audited financials, GRESB Tier 1 reporting, clean cap table.',
    lastFired: '14 days ago',
    lastFireProject: 'Virginia Hyperscale Cluster',
    projectsAssigned: ['Virginia Hyperscale Cluster'],
    projectsTriggered: [],
    savedValue: 'Multiple protection: 4-8%',
    corpusMatches: [
      { project: 'Switch IPO 2017',      year: 2017, outcome: 'Clean governance — IPO at top of range', relevance: 94 },
      { project: 'QTS strategic 2021',   year: 2021, outcome: '30-day DD extension due to board structure — $120M haircut', relevance: 89 },
    ],
  },
  {
    id: 'EXIT-002',
    name: 'Strategic Buyer Identification',
    category: 'Exit',
    status: 'Active',
    description: 'Continuously monitors infrastructure fund deployment mandates, REIT capital raise cycles, and hyperscaler strategic M&A signals to identify buyers before process launch.',
    trigger: 'Asset meets exit readiness threshold AND ≥2 identified buyers with active mandates',
    corpusBasis: 'Buyer mandate tracking across 14 infrastructure funds, 6 REITs, and 4 hyperscaler corporate development teams. Cycle timing has 12-18 month predictability.',
    confidenceThreshold: 78,
    recommendedAction: 'Build relationships with identified buyers 12+ months before process. Provide data room access to strategic buyers 6 months early for competitive tension.',
    lastFired: '7 days ago',
    lastFireProject: 'Virginia Hyperscale Cluster',
    projectsAssigned: ['Virginia Hyperscale Cluster'],
    projectsTriggered: [],
    savedValue: 'Process premium: 8-15%',
    corpusMatches: [
      { project: 'Aligned exit 2025',    year: 2025, outcome: '3 competing bidders → $40B — 22% premium vs single-buyer process', relevance: 91 },
      { project: 'CyrusOne 2021',        year: 2021, outcome: 'Pre-identified buyers — 40-day faster close', relevance: 86 },
    ],
  },
];

// ════════════════════════════════════════════════════════════════════════════
// POLICY STATS
// ════════════════════════════════════════════════════════════════════════════
const POLICY_STATS = [
  { label: 'Total Policies',    value: POLICIES.length.toString(),                                             color: 'text-white' },
  { label: 'Active',            value: POLICIES.filter(p => p.status === 'Active').length.toString(),           color: 'text-emerald-400' },
  { label: 'Triggered',         value: POLICIES.filter(p => p.status === 'Triggered').length.toString(),        color: 'text-red-400' },
  { label: 'Monitoring',        value: POLICIES.filter(p => p.status === 'Monitoring').length.toString(),       color: 'text-amber-400' },
  { label: 'Value Protected',   value: '$280M+',                                                               color: 'text-indigo-400' },
];

// ════════════════════════════════════════════════════════════════════════════
// POLICY CARD
// ════════════════════════════════════════════════════════════════════════════
const PolicyCard = ({ policy, onClick, isSelected }) => {
  const cat = CAT_ACCENT(policy.category);
  const st = STATUS_CLS[policy.status];

  return (
    <div onClick={() => onClick(policy)}
      className={`bg-slate-800/50 border rounded-xl p-4 cursor-pointer transition-all duration-200 hover:bg-slate-800/70 hover:border-slate-600/60
        ${isSelected ? 'border-indigo-500/50' : 'border-slate-700/50'}`}>

      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-2 min-w-0">
          <span className={`text-[10px] font-bold font-mono px-1.5 py-0.5 rounded border ${cat.bg} ${cat.border} ${cat.cls} flex-shrink-0`}>
            {policy.id}
          </span>
        </div>
        <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full border flex-shrink-0 ${st.bg} ${st.border}`}>
          <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${st.dot}`}/>
          <span className={`text-[9px] font-bold uppercase tracking-wider ${st.text}`}>{st.label}</span>
        </div>
      </div>

      <div className="text-sm font-semibold text-white mb-1">{policy.name}</div>
      <div className={`text-[10px] font-semibold uppercase tracking-wider mb-2 ${cat.cls}`}>{policy.category}</div>
      <p className="text-xs text-slate-400 leading-relaxed mb-3 line-clamp-2">{policy.description}</p>

      {/* Trigger */}
      <div className="bg-slate-900/60 rounded-lg px-3 py-2 mb-3">
        <div className="text-[9px] text-slate-600 uppercase tracking-wider mb-1">Trigger condition</div>
        <div className="text-[11px] text-slate-300 font-mono leading-snug">{policy.trigger}</div>
      </div>

      {/* Footer stats */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div>
            <div className="text-[9px] text-slate-600">Assigned</div>
            <div className="text-xs font-semibold text-slate-300">{policy.projectsAssigned.length} projects</div>
          </div>
          {policy.projectsTriggered.length > 0 && (
            <div>
              <div className="text-[9px] text-red-500/70">Triggered</div>
              <div className="text-xs font-semibold text-red-400">{policy.projectsTriggered.length} active</div>
            </div>
          )}
        </div>
        <div className="text-right">
          <div className="text-[9px] text-slate-600">Value protected</div>
          <div className="text-xs font-semibold text-emerald-400">{policy.savedValue}</div>
        </div>
      </div>
    </div>
  );
};

// ════════════════════════════════════════════════════════════════════════════
// POLICY DETAIL PANEL
// ════════════════════════════════════════════════════════════════════════════
const PolicyPanel = ({ policy, onClose }) => {
  const cat = CAT_ACCENT(policy.category);
  const st = STATUS_CLS[policy.status];

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="w-full max-w-lg bg-slate-900 border-l border-slate-700/60 flex flex-col overflow-y-auto h-full"
        style={{ animation: 'slideInRight 0.22s ease-out' }} onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="p-5 border-b border-slate-700/60 flex-shrink-0">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-[10px] font-bold font-mono px-1.5 py-0.5 rounded border ${cat.bg} ${cat.border} ${cat.cls}`}>{policy.id}</span>
                <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full border ${st.bg} ${st.border}`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${st.dot}`}/>
                  <span className={`text-[9px] font-bold uppercase tracking-wider ${st.text}`}>{st.label}</span>
                </div>
              </div>
              <div className="text-base font-bold text-white">{policy.name}</div>
              <div className={`text-[10px] font-semibold uppercase tracking-wider mt-1 ${cat.cls}`}>{policy.category} Policy</div>
            </div>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors text-lg flex-shrink-0">✕</button>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">{policy.description}</p>
        </div>

        <div className="p-5 space-y-5">

          {/* Trigger + corpus basis */}
          <div className="space-y-3">
            <div className="bg-slate-800/60 rounded-xl p-4">
              <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-2">Trigger Condition</div>
              <div className="text-xs text-slate-200 font-mono leading-relaxed bg-slate-900/60 rounded-lg px-3 py-2">{policy.trigger}</div>
            </div>
            <div className="bg-slate-800/60 rounded-xl p-4">
              <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-2">Corpus Basis</div>
              <p className="text-xs text-slate-300 leading-relaxed">{policy.corpusBasis}</p>
            </div>
          </div>

          {/* Confidence + last fired */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-slate-800/60 rounded-xl p-3 text-center">
              <div className="text-xl font-bold text-white">{policy.confidenceThreshold}%</div>
              <div className="text-[9px] text-slate-500 uppercase tracking-wider mt-0.5">Confidence threshold</div>
            </div>
            <div className="bg-slate-800/60 rounded-xl p-3 text-center">
              <div className="text-xl font-bold text-emerald-400">{policy.projectsAssigned.length}</div>
              <div className="text-[9px] text-slate-500 uppercase tracking-wider mt-0.5">Projects assigned</div>
            </div>
            <div className="bg-slate-800/60 rounded-xl p-3 text-center">
              <div className={`text-xl font-bold ${policy.projectsTriggered.length > 0 ? 'text-red-400' : 'text-slate-500'}`}>
                {policy.projectsTriggered.length}
              </div>
              <div className="text-[9px] text-slate-500 uppercase tracking-wider mt-0.5">Currently triggered</div>
            </div>
          </div>

          {/* Last fired */}
          <div className="bg-slate-800/40 border border-slate-700/40 rounded-xl p-4">
            <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-2">Last Fired</div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-white">{policy.lastFireProject}</div>
                <div className="text-xs text-slate-500 mt-0.5">{policy.lastFired}</div>
              </div>
              <div className="text-right">
                <div className="text-[9px] text-slate-600">Protected value</div>
                <div className="text-sm font-bold text-emerald-400">{policy.savedValue}</div>
              </div>
            </div>
          </div>

          {/* Corpus matches */}
          <div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-2">Corpus Matches</div>
            <div className="space-y-2">
              {policy.corpusMatches.map((m, i) => (
                <div key={i} className="bg-slate-800/40 border border-slate-700/40 rounded-xl px-4 py-3">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-white">{m.project}</span>
                      <span className="text-[9px] text-slate-500">{m.year}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="h-1 w-14 bg-slate-700 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${cat.dot.replace('bg-', 'bg-')}`}
                          style={{ width: `${m.relevance}%`, background: cat.cls.includes('sky') ? '#38bdf8' : cat.cls.includes('orange') ? '#fb923c' : cat.cls.includes('red') ? '#f87171' : cat.cls.includes('indigo') ? '#818cf8' : '#a78bfa' }}
                        />
                      </div>
                      <span className="text-[10px] font-semibold text-slate-400">{m.relevance}%</span>
                    </div>
                  </div>
                  <div className="text-xs text-slate-400">{m.outcome}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended action */}
          <div className={`rounded-xl p-4 border ${cat.bg} ${cat.border}`}>
            <div className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${cat.cls}`}>Recommended Action</div>
            <p className="text-xs text-slate-300 leading-relaxed">{policy.recommendedAction}</p>
          </div>

          {/* Projects */}
          <div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-2">Assigned Projects</div>
            <div className="space-y-1.5">
              {policy.projectsAssigned.map((proj, i) => {
                const fired = policy.projectsTriggered.includes(proj);
                return (
                  <div key={i} className={`flex items-center justify-between px-3 py-2 rounded-lg border
                    ${fired ? 'bg-red-500/8 border-red-500/20' : 'bg-slate-800/40 border-slate-700/40'}`}>
                    <div className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${fired ? 'bg-red-400 animate-pulse' : 'bg-emerald-400'}`}/>
                      <span className="text-xs text-slate-300">{proj}</span>
                    </div>
                    <span className={`text-[9px] font-semibold uppercase ${fired ? 'text-red-400' : 'text-emerald-500'}`}>
                      {fired ? 'Triggered' : 'Monitoring'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="text-center text-[9px] text-slate-700 uppercase tracking-wider pb-1">
            Axiom Policy Engine · $5B corpus basis · 15+ hyperscale builds
          </div>
        </div>
      </div>
    </div>
  );
};

// ════════════════════════════════════════════════════════════════════════════
// MAIN
// ════════════════════════════════════════════════════════════════════════════
const AxiomPolicies = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');

  const filtered = POLICIES.filter(p => {
    const catMatch = activeCategory === 'All' || p.category === activeCategory;
    const stMatch = statusFilter === 'All' || p.status === statusFilter;
    return catMatch && stMatch;
  });

  const triggeredCount = POLICIES.filter(p => p.status === 'Triggered').length;

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(99,102,241,0.2) 1px, transparent 0)`,
        backgroundSize: '40px 40px',
      }} />

      {/* Header */}
      <div className="relative z-10 px-6 pt-5 pb-4 border-b border-slate-800/60">
        <div className="flex items-start justify-between gap-6">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-400 mb-1">Axiom Intelligence Platform</div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl flex items-center justify-center border border-indigo-500/30 bg-indigo-500/15">
                <svg className="w-5 h-5 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/>
                </svg>
              </span>
              Policy Engine
            </h1>
            <p className="text-slate-400 text-sm mt-1">Governed intelligence · Every signal has a policy · Every policy has a corpus basis</p>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 flex-wrap justify-end">
            {POLICY_STATS.map(s => (
              <div key={s.label} className="text-right">
                <div className={`text-base font-bold leading-none ${s.color}`}>{s.value}</div>
                <div className="text-[9px] text-slate-500 mt-0.5 uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Active trigger alert */}
        {triggeredCount > 0 && (
          <div className="mt-4 flex items-center gap-3 bg-red-500/8 border border-red-500/20 rounded-xl px-4 py-2.5">
            <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse flex-shrink-0"/>
            <span className="text-sm text-red-300 font-medium">{triggeredCount} policies currently triggered — requiring intervention</span>
            <button onClick={() => { setActiveCategory('All'); setStatusFilter('Triggered'); }}
              className="ml-auto text-[10px] text-red-400 font-semibold uppercase tracking-wider hover:text-red-300 transition-colors">
              Show triggered →
            </button>
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="relative z-10 px-6 pt-4 pb-0 flex items-center justify-between gap-4 flex-wrap">
        {/* Category tabs */}
        <div className="flex items-center gap-1 bg-slate-800/50 rounded-xl p-1 border border-slate-700/50">
          {CATEGORIES.map(cat => {
            const acc = cat !== 'All' ? CAT_ACCENT(cat) : null;
            const isActive = activeCategory === cat;
            const count = cat === 'All' ? POLICIES.length : POLICIES.filter(p => p.category === cat).length;
            return (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all
                  ${isActive
                    ? cat === 'All' ? 'bg-slate-700 text-white' : `${acc.bg} ${acc.cls} border ${acc.border}`
                    : 'text-slate-500 hover:text-slate-300'}`}>
                {cat !== 'All' && acc && <div className={`w-1.5 h-1.5 rounded-full ${acc.dot}`}/>}
                {cat}
                <span className={`text-[9px] ${isActive ? '' : 'text-slate-600'}`}>{count}</span>
              </button>
            );
          })}
        </div>

        {/* Status filter */}
        <div className="flex items-center gap-1">
          {['All', 'Triggered', 'Active', 'Monitoring'].map(s => {
            const sc = s !== 'All' ? STATUS_CLS[s] : null;
            return (
              <button key={s} onClick={() => setStatusFilter(s)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold border transition-all
                  ${statusFilter === s
                    ? s === 'All' ? 'bg-slate-700 border-slate-600 text-white' : `${sc.bg} ${sc.border} ${sc.text}`
                    : 'border-transparent text-slate-600 hover:text-slate-400'}`}>
                {sc && <div className={`w-1.5 h-1.5 rounded-full ${sc.dot}`}/>}
                {s}
              </button>
            );
          })}
        </div>
      </div>

      {/* Policy grid */}
      <div className="relative z-10 px-6 pt-4 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(policy => (
            <PolicyCard key={policy.id} policy={policy}
              onClick={p => setSelectedPolicy(prev => prev?.id === p.id ? null : p)}
              isSelected={selectedPolicy?.id === policy.id}
            />
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-16 text-slate-600">No policies match current filters</div>
        )}
      </div>

      {/* Detail panel */}
      {selectedPolicy && (
        <>
          <div className="fixed inset-0 z-40 bg-slate-950/40" onClick={() => setSelectedPolicy(null)} />
          <PolicyPanel policy={selectedPolicy} onClose={() => setSelectedPolicy(null)} />
        </>
      )}

      <style>{`
        @keyframes slideInRight { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>
    </div>
  );
};

export default AxiomPolicies;
