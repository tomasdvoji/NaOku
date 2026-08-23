# naOku — web

Jednostránkový showcase pro [@_naoku__](https://www.instagram.com/_naoku__/). Čisté HTML/CSS/JS, žádný build.
Veškerý obsah (texty, ceny, sekce, fotky) je v **`content/site.json`** — `script.js` ho načte a vykreslí.

## Lokálně
```bash
python -m http.server 8765
```
a otevři http://localhost:8765/

## Editace obsahu bez programování (Pages CMS)
Podrobný návod pro Kačku i jednorázové nastavení: **[NAVOD-CMS.md](NAVOD-CMS.md)**.

Kačka si obsah upravuje sama přes [Pages CMS](https://app.pagescms.org) — nepotřebuje GitHub, přihlásí se vlastním e‑mailem.
Konfigurace editoru je v `.pages.yml`, upravované soubory: `content/site.json` + fotky v `img/`.

Jednorázové nastavení (Tomáš, majitel repa):
1. Přihlas se na https://app.pagescms.org svým GitHubem a nainstaluj Pages CMS GitHub App na repo `tomasdvoji/NaOku`.
2. Otevři repo v Pages CMS → **Settings → Collaborators → Invite** → zadej Kaččin e‑mail.
3. Ona dostane pozvánku, přihlásí se e‑mailem (magic link) a vidí formulář „Web naOku“: úvod, sekce produktů, o mně, ceník, postup…
   Každé uložení = commit do repa → Cloudflare Pages web do minuty přegeneruje.

Co umí: měnit texty a ceny, přidávat/odebírat/řadit fotky v sekcích (nahrání přímo z mobilu, ukládá se do `img/uploads/`),
přidat celou novou sekci produktů (název, popis, ceny, fotky), upravit ceník a „O mně“.

Tipy pro fotky: čtvercové (jako na IG) sedí do mřížky nejlíp, ideálně ~1000 px. Fotky se nikdy neořezávají ani neroztahují –
zobrazují se v původním poměru stran.

## Fotky z Instagramu
`img/ig/` (ignorováno gitem) = originály stažené z IG, `img/w/` = zmenšené verze použité na webu (čtverce 800 px, tašky 1000 px, hero 2000 px).

## Deploy

### GitHub Pages (zapnuté)
V repu je workflow `.github/workflows/pages.yml` – každý push do `main` web automaticky nasadí.
Jednorázově zapni: GitHub → repo **NaOku** → **Settings → Pages → Source: GitHub Actions**.
Web pak běží na `https://tomasdvoji.github.io/NaOku/` (funguje i v podadresáři – všechny cesty jsou relativní).

### Cloudflare Pages (alternativa)
Workers & Pages → Create → Pages → Connect to Git → tohle repo.
Build command: *(prázdné)*, Build output directory: `/`. Hotovo.
