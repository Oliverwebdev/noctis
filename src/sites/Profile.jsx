/* ------------------------------------------
   Profil‑Seite – zeigt User‑Infos + Konto‑Kill
------------------------------------------ */
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./Profile.css";

const Profile = () => {
  const { user, logout } = useAuth();
  const [busy, setBusy] = useState(false);

  const deleteAccount = async () => {
    if (!window.confirm("Willst du dein Konto WIRKLICH löschen?")) return;
    setBusy(true);
    try {
      await fetch("/api/users/me", {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      logout();                      // Nutzer rauswerfen → Landing‑Page
    } catch (e) {
      alert("Fehler beim Löschen – versuch es später erneut.");
      setBusy(false);
    }
  };

  return (
    <section className="profile-wrapper">
      <h1 className="profile-glitch" data-text={user.name}>
        {user.name}
      </h1>

      <div className="profile-card">
        <p><strong>E‑Mail:</strong> {user.email}</p>
        <p>
          <strong>Seit:</strong>{" "}
          {new Date(user.createdAt).toLocaleDateString("de-DE")}
        </p>

        <button
          className="danger-btn"
          onClick={deleteAccount}
          disabled={busy}
        >
          {busy ? "Lösche …" : "Konto löschen"}
          <span className="btn-glow" />
        </button>
      </div>
    </section>
  );
};

export default Profile;
