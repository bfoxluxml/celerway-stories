// src/pages/AxiomPortfolioBriefing.jsx
// AXIOM Intelligence Platform — Briefing Mode
// Redesigned to align visually with Axiom Story / Axiom Tour

import React, { useState, useEffect, useCallback } from 'react';

// ══════════════════════════════════════════════════════════════════════════
// DESIGN TOKENS — premium dark / cinematic intelligence surface
// ══════════════════════════════════════════════════════════════════════════
const T = {
  bg: '#060B16',
  bg2: '#09101D',
  bg3: '#0D1526',
  card: 'rgba(12,18,33,0.78)',
  cardSolid: '#0C1221',
  elevated: '#111A2E',
  hover: '#162238',
  border: 'rgba(95,125,185,0.16)',
  borderStrong: 'rgba(95,125,185,0.24)',
  text: '#F5F7FB',
  text2: '#B6C2D9',
  text3: '#7C8BA5',
  text4: '#53627D',
  cyan: '#5CC8FF',
  cyan2: '#7DDAFF',
  cyanBg: 'rgba(92,200,255,0.10)',
  cyanBorder: 'rgba(92,200,255,0.24)',
  gold: '#E3B341',
  gold2: '#F2CB69',
  goldBg: 'rgba(227,179,65,0.10)',
  goldBorder: 'rgba(227,179,65,0.24)',
  red: '#F0655A',
  red2: '#FF857D',
  redBg: 'rgba(240,101,90,0.10)',
  redBorder: 'rgba(240,101,90,0.24)',
  green: '#35C46A',
  green2: '#66DB8E',
  greenBg: 'rgba(53,196,106,0.10)',
  greenBorder: 'rgba(53,196,106,0.24)',
  amber: '#F0B53A',
  amber2: '#FFD267',
  amberBg: 'rgba(240,181,58,0.10)',
  amberBorder: 'rgba(240,181,58,0.24)',
  blue: '#5B8CFF',
  blueBg: 'rgba(91,140,255,0.10)',
  blueBorder: 'rgba(91,140,255,0.24)',
  shadow: '0 24px 80px rgba(0,0,0,0.38)',
  shadowSoft: '0 16px 40px rgba(0,0,0,0.24)',
  radius: 18,
  radiusLg: 24,
};

// ══════════════════════════════════════════════════════════════════════════
// PORTFOLIO STATE — fallback copy only
// ══════════════════════════════════════════════════════════════════════════
const PORTFOLIO_STATE = `Portfolio: $4.2B · 6 active projects · 1,450 MW total capacity

CRITICAL:
- Lone Star AI Campus (Dallas, TX): Commission phase, risk score 34/100. COMM-001 + COMM-002 triggered. IST sequence conflict — CRAC commissioning overlaps electrical testing by 23 days. Microsoft SLA breach May 1 = $46M exposure ($2M/day). Corpus match: eBay SLC 2018 at 98% — parallel IST tracks recovered 19 of 21 days. Authorize surge crew by April 8 at $4M cost protects $42M net.

DEVELOPING:
- Peachtree Edge Data (Atlanta, GA): Build phase, score 58. BILD-001 + BILD-002 triggered. Vertiv UPS +11 weeks — same SKU pattern detected across Dallas, Atlanta, Seattle simultaneously. $28M portfolio exposure. Eaton substitution confirmed compatible at $1M cost.
- Sonoran Compute Park (Phoenix, AZ): Design phase, score 71. SITE-001 triggered. APS grid queue 18 months vs 12-month corpus median. BOD cooling decision lock April 14 — after that date change cost +340%. File pre-application immediately recovers ~4 months.

MONITORING:
- Midwest Sovereign Exchange (Chicago, IL): Design phase, score 67. SITE-002 triggered. Fiber latency 0.8ms vs <0.5ms tenant spec. Dark fiber procurement $2.1M resolves before BOD. After steel: $12M rework.

STABLE:
- Mile High AI Hub (Denver, CO): Site phase, score 88. No triggered policies. Water rights confirmed. Latency spec validated. Advance to BOD.
- Virginia Hyperscale Cluster (Ashburn, VA): Exit phase, score 94. Q2 2026 exit window optimal — 4 buyers with active mandates, $2.8B implied value. PUE optimization adds $2.8M to multiple before go-to-market.`;

