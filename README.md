# naOku — web

Jednostránkový showcase pro [@_naoku__](https://www.instagram.com/_naoku__/). Čisté HTML/CSS/JS, žádný build.

## Lokálně
```bash
python -m http.server 8765
```
a otevři http://localhost:8765/

## Fotky
Hoď nové fotky do `img/` (ideálně ≤1200px, JPG) a přidej `<a class="shot">` do sekce Galerie v `index.html`.

## Logo
Ulož logo jako `img/logo.svg` (nebo PNG a uprav `src` v `index.html`). Dokud tam není, hero ukazuje textový fallback ve Fraunces.

## Deploy (Cloudflare Pages)
Workers & Pages → Create → Pages → Connect to Git → tohle repo.
Build command: *(prázdné)*, Build output directory: `/`. Hotovo.
