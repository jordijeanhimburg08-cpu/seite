# ★ BLACKSTAR RADIO 2.0

<div align="center">

```text
██████╗ ██╗      █████╗  ██████╗██╗  ██╗███████╗████████╗ █████╗ ██████╗
██╔══██╗██║     ██╔══██╗██╔════╝██║ ██╔╝██╔════╝╚══██╔══╝██╔══██╗██╔══██╗
██████╔╝██║     ███████║██║     █████╔╝ ███████╗   ██║   ███████║██████╔╝
██╔══██╗██║     ██╔══██║██║     ██╔═██╗ ╚════██║   ██║   ██╔══██║██╔══██╗
██████╔╝███████╗██║  ██║╚██████╗██║  ██╗███████║   ██║   ██║  ██║██║  ██║
╚═════╝ ╚══════╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝
```

### 📻 RADIO 2.0

**SEVEN STATIONS · ONE SIGNAL · ZERO FAKE DATA**

`React 19` · `Vinext / Vite` · `Cloudflare Workers` · `Spotify OAuth` · `Discord OAuth`

**BY HIMBI FOR JOSHI**

</div>

---

> [!IMPORTANT]
> **BlackStar Radio 2.0 ist ein eigenständiges, responsives Webprojekt.**
> Die bestehende Base44-Seite wird **nicht verändert**.

## ⚡ QUICK START

### Voraussetzungen

* **Node.js ≥ 22.13**
* **npm**

```bash
npm ci
cp .env.example .env
npm run dev
```

> **Windows PowerShell**
>
> ```powershell
> Copy-Item .env.example .env
> ```

Danach die im Terminal angezeigte lokale URL öffnen.

Ohne Zugangsdaten funktioniert die komplette Benutzeroberfläche. Radio-Streams und externe Integrationen zeigen dabei bewusst **ehrliche Offline- bzw. Leerzustände**.

### 🔧 Checks & Production Build

```bash
npx tsc --noEmit
node --experimental-strip-types --test tests/session.test.ts
npm run build
npm start
```

> [!NOTE]
> `npm start` startet den gebauten Worker lokal über **Wrangler**.

Für Produktion wird ein **Cloudflare-kompatibler Worker-Host** benötigt. BlackStar Radio 2.0 ist **kein rein statischer Export**.

Sites-Metadaten befinden sich unter:

```text
.openai/hosting.json
```

Secrets ausschließlich als **Laufzeitvariablen beim Host** konfigurieren.

```text
❌ Niemals Secrets in Git committen
❌ Niemals Secrets in den Client-Build schreiben
❌ Niemals OAuth-Tokens im Browser speichern
```

Für lokalen Wrangler-Betrieb kann `.env` gegebenenfalls als ignorierte `.dev.vars` bereitgestellt werden.

---

# 📡 RADIO ENGINE

```text
┌──────────────────────────────────────┐
│          BLACKSTAR SIGNAL            │
├──────────────────────────────────────┤
│  STREAM     → HTTPS AUDIO            │
│  METADATA   → NOW PLAYING API        │
│  PLAYER     → USER INTERACTION       │
└──────────────────────────────────────┘
```

Für jeden Sender wird die entsprechende `STREAM_*`-Variable auf eine **öffentliche HTTPS-Audio-URL** gesetzt.

Unterstützt werden direkte:

* MP3-Streams
* AAC-Streams

Nicht vorgesehen sind HLS-Manifeste.

Der jeweilige Browser muss den verwendeten Codec unterstützen.

> [!WARNING]
> Keine Zugangsdaten in Stream-URLs einbauen.
> Eine Stream-URL ist technisch bedingt öffentlich sichtbar.

### ▶ Playback

Es gibt **keinen automatischen Start**.

Die Wiedergabe beginnt ausschließlich durch eine Benutzeraktion.

```text
PLAY        → Stream startet
PAUSE       → Stream pausiert
STATION ↔   → Wiedergabe pausiert
VOLUME      → regelbar
MUTE        → unterstützt
```

Play/Pause, Lautstärke und Stummschalten funktionieren auf Desktop- und Mobilgeräten.

Auf iOS kann das Betriebssystem die Systemlautstärke erzwingen.

---

## 🎵 NOW PLAYING

