<div align="center">

<img src="./assets/blackstar-header.svg" width="100%" alt="BLACKSTAR RADIO 2.0">

<br>

<img src="./assets/on-air.svg" width="220" alt="ON AIR">

<br><br>

<img src="./assets/equalizer.svg" width="720" alt="Animated Equalizer">

<br>

### `SEVEN STATIONS // ONE SIGNAL // ZERO FAKE DATA`

![React](https://img.shields.io/badge/React-19-000000?style=for-the-badge\&logo=react\&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-Vinext-000000?style=for-the-badge\&logo=vite)
![Cloudflare](https://img.shields.io/badge/Cloudflare-Workers-000000?style=for-the-badge\&logo=cloudflare)
![Spotify](https://img.shields.io/badge/Spotify-OAuth-000000?style=for-the-badge\&logo=spotify)
![Discord](https://img.shields.io/badge/Discord-OAuth-000000?style=for-the-badge\&logo=discord)

<br>

### ★ BY HIMBI FOR JOSHI ★

<img src="./assets/divider.svg" width="100%" alt="divider">

</div>

# ⚡ BLACKSTAR RADIO 2.0

> [!IMPORTANT]
> **Eigenständiges responsives Webprojekt mit React 19, Vinext/Vite und Cloudflare Worker.**
>
> Die bestehende Base44-Seite wird **nicht verändert**.

```text id="hcxygx"
╔══════════════════════════════════════════════╗
║             BLACKSTAR NETWORK                ║
╠══════════════════════════════════════════════╣
║  RADIO        ● ONLINE / OFFLINE REAL DATA  ║
║  SPOTIFY      ● OAUTH                       ║
║  DISCORD      ● COMMUNITY                   ║
║  WORKER       ● CLOUDFLARE                  ║
║  FAKE DATA    ● DISABLED                    ║
╚══════════════════════════════════════════════╝
```

<div align="center">

<img src="./assets/equalizer-small.svg" width="500" alt="frequency">

</div>

---

# 🚀 SCHNELLSTART

```bash id="x20p30"
npm ci
cp .env.example .env
npm run dev
```

### Voraussetzung

```text id="ajmlh4"
NODE.JS  >= 22.13
NPM      INSTALLED
SIGNAL   READY
```

### Windows PowerShell

```powershell
Copy-Item .env.example .env
```

Die im Terminal angezeigte lokale URL öffnen.

Ohne Zugangsdaten läuft die komplette Oberfläche weiter.

```text id="8s97nx"
╭───────────────────────────────────╮
│ NO STREAM?     → OFFLINE STATE    │
│ NO SPOTIFY?    → EMPTY STATE      │
│ NO DISCORD?    → EMPTY STATE      │
│ FAKE DATA?     → NEVER            │
╰───────────────────────────────────╯
```

### BUILD / TEST / START

```bash id="0psnec"
npx tsc --noEmit
node --experimental-strip-types --test tests/session.test.ts
npm run build
npm start
```

> [!NOTE]
> `npm start` startet den gebauten Worker lokal über Wrangler.

Produktion benötigt einen **Cloudflare-kompatiblen Worker-Host**.

BlackStar Radio 2.0 ist **kein statischer HTML-Export**.

```text id="tnnyfe"
.openai/hosting.json
```

enthält die Hosting-Metadaten.

### 🔐 SECRET RULE

```text id="94b4b9"
╔══════════════════════════════════╗
║  NEVER COMMIT SECRETS           ║
║  NEVER SHIP TOKENS              ║
║  NEVER EXPOSE CLIENT SECRETS    ║
╚══════════════════════════════════╝
```

<div align="center">

<img src="./assets/divider.svg" width="100%" alt="divider">

</div>

# 📻 RADIO

<div align="center">

<img src="./assets/radio-wave.svg" width="800" alt="radio wave">

### `◀◀  BLACKSTAR SIGNAL  ▶▶`

</div>

Für jeden Sender die passende `STREAM_*`-Variable auf eine öffentliche HTTPS-Audio-URL setzen.

### Unterstützt

```text id="x3hkdl"
MP3  ███████████████████  READY
AAC  ███████████████████  READY
HLS  ░░░░░░░░░░░░░░░░░░░  NOT USED
```

Keine Zugangsdaten in Stream-URLs.

> [!WARNING]
> Die Audio-Stream-URL ist technisch bedingt öffentlich sichtbar.

---

## ▶ PLAYER

```text id="4k2r1j"
╔════════════════════════════════════════╗
║              NOW PLAYING               ║
╠════════════════════════════════════════╣
║ ▶ PLAY                                 ║
║ ❚❚ PAUSE                               ║
║ 🔊 VOLUME                              ║
║ 🔇 MUTE                                ║
║ ↔ SWITCH STATION                       ║
╚════════════════════════════════════════╝
```

Es gibt **keinen Autoplay-Start**.

Wiedergabe startet erst durch Klick.

Senderwechsel pausiert die laufende Wiedergabe.

Auf iOS kann das Betriebssystem die Systemlautstärke übernehmen.

<div align="center">

<img src="./assets/equalizer.svg" width="700" alt="Animated Equalizer">

</div>

---

# 🎵 NOW PLAYING

Die `NOW_PLAYING_*`-Variablen können auf HTTPS-Metadaten-Endpunkte zeigen.

```json id="ur3r0m"
{
  "title": "Tracktitel",
  "artist": "Interpret",
  "cover": "https://eigene-domain.de/cover.jpg",
  "dj": "DJ-Name",
  "show": "Showtitel"
}
```

Abruf:

```text id="x3idcw"
00 SEC  ● FETCH
10 SEC  ─────────
20 SEC  ─────────
30 SEC  ● FETCH
60 SEC  ● FETCH
```

Aktualisierung alle **30 Sekunden**.

Angezeigt werden:

```text id="75zrp7"
TRACK   ███████████████
ARTIST  ███████████████
COVER   ███████████████
DJ      ███████████████
SHOW    ███████████████
```

> Die Audio-Wellen sind dekorativ.
>
> Sie stellen **kein gemessenes Audiospektrum** dar.

### Keine Fake-Stats

```text id="26u8j8"
FAKE LISTENERS ............ DISABLED
FAKE TRACKS ............... DISABLED
FAKE DJS .................. DISABLED
FAKE ONLINE COUNTS ........ DISABLED
```

---

# 📡 THE SEVEN SIGNALS

<div align="center">

<img src="./assets/stations.svg" width="850" alt="BlackStar Stations">

</div>

```text id="ir003w"
01  ━━━━━━━━━━━━━━━━━━━━━━━━  RAP HITS

02  ━━━━━━━━━━━━━━━━━━━━━━━━  FRANCE RAP

03  ━━━━━━━━━━━━━━━━━━━━━━━━  RAP CLASSICS

04  ━━━━━━━━━━━━━━━━━━━━━━━━  HIP HOP RU

05  ━━━━━━━━━━━━━━━━━━━━━━━━  DEUTSCH RAP

06  ━━━━━━━━━━━━━━━━━━━━━━━━  OLDSCHOOL DE

07  ━━━━━━━━━━━━━━━━━━━━━━━━  FRANCE DRILL
```

<div align="center">

### `SEVEN FREQUENCIES`

### `ONE BLACK STAR`

<img src="./assets/equalizer-small.svg" width="450" alt="frequency">

</div>

---

# 📝 CONTENT SYSTEM

Datei:

```text id="zddu93"
content/station.json
```

Darin befinden sich:

```text id="mxvl7x"
👥 TEAM
🗓 PROGRAMM
📰 NEWS
```

### DAYS

```text id="wm54au"
MONDAY      0   ███████████████
TUESDAY     1   ███████████████
WEDNESDAY   2   ███████████████
THURSDAY    3   ███████████████
FRIDAY      4   ███████████████
SATURDAY    5   ███████████████
SUNDAY      6   ███████████████
```

Zeitzone:

```text id="06ort7"
EUROPE / BERLIN
```

### SHOW

```json id="sylruf"
{
  "day": 0,
  "start": "20:00",
  "end": "22:00",
  "title": "Name deiner Show",
  "dj": "Name des Moderators"
}
```

### TEAM

```json id="k5m3vy"
{
  "name": "...",
  "role": "...",
  "initials": "...",
  "image": "/team/eigenes-foto.jpg"
}
```

### NEWS

```json id="a2gu1y"
{
  "date": "2026-09-05",
  "type": "EVENT",
  "title": "...",
  "text": "..."
}
```

Eigene Bilder:

```text id="t6e4pk"
public/
```

---

# 🟢 SPOTIFY CONNECTION

<div align="center">

<img src="./assets/spotify-flow.svg" width="750" alt="Spotify OAuth">

</div>

```text id="tk8n8f"
USER
 │
 ▼
BLACKSTAR
 │
 ├──────────────► SPOTIFY
 │
 │                │
 │                ▼
 │          AUTHORIZATION
 │                │
 ◄────────────────┘
 │
 ▼
SERVER
 │
 ▼
TOKEN EXCHANGE
 │
 ▼
ENCRYPTED SESSION
```

### VARIABLES

```env id="h1wu2a"
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
APP_ORIGIN=
SESSION_SECRET=
```

Redirect:

```text id="gag29b"
https://DEINE-DOMAIN/api/auth/spotify/callback
```

Secret erzeugen:

```bash id="0qfx9q"
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Scope:

```text id="61g9kv"
user-read-recently-played
```

### BLACKSTAR DOES NOT

```text id="oyuc3d"
[✗] STREAM SPOTIFY TRACKS
[✗] READ EMAIL
[✗] STORE TOKENS IN LOCAL STORAGE
[✗] REQUEST RANDOM SCOPES
[✗] EXPOSE CLIENT SECRET
```

---

# 🟣 DISCORD COMMUNITY

<div align="center">

<img src="./assets/discord-flow.svg" width="750" alt="Discord OAuth">

</div>

```env id="fufgnd"
DISCORD_CLIENT_ID=
DISCORD_CLIENT_SECRET=
DISCORD_GUILD_ID=
DISCORD_INVITE_URL=
```

Redirect:

```text id="eyx14x"
https://DEINE-DOMAIN/api/auth/discord/callback
```

Scope:

```text id="me6g1e"
identify
```

```text id="lsmyha"
BOT TOKEN ............... NOT REQUIRED
AUTO JOIN ............... DISABLED
MESSAGES ................ NO ACCESS
EMAIL ................... NO ACCESS
CHAT .................... NO ACCESS
GUILD LIST .............. NO ACCESS
```

Optional kann über `DISCORD_GUILD_ID` und das öffentliche Discord-Widget eine **reale Online-Anzahl** geladen werden.

---

# 🔐 SECURITY CORE

<div align="center">

<img src="./assets/security-core.svg" width="800" alt="Security Core">

</div>

```text id="swghv8"
               BROWSER
                  │
                  ▼
         ┌────────────────┐
         │ ENCRYPTED      │
         │ HTTPONLY COOKIE│
         └───────┬────────┘
                 │
                 ▼
        CLOUDFLARE WORKER
                 │
        ┌────────┴────────┐
        │                 │
        ▼                 ▼
 OAUTH VALIDATION     TOKEN REFRESH
        │                 │
        └────────┬────────┘
                 ▼
              PROVIDER
```

Security:

```text id="5f9a80"
AES-256-GCM          ████████████████
HTTPONLY             ████████████████
SECURE               ████████████████
SAMESITE=LAX         ████████████████
STATE VALIDATION     ████████████████
ORIGIN CHECK         ████████████████
NO TOKEN LOGGING     ████████████████
NO CLIENT SECRETS    ████████████████
```

State-Cookie:

```text id="m7aag8"
TTL = 10 MINUTES
```

Session:

```text id="o2a2uf"
MAX SESSION AGE = 7 DAYS
```

> [!CAUTION]
> Eine Änderung von `SESSION_SECRET` beendet alle lokalen Sitzungen.

---

# ⚙ ENVIRONMENT

```text id="7g9t04"
.env.example
```

| Variable                | Funktion                |
| ----------------------- | ----------------------- |
| `APP_ORIGIN`            | HTTPS-Origin für OAuth  |
| `SESSION_SECRET`        | Session-Verschlüsselung |
| `SPOTIFY_CLIENT_ID`     | Spotify Client-ID       |
| `SPOTIFY_CLIENT_SECRET` | Spotify Secret          |
| `DISCORD_CLIENT_ID`     | Discord Client-ID       |
| `DISCORD_CLIENT_SECRET` | Discord Secret          |
| `DISCORD_GUILD_ID`      | Discord Widget          |
| `DISCORD_INVITE_URL`    | Invite                  |
| `LEGAL_URL`             | Impressum / Datenschutz |

### STREAMS

```env id="nyn3ga"
STREAM_RAP_HITS=
STREAM_FRANCE_RAP=
STREAM_RAP_CLASSICS=
STREAM_HIP_HOP_RU=
STREAM_DEUTSCH_RAP=
STREAM_OLDSCHOOL_DE=
STREAM_FRANCE_DRILL=
```

Metadaten:

```text id="fjv655"
NOW_PLAYING_RAP_HITS
NOW_PLAYING_FRANCE_RAP
NOW_PLAYING_RAP_CLASSICS
NOW_PLAYING_HIP_HOP_RU
NOW_PLAYING_DEUTSCH_RAP
NOW_PLAYING_OLDSCHOOL_DE
NOW_PLAYING_FRANCE_DRILL
```

---

# 🧬 ORIGIN

Original geprüft:

```text id="rcdqe3"
05.09.2026
```

```text id="l5orck"
https://blackstarradio.base44.app/
```

Übernommen:

```text id="sw4smb"
✓ BLACK STAR / BlackStar Radio
✓ 7 Sendernamen
✓ Genre-Untertitel
✓ Social-Links
✓ BY HIMBI FOR JOSHI
```

Nicht übernommen:

```text id="728c2l"
✗ unbestätigte 1,9K LIVE Angabe
✗ fremde Fotografien
✗ fremde Cover
✗ Original-Assets ohne geklärte Rechte
✗ erfundene DJ-Rollen
✗ erfundene Now-Playing-Daten
```

---

# 🛰 SIGNAL STATUS

<div align="center">

<img src="./assets/signal-status.svg" width="700" alt="Signal Status">

<br>

```text id="s03rl7"
╭────────────────────────────────────────╮
│                                        │
│            ★ BLACKSTAR ★              │
│                                        │
│       BROADCAST SYSTEM 2.0             │
│                                        │
│       SIGNAL ███████████████           │
│                                        │
│       NO FAKE NUMBERS                  │
│       NO FAKE TRACKS                   │
│       NO FAKE COMMUNITY STATS          │
│                                        │
╰────────────────────────────────────────╯
```

<img src="./assets/footer-wave.svg" width="100%" alt="BlackStar Wave">

# ★ BLACKSTAR RADIO 2.0 ★

### `BUILD THE SIGNAL.`

### `OWN THE FREQUENCY.`

### `STAY BLACKSTAR.`

<br>

**BY HIMBI FOR JOSHI**

<br>

<img src="./assets/equalizer.svg" width="650" alt="Animated Equalizer">

</div>