// ══════════════════════════════════════════════════════════════════════════
// DATA
// ══════════════════════════════════════════════════════════════════════════
const INTERVENTIONS = [
  {
    id: 'dal-01',
    tier: 'critical',
    name: 'Lone Star AI Campus',
    location: 'Dallas, TX · 400MW AI Factory',
    tenant: 'Microsoft SLA May 1, 2026',
    phase: 'Commission',
    score: 34,
    policies: [{ id: 'COMM-001', fired: true }, { id: 'COMM-002', fired: true }, { id: 'COMM-003', fired: false }],
    situation: 'IST sequencing creates a 23-day conflict between CRAC commissioning and electrical testing. 41 open P1 punch items. At current velocity, the Microsoft SLA deadline is missed.',
    exposure: '$46M',
    precedent: { project: 'eBay Salt Lake City', year: 2018, outcome: 'Parallel IST tracks recovered 19 of 21 days. Surge crew mobilized in 6 hours.', relevance: 98 },
    recommendation: 'Authorize parallel IST tracks immediately. Mobilize surge crew by April 8. Cost ~$4M. Net protection: $42M.',
    action: { label: 'Authorize Surge Crew — $4M', confirmedLabel: 'Authorized · Surge crew mobilizing', detail: 'Logged · Target: April 8 mobilization · 19-day recovery projected' },
    savedValue: '$42M',
    corpus: {
      withoutAxiom: '$46M schedule slip — 23-day delay, SLA breach, penalty clauses.',
      withAxiom: '$4M surge cost · 19 days recovered · No SLA breach.',
      confidence: 94,
      matches: [
        { project: 'eBay Salt Lake City', year: 2018, outcome: 'Parallel IST resolved 21-day slip in 8 days', relevance: 98 },
        { project: 'Switch LAS 4', year: 2020, outcome: 'CRAC sequencing — 14-day slip, $28M penalty', relevance: 91 },
        { project: 'Aligned PHX 2', year: 2022, outcome: 'Surge protocol — 11 days recovered at $2.4M', relevance: 87 }
      ],
      reasoning: [
        { step: 'Pattern detection', detail: 'IST schedule ingested. CRAC window overlaps electrical testing 11 days — COMM-001 triggered.' },
        { step: 'Corpus search', detail: '47 commissioning sequences searched. 3 high-confidence matches found.' },
        { step: 'Resolution model', detail: 'eBay SLC 2018 at 98% similarity. Parallel IST + 48hr surge: 19/21 days recovered.' },
        { step: 'Counterfactual', detail: 'Without action: May 1 breach certain. $2M/day × 23 days = $46M exposure.' }
      ]
    },
  },
  {
    id: 'atl-04',
    tier: 'developing',
    name: 'Peachtree Edge Data',
    location: 'Atlanta, GA · 180MW Modular',
    tenant: 'Meta (LOI)',
    phase: 'Build',
    score: 58,
    policies: [{ id: 'BILD-001', fired: true }, { id: 'BILD-002', fired: true }, { id: 'BILD-003', fired: false }],
    situation: 'Vertiv UPS lead time +11 weeks — same SKU pattern detected across Dallas, Atlanta, and Seattle simultaneously. No single PM sees the full picture. AXIOM does.',
    exposure: '$28M (3 sites)',
    precedent: { project: 'Switch LAS 2022', year: 2022, outcome: 'Identical Vertiv UPS delay — 14-week slip, $22M penalty. No parallel procurement.', relevance: 97 },
    recommendation: 'One procurement decision protects three sites. Authorize Eaton substitution now — confirmed compatible at $1M cost vs $28M exposure.',
    action: { label: 'Authorize Eaton Procurement — $1M', confirmedLabel: 'Authorized · PO issued across 3 sites', detail: 'Logged · Dallas + Atlanta + Seattle · $28M protected' },
    savedValue: '$28M',
    corpus: {
      withoutAxiom: 'Cascade — 3 commissioning slips, $28M penalty.',
      withAxiom: '$1M Eaton substitution — zero schedule impact.',
      confidence: 87,
      matches: [
        { project: 'Switch LAS 2022', year: 2022, outcome: 'Vertiv delay — $22M penalty', relevance: 97 },
        { project: 'eBay PHX 2019', year: 2019, outcome: 'Eaton substitution — zero schedule impact', relevance: 94 }
      ],
      reasoning: [
        { step: 'Portfolio detection', detail: 'BILD-001: Vertiv UPS +11 weeks across Dallas, Atlanta, Seattle simultaneously.' },
        { step: 'Pattern match', detail: 'BILD-002: Switch LAS 2022 — identical SKU, identical delay. $22M penalty without action.' },
        { step: 'Mitigation model', detail: 'eBay PHX 2019: Eaton substitution confirmed compatible. Delta: +$340K.' }
      ]
    },
  },
  {
    id: 'phx-02',
    tier: 'developing',
    name: 'Sonoran Compute Park',
    location: 'Phoenix, AZ · 250MW Co-location',
    tenant: 'Pre-leased 60%',
    phase: 'Design',
    score: 71,
    policies: [{ id: 'SITE-001', fired: true }, { id: 'SITE-003', fired: false }],
    situation: 'APS grid queue is 18 months — 6 months above corpus median. BOD cooling decision locks April 14. After that date, design change costs +340%.',
    exposure: 'April 14 deadline',
    precedent: { project: 'Switch PHX 1', year: 2019, outcome: 'Same APS substation — 22-month queue. Project relocated. $8M sunk cost.', relevance: 95 },
    recommendation: 'File APS pre-application this week — recovers ~4 months. Resolve BOD cooling before April 14. Every week of delay compounds.',
    action: { label: 'File APS Pre-Application', confirmedLabel: 'Filed · APS queue initiated', detail: 'Logged · Filing date today · ~4 months recovered · BOD cooling next' },
    savedValue: '$18M',
    corpus: {
      withoutAxiom: '6-month grid delay — BOD locked at wrong assumption. Q1 2027 slip.',
      withAxiom: '~4 months recovered — pre-application advanced. Alternative substation identified.',
      confidence: 88,
      matches: [
        { project: 'Switch PHX 1', year: 2019, outcome: 'Same APS substation — 22-month queue', relevance: 95 },
        { project: 'QTS Chandler', year: 2021, outcome: 'Pre-application advanced 5 months', relevance: 89 }
      ],
      reasoning: [
        { step: 'Site scoring', detail: 'APS Estrella: 18 months. Corpus median: 12. SITE-001 triggered at +6mo variance.' },
        { step: 'Alternative', detail: 'SRP Superstition: 6-month queue, 11 miles east.' },
        { step: 'BOD impact', detail: 'Hybrid liquid: −22% 5yr OpEx. NPV positive at $180M+ asset.' }
      ]
    },
  },
];