Die `NOW_PLAYING_*`-Variablen können auf optionale serverseitige HTTPS-Endpunkte zeigen.

Erwartetes JSON:

```json
{
  "title": "Tracktitel",
  "artist": "Interpret",
  "cover": "https://eigene-domain.de/cover.jpg",
  "dj": "DJ-Name",
  "show": "Showtitel"
}
```

Metadaten werden alle **30 Sekunden** aktualisiert.

Im Player können dadurch angezeigt werden:

`TRACK` · `ARTIST` · `COVER` · `DJ` · `SHOW`

> [!NOTE]
> Die Audio-Wellen sind eine **dekorative Wiedergabeanzeige** und kein gemessenes Audiospektrum.

Es werden ausdrücklich **keine erfundenen Live-Hörerzahlen** erzeugt.

Die Now-Playing-Quelle des Radios ist außerdem vollständig von den persönlichen Spotify-Tracks getrennt.

---

# 📝 CONTENT SYSTEM

Die redaktionellen Inhalte befinden sich in:

```text
content/station.json
```

Dort werden verwaltet:

* 👥 Team
* 🗓️ Wochenprogramm
* 📰 News

### Wochentage

```text
0 → Montag
1 → Dienstag
2 → Mittwoch
3 → Donnerstag
4 → Freitag
5 → Samstag
6 → Sonntag
```

Alle Uhrzeiten sind redaktionelle Angaben für:

**Europe/Berlin**

Eine automatische Stream-Umschaltung anhand des Programms findet nicht statt.

### Beispiel: Show

```json
{
  "day": 0,
  "start": "20:00",
  "end": "22:00",
  "title": "Name deiner Show",
  "dj": "Name des Moderators"
}
```

Das ist ausschließlich ein **Schema-Beispiel** und keine vorgefüllte echte Sendung.

### Beispiel: Team

```json
{
  "name": "...",
  "role": "...",
  "initials": "...",
  "image": "/team/eigenes-foto.jpg"
}
```

### Beispiel: News

```json
{
  "date": "2026-09-05",
  "type": "EVENT",
  "title": "...",
  "text": "..."
}
```

Eigene freigegebene Bilder kommen nach:

```text
public/
```

`LEGAL_URL` muss auf die fertige Impressum-/Datenschutzseite zeigen.

> **Keine erfundenen Betreiberangaben.**

---

# 🟢 SPOTIFY OAUTH

```text
USER
 │
 ▼
BLACKSTAR
 │
 ├──► Spotify Authorization
 │
 ◄─── Authorization Code
 │
 ▼
SERVER
 │
 ├──► Token Exchange
 │
 ▼
ENCRYPTED SESSION
```

### Setup

1. Anwendung im **Spotify Developer Dashboard** erstellen.
2. Client-ID als `SPOTIFY_CLIENT_ID` setzen.
3. Client-Secret als `SPOTIFY_CLIENT_SECRET` setzen.
4. `APP_ORIGIN` auf die exakte HTTPS-Origin der Website setzen.
5. Redirect-URI registrieren:

```text
https://DEINE-DOMAIN/api/auth/spotify/callback
```

Danach `SESSION_SECRET` mit einem kryptografisch zufälligen Wert konfigurieren.

Mindestens **32 Zeichen**, empfohlen sind **32 zufällige Bytes als Base64**:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Anschließend auf der Website:

```text
Spotify verbinden → Spotify → Zustimmung → BlackStar
```

Die Anwendung fordert ausschließlich:

```text
user-read-recently-played
```

an.

Damit werden die zuletzt gehörten Tracks mit Links zu Spotify angezeigt.

### Was Spotify NICHT macht

```text
✗ keine Spotify-Volltitel als Radiosignal
✗ kein Zugriff auf E-Mails
✗ keine unnötigen OAuth-Scopes
✗ keine Tokens im Local Storage
```

Development-Mode-Konten und Freigaben im Spotify-Dashboard müssen berücksichtigt werden.

Der tatsächliche API-Zugriff hängt von Spotifys jeweils aktuellen App- und Kontobedingungen ab.

Lokales OAuth sollte über eine **HTTPS-Entwicklungsadresse** erfolgen, die auf den lokalen Server zeigt und exakt als Redirect registriert wurde.

