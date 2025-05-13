// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Landing from "./sites/Landing";
import Mission from "./sites/Mission";
import Beyond from "./sites/Beyond";
import Discord from "./sites/Discord";
import Profile from "./sites/Profile";
import NotFound from "./sites/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import "./App.css";

const App = () => (
  <AuthProvider>
    <BrowserRouter basename="/noctis">
      <Navbar />

      <main className="page-content">
        <Routes>
          {/* ‑‑‑ Öffentliche Seiten ‑‑‑ */}
          <Route path="/" element={<Landing />} />
          <Route path="/mission" element={<Mission />} />
          <Route path="/beyond"  element={<Beyond />} />
          <Route path="/discord" element={<Discord />} />

          {/* ‑‑‑ Geschützte Seiten ‑‑‑ */}
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>

          {/* ‑‑‑ Fallback ‑‑‑ */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  </AuthProvider>
);

export default App;
