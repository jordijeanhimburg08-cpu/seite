# BlackStar Radio 2.0

Eigenständiges responsives Webprojekt mit React 19, Vinext/Vite und Cloudflare Worker. Die bestehende Base44-Seite wird nicht verändert.

## Schnellstart

Voraussetzung: Node.js >=22.13 und npm.

```sh
npm ci
cp .env.example .env
npm run dev
```

Unter Windows PowerShell: `Copy-Item .env.example .env`. Die im Terminal angezeigte lokale URL öffnen. Ohne Zugangsdaten läuft die gesamte Oberfläche; Radio und Integrationen zeigen ehrliche Offline-/Leerzustände.

```sh
npx tsc --noEmit
node --experimental-strip-types --test tests/session.test.ts
npm run build
npm start
```

`npm start` startet den gebauten Worker lokal über Wrangler. Produktion benötigt einen Cloudflare-kompatiblen Worker-Host; es handelt sich nicht um einen rein statischen Export. Sites-Metadaten liegen in `.openai/hosting.json`. Secrets beim Host als Laufzeitvariablen setzen, niemals in den Build oder Git schreiben. Für Wrangler-Lokalbetrieb ggf. `.env` als ignorierte `.dev.vars` bereitstellen. Gehostete Variablen werden in Sites verwaltet.

## Radio

Für jeden Sender die passende `STREAM_*`-Variable auf eine öffentliche HTTPS-Audio-URL setzen. MP3/AAC direkt, kein HLS-Manifest. Der Browser muss den Codec unterstützen. Keine Zugangsdaten in Stream-URLs; die Stream-URL ist naturgemäß öffentlich sichtbar. Kein automatischer Start: Wiedergabe beginnt erst durch Klick. Senderwechsel pausiert die Wiedergabe. Play/Pause, Lautstärke und Stummschalten funktionieren auf Desktop und Mobilgeräten (iOS kann die Systemlautstärke erzwingen).

Die `NOW_PLAYING_*`-Variablen sind optionale serverseitige HTTPS-Endpunkte. Erwartetes JSON:

```json
{
  "title": "Tracktitel",
  "artist": "Interpret",
  "cover": "https://eigene-domain.de/cover.jpg",
  "dj": "DJ-Name",
  "show": "Showtitel"
}
```

Die Daten werden alle 30 Sekunden abgerufen; Titel, Cover, DJ und Show erscheinen im Player. Es gibt keine erfundenen Live-Hörerzahlen. Audio-Wellen sind eine dekorative Wiedergabeanzeige, kein gemessenes Audiospektrum. Die Titelquelle ist unabhängig von den persönlichen Spotify-Tracks.

## Inhalte bearbeiten

`content/station.json` enthält Team, Wochenprogramm und News. Montag ist `day: 0`, Sonntag `day: 6`. Zeiten sind redaktionelle Angaben in Europe/Berlin; es gibt keine automatische Stream-Umschaltung. Beispiel eines Programmeintrags (nur Schema, nicht als echte Sendung vorgefüllt):

```json
{
  "day": 0,
  "start": "20:00",
  "end": "22:00",
  "title": "Name deiner Show",
  "dj": "Name des Moderators"
}
```

Team: `{ "name":"...", "role":"...", "initials":"...", "image":"/team/eigenes-foto.jpg" }`.
News: `{ "date":"2026-09-05", "type":"EVENT", "title":"...", "text":"..." }`.
Eigene freigegebene Bilder unter `public/` ablegen. `LEGAL_URL` auf eure fertige Impressum-/Datenschutzseite setzen. Keine erfundenen Betreiberangaben.

## Spotify OAuth

1. Eine Anwendung im Spotify Developer Dashboard anlegen; Client-ID und Client-Secret in `SPOTIFY_CLIENT_ID` und `SPOTIFY_CLIENT_SECRET` setzen.
2. `APP_ORIGIN` auf die exakte HTTPS-Origin dieser Website setzen (ohne Pfad).
3. Redirect-URI exakt registrieren: `https://DEINE-DOMAIN/api/auth/spotify/callback`.
4. `SESSION_SECRET` mit einem kryptografisch zufälligen Wert (mindestens 32 Zeichen, empfohlen 32 Zufallsbytes Base64) setzen. Beispiel: `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`.
5. „Spotify verbinden“ auf der Website öffnen und im Spotify-Fenster zustimmen. Die App liest ausschließlich `user-read-recently-played` und zeigt die letzten Tracks mit Links zu Spotify an. Keine Spotify-Volltitel werden übertragen oder als Radiosignal verwendet.

Development-Mode-Konten und Freigaben im Spotify-Dashboard berücksichtigen. API-Zugriff hängt von Spotifys aktuellen App-/Kontobedingungen ab. OAuth lokal über eine HTTPS-Entwicklungsadresse verwenden, die auf den lokalen Server zeigt und exakt als Redirect registriert ist. Es werden bewusst keine unsicheren Cookies für Entwicklung aktiviert.

## Discord OAuth und Community