Unsichere Cookies werden für Entwicklung bewusst **nicht aktiviert**.

---

# 🟣 DISCORD OAUTH + COMMUNITY

### Setup

1. Anwendung im **Discord Developer Portal** erstellen.
2. `DISCORD_CLIENT_ID` setzen.
3. `DISCORD_CLIENT_SECRET` serverseitig setzen.
4. Redirect registrieren:

```text
https://DEINE-DOMAIN/api/auth/discord/callback
```

5. `DISCORD_INVITE_URL` auf euren vorhandenen Invite setzen:

```text
https://discord.gg/...
```

Optional:

```text
DISCORD_GUILD_ID
```

setzen und das Server-Widget im Discord-Server aktivieren.

Dann kann die **reale Online-Anzahl** angezeigt werden.

Eine Mitgliederliste wird nicht ausgegeben.

### OAuth Scope

BlackStar fragt ausschließlich:

```text
identify
```

ab.

Damit wird der verbundene Anzeigename dargestellt.

```text
✓ kein Bot-Token notwendig
✓ kein automatischer Serverbeitritt
✓ keine Nachrichten
✓ kein E-Mail-Zugriff
✓ kein Zugriff auf Guild-Listen
✓ kein Zugriff auf Chats
```

---

# 🔐 SESSION & SECURITY

```text
┌─────────────────────────────────────┐
│         SECURITY BOUNDARY           │
├─────────────────────────────────────┤
│ Browser                             │
│   │                                 │
│   └─ Encrypted HttpOnly Cookie      │
│                 │                   │
│                 ▼                   │
│ Cloudflare Worker                   │
│   │                                 │
│   ├─ OAuth State Validation         │
│   ├─ Token Exchange                 │
│   ├─ Token Refresh                  │
│   └─ Provider Requests              │
└─────────────────────────────────────┘
```

Verwendet wird ein **Authorization-Code-Flow** mit:

* zufälligem OAuth-State
* zehn Minuten gültigem verschlüsseltem State-Cookie
* festem serverseitigem Callback
* serverseitigem Token-Austausch
* AES-256-GCM
* `HttpOnly`
* `Secure`
* `SameSite=Lax`

Tokens werden ausschließlich **serverseitig entschlüsselt**.

Client-Secrets und Klartext-Tokens gelangen weder in React noch in Local Storage oder API-Antworten.

API-Antworten sind nicht cachebar.

Abgelaufene Tokens werden serverseitig erneuert.

Eine Sitzung endet spätestens nach:

```text
7 DAYS
```

Provider-Fehler werden kontrolliert dargestellt, ohne Geheimnisse offenzulegen.

### 🔌 Konten trennen

**„Konten auf diesem Gerät trennen“** löscht die Cookies über einen `POST` mit Origin-Prüfung.

Das entfernt die lokale Verbindung.

Für einen vollständigen Widerruf muss die Anwendung zusätzlich bei Spotify bzw. Discord aus den verbundenen Anwendungen entfernt werden.

> [!CAUTION]
> Eine Änderung von `SESSION_SECRET` beendet sämtliche lokalen Sitzungen.

Die aktuelle Cookie-Architektur speichert keine Tokens in einer Datenbank. Einzelne gestohlene Sitzungen können deshalb nicht zentral widerrufen werden.

Für größeren Betrieb sollte auf **serverseitige Sessions mit widerrufbarer Session-ID** erweitert werden.

### Security Rules

```text
[✓] Environment-Variablen nur für Betreiber
[✓] Metadata-URLs nicht als Browser-Fetch-Ziele
[✓] Timeouts für Provider-Requests
[✓] Keine Redirect-Follows bei Provider-Aufrufen
[✓] Keine OAuth-Codes in Logs
[✓] Keine Provider-Antworten in Logs
[✓] Keine Klartext-Tokens im Browser
```

---

# ⚙️ ENVIRONMENT VARIABLES

Die vollständige kopierbare Konfiguration befindet sich in:

```text
.env.example
```

Alle Werte werden serverseitig konfiguriert.

`/api/config` gibt ausschließlich **öffentliche URLs, Inhalte und Aktivierungsflags** zurück.

