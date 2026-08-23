# naOku – web (showcase) – design

## Cíl
Jednostránkový showcase výrobků značky naOku (háčkování na zakázku, @_naoku__).
Objednávky jdou přes IG DM – web má ukázat tvorbu a poslat lidi na Instagram.

## Stack
- Statické soubory: `index.html`, `style.css`, `script.js`, `img/`.
- Žádný framework, žádný build. Webfonty z Google Fonts.
- Hosting: Cloudflare Pages (deploy z repa, build command žádný, output `/`).

## Vizuál
- Barvy z loga: krém `#FFF6E5`, vínová `#A3264F`, doplňkově písková `#D9C3A5`, tmavá `#2B1B1F`.
- Display: Fraunces (900 italic) jako echo loga; text: Fraunces / system serif.
- Logo: `img/logo.svg` dodá Tomáš (do té doby fallback nakreslený fontem).
- Motivy: šikmá linka z loga (rotace ~-8°), "polaroid" fotky s natočením, marquee pás, scroll-reveal.

## Sekce
1. Hero – logo, claim „háčkování z přírodních materiálů“, CTA na IG.
2. Kolekce – Tašky / Kapuce & nákrčníky / Hračky & dekorace (dlaždice s fotkou).
3. Galerie – asymetrický grid z IG fotek, klik = IG post.
4. Jak to funguje – 3 kroky (napiš nápad → materiál a barva → uháčkuju a pošlu).
5. CTA + footer – „Napiš mi na Instagram“, @_naoku__, @kackastr_.

## Fotky
Staženy z IG (veřejný profil + přihlášený Chrome), uloženy v `img/`, max ~1080px, komprimované.

## Mimo rozsah
E-shop, košík, CMS, kontaktní formulář, i18n.