const MONITORING = [
  {
    id: 'chi-06',
    name: 'Midwest Sovereign Exchange',
    location: 'Chicago, IL',
    phase: 'Design',
    score: 67,
    policy: 'SITE-002',
    situation: 'Fiber latency 0.8ms vs <0.5ms tenant spec. Before steel: $2.1M dark fiber resolves it. After steel: $12M structural rework.',
    action: 'Procure dark fiber before BOD lock',
    urgency: 'Resolve before BOD · Cost of delay: $10M',
  },
];

const STABLE = [
  { id: 'den-05', name: 'Mile High AI Hub', location: 'Denver, CO', phase: 'Site', score: 88, note: 'Water rights confirmed · Latency validated · Advance to BOD', color: T.green2 },
  { id: 'iad-03', name: 'Virginia Hyperscale Cluster', location: 'Ashburn, VA', phase: 'Exit', score: 94, note: 'Q2 2026 window · $2.8B implied value · 4 buyers active', color: T.blue },
];

// ══════════════════════════════════════════════════════════════════════════
// API
// ══════════════════════════════════════════════════════════════════════════
const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000';
const API_KEY = process.env.REACT_APP_API_KEY || '';

const generatePortfolioBrief = async () => {
  const response = await fetch(`${API_BASE}/chat/axiom-portfolio-brief`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(API_KEY ? { 'X-API-Key': API_KEY } : {}),
    },
  });
  if (!response.ok) throw new Error(`Brief generation failed: ${response.status}`);
  const data = await response.json();
  return data.brief;
};

// ══════════════════════════════════════════════════════════════════════════
// HELPERS
// ══════════════════════════════════════════════════════════════════════════
const getTierTheme = (tier, authorized) => {
  if (authorized) {
    return {
      accent: T.green,
      accent2: T.green2,
      bg: T.greenBg,
      border: T.greenBorder,
      label: 'AUTHORIZED',
    };
  }
  if (tier === 'critical') {
    return {
      accent: T.red,
      accent2: T.red2,
      bg: T.redBg,
      border: T.redBorder,
      label: 'CRITICAL INTERVENTION',
    };
  }
  return {
    accent: T.amber,
    accent2: T.amber2,
    bg: T.amberBg,
    border: T.amberBorder,
    label: 'DEVELOPING INTERVENTION',
  };
};

const cardBase = {
  background: T.card,
  backdropFilter: 'blur(18px)',
  WebkitBackdropFilter: 'blur(18px)',
  border: `1px solid ${T.border}`,
  boxShadow: T.shadowSoft,
};

const formatNow = () => {
  const now = new Date();
  return `${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} today`;
};

// ══════════════════════════════════════════════════════════════════════════
// POLICY PILL
// ══════════════════════════════════════════════════════════════════════════
const PolicyPill = ({ id, fired }) => (
  <span
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      padding: '4px 8px',
      borderRadius: 999,
      fontSize: 10,
      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
      fontWeight: 700,
      letterSpacing: '0.06em',
      background: fired ? T.goldBg : 'rgba(18,28,47,0.72)',
      border: `1px solid ${fired ? T.goldBorder : T.border}`,
      color: fired ? T.gold2 : T.text4,
      whiteSpace: 'nowrap',
    }}
  >
    {fired && (
      <span
        style={{
          width: 5,
          height: 5,
          borderRadius: '50%',
          background: T.gold,
          animation: 'pulse 2s infinite',
        }}
      />
    )}
    {id}
  </span>
);

