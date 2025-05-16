# Noctis – Futuristic React App with Glitch Vibes 👁️‍🗨️ – Futuristic React App with Glitch Vibes 👁️‍🗨️

[![Mein Projekt‑Logo](src/assets/logo.png)](https://oliverwebdev.github.io/noctis/)


> **Noctis** ist ein dunkles, futuristisches Showcase‑Projekt, das moderne Front‑End‑Techniken, komplexe CSS‑Animationen und Mehrsprachigkeit (DE/EN) kombiniert. Ziel ist es, einen ästhetisch eindrucksvollen Einstieg für eine wachsende Community und künftige Plattform zu bieten.

---

## ✨ Haupt‑Features

| Seite       | Highlights                                                                        |
| ----------- | --------------------------------------------------------------------------------- |
| **Landing** | Web‑GL‑ähnliches Partikel‑Canvas, 3‑layer Glitch‑Titel, interaktiver Cursor       |
| **Mission** | Dynamische Partikel, Timeline‑Stage‑Cards, i18n Content                           |
| **Beyond**  | Neon‑Holo Role‑Cards, Social‑Links, adaptive Grid                                 |
| **Discord** | Live‑Channel‑Liste via Discord‑Widget API, eingebetteter Dark‑Theme Chat          |
| **Layout**  | Responsive Navbar & Footer mit kosmischen FX, Bug‑Report Modal, Language Switcher |

---

## 🛠️ Tech Stack

* **React 18** + React Router 6
* **Vite** (Lightning‑fast Dev Server & Bundle)
* **react‑i18next** für Mehrsprachigkeit
* **Lucide‑React & React‑Icons** für SVG‑Icons
* **Pure CSS / CSS Modules** mit Custom Properties, Keyframes & Masken
* **ESLint + Prettier** (Opinionated Code Style)

---

## 📂 Projektstruktur (Auszug)

```text
├─ src/
│  ├─ assets/         # Bilder, Flags, Logos
│  ├─ components/     # Navbar, Footer …
│  ├─ sites/          # Landing, Mission, Beyond, Discord, NotFound
│  ├─ locales/        # i18n JSON‑Dateien (de, en)
│  ├─ App.jsx
│  └─ main.jsx        # Vite‑Entry
└─ README.md
```

---

## 🚀 Loslegen

```bash
# 1. Repo klonen
$ git clone https://github.com/<user>/noctis.git
$ cd noctis

# 2. Dependencies
$ npm install            # oder pnpm/yarn

# 3. Entwicklungs‑Server
$ npm run dev            # http://localhost:5173/noctis

# 4. Production‑Build
$ npm run build          # /dist
$ npm run preview        # optional Preview Server
```

> **Hinweis:** Das Projekt nutzt `basename="/noctis"` im Router. Passe dies ggf. an deinen Hosting‑Pfad an.

---

## 🌐 Internationalisierung

* Strings liegen unter `src/locales/<lng>/*.json`.
* `useTranslation()` Hooks in allen Komponenten.
* Fallback = Deutsch.

Neue Sprache hinzufügen:

1. JSON‑Dateien kopieren (`de → fr`)
2. Einträge übersetzen
3. Flag‑SVG importieren & im Footer verlinken

---

## 🎨 Design‑Philosophie

* **Dark Sci‑Fi Palette** (#0b0c1a bis #38bdf8)
* **Glitch‑Effekte & Neon Glow** durch mehrschichtige Keyframes
* **3D‑Transforms** & Parallax für Tiefenwirkung
* **Progressive Enhancement:** Fallbacks ohne JS brechen Layout nicht

---

## 🧭 Roadmap

| Phase    | Ziel                                             | Status          |
| -------- | ------------------------------------------------ | --------------- |
|  **I**   | Public Landing, Mission, Discord‑Widget          | ✅ Abgeschlossen |
|  **II**  | Blog & CMS (Headless → Strapi/Contentful)        | 🔄 In Arbeit    |
|  **III** | Auth‑Gateway (Clerk o. Supabase) + User Profiles | ⏳ Geplant       |
|  **IV**  | Progressive Web App (Offline Cache + Push)       | ⏳ Geplant       |

### Nächste Aufgaben (Q2 / Q3 2025)

*

---

## 🤝 Contributing

Pull Requests sind willkommen! Bitte beachte:

1. Fork → Feature‑Branch (`feat/…`)
2. `npm run lint && npm run test`
3. Beschreibung & Screenshot anhängen

> *Style‑Guideline:* Vermeide Inline‑Styles; nutze lieber CSS‑Variablen und halte die Animations‑Dauer unter 16 ms per Frame.

---

## 📜 Lizenz

MIT© 2025 

---

## 📫 Kontakt & Links

* **Projekt‑Lead / Architect:** Oliver → [GitHub](https://github.com/Oliverwebdev)
* **Discord:** [join here](https://discord.gg/xxxxxxxx)
* **Demo:** *Folgt nach Phase II*

> *"We stare into the void – and the void glitches back."*
