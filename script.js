// scroll reveal
const io = new IntersectionObserver((es) => {
  es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { rootMargin: '0px 0px -10% 0px' });
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// yarn thread: one loose strand running down the page, drawn as you scroll
const yarn = document.getElementById('yarn-path');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
let len = 0;

function layoutYarn() {
  const w = document.documentElement.clientWidth;
  const h = document.documentElement.scrollHeight;
  // ponytail: hand-tuned wave, amplitude scales with width, 6 bends down the page
  const top = document.querySelector('.hero').offsetHeight; // start below the wordmark
  const bends = 6, amp = w * 0.42, cx = w / 2, seg = (h - top) / bends;
  let d = `M ${cx + amp} ${top}`;
  for (let i = 1; i <= bends; i++) {
    const y = top + seg * i, py = y - seg / 2;
    const x = cx + (i % 2 ? -amp : amp);
    d += ` C ${cx + amp * (i % 2 ? 1 : -1)} ${py}, ${x} ${py}, ${x} ${y}`;
  }
  yarn.setAttribute('d', d);
  len = yarn.getTotalLength();
  yarn.style.strokeDasharray = len;
  drawYarn();
}

function drawYarn() {
  if (reduced) { yarn.style.strokeDashoffset = 0; return; }
  const max = document.documentElement.scrollHeight - innerHeight;
  const p = max > 0 ? Math.min(1, (scrollY + innerHeight * 0.9) / (max + innerHeight * 0.9)) : 1;
  yarn.style.strokeDashoffset = len * (1 - p);
}

addEventListener('scroll', drawYarn, { passive: true });
addEventListener('resize', layoutYarn);
addEventListener('load', layoutYarn);
layoutYarn();

document.getElementById('rok').textContent = new Date().getFullYear();