// ══════════════════════════════════════════════════════════════════════════
// RING
// ══════════════════════════════════════════════════════════════════════════
const ScoreRing = ({ score, phase, size = 52 }) => {
  const color =
    score < 35 ? T.red2 :
    score < 55 ? '#F08B45' :
    score < 80 ? T.amber2 :
    phase === 'Exit' ? T.blue : T.green2;

  const r = size / 2 - 4;
  const circumference = 2 * Math.PI * r;

  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3.5" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - score / 100)}
        />
      </svg>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: size * 0.25,
          fontWeight: 800,
          color,
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        {score}
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════
// HERO / HEADER
// ══════════════════════════════════════════════════════════════════════════
const HeroBar = () => (
  <div
    style={{
      ...cardBase,
      position: 'relative',
      overflow: 'hidden',
      borderRadius: T.radiusLg,
      padding: '22px 24px',
      marginBottom: 20,
      background: `linear-gradient(135deg, rgba(13,21,38,0.92), rgba(8,14,27,0.88))`,
    }}
  >
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background:
          'radial-gradient(circle at top right, rgba(92,200,255,0.10), transparent 28%), radial-gradient(circle at bottom left, rgba(227,179,65,0.08), transparent 28%)',
        pointerEvents: 'none',
      }}
    />
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        background: `linear-gradient(90deg, ${T.cyan}, ${T.gold}, transparent 60%)`,
      }}
    />

    <div
      style={{
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: '1.2fr 0.8fr',
        gap: 20,
        alignItems: 'end',
      }}
    >
      <div>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 12px',
            borderRadius: 999,
            background: T.cyanBg,
            border: `1px solid ${T.cyanBorder}`,
            color: T.cyan2,
            fontSize: 11,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.16em',
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: T.cyan,
              boxShadow: `0 0 18px ${T.cyan}`,
            }}
          />
          Axiom Intelligence Platform
        </div>

        <h1
          style={{
            margin: '16px 0 0',
            fontSize: 40,
            lineHeight: 1.05,
            fontWeight: 800,
            color: T.text,
            letterSpacing: '-0.04em',
          }}
        >
          AI Factory Portfolio Briefing
        </h1>

        <p
          style={{
            margin: '14px 0 0',
            maxWidth: 740,
            fontSize: 15,
            lineHeight: 1.75,
            color: T.text2,
          }}
        >
          Governed project intelligence across site, build, commission, capital, and exit. This view surfaces
          portfolio-wide interventions, ranks urgency, and turns corpus memory into immediate decisions.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 10,
        }}
      >
        {[
          { label: 'Portfolio', value: '$4.2B', color: T.text },
          { label: 'Capacity', value: '1,450 MW', color: T.text },
          { label: 'Protected', value: '$280M', color: T.green2 },
          { label: 'Triggered', value: '5', color: T.amber2 },
        ].map((s) => (
          <div
            key={s.label}
            style={{
              borderRadius: 16,
              padding: '14px 12px',
              background: 'rgba(255,255,255,0.03)',
              border: `1px solid ${T.border}`,
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontSize: 20,
                fontWeight: 800,
                color: s.color,
                letterSpacing: '-0.03em',
              }}
            >
              {s.value}
            </div>
            <div
              style={{
                marginTop: 4,
                fontSize: 10,
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                color: T.text4,
                fontWeight: 700,
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ══════════════════════════════════════════════════════════════════════════
// BRIEF PANEL
// ══════════════════════════════════════════════════════════════════════════
const BriefCard = ({ brief, loading, error, onRefresh, generatedAt }) => (
  <div
    style={{
      ...cardBase,
      position: 'relative',
      overflow: 'hidden',
      borderRadius: T.radiusLg,
      padding: '22px 24px',
      marginBottom: 26,
    }}
  >
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background:
          'radial-gradient(circle at top right, rgba(227,179,65,0.08), transparent 24%), radial-gradient(circle at bottom left, rgba(92,200,255,0.07), transparent 30%)',
      }}
    />
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        background: `linear-gradient(90deg, ${T.gold}, ${T.cyan}, transparent 55%)`,
      }}
    />

    <div style={{ position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', gap: 16, marginBottom: 16 }}>
        <div>
          <div
            style={{
              fontSize: 11,
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              color: T.gold2,
            }}
          >
            Axiom Portfolio Brief
          </div>
          <div style={{ marginTop: 4, fontSize: 12, color: T.text4 }}>
            {loading ? 'Generating live portfolio summary…' : generatedAt ? `Generated ${generatedAt}` : 'Generated briefing'}
          </div>
        </div>

        <button
          onClick={onRefresh}
          disabled={loading}
          style={{
            border: `1px solid ${T.border}`,
            background: 'rgba(255,255,255,0.02)',
            color: loading ? T.text4 : T.text3,
            borderRadius: 12,
            padding: '10px 14px',
            fontSize: 11,
            fontWeight: 700,
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'all 0.16s ease',
          }}
          onMouseEnter={(e) => {
            if (!loading) {
              e.currentTarget.style.borderColor = T.cyanBorder;
              e.currentTarget.style.color = T.cyan2;
              e.currentTarget.style.background = T.cyanBg;
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = T.border;
            e.currentTarget.style.color = loading ? T.text4 : T.text3;
            e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
          }}
        >
          Refresh brief
        </button>
      </div>

      {loading && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[100, 92, 84, 76].map((w, i) => (
            <div
              key={i}
              style={{
                height: 14,
                width: `${w}%`,
                borderRadius: 6,
                background: 'linear-gradient(90deg, rgba(255,255,255,0.05), rgba(255,255,255,0.11), rgba(255,255,255,0.05))',
                backgroundSize: '200% 100%',
                animation: 'shimmer 1.5s linear infinite',
              }}
            />
          ))}
        </div>
      )}

      {error && (
        <div
          style={{
            borderRadius: 16,
            padding: 16,
            background: T.redBg,
            border: `1px solid ${T.redBorder}`,
            color: T.red2,
            fontSize: 13,
            lineHeight: 1.6,
          }}
        >
          Brief generation failed. Check the API response and retry.
        </div>
      )}

      {!loading && !error && (
        <>
          <p
            style={{
              margin: 0,
              fontSize: 15,
              lineHeight: 1.9,
              color: T.text,
              maxWidth: 1080,
            }}
          >
            {brief || PORTFOLIO_STATE}
          </p>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 10,
              marginTop: 18,
              paddingTop: 18,
              borderTop: `1px solid ${T.border}`,
            }}
          >
            {[
              { label: '3 require action', color: T.red2, bg: T.redBg, border: T.redBorder },
              { label: '1 monitoring', color: T.amber2, bg: T.amberBg, border: T.amberBorder },
              { label: '2 stable', color: T.green2, bg: T.greenBg, border: T.greenBorder },
            ].map((chip) => (
              <a
                key={chip.label}
                href="#"
                onClick={(e) => e.preventDefault()}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '8px 12px',
                  borderRadius: 999,
                  border: `1px solid ${chip.border}`,
                  background: chip.bg,
                  color: chip.color,
                  fontSize: 11,
                  fontWeight: 700,
                  textDecoration: 'none',
                }}
              >
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: chip.color }} />
                {chip.label}
              </a>
            ))}
          </div>
        </>
      )}
    </div>
  </div>
);

