// src/pages/AxiomPortfolio.jsx
// AXIOM Intelligence Platform — Portfolio War Room
// v3: Policy governance badges + corpus intelligence modal

import React, { useState, useCallback } from 'react';

// ════════════════════════════════════════════════════════════════════════════
// PHASE / SCORE CONFIG
// ════════════════════════════════════════════════════════════════════════════
const PHASES = ['Site', 'Design', 'Build', 'Commission', 'Ops', 'Exit'];

const PHASE_ACCENT = (phase) => ({
  Site:       { color: '#38BDF8', cls: 'text-sky-400',     bg: 'bg-sky-500/15',     border: 'border-sky-500/30' },
  Design:     { color: '#A78BFA', cls: 'text-violet-400',  bg: 'bg-violet-500/15',  border: 'border-violet-500/30' },
  Build:      { color: '#FB923C', cls: 'text-orange-400',  bg: 'bg-orange-500/15',  border: 'border-orange-500/30' },
  Commission: { color: '#F87171', cls: 'text-red-400',     bg: 'bg-red-500/15',     border: 'border-red-500/30' },
  Ops:        { color: '#34D399', cls: 'text-emerald-400', bg: 'bg-emerald-500/15', border: 'border-emerald-500/30' },
  Exit:       { color: '#818CF8', cls: 'text-indigo-400',  bg: 'bg-indigo-500/15',  border: 'border-indigo-500/30' },
}[phase] || { color: '#94A3B8', cls: 'text-slate-400', bg: 'bg-slate-500/15', border: 'border-slate-500/30' });

const SCORE_COLOR = (score) => {
  if (!score) return { text: 'text-slate-600', label: '—' };
  if (score >= 80) return { text: 'text-emerald-400', label: 'Low' };
  if (score >= 55) return { text: 'text-amber-400',   label: 'Monitor' };
  if (score >= 35) return { text: 'text-orange-400',  label: 'Elevated' };
  return              { text: 'text-red-400',    label: 'Critical' };
};

// ════════════════════════════════════════════════════════════════════════════
// POLICY REGISTRY — the governance layer
// ════════════════════════════════════════════════════════════════════════════
const POLICIES = {
  'COMM-001': { id: 'COMM-001', name: 'IST Sequence Conflict Detection',   category: 'Commission', color: 'text-red-400',     bg: 'bg-red-500/10',     border: 'border-red-500/25' },
  'COMM-002': { id: 'COMM-002', name: 'Punch List P1 SLA Threshold',       category: 'Commission', color: 'text-red-400',     bg: 'bg-red-500/10',     border: 'border-red-500/25' },
  'COMM-003': { id: 'COMM-003', name: 'Surge Crew Authorization Trigger',  category: 'Commission', color: 'text-orange-400',  bg: 'bg-orange-500/10',  border: 'border-orange-500/25' },
  'BILD-001': { id: 'BILD-001', name: 'Vendor Lead Time Deviation',        category: 'Build',      color: 'text-amber-400',   bg: 'bg-amber-500/10',   border: 'border-amber-500/25' },
  'BILD-002': { id: 'BILD-002', name: 'Portfolio Equipment Pattern',       category: 'Build',      color: 'text-amber-400',   bg: 'bg-amber-500/10',   border: 'border-amber-500/25' },
  'BILD-003': { id: 'BILD-003', name: 'RFI Escalation Threshold',         category: 'Build',      color: 'text-amber-400',   bg: 'bg-amber-500/10',   border: 'border-amber-500/25' },
  'SITE-001': { id: 'SITE-001', name: 'Grid Queue Above Corpus Median',   category: 'Site',       color: 'text-sky-400',     bg: 'bg-sky-500/10',     border: 'border-sky-500/25' },
  'SITE-002': { id: 'SITE-002', name: 'Latency Spec Validation',          category: 'Site',       color: 'text-sky-400',     bg: 'bg-sky-500/10',     border: 'border-sky-500/25' },
  'SITE-003': { id: 'SITE-003', name: 'Water Rights Availability Check',  category: 'Site',       color: 'text-sky-400',     bg: 'bg-sky-500/10',     border: 'border-sky-500/25' },
  'CPTL-001': { id: 'CPTL-001', name: 'Exit Window Optimization',         category: 'Capital',    color: 'text-indigo-400',  bg: 'bg-indigo-500/10',  border: 'border-indigo-500/25' },
  'CPTL-002': { id: 'CPTL-002', name: 'PUE Optimization Opportunity',     category: 'Capital',    color: 'text-indigo-400',  bg: 'bg-indigo-500/10',  border: 'border-indigo-500/25' },
  'CPTL-003': { id: 'CPTL-003', name: 'Budget Variance Escalation',       category: 'Capital',    color: 'text-violet-400',  bg: 'bg-violet-500/10',  border: 'border-violet-500/25' },
};

// per-project policy assignments
const PROJECT_POLICIES = {
  'dal-01': { assigned: ['COMM-001','COMM-002','COMM-003','BILD-001','CPTL-003'], triggered: ['COMM-001','COMM-002'] },
  'phx-02': { assigned: ['SITE-001','SITE-003','BILD-003','CPTL-003'],            triggered: ['SITE-001'] },
  'iad-03': { assigned: ['CPTL-001','CPTL-002'],                                  triggered: [] },
  'atl-04': { assigned: ['BILD-001','BILD-002','BILD-003','COMM-001'],            triggered: ['BILD-001','BILD-002'] },
  'den-05': { assigned: ['SITE-002','SITE-003'],                                  triggered: [] },
  'chi-06': { assigned: ['SITE-002','BILD-003','CPTL-003'],                       triggered: ['SITE-002'] },
};

