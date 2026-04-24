/* ══════════════════════════════════════════════════════════
   LAYO'S LUXE STUDIO — Main JavaScript
   ══════════════════════════════════════════════════════════ */

// ─── CONFIGURATION ────────────────────────────────────────
// IMPORTANT: Replace this URL with your Google Apps Script Web App URL
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyGejD6fJCqYb2o904eFYyhpcxikqoefgol3d38nVySyltfoy83i8VLxv4Z8iTrEyaHng/exec';

// ─── PAGE NAVIGATION ──────────────────────────────────────
let currentPage = 'home';

function showPage(pageId) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => {
    p.classList.remove('active');
  });

  // Show target page
  const targetPage = document.getElementById('page-' + pageId);
  if (targetPage) {
    targetPage.classList.add('active');
    currentPage = pageId;
  }

  // Update nav links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.dataset.page === pageId) {
      link.classList.add('active');
    }
  });

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'instant' });

  // Close mobile menu
  closeMenu();

  // Trigger scroll animations for new page
  setTimeout(() => {
    triggerScrollAnimations();
  }, 100);

  // Update browser URL (optional, for UX)
  history.pushState({ page: pageId }, '', pageId === 'home' ? '/' : '#' + pageId);
}

// ─── MOBILE MENU ──────────────────────────────────────────
function toggleMenu() {
  const navLinks = document.getElementById('navLinks');
  const hamburger = document.getElementById('hamburger');
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('open');
}

function closeMenu() {
  const navLinks = document.getElementById('navLinks');
  const hamburger = document.getElementById('hamburger');
  navLinks.classList.remove('open');
  hamburger.classList.remove('open');
}

// Close menu on outside click
document.addEventListener('click', function(e) {
  const navLinks = document.getElementById('navLinks');
  const hamburger = document.getElementById('hamburger');
  if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
    closeMenu();
  }
});

// ─── NAVBAR SCROLL EFFECT ─────────────────────────────────
window.addEventListener('scroll', function() {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ─── HERO PARTICLES ───────────────────────────────────────
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const count = 35;
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const dur = 6 + Math.random() * 8;
    const delay = Math.random() * 8;
    const size = 2 + Math.random() * 4;

    particle.style.cssText = `
      left: ${x}%;
      top: ${y}%;
      --dur: ${dur}s;
      --delay: ${delay}s;
      width: ${size}px;
      height: ${size}px;
      background: ${Math.random() > 0.5 ? '#D4AF37' : '#F06292'};
    `;

    container.appendChild(particle);
  }
}

// ─── SCROLL ANIMATIONS ────────────────────────────────────
function addScrollAnimationClasses() {
  // Add animation classes to elements
  const selectors = [
    '.service-card',
    '.product-card-mini',
    '.testimonial-card',
    '.mv-card',
    '.why-card',
    '.pillar',
    '.service-detail-card',
    '.shop-card',
    '.masonry-item',
    '.step',
    '.contact-item',
    '.stat',
    '.footer-col',
  ];

  selectors.forEach(selector => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.classList.add('scroll-reveal');
      el.style.transitionDelay = (i * 0.08) + 's';
    });
  });

  // Special directional reveals
  document.querySelectorAll('.intro-image-wrap, .about-img-block').forEach(el => {
    el.classList.add('scroll-reveal-left');
  });

  document.querySelectorAll('.contact-form-col').forEach(el => {
    el.classList.add('scroll-reveal-right');
  });
}

function triggerScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right').forEach(el => {
    observer.observe(el);
  });
}