// ══════════════════════════════════════════════════════════════════════════
// SECTION HEADER
// ══════════════════════════════════════════════════════════════════════════
const SectionHeader = ({ label, count, color, subtitle }) => (
  <div style={{ marginBottom: 16 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ width: 4, height: 18, background: color, borderRadius: 999 }} />
      <div
        style={{
          fontSize: 11,
          fontWeight: 800,
          textTransform: 'uppercase',
          letterSpacing: '0.18em',
          color,
        }}
      >
        {label}
      </div>
      <div style={{ fontSize: 11, color: T.text4 }}>{count}</div>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${color}55, transparent)` }} />
    </div>
    {subtitle && (
      <div style={{ marginLeft: 14, marginTop: 8, fontSize: 13, color: T.text3 }}>
        {subtitle}
      </div>
    )}
  </div>
);

// ══════════════════════════════════════════════════════════════════════════
// CRITICAL CARD
// ══════════════════════════════════════════════════════════════════════════
const InterventionCardFull = ({ item, onCorpus, onAuthorize, authorized }) => {
  const theme = getTierTheme(item.tier, authorized);

  return (
    <div
      style={{
        ...cardBase,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: T.radiusLg,
        marginBottom: 16,
        border: `1px solid ${theme.border}`,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at top right, ${theme.bg}, transparent 30%)`,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          height: 3,
          background: `linear-gradient(90deg, ${theme.accent}, ${theme.accent2}, transparent 55%)`,
        }}
      />

      <div style={{ padding: '22px 24px', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', gap: 20, marginBottom: 22 }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 7,
                  padding: '6px 10px',
                  borderRadius: 999,
                  background: theme.bg,
                  border: `1px solid ${theme.border}`,
                  color: theme.accent2,
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                }}
              >
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: theme.accent, animation: 'pulse 2s infinite' }} />
                {theme.label}
              </span>
              {item.policies.map((p) => <PolicyPill key={p.id} id={p.id} fired={p.fired} />)}
            </div>

            <h2
              style={{
                margin: 0,
                fontSize: 30,
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: '-0.04em',
                color: T.text,
              }}
            >
              {item.name}
            </h2>

            <p style={{ margin: '10px 0 0', fontSize: 14, color: T.text3 }}>
              {item.location} · {item.tenant}
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 18, flexShrink: 0 }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 36, fontWeight: 800, color: theme.accent2, lineHeight: 1, letterSpacing: '-0.03em' }}>
                {item.exposure}
              </div>
              <div
                style={{
                  marginTop: 6,
                  fontSize: 10,
                  textTransform: 'uppercase',
                  letterSpacing: '0.18em',
                  color: T.text4,
                  fontWeight: 700,
                }}
              >
                exposure
              </div>
            </div>
            <ScoreRing score={item.score} phase={item.phase} size={58} />
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.08fr 0.92fr 1fr',
            gap: 14,
          }}
        >
          <div
            style={{
              borderRadius: 16,
              padding: '18px 18px',
              background: 'rgba(255,255,255,0.03)',
              border: `1px solid ${T.border}`,
            }}
          >
            <div style={{ fontSize: 10, fontWeight: 800, color: T.text4, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 10 }}>
              Situation
            </div>
            <p style={{ margin: 0, fontSize: 13, lineHeight: 1.75, color: T.text2 }}>
              {item.situation}
            </p>
          </div>

          <div
            style={{
              borderRadius: 16,
              padding: '18px 18px',
              background: T.goldBg,
              border: `1px solid ${T.goldBorder}`,
            }}
          >
            <div style={{ fontSize: 10, fontWeight: 800, color: T.gold2, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 10 }}>
              Corpus precedent
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, color: T.text, marginBottom: 8 }}>
              {item.precedent.project} · {item.precedent.year}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <div style={{ flex: 1, height: 4, background: 'rgba(255,255,255,0.07)', borderRadius: 999, overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${item.precedent.relevance}%`,
                    background: `linear-gradient(90deg, ${T.gold}, ${T.gold2})`,
                    borderRadius: 999,
                  }}
                />
              </div>
              <div style={{ fontSize: 11, fontWeight: 800, color: T.gold2 }}>{item.precedent.relevance}%</div>
            </div>
            <p style={{ margin: 0, fontSize: 12, lineHeight: 1.65, color: T.text2 }}>
              {item.precedent.outcome}
            </p>
          </div>

          <div
            style={{
              borderRadius: 16,
              padding: '18px 18px',
              background: 'rgba(255,255,255,0.03)',
              border: `1px solid ${T.border}`,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ fontSize: 10, fontWeight: 800, color: T.text4, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 10 }}>
              Recommendation
            </div>

            <p style={{ margin: 0, fontSize: 13, lineHeight: 1.75, color: T.text2 }}>
              {item.recommendation}
            </p>

            <div style={{ marginTop: 'auto', paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {authorized ? (
                <div
                  style={{
                    borderRadius: 14,
                    padding: '12px 14px',
                    background: T.greenBg,
                    border: `1px solid ${T.greenBorder}`,
                  }}
                >
                  <div style={{ fontSize: 12, fontWeight: 800, color: T.green2 }}>
                    ✓ {item.action.confirmedLabel}
                  </div>
                  <div style={{ marginTop: 4, fontSize: 11, color: '#8FDEAE' }}>{item.action.detail}</div>
                </div>
              ) : (
                <button
                  onClick={() => onAuthorize(item.id)}
                  style={{
                    border: 'none',
                    borderRadius: 14,
                    padding: '12px 14px',
                    background: `linear-gradient(135deg, ${theme.accent}, ${theme.accent2})`,
                    color: '#fff',
                    fontSize: 12,
                    fontWeight: 800,
                    cursor: 'pointer',
                    textAlign: 'left',
                    boxShadow: `0 10px 24px ${theme.bg}`,
                  }}
                >
                  {item.action.label}
                </button>
              )}

              <button
                onClick={() => onCorpus(item)}
                style={{
                  borderRadius: 12,
                  padding: '10px 12px',
                  border: `1px solid ${T.border}`,
                  background: 'rgba(255,255,255,0.02)',
                  color: T.text3,
                  fontSize: 11,
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                View full corpus · {item.corpus.confidence}% confidence →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════
// DEVELOPING CARD
// ══════════════════════════════════════════════════════════════════════════
const InterventionCardHalf = ({ item, onCorpus, onAuthorize, authorized }) => {
  const theme = getTierTheme(item.tier, authorized);

  return (
    <div
      style={{
        ...cardBase,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: T.radiusLg,
        border: `1px solid ${theme.border}`,
        height: '100%',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at top right, ${theme.bg}, transparent 34%)`,
        }}
      />
      <div
        style={{
          height: 3,
          background: `linear-gradient(90deg, ${theme.accent}, ${theme.accent2}, transparent 65%)`,
        }}
      />

      <div style={{ position: 'relative', padding: '20px 20px 18px', display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', gap: 12, marginBottom: 14 }}>
          <div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center', marginBottom: 8 }}>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.16em',
                  color: theme.accent2,
                }}
              >
                {authorized ? 'Authorized' : 'Developing'}
              </span>
              {item.policies.slice(0, 2).map((p) => <PolicyPill key={p.id} id={p.id} fired={p.fired} />)}
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, color: T.text, letterSpacing: '-0.03em' }}>{item.name}</div>
            <div style={{ marginTop: 6, fontSize: 13, color: T.text4 }}>{item.location}</div>
          </div>
          <ScoreRing score={item.score} phase={item.phase} size={46} />
        </div>

        <div
          style={{
            borderRadius: 14,
            padding: '14px 14px',
            background: 'rgba(255,255,255,0.03)',
            border: `1px solid ${T.border}`,
            marginBottom: 10,
          }}
        >
          <div style={{ fontSize: 10, fontWeight: 800, color: T.text4, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 8 }}>
            Situation
          </div>
          <p style={{ margin: 0, fontSize: 12, lineHeight: 1.7, color: T.text2 }}>{item.situation}</p>
        </div>

        <div
          style={{
            borderRadius: 14,
            padding: '12px 14px',
            background: T.goldBg,
            border: `1px solid ${T.goldBorder}`,
            marginBottom: 10,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 6 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: T.text }}>
              {item.precedent.project} · {item.precedent.year}
            </div>
            <div style={{ fontSize: 10, fontWeight: 800, color: T.gold2 }}>{item.precedent.relevance}%</div>
          </div>
          <p style={{ margin: 0, fontSize: 11, lineHeight: 1.6, color: T.text3 }}>
            {item.precedent.outcome}
          </p>
        </div>

        <p style={{ margin: '0 0 14px', fontSize: 12, lineHeight: 1.72, color: T.text2 }}>
          {item.recommendation}
        </p>

        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {authorized ? (
            <div
              style={{
                borderRadius: 12,
                padding: '11px 12px',
                background: T.greenBg,
                border: `1px solid ${T.greenBorder}`,
                fontSize: 12,
                fontWeight: 700,
                color: T.green2,
              }}
            >
              ✓ {item.action.confirmedLabel}
            </div>
          ) : (
            <button
              onClick={() => onAuthorize(item.id)}
              style={{
                border: 'none',
                borderRadius: 12,
                padding: '11px 12px',
                background: `linear-gradient(135deg, ${theme.accent}, ${theme.accent2})`,
                color: '#fff',
                fontSize: 12,
                fontWeight: 800,
                cursor: 'pointer',
                textAlign: 'left',
                boxShadow: `0 10px 24px ${theme.bg}`,
              }}
            >
              {item.action.label}
            </button>
          )}

          <button
            onClick={() => onCorpus(item)}
            style={{
              borderRadius: 12,
              padding: '10px 12px',
              border: `1px solid ${T.border}`,
              background: 'rgba(255,255,255,0.02)',
              color: T.text3,
              fontSize: 11,
              cursor: 'pointer',
              textAlign: 'left',
            }}
          >
            View corpus →
          </button>
        </div>
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════
// MONITORING STRIP
// ══════════════════════════════════════════════════════════════════════════
const MonitoringRow = ({ item }) => (
  <div
    style={{
      ...cardBase,
      borderRadius: 18,
      padding: '16px 18px',
      border: `1px solid ${T.amberBorder}`,
      display: 'grid',
      gridTemplateColumns: 'auto 1fr auto auto',
      gap: 16,
      alignItems: 'center',
      marginBottom: 8,
    }}
  >
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '7px 10px',
        borderRadius: 999,
        background: T.amberBg,
        border: `1px solid ${T.amberBorder}`,
        color: T.amber2,
        fontSize: 10,
        fontWeight: 800,
        textTransform: 'uppercase',
        letterSpacing: '0.14em',
      }}
    >
      <span style={{ width: 7, height: 7, borderRadius: '50%', background: T.amber, animation: 'pulse 2s infinite' }} />
      Monitor
    </div>

    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 4 }}>
        <span style={{ fontSize: 16, fontWeight: 700, color: T.text }}>{item.name}</span>
        <span style={{ fontSize: 12, color: T.text4 }}>{item.location}</span>
        <PolicyPill id={item.policy} fired />
      </div>
      <div style={{ fontSize: 13, lineHeight: 1.65, color: T.text2 }}>{item.situation}</div>
    </div>

    <div style={{ textAlign: 'right' }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: T.amber2 }}>{item.action}</div>
      <div style={{ marginTop: 4, fontSize: 11, color: T.text4 }}>{item.urgency}</div>
    </div>

    <ScoreRing score={item.score} phase="Design" size={42} />
  </div>
);