| Variable                | Funktion                                             |
| ----------------------- | ---------------------------------------------------- |
| `APP_ORIGIN`            | HTTPS-Origin für OAuth                               |
| `SESSION_SECRET`        | Geheimer Sitzungsschlüssel, mindestens 32 Zeichen    |
| `SPOTIFY_CLIENT_ID`     | Spotify Client-ID                                    |
| `SPOTIFY_CLIENT_SECRET` | Spotify Client-Secret                                |
| `DISCORD_CLIENT_ID`     | Discord Client-ID                                    |
| `DISCORD_CLIENT_SECRET` | Discord Client-Secret                                |
| `DISCORD_GUILD_ID`      | Optionaler Discord-Server für das öffentliche Widget |
| `DISCORD_INVITE_URL`    | Optionaler Community-Link                            |
| `LEGAL_URL`             | Link zu rechtlichen Angaben                          |

### 📻 Stream-Variablen

```env
STREAM_RAP_HITS=
STREAM_FRANCE_RAP=
STREAM_RAP_CLASSICS=
STREAM_HIP_HOP_RU=
STREAM_DEUTSCH_RAP=
STREAM_OLDSCHOOL_DE=
STREAM_FRANCE_DRILL=
```

Für dieselben sieben Suffixe existieren optional:

```text
NOW_PLAYING_*
```

als Metadaten-Endpunkte.

---

# 📻 THE SEVEN SIGNALS

```text
01 ━━━━━━━━━━━━━ RAP HITS
02 ━━━━━━━━━━━━━ FRANCE RAP
03 ━━━━━━━━━━━━━ RAP CLASSICS
04 ━━━━━━━━━━━━━ HIP HOP RU
05 ━━━━━━━━━━━━━ DEUTSCH RAP
06 ━━━━━━━━━━━━━ OLDSCHOOL DE
07 ━━━━━━━━━━━━━ FRANCE DRILL
```

> **SEVEN FREQUENCIES. ONE BLACK STAR.**

---

# 🧬 HERKUNFT & GRENZEN

Das Original wurde am **05.09.2026** im Browser geprüft.

Übernommen wurden:

* Name **BLACK STAR / BlackStar Radio**
* sieben Sendernamen und Genre-Untertitel
* Social-Links
* **„BY HIMBI FOR JOSHI“**

Die Originalseite zeigt gleichzeitig `OFFLINE` und `1,9K LIVE`.

Diese unbestätigte Hörerzahl wurde **bewusst nicht übernommen**.

Künstlernamen der Originalseite werden ebenfalls nicht als vermeintlich aktuelle Titel ausgegeben.

Himbi und Joshi erscheinen ausschließlich mit der ursprünglichen Zuschreibung und **ohne erfundene DJ-Rollen**.

### Assets

Es wurden keine fremden:

```text
✗ Fotografien
✗ Cover
✗ Original-Assetdateien
```

kopiert, da Eigentum und Nutzungsrechte nicht verifiziert waren.

Die Gestaltung basiert stattdessen auf eigener Typografie, geometrischen Frequenzbalken und Lucide-UI-Icons.

Später über Spotify eingeblendete Cover stammen aus der autorisierten API und verlinken auf den jeweiligen Track.

Neue Texte sind redaktionelle Entwürfe.

Shows und News bleiben bis zur tatsächlichen Befüllung leer.

> [!NOTE]
> Echte Radio-Wiedergabe und vollständige OAuth-Verbindungen können erst mit realen Stream-URLs und App-Zugangsdaten vollständig geprüft werden.

**Keine Zugangsdaten sind vorgegeben oder im Repository enthalten.**

---

# 🔗 REFERENCES

### Spotify

* Spotify Web API — Authorization Code Flow
* Spotify Web API — Refreshing Tokens

### Discord

* Discord Developer Documentation — OAuth2

---

<div align="center">

```text
        ✦
       ╱│╲
      ╱ │ ╲
 ──── BLACK ────
      STAR
   RADIO 2.0

   SIGNAL ONLINE.
```

### BLACKSTAR RADIO 2.0

**MUSIC · COMMUNITY · NO FAKE SIGNALS**

`BUILD THE SIGNAL.`
`OWN THE FREQUENCY.`
`STAY BLACKSTAR.`

**BY HIMBI FOR JOSHI**

★

</div>
