# naOku – návod, jak si upravit web

Web se upravuje přes **Pages CMS** na adrese **https://app.pagescms.org**.
Nepotřebuješ nic instalovat ani umět programovat. Funguje na počítači i v mobilu.

---

## 1. Přihlášení (Kačka)

1. Otevři **https://app.pagescms.org**.
2. Klikni na přihlášení **e‑mailem** a zadej e‑mail, na který ti přišla pozvánka.
3. Přijde ti e‑mail s odkazem/kódem – klikni na něj (nebo kód opiš). Žádné heslo není potřeba.
4. V seznamu uvidíš repozitář **NaOku** – otevři ho. Vlevo je položka **Web naOku** – to je celý obsah webu.

> Nemáš pozvánku? Napiš Tomášovi, pošle ti ji (viz část pro Tomáše dole).

---

## 2. Co kde najdeš

Po otevření **Web naOku** vidíš formulář rozdělený na části (jdou rozkliknout):

| Část | Co ovládá |
|---|---|
| **Úvod** | text pod logem, text tlačítka, velká fotka nahoře + její popisek, 8 fotek pod ní („showcase“) |
| **Sekce produktů** | Tašky, Kapuce & balaclavy, Čepice, Rukavice, Hračky…, každá má název, popis, cenové štítky a fotky |
| **O mně** | fotka, text o tobě, čtyři čísla (90+ projektů apod.) |
| **Ceník** | nadpis, poznámka, položky s cenou |
| **Jak to probíhá** | tři kroky |
| **Výzva na konci** | text nad tlačítkem a text tlačítka |
| **Patička** | texty dole, odkaz na tvůj osobní IG |
| **Odkaz na Instagram / handle** | kam vedou tlačítka a co se píše v menu |

---

## 3. Jak něco změnit

### Text nebo cenu
1. Rozklikni příslušnou část (např. **Ceník**).
2. Přepiš text / cenu přímo v políčku.
3. Nahoře klikni **Save** (Uložit). Do pár minut je to na webu.

### Přidat fotku do sekce
1. **Sekce produktů** → rozklikni sekci (např. **Čepice**) → **Fotky** → **Add** (Přidat).
2. U nové položky klikni na **Obrázek** → **Upload** a vyber fotku z mobilu/počítače.
   (Nebo vyber fotku, která už na webu je – složka `img/w`.)
3. Vyplň **Popis** (co je na fotce – krátce, 3–6 slov) a **Odkaz** – nejlíp odkaz na příspěvek na Instagramu
   (otevři příspěvek → tři tečky → *Kopírovat odkaz*). Po kliknutí na fotku na webu se pak otevře tenhle příspěvek.
4. Fotky jdou **přetáhnout** a změnit pořadí, křížkem smazat.
5. **Save**.

**Tipy k fotkám**
- Nejlíp vypadají **čtvercové** fotky (jako na IG) – mřížka je pak rovná. Fotka se nikdy neořízne ani neroztáhne, ukáže se celá v původním poměru.
- Ideální velikost cca **1000–1500 px** na šířku. Fotky přímo z foťáku (4000 px, 5 MB) web zpomalí – lepší je stáhnout si je z Instagramu nebo zmenšit.
- Do jedné sekce se hodí **4 nebo 8 fotek** (4 sloupce), u Tašek 6 (3 sloupce).

### Přidat úplně novou sekci (např. „Šály“)
1. **Sekce produktů** → dole **Add**.
2. Vyplň: **ID** (krátce, malými písmeny bez diakritiky a mezer, např. `saly`), **Název**, **Popis**,
   případně **Cenové štítky** (Produkt + Cena), a přidej **Fotky** stejně jako výše.
3. **Save**. Sekce se na webu objeví na místě, kde je v seznamu (pořadí jde přetáhnout).
   První čtyři sekce se zároveň ukazují v horním menu.

### Změnit velkou fotku nahoře nebo fotek pod ní
**Úvod** → **Velká fotka** (vyber/nahraj) + **Popis** a **Štítek na fotce**; **Výběr fotek pod úvodem** = 8 fotek, nejlíp s lidmi.

### Upravit „O mně“
**O mně** → text, fotka, čísla. Čísla (hodnota + popisek) jdou přidávat a mazat.

---

## 4. Dobré vědět

- **Save = zveřejnit.** Každé uložení se hned propíše na web (cca 1–2 minuty). Pokud něco pokazíš, klidně to přepiš zpátky a znovu ulož – nic se neztratí, všechny verze jsou uložené v historii.
- Na webu to **neuvidíš hned**: dej na webu **Obnovit** (na mobilu stáhnout stránku dolů), případně počkej minutu.
- Změny z mobilu fungují stejně jako z počítače.
- Pole **ID** u sekcí neměň u existujících sekcí (jsou na ně odkazy v menu).

---

## 5. Jednorázové nastavení (Tomáš)

1. Přihlas se na https://app.pagescms.org svým **GitHubem** a nainstaluj **Pages CMS GitHub App** na repo `tomasdvoji/NaOku`
   (při prvním otevření tě to samo vyzve; app potřebuje přístup jen k tomuto repu).
2. Otevři repo v Pages CMS → ozubené kolo **Settings** → **Collaborators** → **Invite** → Kaččin e‑mail.
3. Ona dostane pozvánku a dál už jede podle části 1.
4. Web je na Cloudflare Pages napojený na repo → každý commit z CMS = automatický deploy.

Konfigurace editoru je v souboru `.pages.yml`, obsah webu v `content/site.json`, nahrané fotky v `img/uploads/`.