// ══════════════════════════════════════════════════════════════════════════
// STABLE STRIP
// ══════════════════════════════════════════════════════════════════════════
const StableRow = ({ item }) => (
  <div
    style={{
      ...cardBase,
      borderRadius: 18,
      padding: '16px 18px',
      borderLeft: `4px solid ${item.color}`,
      display: 'grid',
      gridTemplateColumns: '1.1fr 1.4fr auto',
      gap: 16,
      alignItems: 'center',
      marginBottom: 8,
    }}
  >
    <div>
      <div style={{ fontSize: 16, fontWeight: 700, color: T.text }}>{item.name}</div>
      <div style={{ marginTop: 4, fontSize: 12, color: T.text4 }}>{item.location} · {item.phase}</div>
    </div>

    <div style={{ fontSize: 13, lineHeight: 1.65, color: T.text2 }}>{item.note}</div>

    <ScoreRing score={item.score} phase={item.phase} size={40} />
  </div>
);

// ══════════════════════════════════════════════════════════════════════════
// CORPUS MODAL
// ══════════════════════════════════════════════════════════════════════════
const CorpusModal = ({ item, onClose }) => {
  if (!item) return null;
  const c = item.corpus;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 18,
      }}
      onClick={onClose}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(4,8,18,0.80)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}
      />
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 860,
          maxHeight: '90vh',
          overflowY: 'auto',
          borderRadius: 26,
          ...cardBase,
          background: `linear-gradient(135deg, rgba(12,18,33,0.95), rgba(10,15,28,0.94))`,
          boxShadow: T.shadow,
          animation: 'fadeScaleIn 0.22s ease-out',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            height: 3,
            background: `linear-gradient(90deg, ${T.gold}, ${T.cyan}, transparent 60%)`,
          }}
        />
        <div style={{ padding: '24px 24px 20px', borderBottom: `1px solid ${T.border}` }}>
          <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', gap: 16 }}>
            <div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.18em',
                  color: T.gold2,
                  marginBottom: 8,
                }}
              >
                Axiom Corpus Intelligence
              </div>
              <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: '-0.03em', color: T.text }}>
                {item.name}
              </div>
              <div style={{ marginTop: 8, fontSize: 14, color: T.text3 }}>
                Counterfactual modeling, corpus precedent, and reasoning chain
              </div>
            </div>

            <button
              onClick={onClose}
              style={{
                width: 40,
                height: 40,
                borderRadius: 14,
                border: `1px solid ${T.border}`,
                background: 'rgba(255,255,255,0.03)',
                color: T.text3,
                cursor: 'pointer',
                fontSize: 18,
              }}
            >
              ✕
            </button>
          </div>
        </div>

        <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {[
              { label: 'Corpus Size', value: '$5B', sub: 'Real project history', color: T.text },
              { label: 'Matches', value: c.matches.length, sub: 'High-confidence comps', color: T.cyan2 },
              { label: 'Confidence', value: `${c.confidence}%`, sub: 'Pattern match score', color: c.confidence >= 90 ? T.green2 : T.amber2 },
            ].map((s) => (
              <div
                key={s.label}
                style={{
                  borderRadius: 18,
                  padding: '16px 16px',
                  background: 'rgba(255,255,255,0.03)',
                  border: `1px solid ${T.border}`,
                }}
              >
                <div style={{ fontSize: 28, fontWeight: 800, color: s.color, letterSpacing: '-0.03em' }}>{s.value}</div>
                <div style={{ marginTop: 6, fontSize: 11, fontWeight: 800, color: T.text4, textTransform: 'uppercase', letterSpacing: '0.14em' }}>
                  {s.label}
                </div>
                <div style={{ marginTop: 6, fontSize: 12, color: T.text3 }}>{s.sub}</div>
              </div>
            ))}
          </div>

          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: T.text4, textTransform: 'uppercase', letterSpacing: '0.16em', marginBottom: 10 }}>
              Counterfactual analysis
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div
                style={{
                  borderRadius: 18,
                  padding: 18,
                  background: T.redBg,
                  border: `1px solid ${T.redBorder}`,
                }}
              >
                <div style={{ fontSize: 11, fontWeight: 800, color: T.red2, textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 8 }}>
                  Without Axiom
                </div>
                <div style={{ fontSize: 14, lineHeight: 1.75, color: '#FFB1AA' }}>{c.withoutAxiom}</div>
              </div>

              <div
                style={{
                  borderRadius: 18,
                  padding: 18,
                  background: T.greenBg,
                  border: `1px solid ${T.greenBorder}`,
                }}
              >
                <div style={{ fontSize: 11, fontWeight: 800, color: T.green2, textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 8 }}>
                  With Axiom
                </div>
                <div style={{ fontSize: 14, lineHeight: 1.75, color: '#A8E9BE' }}>{c.withAxiom}</div>
              </div>
            </div>
          </div>

          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: T.text4, textTransform: 'uppercase', letterSpacing: '0.16em', marginBottom: 10 }}>
              Corpus matches
            </div>

            <div style={{ display: 'grid', gap: 10 }}>
              {c.matches.map((m, i) => (
                <div
                  key={i}
                  style={{
                    borderRadius: 18,
                    padding: '14px 16px',
                    background: 'rgba(255,255,255,0.03)',
                    border: `1px solid ${T.border}`,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 8 }}>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: T.text }}>{m.project}</div>
                      <div style={{ marginTop: 3, fontSize: 12, color: T.text4 }}>{m.year}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 120 }}>
                      <div style={{ flex: 1, height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 999, overflow: 'hidden' }}>
                        <div
                          style={{
                            height: '100%',
                            width: `${m.relevance}%`,
                            background: `linear-gradient(90deg, ${T.gold}, ${T.gold2})`,
                          }}
                        />
                      </div>
                      <div style={{ fontSize: 11, fontWeight: 800, color: T.gold2 }}>{m.relevance}%</div>
                    </div>
                  </div>
                  <div style={{ fontSize: 13, lineHeight: 1.7, color: T.text2 }}>{m.outcome}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: T.text4, textTransform: 'uppercase', letterSpacing: '0.16em', marginBottom: 12 }}>
              Reasoning chain
            </div>
            <div style={{ display: 'grid', gap: 12 }}>
              {c.reasoning.map((r, i) => (
                <div
                  key={i}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '36px 1fr',
                    gap: 12,
                    alignItems: 'start',
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: T.goldBg,
                      border: `1px solid ${T.goldBorder}`,
                      color: T.gold2,
                      fontWeight: 800,
                      fontSize: 12,
                    }}
                  >
                    {i + 1}
                  </div>
                  <div
                    style={{
                      borderRadius: 16,
                      padding: '14px 16px',
                      background: 'rgba(255,255,255,0.03)',
                      border: `1px solid ${T.border}`,
                    }}
                  >
                    <div style={{ fontSize: 14, fontWeight: 700, color: T.text }}>{r.step}</div>
                    <div style={{ marginTop: 6, fontSize: 13, lineHeight: 1.72, color: T.text2 }}>{r.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              paddingTop: 6,
              fontSize: 11,
              color: T.text4,
              textTransform: 'uppercase',
              letterSpacing: '0.16em',
              textAlign: 'center',
            }}
          >
            Powered by $5B project corpus · 15+ hyperscale builds
          </div>
        </div>
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════
// MAIN
// ══════════════════════════════════════════════════════════════════════════
const AxiomPortfolioBriefing = () => {
  const [brief, setBrief] = useState('');
  const [briefLoading, setBriefLoading] = useState(true);
  const [briefError, setBriefError] = useState(false);
  const [generatedAt, setGeneratedAt] = useState('');
  const [authorized, setAuthorized] = useState({});
  const [corpusItem, setCorpusItem] = useState(null);

  const loadBrief = useCallback(async () => {
    setBriefLoading(true);
    setBriefError(false);
    setBrief('');
    try {
      const text = await generatePortfolioBrief();
      setBrief(text);
      setGeneratedAt(formatNow());
    } catch (err) {
      console.error('Brief generation failed:', err);
      setBriefError(true);
    } finally {
      setBriefLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBrief();
  }, [loadBrief]);

  const handleAuthorize = useCallback((id) => {
    setAuthorized((prev) => ({ ...prev, [id]: true }));
  }, []);

  const critical = INTERVENTIONS.filter((i) => i.tier === 'critical');
  const developing = INTERVENTIONS.filter((i) => i.tier === 'developing');

  return (
    <div
      style={{
        minHeight: '100vh',
        background: `
          radial-gradient(circle at top right, rgba(92,200,255,0.08), transparent 22%),
          radial-gradient(circle at bottom left, rgba(227,179,65,0.06), transparent 22%),
          linear-gradient(180deg, ${T.bg}, ${T.bg2} 45%, ${T.bg3})
        `,
        color: T.text,
        fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <div style={{ maxWidth: 1480, margin: '0 auto', padding: '22px 24px 40px' }}>
        <HeroBar />

        <BriefCard
          brief={brief}
          loading={briefLoading}
          error={briefError}
          onRefresh={loadBrief}
          generatedAt={generatedAt}
        />

        <SectionHeader
          label="Active Interventions"
          count={`${critical.length + developing.length} projects`}
          color={T.red2}
          subtitle="Prioritized actions surfaced from project signals, corpus precedent, and counterfactual modeling."
        />

        {critical.map((item) => (
          <InterventionCardFull
            key={item.id}
            item={item}
            onCorpus={setCorpusItem}
            onAuthorize={handleAuthorize}
            authorized={!!authorized[item.id]}
          />
        ))}

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 16,
            marginBottom: 24,
          }}
        >
          {developing.map((item) => (
            <InterventionCardHalf
              key={item.id}
              item={item}
              onCorpus={setCorpusItem}
              onAuthorize={handleAuthorize}
              authorized={!!authorized[item.id]}
            />
          ))}
        </div>

        <SectionHeader
          label="Monitoring"
          count="1 situation"
          color={T.amber2}
          subtitle="Watchlist items where timing matters, but intervention is not yet at critical threshold."
        />
        <div style={{ marginBottom: 24 }}>
          {MONITORING.map((item) => (
            <MonitoringRow key={item.id} item={item} />
          ))}
        </div>

        <SectionHeader
          label="Stable"
          count="2 projects"
          color={T.green2}
          subtitle="Projects currently within expected parameters and advancing without policy-triggered disruption."
        />
        <div>
          {STABLE.map((item) => (
            <StableRow key={item.id} item={item} />
          ))}
        </div>
      </div>

      {corpusItem && <CorpusModal item={corpusItem} onClose={() => setCorpusItem(null)} />}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.45; transform: scale(1.06); }
        }
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes fadeScaleIn {
          from { opacity: 0; transform: scale(0.97) translateY(6px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        button {
          font-family: inherit;
        }

        @media (max-width: 1180px) {
          .axiom-hide-mobile-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default AxiomPortfolioBriefing;
