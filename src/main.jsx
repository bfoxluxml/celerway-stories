import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import MedicalStory from "./pages/MedicalStory";
import PrinterStory from "./pages/PrinterStory";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/medical" replace />} />
        <Route path="/medical" element={<MedicalStory />} />
        <Route path="/print" element={<PrinterStory />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
