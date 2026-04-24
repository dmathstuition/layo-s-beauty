# ♛ Layo's Luxe Studio — Website
### *Beauty. Style. Confidence.*

A premium, fully responsive multi-page website for Layo's Luxe Studio — a luxury beauty and fashion brand.

---

## 📁 Folder Structure

```
layos-luxe-studio/
│
├── index.html          ← Main website (all pages in one SPA file)
├── style.css           ← Complete stylesheet (1000+ lines)
├── script.js           ← JavaScript (navigation, forms, animations)
├── Code.gs             ← Google Apps Script backend (contact form)
└── README.md           ← This file
```

---

## 🌐 Pages Included

| Page | Description |
|------|-------------|
| **Home** | Hero, brand intro, services preview, featured products, testimonials, CTA |
| **About** | Brand story, mission/vision, why choose us, brand pillars |
| **Services** | Detailed 6-service breakdown with pricing and booking CTAs |
| **Shop** | Filterable product grid (wigs, ladies wear, accessories) with modals |
| **Gallery** | Masonry grid with category filtering (makeup, wigs, fashion, styling) |
| **Contact** | Contact form (Google Sheets backend), contact info, social links |

---

## 🚀 Deployment Guide

### Option A — GitHub Pages (Free, Recommended)

1. Create a GitHub account at [github.com](https://github.com)
2. Create a new **public** repository named `layos-luxe-studio`
3. Upload all files (`index.html`, `style.css`, `script.js`)
4. Go to **Settings → Pages**
5. Under "Source", select `main` branch → `/root`
6. Click **Save** — your site will be live at:
   `https://yourusername.github.io/layos-luxe-studio`

### Option B — Netlify (Free, Drag & Drop)

1. Go to [netlify.com](https://netlify.com) and sign up
2. On your dashboard, find the **"Sites"** section
3. Drag your entire `layos-luxe-studio` folder onto the deploy zone
4. Your site goes live instantly with a Netlify URL
5. Optionally connect a custom domain in Settings → Domain Management

### Option C — Custom Domain (Professional)

1. Purchase a domain (e.g., `layosluxestudio.com`) from Namecheap/GoDaddy
2. Deploy to Netlify or GitHub Pages (above)
3. In your domain registrar, update DNS to point to your host
4. Enable HTTPS/SSL (free via Let's Encrypt on Netlify)

### Option D — cPanel/Web Hosting

1. Log in to your hosting cPanel
2. Open **File Manager** → navigate to `public_html`
3. Upload `index.html`, `style.css`, `script.js`
4. Your site is live at your domain immediately

---

## 📬 Google Apps Script Setup (Contact Form)

Follow these steps to connect the contact form to Google Sheets:

### Step 1 — Create the Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com)
2. Create a new spreadsheet
3. Rename it: **"Layo's Luxe Studio CRM"**
4. Copy the **Spreadsheet ID** from the URL:
   - URL format: `https://docs.google.com/spreadsheets/d/`**`THIS_IS_YOUR_ID`**`/edit`

### Step 2 — Set Up Apps Script

1. Go to [script.google.com](https://script.google.com)
2. Click **"New Project"**
3. Rename it: **"Layos Luxe Studio - Contact Form"**
4. Delete the default code
5. Copy and paste the entire contents of **`Code.gs`**
6. Replace `'YOUR_GOOGLE_SHEET_ID_HERE'` with your actual Sheet ID
7. Replace `'hello@layosluxestudio.com'` with your real email address
8. Click **Save** (💾)

### Step 3 — Deploy as Web App

1. Click **"Deploy"** → **"New Deployment"**
2. Click the gear icon ⚙️ next to "Type" → Select **"Web App"**
3. Set these options:
   - **Description:** `Layo's Luxe Studio v1`
   - **Execute as:** `Me`
   - **Who has access:** `Anyone`
4. Click **"Deploy"**
5. Authorize the app when prompted (click "Allow")
6. **Copy the Web App URL** — it looks like:
   `https://script.google.com/macros/s/AKfyc.../exec`

### Step 4 — Connect to Your Website

1. Open `script.js`
2. Find line 7:
   ```javascript
   const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID_HERE/exec';
   ```
3. Replace the URL with your actual Web App URL
4. Save and re-upload `script.js` to your hosting

### Step 5 — Test It

1. Run the `testSubmission()` function in Apps Script editor
2. Check your email for the notification
3. Check the Google Sheet for the new row
4. Fill out the form on your live website to verify end-to-end

---

## 🎨 Customization Guide

### Updating Colors

All colors are defined as CSS variables in `style.css` (lines 1–30):

```css
:root {
  --crimson:  #C2185B;   /* Main brand pink */
  --gold:     #D4AF37;   /* Gold accents    */
  --black:    #111111;   /* Luxury black    */
  --cream:    #F4EAE1;   /* Background nude */
}
```

### Updating Phone Number

Search and replace `+234 800 000 0000` with your real number in `index.html`

### Updating Email

Search and replace `hello@layosluxe.com` with your real email in `index.html` and `Code.gs`

### Adding Real Product Images

In `style.css`, find the product image classes and replace the gradients with real images:

```css
/* Replace gradient with real image: */
.wig-img-1 {
  background-image: url('images/wig-lace-front.jpg');
  background-size: cover;
  background-position: center;
}
```

### Updating Product Prices

Search for `₦` in `index.html` to find all price mentions and update accordingly.

### Adding More Products

Copy a product card block in the `#page-shop` section and add a matching entry in the `products` object in `script.js`.

---

## 📱 Features Summary

| Feature | Status |
|---------|--------|
| Multi-page SPA navigation | ✅ |
| Fully mobile responsive | ✅ |
| Sticky animated navbar | ✅ |
| Mobile hamburger menu | ✅ |
| Hero with floating particles | ✅ |
| Scroll reveal animations | ✅ |
| Product quick-view modal | ✅ |
| Shop category filtering | ✅ |
| Gallery category filtering | ✅ |
| Contact form | ✅ |
| Google Sheets integration | ✅ |
| Email notifications (studio) | ✅ |
| Auto-reply emails (client) | ✅ |
| Hover & transition effects | ✅ |
| Brand strip ticker | ✅ |
| Testimonials section | ✅ |
| Footer with all links | ✅ |
| SEO meta tags | ✅ |

---

## 🔧 Suggested Improvements

### Phase 2 — Content
- [ ] Add real product photography (professional shoot recommended)
- [ ] Add a blog/tips section for SEO
- [ ] Embed Google Maps for studio location
- [ ] Add WhatsApp floating chat button
- [ ] Add Instagram feed integration

### Phase 3 — E-Commerce
- [ ] Integrate Paystack or Flutterwave for payments
- [ ] Add cart functionality
- [ ] Add order tracking system
- [ ] Add user accounts/login

### Phase 4 — Marketing
- [ ] Connect Google Analytics
- [ ] Add Meta Pixel for Facebook/Instagram ads
- [ ] Set up email newsletter (Mailchimp)
- [ ] Add countdown timer for promotions
- [ ] Add loyalty/referral program

### Phase 5 — Booking System
- [ ] Integrate Calendly or a custom booking calendar
- [ ] Add appointment reminders via WhatsApp
- [ ] Set up deposit payment for bookings

---

## 📞 Support

For questions about this website setup, contact your web developer.

**Brand:** Layo's Luxe Studio  
**Tagline:** *Beauty. Style. Confidence.*  
**Location:** Lagos, Nigeria

---

*© 2025 Layo's Luxe Studio. All rights reserved.*