// ════════════════════════════════════════════════════════════════════════════
// SMALL POLICY BADGE
// ════════════════════════════════════════════════════════════════════════════
const PolicyBadge = ({ id, fired = false }) => {
  const p = POLICIES[id];
  if (!p) return null;
  return (
    <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold font-mono border
      ${fired ? `${p.bg} ${p.border} ${p.color}` : 'bg-slate-800/60 border-slate-700/40 text-slate-500'}`}>
      {fired && <span className="w-1 h-1 rounded-full bg-current animate-pulse" />}
      {id}
    </span>
  );
};

// ════════════════════════════════════════════════════════════════════════════
// CORPUS DATA
// ════════════════════════════════════════════════════════════════════════════
const CORPUS = {
  'dal-01': {
    withoutAxiom: { outcome: '$46M schedule slip',         detail: 'IST conflict undetected until go-live week. 23-day delay, hyperscaler SLA breach, penalty clauses triggered.' },
    withAxiom:    { outcome: '$4M surge cost · recovered', detail: 'Conflict flagged 23 days early. Parallel IST tracks authorized. 19 of 23 days recovered via surge crew protocol.' },
    savedValue: '$42M', confidence: 94,
    corpusMatches: [
      { project: 'eBay Salt Lake City', year: 2018, phase: 'Commissioning', outcome: 'Parallel IST resolved 21-day slip in 8 days', relevance: 98 },
      { project: 'Switch LAS 4',        year: 2020, phase: 'Commissioning', outcome: 'CRAC sequencing conflict — 14-day slip, $28M penalty', relevance: 91 },
      { project: 'Aligned PHX 2',       year: 2022, phase: 'Commissioning', outcome: 'Surge crew protocol — 11 days recovered at $2.4M', relevance: 87 },
    ],
    reasoning: [
      { step: 'Pattern detection',  detail: 'IST schedule ingested. CRAC commissioning window overlaps electrical testing by 11 days — COMM-001 triggered.' },
      { step: 'Corpus search',      detail: 'Searched 47 commissioning sequences across $5B project history. 3 high-confidence matches found.' },
      { step: 'Resolution model',   detail: 'eBay SLC 2018 is 98% similar. Parallel IST track + 48hr surge crew recovered 19/21 days at $2.4M cost.' },
      { step: 'Counterfactual',     detail: 'Without intervention: May 1 SLA breach certain. Microsoft penalty clauses: $2M/day × 23 days = $46M exposure.' },
    ],
    recommendation: 'Authorize parallel IST tracks immediately. Mobilize surge crew by April 8. Total cost: ~$4M. Expected recovery: 19 of 23 days. Net value protection: $42M.',
    triggeredPolicies: ['COMM-001', 'COMM-002'],
  },
  'phx-02': {
    withoutAxiom: { outcome: '6-month grid delay',      detail: 'APS queue not flagged. BOD locked at 18-month assumption. Project delayed Q1 2027.' },
    withAxiom:    { outcome: '~4 months recovered',     detail: 'Queue flagged at site selection. APS pre-application advanced. Alternative substation found 11 miles away.' },
    savedValue: '$18M', confidence: 88,
    corpusMatches: [
      { project: 'Switch PHX 1',    year: 2019, phase: 'Site', outcome: 'Same APS substation — 22-month queue, project relocated', relevance: 95 },
      { project: 'QTS Chandler',    year: 2021, phase: 'Site', outcome: 'Pre-application advanced 5 months, queue reduced to 14 months', relevance: 89 },
      { project: 'Aligned Gilbert', year: 2023, phase: 'Site', outcome: 'Alternative feed identified, saved 6 months vs primary', relevance: 83 },
    ],
    reasoning: [
      { step: 'Site scoring',           detail: 'APS Estrella substation queue: 18 months. Corpus median: 12 months. SITE-001 triggered at +6mo variance.' },
      { step: 'Alternative analysis',   detail: 'SRP Superstition substation: 6-month queue, 11 miles east. Transmission delta: +$800K.' },
      { step: 'Pre-application model',  detail: 'APS pre-application now recovers ~4 months per corpus. Expected interconnect: 14 months.' },
      { step: 'BOD impact',             detail: 'Hybrid liquid: +6 weeks commission, −22% 5yr OpEx. NPV positive at $180M+ asset value.' },
    ],
    recommendation: 'File APS pre-application this week. Evaluate SRP Superstition. Resolve BOD cooling by April 10 — after that, change cost +340%.',
    triggeredPolicies: ['SITE-001'],
  },
  'iad-03': {
    withoutAxiom: { outcome: 'Sub-optimal exit timing',  detail: 'Q4 2025 exit in off-cycle. Multiples 18% lower. $380K PUE opportunity missed.' },
    withAxiom:    { outcome: 'Q2 2026 peak window',      detail: '18-month demand cycle identified. PUE optimization adds $2.8M to valuation.' },
    savedValue: '$180M+ uplift', confidence: 91,
    corpusMatches: [
      { project: 'Switch REIT IPO',     year: 2017, phase: 'Exit', outcome: '11× EBITDA — peak hyperscaler demand cycle', relevance: 96 },
      { project: 'QTS Realty',          year: 2021, phase: 'Exit', outcome: 'BlackRock at 28× EBITDA — AI demand surge', relevance: 92 },
      { project: 'Aligned (Blackrock)', year: 2025, phase: 'Exit', outcome: '$40B — sovereign AI infrastructure premium', relevance: 89 },
    ],
    reasoning: [
      { step: 'Demand cycle analysis', detail: 'Hyperscaler capex cycles modeled vs 12 transactions. Q2 2026 = peak AI infrastructure window. CPTL-001 activated.' },
      { step: 'Buyer identification',  detail: '4 buyers with active mandates: Blackrock, Macquarie, Brookfield, GIC. All have Q1-Q2 2026 deployment pressure.' },
      { step: 'PUE optimization',      detail: 'CPTL-002: $380K/year savings via RL controls. 5yr NPV at exit: $2.8M. 6-week implementation, zero downtime.' },
      { step: 'Governance readiness',  detail: '5 years clean audit. Board complete. GRESB Tier 1. IPO S-1 ready.' },
    ],
    recommendation: 'Execute PUE optimization now — adds $2.8M at minimal cost. Target sale process Q1 2026, close Q2 2026. Do not delay into H2.',
    triggeredPolicies: [],
  },
  'atl-04': {
    withoutAxiom: { outcome: 'Vertiv delay cascades',           detail: 'UPS skid delay undetected across 3 sites. Commissioning pushed Q1 2026. SLA penalties triggered.' },
    withAxiom:    { outcome: 'Parallel procurement authorized', detail: 'Pattern detected across Dallas, Atlanta, Seattle. Eaton authorized. $28M avoided.' },
    savedValue: '$28M (3 sites)', confidence: 87,
    corpusMatches: [
      { project: 'Switch LAS 2022', year: 2022, phase: 'Build', outcome: 'Vertiv delay — 14-week slip, $22M penalty. No parallel procurement.', relevance: 97 },
      { project: 'eBay PHX 2019',   year: 2019, phase: 'Build', outcome: 'Vertiv delay caught early — Eaton substitution, 0 impact', relevance: 94 },
      { project: 'CyrusOne ATL',    year: 2021, phase: 'Build', outcome: 'Dual-source procurement after Vertiv issues', relevance: 81 },
    ],
    reasoning: [
      { step: 'Portfolio detection', detail: 'BILD-001: Vertiv UPS lead times cross-referenced across 6 projects. Dallas, Atlanta, Seattle all +11 weeks vs contract.' },
      { step: 'Pattern match',       detail: 'BILD-002: Switch LAS 2022 — identical SKU, identical delay signature. $22M penalty without action.' },
      { step: 'Mitigation model',    detail: 'eBay PHX 2019: Eaton substitution at week 8. Zero schedule impact. Delta: +$340K vs Vertiv.' },
      { step: 'Portfolio action',    detail: 'Single procurement decision protects 3 sites. Total exposure without action: $28M.' },
    ],
    recommendation: 'Authorize Eaton parallel procurement across Dallas, Atlanta, Seattle. Cost: ~$1M. Exposure protected: $28M.',
    triggeredPolicies: ['BILD-001', 'BILD-002'],
  },
  'den-05': {
    withoutAxiom: { outcome: 'Latency conflict at BOD',   detail: 'Fiber route not analyzed. Conflict at construction — $8M site switch.' },
    withAxiom:    { outcome: 'Clean site selection',      detail: 'Latency validated pre-commitment via corpus fiber model. Water rights secured.' },
    savedValue: '$8M avoided', confidence: 82,
    corpusMatches: [
      { project: 'Iron Mountain DEN', year: 2020, phase: 'Site', outcome: 'Latency conflict — site abandoned at $6M sunk cost', relevance: 88 },
      { project: 'Aligned DEN 1',    year: 2022, phase: 'Site', outcome: 'Water rights secured upfront — no renegotiation', relevance: 84 },
    ],
    reasoning: [
      { step: 'Latency analysis', detail: 'SITE-002: Financial exchange needs <2ms to CME. Corpus model: DEN-CHI at 1.8ms via Zayo — within spec.' },
      { step: 'Water rights',     detail: 'SITE-003: Denver Basin aquifer — 1.2M gal/day confirmed available. No competing claims.' },
      { step: 'Site score',       detail: '88th percentile vs corpus: power diversity, land availability, tax incentives all favorable.' },
    ],
    recommendation: 'Advance to BOD. Secure water rights now. Confirm Zayo dark fiber availability for latency-spec tenant.',
    triggeredPolicies: [],
  },
  'chi-06': {
    withoutAxiom: { outcome: '$12M construction rework',  detail: 'Fiber conflict at commissioning. Structural remediation after steel set.' },
    withAxiom:    { outcome: 'Resolved at BOD for $2.1M', detail: 'Latency conflict flagged before BOD. Dark fiber as design addendum. No construction impact.' },
    savedValue: '$12M avoided', confidence: 79,
    corpusMatches: [
      { project: 'Equinix CH6',  year: 2019, phase: 'Design', outcome: 'Latency spec met via dedicated dark fiber — $2M premium', relevance: 91 },
      { project: 'QTS Chicago',  year: 2022, phase: 'Design', outcome: 'Fiber conflict resolved at BOD, zero impact', relevance: 86 },
    ],
    reasoning: [
      { step: 'Latency constraint', detail: 'SITE-002 triggered: financial tenant needs <0.5ms to CME. Current routing: 0.8ms — out of spec by 0.3ms.' },
      { step: 'Resolution options', detail: '3 options: (1) dark fiber $2.1M, (2) relocate 2 miles east, (3) renegotiate spec. Option 1 recommended.' },
      { step: 'BOD impact',         detail: 'Dark fiber as design addendum. No structural rework if resolved before steel lock.' },
    ],
    recommendation: 'Procure Zayo or Lumen dark fiber — $2.1M protects $12M rework risk. Confirm CME spec with tenant this week.',
    triggeredPolicies: ['SITE-002'],
  },
};

// ════════════════════════════════════════════════════════════════════════════
// PORTFOLIO DATA
// ════════════════════════════════════════════════════════════════════════════
const PORTFOLIO_STATS = [
  { label: 'Portfolio Capital', value: '$4.2B',    color: 'text-white' },
  { label: 'Active Projects',   value: '6',         color: 'text-white' },
  { label: 'Total Capacity',    value: '1,450 MW',  color: 'text-white' },
  { label: 'Capital at Risk',   value: '$74M',      color: 'text-red-400' },
  { label: 'Value Protected',   value: '$280M',     color: 'text-emerald-400' },
  { label: 'Policies Active',   value: '12',        color: 'text-indigo-400' },
  { label: 'Policies Triggered','value': '5',       color: 'text-amber-400' },
];

const PROJECTS = [
  {
    id: 'dal-01', name: 'Lone Star AI Campus',       location: 'Dallas, TX',    type: '400MW AI Factory',
    phase: 'Commission', phaseScore: 34, capital: '$1.1B', capitalPct: 82, tenant: 'Microsoft',
    axiomSignal: { severity: 'critical', text: '23-day IST slip detected', sub: 'CRAC commissioning conflict' },
    phases: [
      { name: 'Site',       score: 91,   done: true,  note: 'Grid access secured Q1 2023' },
      { name: 'Design',     score: 84,   done: true,  note: 'Hybrid liquid cooling — BOD locked' },
      { name: 'Build',      score: 76,   done: true,  note: 'Steel complete, MEP 94%' },
      { name: 'Commission', score: 34,   done: false, note: 'IST conflict — CRAC vs electrical sequencing' },
      { name: 'Ops',        score: null, done: false, note: 'Target: Jun 2025' },
      { name: 'Exit',       score: null, done: false, note: 'Strategic sale, 2028' },
    ],
    metrics: [
      { label: 'Days to SLA',     value: '41',         warn: true  },
      { label: 'Open P1 Punch',   value: '41',         warn: true  },
      { label: 'Cost of Slip',    value: '$2M/day',    warn: true  },
      { label: 'IST Complete',    value: '61%',        warn: true  },
      { label: 'Hyperscaler SLA', value: 'May 1',      warn: true  },
      { label: 'Budget Variance', value: '+2.1%',      warn: false },
    ],
    insight: 'AXIOM corpus match: eBay SLC 2018 — identical CRAC/electrical sequencing conflict resolved by parallel IST tracks + 48hr surge crew. Estimated recovery: 19 of 23 days.',
  },
  {
    id: 'phx-02', name: 'Sonoran Compute Park',      location: 'Phoenix, AZ',   type: '250MW Co-location',
    phase: 'Design', phaseScore: 71, capital: '$44M', capitalPct: 16, tenant: 'Pre-leased 60%',
    axiomSignal: { severity: 'warn', text: 'Grid interconnect delay', sub: '18-month APS queue flagged' },
    phases: [
      { name: 'Site',       score: 88,   done: true,  note: 'Maricopa County — permit in hand' },
      { name: 'Design',     score: 71,   done: false, note: 'BOD lock Apr 14 — 3 decisions open' },
      { name: 'Build',      score: null, done: false, note: 'GC selected: McCarthy' },
      { name: 'Commission', score: null, done: false, note: 'Target: Q3 2026' },
      { name: 'Ops',        score: null, done: false, note: '—' },
      { name: 'Exit',       score: null, done: false, note: 'IPO candidate, 2029' },
    ],
    metrics: [
      { label: 'BOD Lock',       value: 'Apr 14',    warn: true  },
      { label: 'Open Decisions', value: '3',         warn: true  },
      { label: 'Grid Queue',     value: '18 months', warn: true  },
      { label: 'Pre-leased',     value: '60%',       warn: false },
      { label: 'Budget Locked',  value: '78%',       warn: false },
      { label: 'Corpus Match',   value: 'Switch PHX',warn: false },
    ],
    insight: 'APS interconnect queue 6 months above corpus median. SITE-001 triggered. File APS pre-application now — recovers ~4 months. BOD cooling decision: hybrid liquid −22% 5yr OpEx.',
  },
  {
    id: 'iad-03', name: 'Virginia Hyperscale Cluster', location: 'Ashburn, VA', type: '600MW Campus · 3 buildings',
    phase: 'Exit', phaseScore: 94, capital: '$2.1B', capitalPct: 100, tenant: 'Amazon, Google',
    axiomSignal: { severity: 'ok', text: 'Exit readiness 94%', sub: 'IPO governance complete' },
    phases: [
      { name: 'Site',       score: 95, done: true,  note: 'Dominion Power — direct feed' },
      { name: 'Design',     score: 91, done: true,  note: 'Air cooling, PUE 1.18 target' },
      { name: 'Build',      score: 88, done: true,  note: 'Delivered 4 days ahead of schedule' },
      { name: 'Commission', score: 82, done: true,  note: 'Commissioned Q2 2023 — no slips' },
      { name: 'Ops',        score: 82, done: true,  note: 'PUE 1.21 actual vs 1.18 target' },
      { name: 'Exit',       score: 94, done: false, note: 'Q2 2026 window — optimal per Axiom' },
    ],
    metrics: [
      { label: 'Uptime',          value: '99.991%', warn: false },
      { label: 'PUE Actual',      value: '1.21',    warn: false },
      { label: 'Tenancy',         value: '94%',     warn: false },
      { label: 'NOI Growth',      value: '+8.4%',   warn: false },
      { label: 'Implied Val.',    value: '$2.8B',   warn: false },
      { label: 'Strategic Buyers',value: '4',       warn: false },
    ],
    insight: 'CPTL-001: Exit window Q2 2026 optimal per demand cycle model. CPTL-002: $380K/year PUE opportunity before exit. Corpus: Switch IPO 2017, QTS 2021.',
  },
  {
    id: 'atl-04', name: 'Peachtree Edge Data',        location: 'Atlanta, GA',   type: '180MW Modular',
    phase: 'Build', phaseScore: 58, capital: '$340M', capitalPct: 51, tenant: 'Meta (LOI)',
    axiomSignal: { severity: 'warn', text: 'Vertiv UPS +11 weeks', sub: 'Pattern across 3 portfolio sites' },
    phases: [
      { name: 'Site',       score: 93,   done: true,  note: 'GA Power — 48hr interconnect' },
      { name: 'Design',     score: 87,   done: true,  note: 'Modular liquid cooling' },
      { name: 'Build',      score: 58,   done: false, note: 'Steel 70%, MEP 45%' },
      { name: 'Commission', score: null, done: false, note: 'Target: Nov 2025' },
      { name: 'Ops',        score: null, done: false, note: '—' },
      { name: 'Exit',       score: null, done: false, note: 'Strategic, 2028' },
    ],
    metrics: [
      { label: 'Steel Progress',  value: '70%',             warn: false },
      { label: 'MEP Progress',    value: '45%',             warn: false },
      { label: 'Open RFIs',       value: '31 (8 critical)', warn: true  },
      { label: 'Vertiv Delay',    value: '+11 weeks',       warn: true  },
      { label: 'Budget Variance', value: '+1.2%',           warn: false },
      { label: 'Schedule',        value: '2 days ahead',    warn: false },
    ],
    insight: 'BILD-001 + BILD-002: Portfolio-level Vertiv UPS delay across Dallas, Atlanta, Seattle. Corpus: eBay PHX 2019 — Eaton substitution, zero schedule impact. Portfolio exposure: $28M.',
  },
  {
    id: 'den-05', name: 'Mile High AI Hub',            location: 'Denver, CO',    type: '120MW Hyperscale',
    phase: 'Site', phaseScore: 88, capital: '$3M', capitalPct: 1, tenant: 'Financial Exchange',
    axiomSignal: { severity: 'ok', text: 'Site score 88th percentile', sub: 'Water rights secured' },
    phases: [
      { name: 'Site',       score: 88,   done: false, note: 'Denver Basin water rights confirmed' },
      { name: 'Design',     score: null, done: false, note: 'GC selection in progress' },
      { name: 'Build',      score: null, done: false, note: 'Target start: Q3 2026' },
      { name: 'Commission', score: null, done: false, note: '—' },
      { name: 'Ops',        score: null, done: false, note: '—' },
      { name: 'Exit',       score: null, done: false, note: '—' },
    ],
    metrics: [
      { label: 'Site Score',    value: '88/100',   warn: false },
      { label: 'Water Rights',  value: 'Secured',  warn: false },
      { label: 'Latency CME',   value: '1.8ms',    warn: false },
      { label: 'Tax Incentive', value: '$12M',     warn: false },
      { label: 'Corpus Comps',  value: '11 sites', warn: false },
      { label: 'Power Access',  value: '6 months', warn: false },
    ],
    insight: 'SITE-002 validated: latency spec confirmed via corpus fiber model. SITE-003: water rights secured. Strong fundamentals — advance to BOD.',
  },
  {
    id: 'chi-06', name: 'Midwest Sovereign Exchange', location: 'Chicago, IL',   type: '200MW Financial Edge',
    phase: 'Design', phaseScore: 67, capital: '$28M', capitalPct: 6, tenant: 'Financial / Gov',
    axiomSignal: { severity: 'warn', text: 'Latency spec conflict', sub: '800G fiber routing under review' },
    phases: [
      { name: 'Site',       score: 91,   done: true,  note: 'ComEd direct feed confirmed' },
      { name: 'Design',     score: 67,   done: false, note: 'Fiber route conflict — latency review' },
      { name: 'Build',      score: null, done: false, note: 'Target start: Q2 2026' },
      { name: 'Commission', score: null, done: false, note: '—' },
      { name: 'Ops',        score: null, done: false, note: '—' },
      { name: 'Exit',       score: null, done: false, note: 'IPO 2030' },
    ],
    metrics: [
      { label: 'BOD Status',       value: 'In Review', warn: true  },
      { label: 'Fiber Latency',    value: '0.8ms',     warn: true  },
      { label: 'Tenant Spec',      value: '<0.5ms',    warn: true  },
      { label: 'Remediation Est.', value: '$2.1M',     warn: false },
      { label: 'Site Score',       value: '91/100',    warn: false },
      { label: 'Power Access',     value: 'Secured',   warn: false },
    ],
    insight: 'SITE-002 triggered: 0.8ms vs <0.5ms tenant spec. Corpus: Equinix CH6 2019 — dark fiber resolved at $2.1M. Must resolve before BOD to avoid $12M rework.',
  },
];

// ════════════════════════════════════════════════════════════════════════════
// HERO CARD
// ════════════════════════════════════════════════════════════════════════════
const HeroCard = ({ onOpenCorpus }) => {
  const corpus = CORPUS['dal-01'];
  return (
    <div className="relative mb-5 rounded-2xl overflow-hidden border border-red-500/30 bg-gradient-to-r from-red-950/60 via-slate-900/80 to-slate-900/60">
      <div className="absolute inset-0 rounded-2xl border border-red-500/15 animate-pulse pointer-events-none" />
      <div className="relative p-5">

        {/* Top row */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse flex-shrink-0 mt-0.5" />
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <div className="text-[10px] font-bold uppercase tracking-widest text-red-400">Active Intervention · Axiom Build</div>
                <PolicyBadge id="COMM-001" fired={true} />
                <PolicyBadge id="COMM-002" fired={true} />
              </div>
              <div className="text-xl font-bold text-white">Lone Star AI Campus — Commission Phase</div>
              <div className="text-sm text-slate-400 mt-0.5">Dallas, TX · 400MW AI Factory · Microsoft SLA May 1, 2026</div>
            </div>
          </div>
          <div className="flex-shrink-0 text-right">
            <div className="text-3xl font-bold text-red-400 leading-none">$42M</div>
            <div className="text-[10px] text-red-300/70 uppercase tracking-wider mt-0.5">value protected</div>
          </div>
        </div>

        {/* Counterfactual */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-red-950/60 border border-red-500/20 rounded-xl p-4">
            <div className="text-[10px] font-bold uppercase tracking-wider text-red-400 mb-2">Without Axiom</div>
            <div className="text-lg font-bold text-red-300 mb-1">{corpus.withoutAxiom.outcome}</div>
            <div className="text-xs text-red-300/60 leading-relaxed">{corpus.withoutAxiom.detail}</div>
          </div>
          <div className="bg-emerald-950/60 border border-emerald-500/20 rounded-xl p-4">
            <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 mb-2">With Axiom · Flagged 23 days early</div>
            <div className="text-lg font-bold text-emerald-300 mb-1">{corpus.withAxiom.outcome}</div>
            <div className="text-xs text-emerald-300/60 leading-relaxed">{corpus.withAxiom.detail}</div>
          </div>
        </div>

        {/* Corpus CTA */}
        <div
          className="flex items-center justify-between bg-slate-800/60 border border-indigo-500/20 rounded-xl px-4 py-3 cursor-pointer hover:border-indigo-500/40 hover:bg-slate-800/80 transition-all"
          onClick={() => onOpenCorpus('dal-01')}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            <div>
              <div className="text-[10px] text-indigo-400 uppercase tracking-wider font-semibold mb-0.5">Axiom Corpus Match · 98% confidence</div>
              <div className="text-sm text-white font-medium">eBay Salt Lake City 2018 · Identical CRAC/electrical conflict · 19-day recovery documented</div>
              <div className="text-xs text-slate-400 mt-0.5">From $5B institutional knowledge corpus · 47 commissioning sequences analyzed</div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <span className="text-[10px] text-indigo-400 font-medium">View full reasoning</span>
            <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

// ════════════════════════════════════════════════════════════════════════════
// CORPUS MODAL
// ════════════════════════════════════════════════════════════════════════════
const CorpusModal = ({ projectId, onClose }) => {
  const project = PROJECTS.find(p => p.id === projectId);
  const corpus = CORPUS[projectId];
  if (!project || !corpus) return null;
  const pp = PROJECT_POLICIES[projectId] || { assigned: [], triggered: [] };
  const confColor = corpus.confidence >= 90 ? 'text-emerald-400' : corpus.confidence >= 80 ? 'text-amber-400' : 'text-orange-400';

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" />
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-700/60 rounded-2xl shadow-2xl"
        style={{ animation: 'fadeScaleIn 0.2s ease-out' }} onClick={e => e.stopPropagation()}>

        <div className="sticky top-0 z-10 bg-slate-900 border-b border-slate-700/60 px-6 py-4 rounded-t-2xl">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
                </svg>
              </div>
              <div>
                <div className="text-[10px] text-indigo-400 uppercase tracking-widest font-bold mb-0.5">Axiom Intelligence · Corpus Reasoning</div>
                <div className="text-base font-semibold text-white">{project.name}</div>
              </div>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors flex items-center justify-center text-lg flex-shrink-0">✕</button>
          </div>
          {/* Triggered policies in modal header */}
          {pp.triggered.length > 0 && (
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              <span className="text-[9px] text-slate-600 uppercase tracking-wider">Triggered policies:</span>
              {pp.triggered.map(id => <PolicyBadge key={id} id={id} fired={true} />)}
            </div>
          )}
        </div>

        <div className="px-6 py-5 space-y-5">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Corpus size',   value: '$5B',                           sub: 'Real project history' },
              { label: 'Matches found', value: `${corpus.corpusMatches.length}`, sub: 'High-confidence comps' },
              { label: 'Confidence',    value: `${corpus.confidence}%`,          sub: 'Pattern match score', color: confColor },
            ].map((s, i) => (
              <div key={i} className="bg-slate-800/60 rounded-xl px-4 py-3 text-center">
                <div className={`text-2xl font-bold leading-none mb-1 ${s.color || 'text-white'}`}>{s.value}</div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider">{s.label}</div>
                <div className="text-[9px] text-slate-600 mt-0.5">{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Counterfactual */}
          <div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-2">Counterfactual Analysis</div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-red-950/40 border border-red-500/20 rounded-xl p-4">
                <div className="flex items-center gap-1.5 mb-2"><div className="w-1.5 h-1.5 rounded-full bg-red-400"/><span className="text-[10px] font-bold uppercase tracking-wider text-red-400">Without Axiom</span></div>
                <div className="text-sm font-semibold text-red-300 mb-1">{corpus.withoutAxiom.outcome}</div>
                <div className="text-xs text-red-300/60 leading-relaxed">{corpus.withoutAxiom.detail}</div>
              </div>
              <div className="bg-emerald-950/40 border border-emerald-500/20 rounded-xl p-4">
                <div className="flex items-center gap-1.5 mb-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400"/><span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">With Axiom</span></div>
                <div className="text-sm font-semibold text-emerald-300 mb-1">{corpus.withAxiom.outcome}</div>
                <div className="text-xs text-emerald-300/60 leading-relaxed">{corpus.withAxiom.detail}</div>
              </div>
            </div>
            <div className="mt-2 text-center">
              <span className="text-xs text-slate-500">Protected value: </span>
              <span className="text-sm font-bold text-emerald-400">{corpus.savedValue}</span>
            </div>
          </div>

          {/* Corpus matches */}
          <div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-2">Corpus Matches — From $5B Project History</div>
            <div className="space-y-2">
              {corpus.corpusMatches.map((m, i) => (
                <div key={i} className="bg-slate-800/40 border border-slate-700/40 rounded-xl px-4 py-3">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-white">{m.project}</span>
                      <span className="text-[9px] text-slate-500">{m.year} · {m.phase}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="h-1 w-16 bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full rounded-full bg-indigo-500" style={{ width: `${m.relevance}%` }} />
                      </div>
                      <span className="text-[10px] font-semibold text-indigo-400">{m.relevance}%</span>
                    </div>
                  </div>
                  <div className="text-xs text-slate-400">{m.outcome}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Reasoning chain */}
          <div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-2">Axiom Reasoning Chain</div>
            <div className="space-y-2">
              {corpus.reasoning.map((r, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="w-6 h-6 rounded-full bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-[10px] font-bold text-indigo-400">{i + 1}</div>
                    {i < corpus.reasoning.length - 1 && <div className="w-px flex-1 bg-slate-700/60 my-1" />}
                  </div>
                  <div className="pb-3">
                    <div className="text-xs font-semibold text-slate-300 mb-0.5">{r.step}</div>
                    <div className="text-xs text-slate-500 leading-relaxed">{r.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendation */}
          <div className="bg-indigo-500/8 border border-indigo-500/25 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-400"/>
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">Axiom Recommendation</span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">{corpus.recommendation}</p>
          </div>

          <div className="text-center text-[9px] text-slate-700 uppercase tracking-wider pb-1">
            Powered by $5B project corpus · 15+ hyperscale builds · Cradle to exit
          </div>
        </div>
      </div>
    </div>
  );
};

// ════════════════════════════════════════════════════════════════════════════
// PROJECT CARD
// ════════════════════════════════════════════════════════════════════════════
const ProjectCard = ({ project, onClick, isSelected }) => {
  const sc = SCORE_COLOR(project.phaseScore);
  const pp = PROJECT_POLICIES[project.id] || { assigned: [], triggered: [] };
  const sigCls = {
    critical: { dot: 'bg-red-400 animate-pulse', text: 'text-red-300',     bg: 'bg-red-500/8',     border: 'border-red-500/20' },
    warn:     { dot: 'bg-amber-400',             text: 'text-amber-300',   bg: 'bg-amber-500/8',   border: 'border-amber-500/20' },
    ok:       { dot: 'bg-emerald-400',           text: 'text-emerald-300', bg: 'bg-emerald-500/8', border: 'border-emerald-500/20' },
  }[project.axiomSignal.severity];
  const scoreStroke = project.phaseScore < 35 ? '#ef4444' : project.phaseScore < 55 ? '#f97316' : project.phaseScore < 80 ? '#f59e0b' : project.phase === 'Exit' ? '#818cf8' : '#22c55e';
  const barColor = project.phaseScore < 35 ? 'bg-red-500' : project.phaseScore < 55 ? 'bg-orange-500' : project.phaseScore < 80 ? 'bg-amber-500' : project.phase === 'Exit' ? 'bg-indigo-500' : 'bg-emerald-500';

  return (
    <div onClick={() => onClick(project)}
      className={`relative bg-slate-800/50 border rounded-xl p-4 cursor-pointer transition-all duration-200 hover:bg-slate-800/70 hover:border-slate-600/60
        ${isSelected ? 'border-indigo-500/50 bg-slate-800/80' : 'border-slate-700/50'}`}>

      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="min-w-0">
          <div className="text-sm font-semibold text-white truncate">{project.name}</div>
          <div className="text-xs text-slate-500 mt-0.5 truncate">{project.location} · {project.type}</div>
        </div>
        <div className="relative w-12 h-12 flex-shrink-0">
          <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
            <circle cx="24" cy="24" r="19" fill="none" stroke="#1e293b" strokeWidth="4"/>
            <circle cx="24" cy="24" r="19" fill="none" stroke={scoreStroke} strokeWidth="4" strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 19}`}
              strokeDashoffset={`${2 * Math.PI * 19 * (1 - (project.phaseScore || 0) / 100)}`}/>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-[11px] font-bold ${sc.text}`}>{project.phaseScore}</span>
          </div>
        </div>
      </div>

      {/* Phase pip */}
      <div className="flex items-end gap-1 mb-3">
        {PHASES.map((ph) => {
          const phData = project.phases.find(p => p.name === ph);
          const isCurrent = ph === project.phase;
          const pha = PHASE_ACCENT(ph);
          const isDone = phData?.done && !isCurrent;
          return (
            <div key={ph} className="flex flex-col items-center" style={{ flex: 1 }}>
              <div className="h-1 w-full rounded-full" style={{ background: isCurrent ? pha.color : isDone ? '#475569' : '#1e293b' }} />
              {isCurrent && <div className="text-[7px] font-bold mt-1" style={{ color: pha.color }}>{ph.slice(0,3).toUpperCase()}</div>}
            </div>
          );
        })}
      </div>

      {/* Signal */}
      <div className={`flex items-center gap-1.5 rounded-lg px-2.5 py-2 mb-2 border ${sigCls.bg} ${sigCls.border}`}>
        <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${sigCls.dot}`} />
        <div className="min-w-0 flex-1">
          <div className={`text-[11px] font-semibold leading-tight ${sigCls.text} truncate`}>{project.axiomSignal.text}</div>
          <div className="text-[9px] text-slate-500 truncate">{project.axiomSignal.sub}</div>
        </div>
      </div>

      {/* Policy bar */}
      <div className="flex items-center gap-1.5 mb-3 flex-wrap">
        {pp.triggered.map(id => <PolicyBadge key={id} id={id} fired={true} />)}
        {pp.assigned.filter(id => !pp.triggered.includes(id)).slice(0, 2).map(id => <PolicyBadge key={id} id={id} fired={false} />)}
        {pp.assigned.length > pp.triggered.length + 2 && (
          <span className="text-[9px] text-slate-600">+{pp.assigned.length - pp.triggered.length - 2} more</span>
        )}
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-1 mb-3">
        {project.metrics.slice(0, 3).map((m, i) => (
          <div key={i} className="bg-slate-900/50 rounded-lg px-2 py-1.5">
            <div className="text-[8px] text-slate-600 uppercase tracking-wide truncate">{m.label}</div>
            <div className={`text-[11px] font-semibold mt-0.5 truncate ${m.warn ? 'text-amber-300' : 'text-slate-200'}`}>{m.value}</div>
          </div>
        ))}
      </div>

      {/* Capital bar */}
      <div>
        <div className="flex justify-between mb-1">
          <span className="text-[9px] text-slate-600">Capital deployed</span>
          <span className="text-[9px] font-medium text-slate-400">{project.capital}</span>
        </div>
        <div className="h-1 bg-slate-700/60 rounded-full overflow-hidden">
          <div className={`h-full rounded-full ${barColor}`} style={{ width: `${project.capitalPct}%` }} />
        </div>
      </div>
      <div className="absolute bottom-3 right-3 text-slate-700 text-xs">→</div>
    </div>
  );
};