1. Anwendung im Discord Developer Portal anlegen.
2. `DISCORD_CLIENT_ID` und `DISCORD_CLIENT_SECRET` serverseitig setzen.
3. Redirect registrieren: `https://DEINE-DOMAIN/api/auth/discord/callback`.
4. `DISCORD_INVITE_URL` auf euren bestehenden `https://discord.gg/...`-Einladungslink setzen.
5. Optional `DISCORD_GUILD_ID` setzen und im Discord-Server das Server-Widget einschalten. Dann erscheint die reale Online-Anzahl. Es wird keine Mitgliederliste ausgegeben.

OAuth fragt nur `identify` ab und zeigt den verbundenen Anzeigenamen an. Kein Bot-Token erforderlich; kein automatischer Serverbeitritt, keine Nachrichten, kein Zugriff auf E-Mail, Guild-Liste oder Chats.

## Sitzungen und Sicherheit

Authorization-Code-Flow mit zufälligem State, zehn Minuten gültigem verschlüsseltem State-Cookie, festem serverseitigem Callback und serverseitigem Token-Austausch. Tokens werden ausschließlich serverseitig entschlüsselt; im Browser liegt nur ein AES-256-GCM-verschlüsseltes `HttpOnly; Secure; SameSite=Lax`-Cookie. Client-Secrets und Klartext-Tokens gelangen weder in React noch in Local Storage oder API-Antworten. API-Antworten sind nicht cachebar. Tokens werden bei Ablauf serverseitig erneuert; Sitzungen enden spätestens nach sieben Tagen. Provider-Fehler führen zu kontrollierten Fehlermeldungen ohne Geheimnisse.

„Konten auf diesem Gerät trennen“ löscht die Cookies per POST mit Origin-Prüfung. Das entfernt die lokale Verbindung; für vollständigen Widerruf die App zusätzlich in den verbundenen Anwendungen bei Spotify/Discord entfernen. Eine Änderung von SESSION_SECRET beendet alle lokalen Sitzungen. Diese Cookie-Architektur speichert keine Tokens in einer Datenbank; einzelne gestohlene Sitzungen lassen sich nicht zentral widerrufen. Für zentralen Widerruf bei größerem Betrieb auf serverseitige Sessions mit widerrufbarer Session-ID erweitern.

Nur Betreiber dürfen Environment-Variablen bearbeiten. Metadata-URLs werden niemals vom Browser als Fetch-Ziel angenommen. Ausgehende Provider-Aufrufe haben Timeout und folgen keinen Redirects. Es werden keine OAuth-Codes oder Provider-Antworten geloggt.

## Alle Environment-Variablen

Die vollständige kopierbare Liste steht in `.env.example`. Alle Werte sind serverseitig konfiguriert; `/api/config` gibt ausschließlich öffentliche URLs, Inhalte und Aktivierungsflags aus.

- `APP_ORIGIN`: HTTPS-Origin für OAuth.
- `SESSION_SECRET`: geheimer Schlüssel, mindestens 32 Zeichen.
- `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`: Spotify-App.
- `DISCORD_CLIENT_ID`, `DISCORD_CLIENT_SECRET`: Discord-App.
- `DISCORD_GUILD_ID`: optionaler Server für das öffentliche Widget.
- `DISCORD_INVITE_URL`: optionaler Community-Link.
- `LEGAL_URL`: Link zu euren rechtlichen Angaben.
- `STREAM_RAP_HITS`, `STREAM_FRANCE_RAP`, `STREAM_RAP_CLASSICS`, `STREAM_HIP_HOP_RU`, `STREAM_DEUTSCH_RAP`, `STREAM_OLDSCHOOL_DE`, `STREAM_FRANCE_DRILL`: direkte Audio-URLs.
- Jeweils dieselben sieben Suffixe mit `NOW_PLAYING_`: optionale Metadaten-Endpunkte.

## Herkunft und Grenzen

Original am 05.09.2026 im Browser geprüft: https://blackstarradio.base44.app/.
Übernommen: Name BLACK STAR/BlackStar Radio, sieben Sendernamen und Genre-Untertitel, Social-Links und „BY HIMBI FOR JOSHI“. Die Originalseite zeigt OFFLINE sowie „1,9K LIVE“ gleichzeitig; diese unbestätigte Hörerzahl wurde nicht übernommen. Künstlernamen im Original wurden nicht als aktuelle Titel ausgegeben. Himbi/Joshi erscheinen nur mit der originalen Zuschreibung, ohne erfundene DJ-Rollen.

Keine fremden Fotografien, Cover oder Original-Assetdateien kopiert, da Eigentum/Rechte nicht verifiziert waren. Gestaltung besteht aus eigener Typografie, geometrischen Frequenzbalken und Lucide-UI-Icons (ISC). Später per Spotify eingeblendete Cover kommen aus der autorisierten API und verlinken zum Track. Neue Texte sind redaktionelle Entwürfe. Shows/News bleiben bis zur Befüllung leer.

Echte Radio-Wiedergabe und vollständige OAuth-Verbindungen können erst mit euren Stream-URLs und App-Zugangsdaten überprüft werden. Keine Zugangsdaten sind vorgegeben oder mitgeliefert.

## Referenzen

- https://developer.spotify.com/documentation/web-api/tutorials/code-flow
- https://developer.spotify.com/documentation/web-api/tutorials/refreshing-tokens
- https://docs.discord.com/developers/topics/oauth2
