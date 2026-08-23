// naOku — render from content/site.json (editable in Pages CMS) + animations
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const nl2br = (s) => esc(s).replace(/\n/g, '<br>');

const tile = (it, i) => `<a class="tile reveal" style="--i:${i}" href="${esc(it.link || '#')}" ${it.link ? 'target="_blank" rel="noopener"' : ''}>
  <img src="${esc(it.image)}" alt="${esc(it.alt)}" loading="lazy" decoding="async"></a>`;
const grid = (items, cols) => items?.length ? `<div class="grid cols-${cols}">${items.map(tile).join('')}</div>` : '';

function render(d) {
  const ig = d.instagram;
  document.getElementById('nav-ig').href = ig;
  document.getElementById('nav-ig').innerHTML = `${esc(d.handle)} <span aria-hidden="true">↗</span>`;
  document.getElementById('nav-links').innerHTML =
    d.sections.slice(0, 4).map((s) => `<a href="#${esc(s.id)}">${esc(s.title.split(/[,&]/)[0].trim())}</a>`).join('') + `<a href="#cenik">${esc(d.cenik.title)}</a>`;

  // hero
  document.getElementById('hero-claim').innerHTML = d.hero.claim.split('\n').map((l) => `<span class="line"><span>${esc(l)}</span></span>`).join('');
  const cta = document.getElementById('hero-cta'); cta.href = ig; cta.firstElementChild.textContent = d.hero.cta;

  const h = d.hero;
  const showcase = `<section class="showcase">
    <a class="hero-photo reveal" href="${esc(h.photo_link)}" target="_blank" rel="noopener">
      <img src="${esc(h.photo)}" alt="${esc(h.photo_alt)}" fetchpriority="high">
      ${h.photo_caption ? `<span class="cap">${esc(h.photo_caption)}</span>` : ''}
    </a>
    ${grid(h.showcase, 4)}
  </section>`;

  const sections = d.sections.map((s) => {
    const landscape = s.id === 'tasky';
    return `<section class="kat" id="${esc(s.id)}">
      <header class="kat-head reveal">
        <h2>${esc(s.title)}</h2>
        <p>${nl2br(s.desc)}</p>
        ${s.prices?.length ? `<ul class="ceny">${s.prices.map((p) => `<li>${esc(p.name)}<b>${esc(p.price)}</b></li>`).join('')}</ul>` : '<p class="ceny-note">cena po dohodě ve zprávách</p>'}
      </header>
      ${grid(s.items, landscape ? 3 : 4)}
      ${grid(s.items2, 4)}
    </section>`;
  }).join('');

  const a = d.about;
  const about = a ? `<section class="about" id="o-mne">
    <div class="about-img reveal"><img src="${esc(a.image)}" alt="${esc(a.image_alt)}" loading="lazy"></div>
    <div class="about-text">
      <h2 class="reveal">${esc(a.title)}</h2>
      <p class="reveal">${nl2br(a.text)}</p>
      ${a.stats?.length ? `<ul class="stats reveal">${a.stats.map((s) => `<li><b>${esc(s.value)}</b><span>${esc(s.label)}</span></li>`).join('')}</ul>` : ''}
    </div>
  </section>` : '';

  const c = d.cenik;
  const cenik = `<section class="cenik" id="cenik">
    <h2 class="reveal">${esc(c.title)}</h2>
    <p class="cenik-sub reveal">${nl2br(c.note)}</p>
    <table class="reveal">${c.rows.map((r) => `<tr><td>${esc(r.name)}</td><td>${esc(r.price)}</td></tr>`).join('')}</table>
  </section>`;

  const p = d.postup;
  const postup = `<section class="postup" id="postup">
    <h2 class="reveal">${esc(p.title)}</h2>
    <ol class="kroky">${p.steps.map((s, i) => `<li class="reveal" style="--i:${i}"><span class="krok-n">${i + 1}</span><h3>${esc(s.title)}</h3><p>${nl2br(s.text)}</p></li>`).join('')}</ol>
  </section>`;

  const cta2 = `<section class="cta">
    <p class="cta-eyebrow reveal">${esc(d.cta.eyebrow)}</p>
    <a class="btn btn--big btn--magnet reveal" href="${esc(ig)}" target="_blank" rel="noopener"><span>${esc(d.cta.button)}</span></a>
  </section>`;

  document.getElementById('content').innerHTML = showcase + sections + about + cenik + postup + cta2;

  const f = d.footer;
  document.getElementById('foot').innerHTML = `<span>© ${new Date().getFullYear()} ${esc(f.left)} <a href="${esc(f.author_link)}" target="_blank" rel="noopener">${esc(f.author_handle)}</a></span><span>${esc(f.right)}</span>`;

  document.body.classList.add('ready');
  observeReveal();
  magnet();
  thread();
}

