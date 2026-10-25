// EDIT THESE: WhatsApp number in international format, digits only (no +)
const CFG = { whatsapp: '234XXXXXXXXXX', phone: '+234XXXXXXXXXX' };

document.querySelectorAll('[data-wa]').forEach(a => {
  a.href = 'https://wa.me/' + CFG.whatsapp + '?text=' + encodeURIComponent(a.dataset.wa);
  a.target = '_blank'; a.rel = 'noopener';
});
document.querySelectorAll('[data-tel]').forEach(a => { a.href = 'tel:' + CFG.phone; });
document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });

const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('solid', scrollY > 40);
onScroll(); addEventListener('scroll', onScroll, { passive: true });

const menu = document.getElementById('menu');
document.getElementById('burger').addEventListener('click', () => menu.classList.toggle('open'));
menu.addEventListener('click', e => { if (e.target.tagName === 'A') menu.classList.remove('open'); });

const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('show'); io.unobserve(e.target); }
}), { threshold: .15 });
document.querySelectorAll('.rv').forEach(el => io.observe(el));

// Booking form: sends the details to WhatsApp
const form = document.getElementById('book');
if (form) form.addEventListener('submit', e => {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(form));
  const msg = 'Hello QL, I would like to book.\n' +
    Object.entries(d).filter(([, v]) => v).map(([k, v]) => k + ': ' + v).join('\n');
  window.open('https://wa.me/' + CFG.whatsapp + '?text=' + encodeURIComponent(msg), '_blank');
});
