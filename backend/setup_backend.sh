#!/usr/bin/env bash
# ------------------------------------------------------------
#  Noctis – Backend Bootstrap Script
#  Usage: ./setup_backend.sh
# ------------------------------------------------------------
set -euo pipefail
echo "🔧  Initialisiere Noctis‑Backend …"

# ---------- 1 | Python‑Virtual‑Env ----------
if [[ ! -d ".venv" ]]; then
  echo "📦  Erstelle virtuelle Umgebung (.venv)"
  python -m venv .venv
fi
source .venv/bin/activate

# ---------- 2 | Abhängigkeiten ----------
echo "📚  Installiere Python‑Pakete"
python -m pip install --upgrade pip
pip install -r requirements.txt        # project deps
pip install flask-migrate              # fehlt noch im requirements.txt

# ---------- 3 | .env‑Datei ----------
if [[ ! -f ".env" ]]; then
  echo "🗝  Lege .env an (Dummy‑Werte – bitte nachher anpassen!)"
  cat <<EOF > .env
# ---------- Datenbank ----------
DATABASE_URL=postgresql+psycopg2://noctis:noctis@localhost:5432/noctis
# ---------- Secrets ----------
SECRET_KEY=$(python - <<PY 'import secrets,sys;print(secrets.token_hex(32))' PY)
JWT_SECRET_KEY=$(python - <<PY 'import secrets,sys;print(secrets.token_hex(32))' PY)
# ---------- Mail ----------
MAIL_HOST=localhost
MAIL_USER=mailhog
MAIL_PASS=pass
MAIL_FROM=no-reply@noctis.local
FRONTEND_URL=http://localhost:5173
# ---------- Discord ----------
DISCORD_BOT_TOKEN=CHANGE_ME
GUILD_ID=CHANGE_ME
EOF
  echo "   👉  .env erstellt – überprüfe Mail‑ & Discord‑Werte!"
fi
# läd sofort die Variablen
export $(grep -v '^#' .env | xargs -d '\n')

# ---------- 4 | PostgreSQL‑Check ----------
echo "🐘  Prüfe PostgreSQL‑Verbindung …"
if ! command -v pg_isready &>/dev/null; then
  echo "❌  pg_isready nicht gefunden – PostgreSQL‑Client fehlt?"
  exit 1
fi
if ! pg_isready -d "$DATABASE_URL" >/dev/null 2>&1; then
  echo "❌  DB nicht erreichbar. Lege sie an: createdb noctis"
  exit 1
fi

# ---------- 5 | Migrationen ----------
export FLASK_APP=app.py
if [[ ! -d "migrations" ]]; then
  echo "🗄  Initialisiere Datenbank‑Migrationen"
  flask db init
fi
flask db migrate  -m "auto bootstrap" || true   # kein diff = kein Fehler
flask db upgrade

# ---------- 6 | Start ----------
echo "🚀  Starte Flask‑Dev‑Server auf http://127.0.0.1:5000"
flask run --port 5000