// ─── PRODUCT CATALOG ──────────────────────────────────────
const products = {
  'wig-1': {
    name: 'Luxe Lace Front Wig — Straight',
    category: 'Wigs',
    price: '₦45,000',
    stars: '★★★★★',
    imgClass: 'wig-img-1',
    desc: 'Our signature straight lace front wig is crafted with premium human hair for the most natural look and feel. Expertly constructed for durability and comfort, this wig lies flat against the hairline for a completely undetectable finish.',
    details: [
      '✦ 100% Premium Human Hair',
      '✦ Available in 14", 16", 18", 20" lengths',
      '✦ Pre-plucked natural hairline',
      '✦ Available in Jet Black, Dark Brown, Medium Brown',
      '✦ Includes wig cap and care instructions'
    ]
  },
  'wig-2': {
    name: 'Curly Bob Wig — Honey Blonde',
    category: 'Wigs',
    price: '₦38,000',
    stars: '★★★★★',
    imgClass: 'wig-img-2',
    desc: 'Turn heads with this stunning honey blonde curly bob. Made from high-grade synthetic fiber that mimics the look and bounce of real curls. Perfect for everyday wear or special occasions.',
    details: [
      '✦ Premium Heat-Resistant Fiber',
      '✦ 10–12 inch length',
      '✦ Natural curl pattern',
      '✦ Honey Blonde with highlights',
      '✦ Lightweight, breathable cap'
    ]
  },
  'wig-3': {
    name: 'Deep Wave Full Lace Wig',
    category: 'Wigs',
    price: '₦52,000',
    stars: '★★★★☆',
    imgClass: 'wig-img-3',
    desc: 'Experience the ultimate in luxury with our deep wave full lace wig. Featuring 360° hand-tied lace construction, this wig allows you to style your hair in any direction for maximum versatility.',
    details: [
      '✦ 100% Virgin Human Hair',
      '✦ 360° Full Lace Construction',
      '✦ Available in 16", 18", 20", 22" lengths',
      '✦ Natural Black & Dark Brown',
      '✦ Professional installation recommended'
    ]
  },
  'dress-1': {
    name: 'Elegant Bodycon Dress — Rose',
    category: 'Ladies Wear',
    price: '₦28,000',
    stars: '★★★★★',
    imgClass: 'dress-img-1',
    desc: 'This figure-flattering bodycon dress is crafted from premium stretch fabric that hugs your curves in all the right places. The deep rose color adds a bold, feminine edge that commands attention.',
    details: [
      '✦ Premium Stretch Fabric Blend',
      '✦ Available in sizes S, M, L, XL, XXL',
      '✦ Deep Rose / Blush / Black colorways',
      '✦ Knee-length cut',
      '✦ Machine washable'
    ]
  },
  'dress-2': {
    name: 'Floral Midi Dress — Luxe Edition',
    category: 'Ladies Wear',
    price: '₦22,000',
    stars: '★★★★★',
    imgClass: 'dress-img-2',
    desc: 'Effortlessly elegant, this floral midi dress features a wrap-style bodice and flowing skirt that creates a beautifully feminine silhouette. Perfect for brunches, events, and garden parties.',
    details: [
      '✦ 100% Soft Chiffon',
      '✦ Sizes XS – XXL',
      '✦ Pink Floral on White / Purple Floral on Black',
      '✦ Midi length (below knee)',
      '✦ V-neckline, adjustable wrap tie'
    ]
  },
  'dress-3': {
    name: 'Off-Shoulder Evening Gown',
    category: 'Ladies Wear',
    price: '₦35,000',
    stars: '★★★★★',
    imgClass: 'dress-img-3',
    desc: 'Make an unforgettable entrance in our off-shoulder evening gown. With its corseted bodice, sweeping skirt, and luxurious fabric, this dress is designed for women who demand nothing but the best.',
    details: [
      '✦ Premium Satin/Lace Mix',
      '✦ Sizes XS – 2XL',
      '✦ Rose Pink / Deep Crimson / Midnight Black',
      '✦ Floor-length with slight train',
      '✦ Built-in boning & bra cups'
    ]
  },
  'acc-1': {
    name: 'Gold Statement Earrings',
    category: 'Accessories',
    price: '₦8,500',
    stars: '★★★★★',
    imgClass: 'acc-img-1',
    desc: 'These stunning statement earrings feature a cascading gold design with delicate crystal accents. The perfect finishing touch for any look, from casual chic to full evening glamour.',
    details: [
      '✦ 18k Gold-Plated Base Metal',
      '✦ Hypoallergenic posts',
      '✦ 7cm drop length',
      '✦ Crystal/CZ accents',
      '✦ Presented in a luxury gift box'
    ]
  },
  'acc-2': {
    name: 'Pearl & Gold Necklace Set',
    category: 'Accessories',
    price: '₦12,000',
    stars: '★★★★★',
    imgClass: 'acc-img-2',
    desc: 'Timeless elegance in a set. This pearl and gold necklace set includes a 16" strand, matching bracelet, and stud earrings — all presented in a luxury velvet pouch. A complete gift of sophistication.',
    details: [
      '✦ Faux Pearl & 18k Gold-Plated',
      '✦ Necklace: 16" + 2" extension',
      '✦ Set includes necklace, bracelet, earrings',
      '✦ White Pearl / Rose Pearl / Champagne Pearl',
      '✦ Luxury velvet gift pouch included'
    ]
  },
  'acc-3': {
    name: 'Luxury Tote Bag — Blush',
    category: 'Accessories',
    price: '₦18,500',
    stars: '★★★★☆',
    imgClass: 'acc-img-3',
    desc: 'Designed for the woman who carries her world in style. This structured tote features a premium vegan leather exterior, gold hardware, and a spacious interior with multiple organizational pockets.',
    details: [
      '✦ Premium Vegan Leather',
      '✦ Gold-tone Hardware',
      '✦ 38cm × 30cm × 14cm',
      '✦ Interior: 3 pockets, 1 zip pocket',
      '✦ Blush / Black / Caramel'
    ]
  }
};

