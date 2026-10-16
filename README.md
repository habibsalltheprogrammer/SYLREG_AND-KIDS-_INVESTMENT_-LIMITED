# SYLREG & KIDS INVESTMENT LTD — Official Website

**Your Global Gateway to Finance, Trade & Services**

A fully responsive, multi-page corporate website for **SYLREG & KIDS INVESTMENT LTD** — located at 9 Symthe Street, Congo Market, Freetown, Sierra Leone.

---

## 📁 Folder Structure

```
sylreg-kids-investment/
├── index.html            ← Homepage (Hero, Services, Partners strip, Stats, CTA)
├── about.html            ← About Us (Story, Mission/Vision, Values, Timeline, Team)
├── services.html         ← Services (6 detailed services)
├── partners.html         ← Partners (Western Union featured + others)
├── contact.html          ← Contact (Form, Info cards, Map, Business hours)
│
├── css/
│   ├── style.css         ← Variables, base styles, components, navbar, footer
│   ├── animations.css    ← All keyframes and scroll animations
│   └── responsive.css    ← Media queries (tablet, mobile, small)
│
├── js/
│   ├── navbar.js         ← Sticky scroll, hamburger toggle, active link
│   └── main.js           ← Scroll reveal, counters, particles, form, back-to-top
│
├── assets/
│   └── images/           ← Add logo.png, favicon.ico, og-image.png here
│
└── README.md
```

---

## 🚀 Deploy to GitHub Pages

### Step 1 — Create Repository
1. Go to [github.com](https://github.com) → **New Repository**
2. Name it: `sylreg-kids-investment` (or `sylregkids.github.io`)
3. Set to **Public** → **Create repository**

### Step 2 — Upload Files

**Option A — GitHub web UI (easiest):**
1. Open your repo → **Add file → Upload files**
2. Drag & drop ALL contents of the `sylreg-kids-investment/` folder
3. Commit message: `Initial website launch`
4. Click **Commit changes**

**Option B — Git CLI:**
```bash
cd sylreg-kids-investment
git init
git add .
git commit -m "Initial website launch"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/sylreg-kids-investment.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages
1. Repo → **Settings** → **Pages** (left sidebar)
2. Source: **Deploy from a branch**
3. Branch: **main** | Folder: **/ (root)**
4. Click **Save**
5. Live at: `https://YOUR_USERNAME.github.io/sylreg-kids-investment/`

---

## 🌐 Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Hero, 6 services, partners strip, stats, CTA |
| About | `about.html` | Company story, mission/vision, values, timeline, team |
| Services | `services.html` | Full detail on all 6 services + how-it-works |
| Partners | `partners.html` | Western Union featured + all partner cards |
| Contact | `contact.html` | Form, info cards, map, phone lines, hours |

---

## 🎨 Design System

| Property | Value |
|----------|-------|
| Display font | Bebas Neue |
| Body font | Montserrat |
| Sub font | Rajdhani |
| Primary colour | `#0d1b3e` Navy |
| Accent colour | `#ffd700` Gold |
| Background | `#060d1f` Deep Navy |

---

## 📋 Business Info

| | |
|---|---|
| **Company** | SYLREG & KIDS INVESTMENT LTD |
| **Tagline** | Your Global Gateway to Finance, Trade & Services |
| **Address** | 9 Symthe Street, Congo Market, Freetown, Sierra Leone |
| **Phone 1** | +232 76 492-022 |
| **Phone 2** | 34 708-087 |
| **Phone 3** | 99 312-191 |
| **Email** | sylregenterprise@gmail.com |
| **Established** | November 14, 2025 |

---

## ⚙️ Our 6 Services

1. **Send & Receive Money Worldwide** — Western Union authorized agent
2. **Procurement & Logistics** — Sourcing, supply chain, freight
3. **General Supplies** — Office, household, commercial goods
4. **Photocopy & Printing** — B&W, colour, flyers, banners, binding
5. **Commerce & Trade** — Import/export, B2B, trade finance
6. **Marketing** — Branding, print, digital, campaigns

---

## 🤝 Partners

Western Union ⭐ · MoneyGram · Ria · Afro International · NAFA · BnB · Cash Moov · EDSA

---

## 📝 Customization

- **Contact form:** Replace simulated submit in `js/main.js` with [Formspree](https://formspree.io) or [Netlify Forms](https://netlify.com)
- **Map:** Replace map placeholder in `contact.html` with a Google Maps `<iframe>` embed
- **Favicon/Logo:** Add `logo.png` + `favicon.ico` to `assets/images/` and link in each `<head>`

---

*Built with pure HTML, CSS & JavaScript — no frameworks, no build tools. GitHub Pages ready.*

---

## Longrich Products

- Full catalogue: `services.html` → section `#longrich-products` (category filter, product detail popup, WhatsApp order buttons).
- Home page shows 6 featured products that deep-link to the matching popup (`services.html?product=<id>#longrich-products`).
- Product images live in `assets/images/products/`. To add or edit a product, copy one `<article class="lr-card">` block in `services.html`.
- The WhatsApp number used by every "Enquire / Order" button and the contact form is set once, in `js/main.js` (`window.SYLREG_WA`).

---

## Contact form, Formspree & Supabase

- `contact.html` posts to Formspree (`https://formspree.io/f/xyeklbny`), which emails each message to the account owner. Formspree asks you to confirm the email address the first time a message arrives.
- Database copy: every message is also saved in the `contact_messages` table of the Supabase project "sylreg & kids investment limited" (already created; URL and anon key are in `js/config.js`; schema in `supabase/schema.sql`). Visitors can only insert rows, never read them. Read messages in the Supabase dashboard → Table Editor.
- The footer "Call Now" button scrolls to the contact section (`#contact-section`).

## Watu phone loans

- Services page → section `#watu-phones` (price table, WhatsApp "Apply" buttons).
- Watu also appears on the Partners page and in the Home partner strip.