// nitka na pozadí: začíná u háčků pod logem, proplétá se ze strany na stranu dolů a dokresluje se se scrollem
function thread() {
  const path = document.getElementById('thread-path');
  if (!path) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const layout = () => {
    const w = document.documentElement.clientWidth, h = document.documentElement.scrollHeight;
    const anchor = document.getElementById('stitch-anchor')?.getBoundingClientRect();
    const sx = anchor ? anchor.x + anchor.width / 2 : w / 2, sy = anchor ? anchor.y + anchor.height / 2 + scrollY : 0;
    // nitka končí nad ceníkem (u sekce O mně), ať nejde přes ceník a postup
    const stop = document.getElementById('cenik');
    const ey = stop ? stop.offsetTop - 80 : h;
    const bends = Math.max(3, Math.round((ey - sy) / 820)), seg = (ey - sy) / bends;
    const amp = w * 0.46, cx = w / 2;
    let d = `M ${sx + 1.2} ${sy}`, px = sx; // +1.2: zakulacený konec nepřekrývá nitku ze scény (jinak tmavší tečka)
    for (let i = 1; i <= bends; i++) {
      const y = sy + seg * i, py = y - seg / 2, x = cx + (i % 2 ? 1 : -1) * amp;
      // první úsek: z háčků odejít vodorovně doprava, teprve pak klesat (ať nitka nekříží text v hero)
      d += i === 1 ? ` C ${px + amp * 0.9} ${sy}, ${x} ${py}, ${x} ${y}` : ` C ${px} ${py}, ${x} ${py}, ${x} ${y}`;
      px = x;
    }
    path.setAttribute('d', d);
    path.dataset.sy = sy; path.dataset.ey = ey;
    draw();
  };
  // konec nitky "jede" se scrollem: dotahuje se do ~3/4 obrazovky a na konci trasy se zastaví.
  // y podél nitky roste monotónně, takže délku k cílovému y najdeme půlením intervalu
  let raf = 0;
  const lengthAtY = (L, targetY) => {
    if (path.getPointAtLength(0).y >= targetY) return 0;
    if (path.getPointAtLength(L).y <= targetY) return L;
    let lo = 0, hi = L;
    for (let i = 0; i < 22; i++) { const mid = (lo + hi) / 2; (path.getPointAtLength(mid).y < targetY ? (lo = mid) : (hi = mid)); }
    return lo;
  };
  // nitka startuje u klubíčka a za cílem "dojíždí" pomalu (lerp) – při prvním scrollu se tak
  // pomaličku natáhne do základní polohy a dál plyne za scrollem
  let cur = 0, started = false, scrolled = false, running = false;
  const tick = () => {
    const L = path.getTotalLength();
    if (!L) { running = false; return; }
    const target = started ? lengthAtY(L, scrollY + innerHeight * 0.75) : 0;
    // před prvním scrollem jen pomaličku leze (konstantní tempo), pak normální dojíždění
    if (scrolled) cur += (target - cur) * 0.04;
    else cur = Math.min(target, cur + 0.9);
    if (Math.abs(target - cur) < 0.5) cur = target;
    path.style.strokeDashoffset = 1 - cur / L;
    if (cur !== target) requestAnimationFrame(tick); else running = false;
  };
  const draw = () => {
    if (reduced) { path.style.strokeDashoffset = 0; return; }
    if (!running) { running = true; requestAnimationFrame(tick); }
  };
  addEventListener('scroll', () => { started = true; scrolled = true; draw(); }, { passive: true, once: true });
  setTimeout(() => { started = true; draw(); }, 2200); // rozjet hned po načtení (navazuje na scénku u klubíčka)
  addEventListener('scroll', draw, { passive: true });
  addEventListener('resize', layout);
  addEventListener('load', layout);
  document.fonts?.ready.then(layout);
  layout();
  // obrázky mění výšku stránky, jak se načítají
  document.querySelectorAll('#content img').forEach((img) => img.addEventListener('load', layout, { once: true }));
}

// scroll reveal (staggered via --i)
function observeReveal() {
  const io = new IntersectionObserver((es) => {
    es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px 100% 0px' }); // odhalit už obrazovku dopředu, ať při rychlém scrollu fotky nepřijdou až po nitce
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
}

// magnetic buttons — the label follows the cursor a little
function magnet() {
  if (matchMedia('(hover: none), (prefers-reduced-motion: reduce)').matches) return;
  document.querySelectorAll('.btn--magnet').forEach((b) => {
    b.addEventListener('mousemove', (e) => {
      const r = b.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.25, y = (e.clientY - r.top - r.height / 2) * 0.35;
      b.style.translate = `${x}px ${y}px`;
      b.firstElementChild.style.translate = `${x * 0.4}px ${y * 0.4}px`;
    });
    b.addEventListener('mouseleave', () => { b.style.translate = '0 0'; b.firstElementChild.style.translate = '0 0'; });
  });
}

fetch('content/site.json', { cache: 'no-cache' }).then((r) => r.json()).then(render)
  .catch((e) => { console.error(e); document.getElementById('content').innerHTML = '<p style="padding:2rem;text-align:center">Obsah se nepodařilo načíst.</p>'; });