function openProduct(productId) {
  const product = products[productId];
  if (!product) return;

  const modal = document.getElementById('modalOverlay');
  const inner = document.getElementById('modalInner');

  inner.innerHTML = `
    <div class="modal-img ${product.imgClass}"></div>
    <div class="modal-info">
      <span class="modal-cat">${product.category}</span>
      <h2 class="modal-title">${product.name}</h2>
      <div class="modal-stars">${product.stars}</div>
      <div class="modal-price">${product.price}</div>
      <p class="modal-desc">${product.desc}</p>
      <ul class="modal-details">
        ${product.details.map(d => `<li>${d}</li>`).join('')}
      </ul>
      <div class="modal-actions">
        <button class="btn btn-primary" onclick="orderProduct('${product.name}')">Order Now</button>
        <button class="btn btn-outline" onclick="showPage('contact')">Ask a Question</button>
      </div>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('modalOverlay');
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

function orderProduct(productName) {
  closeModal();
  showPage('contact');
  // Pre-fill service dropdown if it matches
  setTimeout(() => {
    const serviceSelect = document.getElementById('service');
    if (serviceSelect) {
      serviceSelect.value = 'Ladies Wear / Shopping';
    }
    const messageField = document.getElementById('message');
    if (messageField) {
      messageField.value = `I'm interested in ordering: ${productName}\n\nPlease let me know availability and delivery options.`;
    }
  }, 600);
}

// ─── PRODUCT FILTERING (SHOP) ─────────────────────────────
function filterProducts(category, btn) {
  // Update active button
  document.querySelectorAll('.shop-filters .filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  // Filter cards
  document.querySelectorAll('#shopGrid .shop-card').forEach(card => {
    if (category === 'all' || card.dataset.cat === category) {
      card.classList.remove('hidden');
      card.style.animation = 'pageFadeIn 0.4s ease forwards';
    } else {
      card.classList.add('hidden');
    }
  });
}

// ─── GALLERY FILTERING ────────────────────────────────────
function filterGallery(category, btn) {
  document.querySelectorAll('.gallery-filters .filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  document.querySelectorAll('#galleryGrid .masonry-item').forEach(item => {
    if (category === 'all' || item.dataset.cat === category) {
      item.classList.remove('hidden');
    } else {
      item.classList.add('hidden');
    }
  });
}

// ─── CONTACT FORM ─────────────────────────────────────────
async function submitForm(e) {
  e.preventDefault();

  const submitBtn = document.getElementById('submitBtn');
  const btnText = submitBtn.querySelector('.btn-text');
  const btnLoader = submitBtn.querySelector('.btn-loader');

  // Show loading state
  btnText.classList.add('hidden');
  btnLoader.classList.remove('hidden');
  submitBtn.disabled = true;

  // Gather form data
  const formData = {
    firstName: document.getElementById('firstName').value,
    lastName: document.getElementById('lastName').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    service: document.getElementById('service').value,
    message: document.getElementById('message').value,
    timestamp: new Date().toLocaleString(),
    source: 'Layo\'s Luxe Studio Website'
  };

  try {
    // Submit to Google Apps Script
    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors', // Required for Google Apps Script
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    // Show success (no-cors means we can't read the response, but if no error was thrown, it likely succeeded)
    showFormSuccess();

  } catch (error) {
    // For demo purposes, show success anyway
    // In production, handle error states properly
    console.error('Form submission error:', error);
    showFormSuccess(); // Remove this line in production and show error instead
  }
}