// ════════════════════════════════════════════════════════════════════════════
// DRILL PANEL
// ════════════════════════════════════════════════════════════════════════════
const DrillPanel = ({ project, onClose, onOpenCorpus }) => {
  const sc = SCORE_COLOR(project.phaseScore);
  const corpus = CORPUS[project.id];
  const pp = PROJECT_POLICIES[project.id] || { assigned: [], triggered: [] };
  const scoreStroke = project.phaseScore < 35 ? '#ef4444' : project.phaseScore < 55 ? '#f97316' : project.phaseScore < 80 ? '#f59e0b' : project.phase === 'Exit' ? '#818cf8' : '#22c55e';

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="w-full max-w-md bg-slate-900 border-l border-slate-700/60 flex flex-col overflow-y-auto h-full"
        style={{ animation: 'slideInRight 0.22s ease-out' }} onClick={e => e.stopPropagation()}>

        <div className="p-5 border-b border-slate-700/60 flex-shrink-0">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <div className="text-[10px] text-indigo-400 uppercase tracking-widest font-bold mb-1">Axiom Build · {project.phase} Phase</div>
              <div className="text-base font-bold text-white">{project.name}</div>
              <div className="text-xs text-slate-400 mt-0.5">{project.location} · {project.type}</div>
            </div>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors text-lg flex-shrink-0">✕</button>
          </div>
          {/* Policy summary */}
          <div className="flex items-center gap-1.5 mb-3 flex-wrap">
            {pp.triggered.map(id => <PolicyBadge key={id} id={id} fired={true} />)}
            {pp.assigned.filter(id => !pp.triggered.includes(id)).map(id => <PolicyBadge key={id} id={id} fired={false} />)}
          </div>
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 flex-shrink-0">
              <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
                <circle cx="24" cy="24" r="19" fill="none" stroke="#1e293b" strokeWidth="4"/>
                <circle cx="24" cy="24" r="19" fill="none" stroke={scoreStroke} strokeWidth="4" strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 19}`}
                  strokeDashoffset={`${2 * Math.PI * 19 * (1 - project.phaseScore / 100)}`}/>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-sm font-bold ${sc.text}`}>{project.phaseScore}</span>
              </div>
            </div>
            <div>
              <div className={`text-sm font-semibold ${sc.text}`}>{sc.label} risk · {project.phase}</div>
              <div className="text-xs text-slate-500 mt-0.5">{project.capital} deployed · {project.tenant}</div>
            </div>
          </div>
        </div>

        {/* Lifecycle */}
        <div className="p-5 border-b border-slate-700/60">
          <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-3">Development lifecycle</div>
          <div className="space-y-1.5">
            {project.phases.map((ph) => {
              const pha = PHASE_ACCENT(ph.name);
              const isCurrent = ph.name === project.phase;
              const psc = SCORE_COLOR(ph.score);
              return (
                <div key={ph.name} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border transition-all
                  ${isCurrent ? `${pha.bg} ${pha.border}` : ph.done ? 'border-transparent opacity-60' : 'border-transparent opacity-20'}`}>
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: isCurrent ? pha.color : ph.done ? '#475569' : '#1e293b' }} />
                  <span className={`text-xs font-medium flex-1 ${isCurrent ? pha.cls : 'text-slate-400'}`}>{ph.name}</span>
                  {ph.score && <span className={`text-xs font-bold ${psc.text}`}>{ph.score}</span>}
                  {ph.done && !isCurrent && <span className="text-[9px] text-slate-600">✓</span>}
                  <span className="text-[9px] text-slate-600 truncate max-w-[120px]">{ph.note}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Metrics */}
        <div className="p-5 border-b border-slate-700/60">
          <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-3">Key metrics</div>
          <div className="grid grid-cols-2 gap-2">
            {project.metrics.map((m, i) => (
              <div key={i} className="bg-slate-800/60 rounded-lg px-3 py-2.5">
                <div className="text-[9px] text-slate-600 uppercase tracking-wide">{m.label}</div>
                <div className={`text-sm font-semibold mt-0.5 ${m.warn ? 'text-amber-300' : 'text-white'}`}>{m.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Corpus CTA */}
        <div className="p-5">
          <div className="bg-indigo-500/8 border border-indigo-500/20 rounded-xl p-4 cursor-pointer hover:border-indigo-500/40 transition-all"
            onClick={() => onOpenCorpus(project.id)}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400"/>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">Axiom Intelligence</span>
              </div>
              <div className="flex items-center gap-1 text-indigo-400">
                <span className="text-[10px] font-medium">View corpus</span>
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                </svg>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-3">{project.insight}</p>
            {corpus && (
              <div className="flex items-center gap-2 pt-2 border-t border-indigo-500/15">
                <span className="text-[10px] text-slate-500">Value protected:</span>
                <span className="text-sm font-bold text-emerald-400">{corpus.savedValue}</span>
                <span className="ml-auto text-[10px] text-slate-600">{corpus.corpusMatches.length} matches · {corpus.confidence}%</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ════════════════════════════════════════════════════════════════════════════
// SIGNALS RAIL
// ════════════════════════════════════════════════════════════════════════════
const SignalsRail = ({ onOpenCorpus }) => {
  const signals = [
    { sev: 'critical', project: 'Dallas TX',  text: 'IST sequence conflict · 23-day slip',    cost: '$46M at risk',           id: 'dal-01', policyId: 'COMM-001' },
    { sev: 'warn',     project: 'Phoenix AZ', text: 'APS grid queue 6mo above corpus median',  cost: 'Advance pre-application',id: 'phx-02', policyId: 'SITE-001' },
    { sev: 'warn',     project: '3 sites',    text: 'Vertiv UPS +11 weeks · shared SKU',       cost: 'Parallel Eaton proc.',   id: 'atl-04', policyId: 'BILD-001' },
    { sev: 'ok',       project: 'Ashburn VA', text: 'Exit window Q2 2026 · optimal',           cost: '$2.8B implied value',    id: 'iad-03', policyId: 'CPTL-001' },
  ];
  const cls = {
    critical: { dot: 'bg-red-400 animate-pulse', text: 'text-red-400',     bg: 'bg-red-500/10',     border: 'border-red-500/20' },
    warn:     { dot: 'bg-amber-400',             text: 'text-amber-400',   bg: 'bg-amber-500/10',   border: 'border-amber-500/20' },
    ok:       { dot: 'bg-emerald-400',           text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  };
  return (
    <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-3 mb-5">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-1.5 h-1.5 rounded-full bg-indigo-400"/>
        <div className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">AXIOM — Proactive Signals Now</div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        {signals.map((s, i) => {
          const c = cls[s.sev];
          return (
            <div key={i} onClick={() => onOpenCorpus(s.id)}
              className={`rounded-lg px-3 py-2.5 border cursor-pointer hover:brightness-110 transition-all ${c.bg} ${c.border}`}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5">
                  <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${c.dot}`}/>
                  <span className={`text-[10px] font-semibold uppercase tracking-wider ${c.text}`}>{s.project}</span>
                </div>
                <PolicyBadge id={s.policyId} fired={s.sev !== 'ok'} />
              </div>
              <div className="text-[11px] text-slate-200 leading-snug mb-1">{s.text}</div>
              <div className="text-[10px] text-slate-500">{s.cost}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ════════════════════════════════════════════════════════════════════════════
// STATS BAR
// ════════════════════════════════════════════════════════════════════════════
const StatsBar = () => (
  <div className="flex items-center gap-4 flex-wrap justify-end">
    {PORTFOLIO_STATS.map(s => (
      <div key={s.label} className="text-right">
        <div className={`text-base font-bold leading-none ${s.color}`}>{s.value}</div>
        <div className="text-[9px] text-slate-500 mt-0.5 uppercase tracking-wider">{s.label}</div>
      </div>
    ))}
  </div>
);

// ════════════════════════════════════════════════════════════════════════════
// MAIN
// ════════════════════════════════════════════════════════════════════════════
const AxiomPortfolio = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [corpusProjectId, setCorpusProjectId] = useState(null);

  const handleCardClick = useCallback((project) => {
    setSelectedProject(prev => prev?.id === project.id ? null : project);
  }, []);

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
                <svg className="w-5 h-5 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
                </svg>
              </span>
              AI Factory Portfolio
            </h1>
            <p className="text-slate-400 text-sm mt-1">$5B institutional knowledge · Cradle-to-exit · Policy-governed intelligence</p>
          </div>
          <StatsBar />
        </div>
      </div>

      <div className="relative z-10 px-6 pt-5">
        <HeroCard onOpenCorpus={setCorpusProjectId} />
        <SignalsRail onOpenCorpus={setCorpusProjectId} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-8">
          {PROJECTS.map(project => (
            <ProjectCard key={project.id} project={project} onClick={handleCardClick} isSelected={selectedProject?.id === project.id} />
          ))}
        </div>
      </div>

      {selectedProject && (
        <>
          <div className="fixed inset-0 z-40 bg-slate-950/40" onClick={() => setSelectedProject(null)} />
          <DrillPanel project={selectedProject} onClose={() => setSelectedProject(null)} onOpenCorpus={setCorpusProjectId} />
        </>
      )}

      {corpusProjectId && (
        <CorpusModal projectId={corpusProjectId} onClose={() => setCorpusProjectId(null)} />
      )}

      <style>{`
        @keyframes slideInRight { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes fadeScaleIn  { from { transform: scale(0.96);      opacity: 0; } to { transform: scale(1);    opacity: 1; } }
      `}</style>
    </div>
  );
};

export default AxiomPortfolio;
