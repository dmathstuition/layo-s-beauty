const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyGejD6fJCqYb2o904eFYyhpcxikqoefgol3d38nVySyltfoy83i8VLxv4Z8iTrEyaHng/exec';
let currentPage = 'home';

function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const t = document.getElementById('page-' + pageId);
  if (t) { t.classList.add('active'); currentPage = pageId; }
  document.querySelectorAll('.nav-link').forEach(l => {
    l.classList.remove('active');
    if (l.dataset.page === pageId) l.classList.add('active');
  });
  window.scrollTo({ top: 0, behavior: 'instant' });
  closeMenu();
  setTimeout(() => { triggerScrollAnimations(); animateCounters(); }, 100);
  history.pushState({ page: pageId }, '', pageId === 'home' ? '/' : '#' + pageId);
}

function toggleMenu() {
  const nl = document.getElementById('navLinks');
  const hb = document.getElementById('hamburger');
  const ov = document.getElementById('navOverlay');
  if (nl.classList.contains('open')) { closeMenu(); } else {
    nl.classList.add('open'); hb.classList.add('open');
    if (ov) ov.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeMenu() {
  const nl = document.getElementById('navLinks');
  const hb = document.getElementById('hamburger');
  const ov = document.getElementById('navOverlay');
  nl.classList.remove('open'); hb.classList.remove('open');
  if (ov) ov.classList.remove('active');
  document.body.style.overflow = '';
}

window.addEventListener('scroll', function() {
  const n = document.getElementById('navbar');
  n.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

function createParticles() {
  const c = document.getElementById('particles');
  if (!c) return;
  for (let i = 0; i < 35; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    const s = 2 + Math.random() * 4;
    p.style.cssText = 'left:' + (Math.random()*100) + '%;top:' + (Math.random()*100) + '%;--dur:' + (6+Math.random()*8) + 's;--delay:' + (Math.random()*8) + 's;width:' + s + 'px;height:' + s + 'px;background:' + (Math.random()>0.5?'#D4AF37':'#F06292');
    c.appendChild(p);
  }
}

function animateCounters() {
  document.querySelectorAll('.stat-num,.badge-number,.big-num').forEach(el => {
    if (el.dataset.animated) return;
    const t = el.textContent.trim(), m = t.match(/^(\d+)/);
    if (!m) return;
    const target = parseInt(m[1]), suffix = t.replace(/^\d+/,''), dur = 1500, start = performance.now();
    el.dataset.animated = 'true';
    function tick(now) {
      const p = Math.min((now-start)/dur,1), e = 1-Math.pow(1-p,3);
      el.textContent = Math.round(target*e) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
}

function addScrollAnimationClasses() {
  ['.service-card','.product-card-mini','.testimonial-card','.mv-card','.why-card','.pillar','.service-detail-card','.shop-card','.masonry-item','.step','.contact-item','.stat','.footer-col'].forEach(sel => {
    document.querySelectorAll(sel).forEach((el,i) => {
      el.classList.add('scroll-reveal');
      el.style.transitionDelay = (i*0.08)+'s';
    });
  });
  document.querySelectorAll('.intro-image-wrap,.about-img-block').forEach(el => el.classList.add('scroll-reveal-left'));
  document.querySelectorAll('.contact-form-col').forEach(el => el.classList.add('scroll-reveal-right'));
  document.querySelectorAll('.cta-content,.section-header.centered').forEach(el => el.classList.add('scroll-reveal-scale'));
}

function triggerScrollAnimations() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  document.querySelectorAll('.scroll-reveal,.scroll-reveal-left,.scroll-reveal-right,.scroll-reveal-scale').forEach(el => obs.observe(el));
}

const products = {
  'wig-1':{ name:'Luxe Lace Front Wig — Straight', category:'Wigs', price:'₦45,000', stars:'★★★★★', imgClass:'wig-img-1', desc:'Premium straight lace front wig crafted with human hair for the most natural look.', details:['100% Premium Human Hair','14"–20" lengths','Pre-plucked hairline','Jet Black / Dark Brown / Medium Brown','Includes wig cap'] },
  'wig-2':{ name:'Curly Bob Wig — Honey Blonde', category:'Wigs', price:'₦38,000', stars:'★★★★★', imgClass:'wig-img-2', desc:'Stunning honey blonde curly bob made from heat-resistant fiber.', details:['Premium Heat-Resistant Fiber','10–12 inch','Natural curl pattern','Honey Blonde with highlights','Lightweight cap'] },
  'wig-3':{ name:'Deep Wave Full Lace Wig', category:'Wigs', price:'₦52,000', stars:'★★★★☆', imgClass:'wig-img-3', desc:'360° hand-tied full lace construction for maximum versatility.', details:['100% Virgin Human Hair','360° Full Lace','16"–22" lengths','Natural Black & Dark Brown','Professional install recommended'] },
  'dress-1':{ name:'Elegant Bodycon Dress — Rose', category:'Ladies Wear', price:'₦28,000', stars:'★★★★★', imgClass:'dress-img-1', desc:'Figure-flattering bodycon in premium stretch fabric.', details:['Premium Stretch Fabric','Sizes S–XXL','Rose / Blush / Black','Knee-length','Machine washable'] },
  'dress-2':{ name:'Floral Midi Dress — Luxe Edition', category:'Ladies Wear', price:'₦22,000', stars:'★★★★★', imgClass:'dress-img-2', desc:'Wrap-style bodice with flowing skirt for a feminine silhouette.', details:['100% Soft Chiffon','Sizes XS–XXL','Pink Floral / Purple Floral','Midi length','V-neckline wrap tie'] },
  'dress-3':{ name:'Off-Shoulder Evening Gown', category:'Ladies Wear', price:'₦35,000', stars:'★★★★★', imgClass:'dress-img-3', desc:'Corseted bodice with sweeping skirt in luxurious fabric.', details:['Premium Satin/Lace','Sizes XS–2XL','Rose Pink / Crimson / Black','Floor-length with train','Built-in boning'] },
  'acc-1':{ name:'Gold Statement Earrings', category:'Accessories', price:'₦8,500', stars:'★★★★★', imgClass:'acc-img-1', desc:'Cascading gold design with crystal accents.', details:['18k Gold-Plated','Hypoallergenic posts','7cm drop','Crystal/CZ accents','Luxury gift box'] },
  'acc-2':{ name:'Pearl & Gold Necklace Set', category:'Accessories', price:'₦12,000', stars:'★★★★★', imgClass:'acc-img-2', desc:'Complete set: necklace, bracelet, and earrings.', details:['Faux Pearl & 18k Gold-Plated','16" + 2" extension','3-piece set','White / Rose / Champagne','Velvet pouch'] },
  'acc-3':{ name:'Luxury Tote Bag — Blush', category:'Accessories', price:'₦18,500', stars:'★★★★☆', imgClass:'acc-img-3', desc:'Structured tote with vegan leather and gold hardware.', details:['Premium Vegan Leather','Gold-tone Hardware','38×30×14cm','4 interior pockets','Blush / Black / Caramel'] }
};

function openProduct(id) {
  const p = products[id]; if (!p) return;
  const m = document.getElementById('modalOverlay'), inner = document.getElementById('modalInner');
  inner.innerHTML = '<div class="modal-img '+p.imgClass+'"></div><div class="modal-info"><span class="modal-cat">'+p.category+'</span><h2 class="modal-title">'+p.name+'</h2><div class="modal-stars">'+p.stars+'</div><div class="modal-price">'+p.price+'</div><p class="modal-desc">'+p.desc+'</p><ul class="modal-details">'+p.details.map(d=>'<li>✦ '+d+'</li>').join('')+'</ul><div class="modal-actions"><button class="btn btn-primary" onclick="orderProduct(\''+p.name+'\')">Order Now</button><button class="btn btn-outline" onclick="closeModal();showPage(\'contact\')">Ask a Question</button></div></div>';
  m.classList.add('active'); document.body.style.overflow = 'hidden';
}

function closeModal() { document.getElementById('modalOverlay').classList.remove('active'); document.body.style.overflow = ''; }

function orderProduct(name) {
  closeModal(); showPage('contact');
  setTimeout(() => {
    const s = document.getElementById('service'); if (s) s.value = 'Ladies Wear / Shopping';
    const m = document.getElementById('message'); if (m) m.value = "I'm interested in ordering: " + name + "\n\nPlease let me know availability and delivery options.";
  }, 600);
}

function filterProducts(cat, btn) {
  document.querySelectorAll('.shop-filters .filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('#shopGrid .shop-card').forEach(c => {
    if (cat === 'all' || c.dataset.cat === cat) { c.classList.remove('hidden'); c.style.animation = 'pageFadeIn 0.4s ease forwards'; }
    else c.classList.add('hidden');
  });
}

function filterGallery(cat, btn) {
  document.querySelectorAll('.gallery-filters .filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('#galleryGrid .masonry-item').forEach(i => {
    if (cat === 'all' || i.dataset.cat === cat) i.classList.remove('hidden');
    else i.classList.add('hidden');
  });
}

async function submitForm(e) {
  e.preventDefault();
  const btn = document.getElementById('submitBtn');
  btn.querySelector('.btn-text').classList.add('hidden');
  btn.querySelector('.btn-loader').classList.remove('hidden');
  btn.disabled = true;
  const d = { firstName:document.getElementById('firstName').value, lastName:document.getElementById('lastName').value, email:document.getElementById('email').value, phone:document.getElementById('phone').value, service:document.getElementById('service').value, message:document.getElementById('message').value, timestamp:new Date().toLocaleString(), source:"Layo's Luxe Studio Website" };
  try { await fetch(APPS_SCRIPT_URL, { method:'POST', mode:'no-cors', headers:{'Content-Type':'application/json'}, body:JSON.stringify(d) }); showFormSuccess(); }
  catch(err) { console.error(err); showFormSuccess(); }
}

function showFormSuccess() {
  document.getElementById('contactForm').classList.add('hidden');
  const s = document.getElementById('formSuccess');
  s.classList.remove('hidden');
  s.scrollIntoView({ behavior:'smooth', block:'center' });
}

document.addEventListener('keydown', e => { if (e.key==='Escape') { closeModal(); closeMenu(); } });
window.addEventListener('popstate', e => { if (e.state && e.state.page) showPage(e.state.page); });
document.addEventListener('click', e => { if (e.target.tagName==='A' && e.target.getAttribute('href')==='#') e.preventDefault(); });

document.addEventListener('DOMContentLoaded', function() {
  createParticles();
  addScrollAnimationClasses();
  setTimeout(() => { triggerScrollAnimations(); animateCounters(); }, 300);
  window.addEventListener('scroll', triggerScrollAnimations, { passive: true });
  history.replaceState({ page: 'home' }, '', '/');
});