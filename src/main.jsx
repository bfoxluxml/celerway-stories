import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import MedicalStory from "./pages/MedicalStory";
import PrinterStory from "./pages/PrinterStory";
import PlatformStory from "./pages/PlatformStory";
import AxiomInteractiveProductTour from "./pages/AxiomInteractiveProductTour";
import AxiomNarrativeMicrosite from "./pages/AxiomNarrativeMicrosite";
import AxiomPolicies from "./pages/AxiomPolicies";
import AxiomPortfolio from "./pages/AxiomPortfolio";
import AxiomPortfolioBriefing from "./pages/AxiomPortfolioBriefing";
import AxiomIntelligenceVisionForCEO from "./pages/AxiomOwnerRepStoryForCEO";
import AxiomOwnerRepStoryForCEO_V2 from "./pages/AxiomOwnerRepStoryForCEO_detail";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/medical" replace />} />
        <Route path="/medical" element={<MedicalStory />} />
        <Route path="/print" element={<PrinterStory />} />
        <Route path="/platform" element={<PlatformStory />} />
        <Route path="/axiom-tour" element={<AxiomInteractiveProductTour />} />
        <Route path="/axiom-microsite" element={<AxiomNarrativeMicrosite />} />
        <Route path="/axiom-policies" element={<AxiomPolicies />} />
        <Route path="/axiom-portfolio" element={<AxiomPortfolio />} />
        <Route path="/axiom-briefing" element={<AxiomPortfolioBriefing />} />
        <Route path="/axiom-owner-rep" element={<AxiomIntelligenceVisionForCEO />} />
        <Route path="/axiom-owner-rep-detail" element={<AxiomOwnerRepStoryForCEO_V2 />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
