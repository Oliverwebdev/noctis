// ================================
//  Discord.jsx – Verbesserte Community-Seite
// ================================
import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import "./Discord.css";

const GUILD_ID = "1371669841458761738";  // Ihre Server-ID

const Discord = () => {
  const { t } = useTranslation();
  const [channels, setChannels] = useState([]);
  const [members, setMembers] = useState([]);
  const [guildInfo, setGuildInfo] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const titleRef = useRef(null);

  // Glitch-Animation für den Titel
  useEffect(() => {
    if (!titleRef.current) return;
    
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.9) {
        titleRef.current.classList.add("glitching");
        setTimeout(() => {
          if (titleRef.current) {
            titleRef.current.classList.remove("glitching");
          }
        }, 200);
      }
    }, 2000);
    
    return () => clearInterval(glitchInterval);
  }, []);

  // Abrufen der Discord-Daten
  useEffect(() => {
    setIsLoading(true);
    fetch(`https://discord.com/api/guilds/${GUILD_ID}/widget.json`)
      .then((res) => {
        if (!res.ok) throw new Error("widget-disabled");
        return res.json();
      })
      .then((data) => {
        console.log("Discord data:", data); // Debug-Ausgabe zur Überprüfung der Daten
        // Alle Kanäle anzeigen, ohne nach Position zu filtern
        setChannels(data.channels || []);
        setMembers(data.members || []);
        setGuildInfo({
          name: data.name,
          presenceCount: data.presence_count,
          instant_invite: data.instant_invite
        });
        setIsLoading(false);
      })
      .catch((e) => {
        console.error("Discord API error:", e);
        setError(e.message);
        setIsLoading(false);
      });
  }, []);

  return (
    <section className="discord-wrapper">
      <div className="stars-container">
        <div className="stars"></div>
        <div className="stars2"></div>
        <div className="stars3"></div>
      </div>
      
      <div className="discord-content">
        <h1 className="glitch-title" ref={titleRef} data-text="Discord">Discord</h1>
        <p className="tagline">{t("discord.tagline") || "Join our community"}</p>
        
        {/* Prominenter Beitrittsbutton */}
        {!isLoading && guildInfo.instant_invite && (
          <a 
            href={guildInfo.instant_invite} 
            className="hero-join-button" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <span className="button-text">Join our Discord</span>
            <span className="button-icon">→</span>
          </a>
        )}
        
        {isLoading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading Discord data...</p>
          </div>
        )}
        
        {!isLoading && (
          <div className="discord-grid">
            {/* Server Info Box */}
            <div className="server-info">
              <h2>{guildInfo.name || "Our Server"}</h2>
              <div className="server-stats">
                <div className="stat">
                  <div className="stat-value">{guildInfo.presenceCount || 0}</div>
                  <div className="stat-label">Online</div>
                </div>
                <div className="stat">
                  <div className="stat-value">{members.length}</div>
                  <div className="stat-label">Active</div>
                </div>
              </div>
              
              {guildInfo.instant_invite && (
                <a 
                  href={guildInfo.instant_invite} 
                  className="join-button" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Join Server
                </a>
              )}
            </div>
            
            {/* Channel List */}
            <div className="channel-list">
              <h2>{t("discord.channels") || "Channels"}</h2>
              {error && (
                <p className="error">
                  {error === "widget-disabled"
                    ? (t("discord.errorWidgetOff") || "Widget is disabled for this server")
                    : (t("discord.errorGeneric") || "Could not load Discord data")}
                </p>
              )}
              <ul>
                {channels.map((c) => (
                  <li key={c.id || c.name} className="channel-item">
                    <span className="hash">#</span> 
                    <span className="channel-name">{c.name}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Member List */}
            <div className="member-list">
              <h2>{t("discord.members") || "Members"}</h2>
              <ul>
                {members.map((m) => (
                  <li key={m.id} className="member-item">
                    <div className="member-avatar">
                      {m.avatar_url ? (
                        <img src={m.avatar_url} alt={m.username} />
                      ) : (
                        <div className="default-avatar">{m.username.charAt(0)}</div>
                      )}
                      <span className={`status-indicator ${m.status}`}></span>
                    </div>
                    <div className="member-info">
                      <span className="member-name">{m.username}</span>
                      {m.game && <span className="member-activity">{m.game.name}</span>}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Embedded Discord Widget */}
            <div className="discord-widget">
              <iframe
                title="Discord Widget"
                src={`https://discord.com/widget?id=${GUILD_ID}&theme=dark`}
                allowtransparency="true"
                frameBorder="0"
                sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Discord;