function showFormSuccess() {
  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');

  form.classList.add('hidden');
  success.classList.remove('hidden');

  // Scroll to success message
  success.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// ─── KEYBOARD NAVIGATION ──────────────────────────────────
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeModal();
    closeMenu();
  }
});

// ─── BACK/FORWARD NAVIGATION ──────────────────────────────
window.addEventListener('popstate', function(e) {
  if (e.state && e.state.page) {
    showPage(e.state.page);
  }
});

// ─── SMOOTH LINK INTERCEPTION ─────────────────────────────
document.addEventListener('click', function(e) {
  // Prevent default on anchor tags that navigate pages
  if (e.target.tagName === 'A' && e.target.href === '#') {
    e.preventDefault();
  }
});

// ─── INITIALIZE ───────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function() {
  // Create hero particles
  createParticles();

  // Add scroll animation classes
  addScrollAnimationClasses();

  // Trigger initial animations
  setTimeout(() => {
    triggerScrollAnimations();
  }, 300);

  // Trigger scroll on scroll event
  window.addEventListener('scroll', triggerScrollAnimations, { passive: true });

  // Initialize page state
  history.replaceState({ page: 'home' }, '', '/');

  console.log('%c♛ Layo\'s Luxe Studio', 'color: #C2185B; font-size: 20px; font-weight: bold; font-family: Georgia, serif;');
  console.log('%cBeauty. Style. Confidence.', 'color: #D4AF37; font-size: 14px; font-style: italic;');
});

// ─── GOOGLE APPS SCRIPT (Backend Code) ────────────────────
/*
  ════════════════════════════════════════════════════════════
  GOOGLE APPS SCRIPT CODE
  Copy this into your Google Apps Script editor at:
  https://script.google.com
  
  Then deploy as a Web App and paste the URL into
  APPS_SCRIPT_URL at the top of this file.
  ════════════════════════════════════════════════════════════

  function doPost(e) {
    try {
      var data = JSON.parse(e.postData.contents);
      
      var ss = SpreadsheetApp.openById('YOUR_SPREADSHEET_ID');
      var sheet = ss.getSheetByName('Enquiries') || ss.insertSheet('Enquiries');
      
      // Add headers if first time
      if (sheet.getLastRow() === 0) {
        sheet.appendRow([
          'Timestamp', 'First Name', 'Last Name', 'Email',
          'Phone', 'Service', 'Message', 'Source'
        ]);
        sheet.getRange(1, 1, 1, 8).setFontWeight('bold');
      }
      
      // Add the new entry
      sheet.appendRow([
        data.timestamp,
        data.firstName,
        data.lastName,
        data.email,
        data.phone,
        data.service,
        data.message,
        data.source
      ]);
      
      // Optional: Send notification email
      MailApp.sendEmail({
        to: 'your@email.com',
        subject: 'New Enquiry - Layo\'s Luxe Studio',
        body: 'New enquiry received:\n\n' +
              'Name: ' + data.firstName + ' ' + data.lastName + '\n' +
              'Email: ' + data.email + '\n' +
              'Phone: ' + data.phone + '\n' +
              'Service: ' + data.service + '\n' +
              'Message: ' + data.message + '\n' +
              'Time: ' + data.timestamp
      });
      
      return ContentService
        .createTextOutput(JSON.stringify({ status: 'success' }))
        .setMimeType(ContentService.MimeType.JSON);
        
    } catch(err) {
      return ContentService
        .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
        .setMimeType(ContentService.MimeType.JSON);
    }
  }

  function doGet(e) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'active', message: 'Layo\'s Luxe Studio API is live' }))
      .setMimeType(ContentService.MimeType.JSON);
  }
*/
