// ================================
//  Discord.jsx – Community‑Seite
// ================================
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./Discord.css";

const GUILD_ID = "123456789012345678";        //  <<<  deine Server‑ID!

const Discord = () => {
  const { t } = useTranslation();
  const [channels, setChannels] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://discord.com/api/guilds/${GUILD_ID}/widget.json`)
      .then((res) => {
        if (!res.ok) throw new Error("widget-disabled");
        return res.json();
      })
      .then((data) => setChannels(data.channels ?? []))
      .catch((e) => setError(e.message));
  }, []);

  return (
    <section className="discord-wrapper">
      <h1 className="glitch-title" data-text="Discord">Discord</h1>
      <p className="tagline">{t("discord.tagline")}</p>

      <div className="discord-grid">
        {/* --- Channel‑Liste ---------------- */}
        <div className="channel-list">
          <h2>{t("discord.channels")}</h2>
          {error && (
            <p className="error">
              {error === "widget-disabled"
                ? t("discord.errorWidgetOff")
                : t("discord.errorGeneric")}
            </p>
          )}
          <ul>
            {channels.map((c) => (
              <li key={c.id}>
                <span className="hash">#</span> {c.name}
              </li>
            ))}
          </ul>
        </div>

        {/* --- Eingebetteter Chat ------------ */}
        <iframe
          title="Discord Widget"
          src={`https://discord.com/widget?id=${GUILD_ID}&theme=dark`}
          width="350"
          height="500"
          allowtransparency="true"
          frameBorder="0"
          sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
        />
      </div>
    </section>
  );
};

export default Discord;
